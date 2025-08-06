import express from 'express';
import { logger } from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';
import { ListingService } from '../services/listingService.js';
import { authenticateToken } from '../middleware/auth.js';
import { 
  validateCreateListing, 
  validateUpdateListing, 
  validateSearchListings,
  validateObjectId 
} from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const listingService = new ListingService();

/**
 * @route   GET /api/listings
 * @desc    Get listings with filters and pagination
 * @access  Public
 */
router.get('/', validateSearchListings, asyncHandler(async (req, res) => {
  const {
    latitude,
    longitude,
    radius = 10,
    category,
    status,
    limit = 20,
    offset = 0,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    startAfter
  } = req.query;

  const filters = {
    ...(latitude && longitude && { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }),
    ...(radius && { radius: parseFloat(radius) }),
    ...(category && { category }),
    ...(status && { status })
  };

  const options = {
    limit: parseInt(limit),
    offset: parseInt(offset),
    sortBy,
    sortOrder,
    startAfter
  };

  const result = await listingService.getListings(filters, options);

  res.json({
    success: true,
    message: 'Listings retrieved successfully',
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
 * @route   GET /api/listings/search
 * @desc    Search listings by text
 * @access  Public
 */
router.get('/search', asyncHandler(async (req, res) => {
  const { q: searchTerm, category, radius, latitude, longitude } = req.query;

  if (!searchTerm || searchTerm.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Search term must be at least 2 characters long',
      error: 'INVALID_SEARCH_TERM'
    });
  }

  const filters = {
    ...(category && { category }),
    ...(latitude && longitude && { 
      latitude: parseFloat(latitude), 
      longitude: parseFloat(longitude),
      radius: parseFloat(radius) || 10 
    })
  };

  const listings = await listingService.searchListings(searchTerm.trim(), filters);

  res.json({
    success: true,
    message: 'Search completed successfully',
    data: {
      listings,
      searchTerm: searchTerm.trim(),
      resultCount: listings.length
    }
  });
}));

/**
 * @route   GET /api/listings/:id
 * @desc    Get specific listing by ID
 * @access  Public
 */
router.get('/:id', validateObjectId('id'), asyncHandler(async (req, res) => {
  const { id } = req.params;

  const listing = await listingService.getListingById(id);

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: MESSAGES.ERROR.LISTING_NOT_FOUND,
      error: 'LISTING_NOT_FOUND'
    });
  }

  // Increment view count (fire and forget)
  listingService.incrementViewCount(id).catch(err => 
    logger.warn(`Failed to increment view count for listing ${id}:`, err)
  );

  res.json({
    success: true,
    message: 'Listing retrieved successfully',
    data: {
      listing
    }
  });
}));

/**
 * @route   POST /api/listings
 * @desc    Create a new listing
 * @access  Private
 */
router.post('/', authenticateToken, validateCreateListing, asyncHandler(async (req, res) => {
  const listingData = req.body;
  const ownerId = req.userId;

  // Validate expiry date is in the future
  const expiryDate = new Date(listingData.expiryDate);
  const now = new Date();
  
  if (expiryDate <= now) {
    return res.status(400).json({
      success: false,
      message: 'Expiry date must be in the future',
      error: 'INVALID_EXPIRY_DATE'
    });
  }

  // Validate pickup window
  const pickupStart = new Date(listingData.pickupWindow.start);
  const pickupEnd = new Date(listingData.pickupWindow.end);
  
  if (pickupStart <= now) {
    return res.status(400).json({
      success: false,
      message: 'Pickup start time must be in the future',
      error: 'INVALID_PICKUP_TIME'
    });
  }

  if (pickupEnd <= pickupStart) {
    return res.status(400).json({
      success: false,
      message: 'Pickup end time must be after start time',
      error: 'INVALID_PICKUP_WINDOW'
    });
  }

  const listing = await listingService.createListing(listingData, ownerId);

  // Emit socket event for new listing
  const io = req.app.get('io');
  if (io) {
    io.emit('new_listing', {
      listing,
      location: listingData.location
    });
  }

  logger.info(`New listing created: ${listing.id} by user ${ownerId}`);

  res.status(201).json({
    success: true,
    message: MESSAGES.SUCCESS.LISTING_CREATED,
    data: {
      listing
    }
  });
}));

