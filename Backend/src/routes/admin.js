import express from 'express';
import { getFirestore, COLLECTIONS } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { USER_ROLES } from '../config/constants.js';
import { UserService } from '../services/userService.js';
import { ListingService } from '../services/listingService.js';
import { authenticateToken, requireAdmin, requireSuperAdmin } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const userService = new UserService();
const listingService = new ListingService();

/**
 * @route   GET /api/admin/stats
 * @desc    Get admin dashboard statistics
 * @access  Private (Admin only)
 */
router.get('/stats', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const db = getFirestore();

  // Get comprehensive admin stats
  const [usersSnapshot, listingsSnapshot, messagesSnapshot] = await Promise.all([
    db.collection(COLLECTIONS.USERS).get(),
    db.collection(COLLECTIONS.LISTINGS).get(),
    db.collection(COLLECTIONS.MESSAGES).get()
  ]);

  // Calculate user stats
  const userStats = {
    total: usersSnapshot.size,
    active: 0,
    byRole: {
      student: 0,
      volunteer: 0,
      shelter_admin: 0,
      school_admin: 0,
      super_admin: 0
    },
    newThisMonth: 0
  };

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  usersSnapshot.forEach(doc => {
    const user = doc.data();
    if (user.isActive) userStats.active++;
    if (user.role) userStats.byRole[user.role]++;
    if (user.createdAt && user.createdAt.toDate() > oneMonthAgo) {
      userStats.newThisMonth++;
    }
  });

  // Calculate listing stats
  const listingStats = {
    total: listingsSnapshot.size,
    active: 0,
    claimed: 0,
    delivered: 0,
    expired: 0,
    newThisWeek: 0
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  listingsSnapshot.forEach(doc => {
    const listing = doc.data();
    switch (listing.status) {
      case 'available': listingStats.active++; break;
      case 'claimed': listingStats.claimed++; break;
      case 'delivered': listingStats.delivered++; break;
      case 'expired': listingStats.expired++; break;
    }
    if (listing.createdAt && listing.createdAt.toDate() > oneWeekAgo) {
      listingStats.newThisWeek++;
    }
  });

  // Calculate engagement stats
  const engagementStats = {
    totalMessages: messagesSnapshot.size,
    averageMessagesPerListing: listingsSnapshot.size > 0 ? 
      Math.round(messagesSnapshot.size / listingsSnapshot.size) : 0,
    completionRate: listingStats.total > 0 ? 
      Math.round((listingStats.delivered / listingStats.total) * 100) : 0
  };

  res.json({
    success: true,
    message: 'Admin statistics retrieved successfully',
    data: {
      userStats,
      listingStats,
      engagementStats,
      lastUpdated: new Date()
    }
  });
}));

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with admin view
 * @access  Private (Admin only)
 */
router.get('/users', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { role, status, limit = 50, offset = 0, search } = req.query;
  const db = getFirestore();

  let query = db.collection(COLLECTIONS.USERS);

  // Apply filters
  if (role) {
    query = query.where('role', '==', role);
  }

  if (status === 'active') {
    query = query.where('isActive', '==', true);
  } else if (status === 'inactive') {
    query = query.where('isActive', '==', false);
  }

  // Apply pagination
  query = query.orderBy('createdAt', 'desc')
               .limit(parseInt(limit))
               .offset(parseInt(offset));

  const snapshot = await query.get();
  const users = [];

  snapshot.forEach(doc => {
    const user = doc.data();
    // Remove sensitive information for admin view
    const { password, ...adminUserView } = user;
    users.push({
      id: doc.id,
      ...adminUserView
    });
  });

  // Filter by search term if provided
  let filteredUsers = users;
  if (search) {
    const searchLower = search.toLowerCase();
    filteredUsers = users.filter(user => 
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  }

  res.json({
    success: true,
    message: 'Users retrieved successfully',
    data: {
      users: filteredUsers,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        total: filteredUsers.length,
        hasMore: users.length === parseInt(limit)
      }
    }
  });
}));

/**
 * @route   PUT /api/admin/users/:userId/status
 * @desc    Update user status (activate/deactivate)
 * @access  Private (Admin only)
 */
router.put('/users/:userId/status', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { isActive, reason } = req.body;

  if (typeof isActive !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'isActive must be a boolean value',
      error: 'INVALID_STATUS'
    });
  }

  await userService.setUserActiveStatus(userId, isActive);

  logger.info(`User ${userId} status updated to ${isActive ? 'active' : 'inactive'} by admin ${req.userId}`, {
    reason,
    adminId: req.userId
  });

  res.json({
    success: true,
    message: `User ${isActive ? 'activated' : 'deactivated'} successfully`
  });
}));

/**
 * @route   PUT /api/admin/users/:userId/role
 * @desc    Update user role
 * @access  Private (Super Admin only)
 */
router.put('/users/:userId/role', authenticateToken, requireSuperAdmin, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!Object.values(USER_ROLES).includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Invalid role. Must be one of: ${Object.values(USER_ROLES).join(', ')}`,
      error: 'INVALID_ROLE'
    });
  }

  const updatedUser = await userService.updateUser(userId, { role });

  logger.info(`User ${userId} role updated to ${role} by super admin ${req.userId}`);

  res.json({
    success: true,
    message: 'User role updated successfully',
    data: {
      user: {
        id: updatedUser.id,
        role: updatedUser.role
      }
    }
  });
}));

/**
 * @route   GET /api/admin/listings
 * @desc    Get all listings with admin view
 * @access  Private (Admin only)
 */
router.get('/listings', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { status, category, limit = 50, offset = 0 } = req.query;

  const filters = {
    ...(status && { status }),
    ...(category && { category })
  };

  const options = {
    limit: parseInt(limit),
    offset: parseInt(offset),
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  const result = await listingService.getListings(filters, options);

  res.json({
    success: true,
    message: 'Admin listings retrieved successfully',
    data: {
      listings: result.listings,
      pagination: {
        hasMore: result.hasMore,
        lastDoc: result.lastDoc,
        limit: options.limit,
        offset: options.offset
      }
    }
  });
}));

/**
 * @route   PUT /api/admin/listings/:listingId/status
 * @desc    Update listing status (admin override)
 * @access  Private (Admin only)
 */
router.put('/listings/:listingId/status', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const { status, reason } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required',
      error: 'MISSING_STATUS'
    });
  }

  const additionalData = {
    isAdmin: true,
    adminId: req.userId,
    ...(reason && { reason })
  };

  const updatedListing = await listingService.updateListingStatus(
    listingId, 
    status, 
    req.userId, 
    additionalData
  );

  logger.info(`Listing ${listingId} status updated to ${status} by admin ${req.userId}`, {
    reason,
    adminId: req.userId
  });

  res.json({
    success: true,
    message: 'Listing status updated successfully',
    data: {
      listing: updatedListing
    }
  });
}));

/**
 * @route   DELETE /api/admin/listings/:listingId
 * @desc    Delete listing (admin override)
 * @access  Private (Admin only)
 */
router.delete('/listings/:listingId', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { listingId } = req.params;
  const { reason } = req.body;

  // Get listing for logging
  const listing = await listingService.getListingById(listingId);
  
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: 'Listing not found',
      error: 'LISTING_NOT_FOUND'
    });
  }

  // Admin can delete any listing
  await listingService.deleteListing(listingId, listing.ownerId);

  logger.warn(`Listing ${listingId} deleted by admin ${req.userId}`, {
    reason,
    adminId: req.userId,
    originalOwner: listing.ownerId
  });

  res.json({
    success: true,
    message: 'Listing deleted successfully'
  });
}));

/**
 * @route   GET /api/admin/reports
 * @desc    Get platform reports
 * @access  Private (Admin only)
 */
router.get('/reports', authenticateToken, requireAdmin, asyncHandler(async (req, res) => {
  const { type = 'summary', period = '30d' } = req.query;
  const db = getFirestore();

  // Calculate date range
  const endDate = new Date();
  const startDate = new Date();
  
  switch (period) {
    case '7d':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(startDate.getDate() - 90);
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }

  // Get data for the period
  const listingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('createdAt', '>=', startDate)
    .where('createdAt', '<=', endDate)
    .get();

  const usersSnapshot = await db
    .collection(COLLECTIONS.USERS)
    .where('createdAt', '>=', startDate)
    .where('createdAt', '<=', endDate)
    .get();

  // Generate report based on type
  let report = {};

  if (type === 'summary') {
    report = {
      period,
      newUsers: usersSnapshot.size,
      newListings: listingsSnapshot.size,
      completedListings: 0,
      totalImpact: {
        mealsRescued: 0,
        co2Saved: 0
      }
    };

    listingsSnapshot.forEach(doc => {
      const listing = doc.data();
      if (listing.status === 'delivered') {
        report.completedListings++;
        // Add impact calculations here
      }
    });
  }

  res.json({
    success: true,
    message: 'Report generated successfully',
    data: {
      report,
      generatedAt: new Date(),
      period,
      type
    }
  });
}));

/**
 * @route   POST /api/admin/maintenance/cleanup
 * @desc    Run maintenance cleanup tasks
 * @access  Private (Super Admin only)
 */
router.post('/maintenance/cleanup', authenticateToken, requireSuperAdmin, asyncHandler(async (req, res) => {
  const { task } = req.body;

  const results = {};

  if (!task || task === 'expired-listings') {
    // Mark expired listings
    const expiredCount = await listingService.markExpiredListings();
    results.expiredListings = expiredCount;
  }

  if (!task || task === 'inactive-users') {
    // TODO: Implement inactive user cleanup
    results.inactiveUsers = 0;
  }

  logger.info(`Maintenance cleanup completed by super admin ${req.userId}`, {
    task,
    results
  });

  res.json({
    success: true,
    message: 'Maintenance cleanup completed',
    data: {
      results,
      completedAt: new Date()
    }
  });
}));

export default router;