/**
 * @route   PUT /api/listings/:id
 * @desc    Update a listing
 * @access  Private (Owner only)
 */
router.put('/:id', authenticateToken, validateUpdateListing, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const userId = req.userId;

  const updatedListing = await listingService.updateListing(id, updateData, userId);

  // Emit socket event for listing update
  const io = req.app.get('io');
  if (io) {
    io.emit('listing_updated', {
      listingId: id,
      listing: updatedListing
    });
  }

  res.json({
    success: true,
    message: MESSAGES.SUCCESS.LISTING_UPDATED,
    data: {
      listing: updatedListing
    }
  });
}));

/**
 * @route   POST /api/listings/:id/claim
 * @desc    Claim a listing as volunteer
 * @access  Private
 */
router.post('/:id/claim', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const volunteerId = req.userId;

  const result = await listingService.claimListing(id, volunteerId);

  // Emit socket events
  const io = req.app.get('io');
  if (io) {
    io.emit('listing_claimed', {
      listingId: id,
      volunteerId,
      ownerId: result.ownerId
    });
    
    // Notify the owner
    io.to(`user_${result.ownerId}`).emit('notification', {
      type: 'listing_claimed',
      message: 'Your listing has been claimed by a volunteer',
      listingId: id
    });
  }

  logger.info(`Listing ${id} claimed by volunteer ${volunteerId}`);

  res.json({
    success: true,
    message: MESSAGES.SUCCESS.LISTING_CLAIMED,
    data: result
  });
}));

/**
 * @route   PUT /api/listings/:id/status
 * @desc    Update listing status
 * @access  Private (Owner or Volunteer)
 */
router.put('/:id/status', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, reason } = req.body;
  const userId = req.userId;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: 'Status is required',
      error: 'MISSING_STATUS'
    });
  }

  const additionalData = {};
  if (reason) {
    additionalData.reason = reason;
  }

  const updatedListing = await listingService.updateListingStatus(id, status, userId, additionalData);

  // Emit socket event
  const io = req.app.get('io');
  if (io) {
    io.emit('listing_status_updated', {
      listingId: id,
      status,
      listing: updatedListing
    });
  }

  res.json({
    success: true,
    message: 'Listing status updated successfully',
    data: {
      listing: updatedListing
    }
  });
}));

/**
 * @route   DELETE /api/listings/:id
 * @desc    Delete a listing
 * @access  Private (Owner only)
 */
router.delete('/:id', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  await listingService.deleteListing(id, userId);

  // Emit socket event
  const io = req.app.get('io');
  if (io) {
    io.emit('listing_deleted', {
      listingId: id
    });
  }

  res.json({
    success: true,
    message: MESSAGES.SUCCESS.LISTING_DELETED
  });
}));

/**
 * @route   GET /api/listings/:id/analytics
 * @desc    Get listing analytics
 * @access  Private (Owner only)
 */
router.get('/:id/analytics', authenticateToken, validateObjectId('id'), asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if user owns the listing
  const listing = await listingService.getListingById(id);
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: MESSAGES.ERROR.LISTING_NOT_FOUND,
      error: 'LISTING_NOT_FOUND'
    });
  }

  if (listing.ownerId !== req.userId) {
    return res.status(403).json({
      success: false,
      message: 'You can only view analytics for your own listings',
      error: 'UNAUTHORIZED_ACCESS'
    });
  }

  const analytics = await listingService.getListingAnalytics(id);

  res.json({
    success: true,
    message: 'Analytics retrieved successfully',
    data: {
      analytics
    }
  });
}));

/**
 * @route   GET /api/listings/user/:userId
 * @desc    Get listings by user
 * @access  Private
 */
router.get('/user/:userId', authenticateToken, asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { status, limit = 20, offset = 0 } = req.query;

  // Users can only view their own listings unless they're admin
  if (userId !== req.userId && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'You can only view your own listings',
      error: 'UNAUTHORIZED_ACCESS'
    });
  }

  const filters = {
    ownerId: userId,
    ...(status && { status })
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
    message: 'User listings retrieved successfully',
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

export default router;
