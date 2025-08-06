import express from 'express';
import { logger } from '../config/logger.js';
import { UserService } from '../services/userService.js';
import { ListingService } from '../services/listingService.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const userService = new UserService();
const listingService = new ListingService();

/**
 * @route   GET /api/volunteers/nearby
 * @desc    Get nearby volunteers for a location
 * @access  Private
 */
router.get('/nearby', authenticateToken, asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 10, timeWindow } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required',
      error: 'MISSING_COORDINATES'
    });
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const radiusKm = parseFloat(radius);

  let volunteers;

  if (timeWindow) {
    // Parse time window if provided
    try {
      const parsedTimeWindow = JSON.parse(timeWindow);
      volunteers = await userService.getAvailableVolunteers(lat, lng, parsedTimeWindow, radiusKm);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time window format',
        error: 'INVALID_TIME_WINDOW'
      });
    }
  } else {
    volunteers = await userService.getUsersByLocation(lat, lng, radiusKm);
  }

  // Filter and format volunteer data
  const volunteerList = volunteers
    .filter(user => user.role === 'volunteer')
    .map(volunteer => ({
      id: volunteer.id,
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      profileImage: volunteer.profileImage,
      distance: volunteer.distance,
      availability: volunteer.preferences?.availabilityWindow || [],
      rating: volunteer.stats?.rating || 5.0,
      totalPickups: volunteer.stats?.totalPickups || 0,
      bio: volunteer.bio
    }));

  res.json({
    success: true,
    message: 'Nearby volunteers retrieved successfully',
    data: {
      volunteers: volunteerList,
      searchRadius: radiusKm,
      center: { latitude: lat, longitude: lng },
      totalFound: volunteerList.length
    }
  });
}));

/**
 * @route   POST /api/volunteers/match
 * @desc    Match volunteers to a listing
 * @access  Private
 */
router.post('/match', authenticateToken, asyncHandler(async (req, res) => {
  const { listingId, maxVolunteers = 5 } = req.body;
  const userId = req.userId;

  if (!listingId) {
    return res.status(400).json({
      success: false,
      message: 'Listing ID is required',
      error: 'MISSING_LISTING_ID'
    });
  }

  // Get the listing
  const listing = await listingService.getListingById(listingId);
  
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: 'Listing not found',
      error: 'LISTING_NOT_FOUND'
    });
  }

  // Check if user owns the listing
  if (listing.ownerId !== userId) {
    return res.status(403).json({
      success: false,
      message: 'You can only match volunteers to your own listings',
      error: 'UNAUTHORIZED_ACCESS'
    });
  }

  // Check if listing is available for matching
  if (listing.status !== 'available') {
    return res.status(400).json({
      success: false,
      message: 'Listing is not available for volunteer matching',
      error: 'LISTING_NOT_AVAILABLE'
    });
  }

  const { latitude, longitude } = listing.location;
  const pickupWindow = listing.pickupWindow;

  // Find available volunteers
  const availableVolunteers = await userService.getAvailableVolunteers(
    latitude,
    longitude,
    pickupWindow,
    15 // 15km radius
  );

  // Limit the number of volunteers
  const matchedVolunteers = availableVolunteers
    .slice(0, parseInt(maxVolunteers))
    .map(volunteer => ({
      id: volunteer.id,
      firstName: volunteer.firstName,
      lastName: volunteer.lastName,
      profileImage: volunteer.profileImage,
      distance: volunteer.distance,
      rating: volunteer.stats?.rating || 5.0,
      totalPickups: volunteer.stats?.totalPickups || 0
    }));

  // Send notifications to matched volunteers
  const io = req.app.get('io');
  if (io) {
    matchedVolunteers.forEach(volunteer => {
      io.to(`user_${volunteer.id}`).emit('volunteer_matched', {
        listing: {
          id: listing.id,
          title: listing.title,
          category: listing.category,
          location: listing.location,
          pickupWindow: listing.pickupWindow
        },
        message: 'A new food rescue opportunity is available near you!'
      });
    });
  }

  logger.info(`Matched ${matchedVolunteers.length} volunteers to listing ${listingId}`);

  res.json({
    success: true,
    message: 'Volunteers matched successfully',
    data: {
      matchedVolunteers,
      listingId,
      totalMatched: matchedVolunteers.length
    }
  });
}));

/**
 * @route   GET /api/volunteers/opportunities
 * @desc    Get available volunteer opportunities
 * @access  Private (Volunteers only)
 */
router.get('/opportunities', authenticateToken, asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 15, limit = 20 } = req.query;
  const userId = req.userId;

  // Check if user is a volunteer
  const user = await userService.getUserById(userId);
  if (user.role !== 'volunteer') {
    return res.status(403).json({
      success: false,
      message: 'This endpoint is only available to volunteers',
      error: 'VOLUNTEERS_ONLY'
    });
  }

  const filters = {
    status: 'available',
    ...(latitude && longitude && {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      radius: parseFloat(radius)
    })
  };

  const options = {
    limit: parseInt(limit),
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  const result = await listingService.getListings(filters, options);

  // Filter out user's own listings
  const opportunities = result.listings.filter(listing => listing.ownerId !== userId);

  res.json({
    success: true,
    message: 'Volunteer opportunities retrieved successfully',
    data: {
      opportunities,
      totalFound: opportunities.length,
      searchRadius: parseFloat(radius),
      ...(latitude && longitude && {
        center: { 
          latitude: parseFloat(latitude), 
          longitude: parseFloat(longitude) 
        }
      })
    }
  });
}));

/**
 * @route   GET /api/volunteers/:volunteerId/stats
 * @desc    Get volunteer statistics
 * @access  Private
 */
router.get('/:volunteerId/stats', authenticateToken, asyncHandler(async (req, res) => {
  const { volunteerId } = req.params;
  const requesterId = req.userId;

  // Users can only view their own detailed stats, others get public stats
  const isOwnProfile = volunteerId === requesterId;

  const volunteer = await userService.getUserById(volunteerId);
  
  if (!volunteer) {
    return res.status(404).json({
      success: false,
      message: 'Volunteer not found',
      error: 'VOLUNTEER_NOT_FOUND'
    });
  }

  if (volunteer.role !== 'volunteer') {
    return res.status(400).json({
      success: false,
      message: 'User is not a volunteer',
      error: 'NOT_A_VOLUNTEER'
    });
  }

  const publicStats = {
    totalPickups: volunteer.stats?.totalPickups || 0,
    totalDeliveries: volunteer.stats?.totalDeliveries || 0,
    impactScore: volunteer.stats?.impactScore || 0,
    rating: volunteer.stats?.rating || 5.0,
    joinDate: volunteer.createdAt
  };

  let stats = publicStats;

  if (isOwnProfile) {
    // Add private stats for own profile
    const db = getFirestore();
    
    // Get recent pickups
    const recentPickupsSnapshot = await db
      .collection(COLLECTIONS.LISTINGS)
      .where('volunteerId', '==', volunteerId)
      .orderBy('claimedAt', 'desc')
      .limit(10)
      .get();

    const recentPickups = [];
    recentPickupsSnapshot.forEach(doc => {
      const listing = doc.data();
      recentPickups.push({
        id: doc.id,
        title: listing.title,
        status: listing.status,
        claimedAt: listing.claimedAt,
        deliveredAt: listing.deliveredAt
      });
    });

    stats = {
      ...publicStats,
      recentPickups,
      preferences: volunteer.preferences,
      achievements: userService.calculateAchievements(volunteer.stats)
    };
  }

  res.json({
    success: true,
    message: 'Volunteer statistics retrieved successfully',
    data: {
      volunteer: {
        id: volunteer.id,
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        profileImage: volunteer.profileImage
      },
      stats
    }
  });
}));

/**
 * @route   PUT /api/volunteers/availability
 * @desc    Update volunteer availability
 * @access  Private (Volunteers only)
 */
router.put('/availability', authenticateToken, asyncHandler(async (req, res) => {
  const { availabilityWindow, maxDistance, preferredCategories } = req.body;
  const userId = req.userId;

  // Check if user is a volunteer
  const user = await userService.getUserById(userId);
  if (user.role !== 'volunteer') {
    return res.status(403).json({
      success: false,
      message: 'This endpoint is only available to volunteers',
      error: 'VOLUNTEERS_ONLY'
    });
  }

  const updateData = {
    preferences: {
      ...user.preferences,
      ...(availabilityWindow && { availabilityWindow }),
      ...(maxDistance && { maxDistance: parseFloat(maxDistance) }),
      ...(preferredCategories && { preferredCategories })
    }
  };

  const updatedUser = await userService.updateUser(userId, updateData);

  res.json({
    success: true,
    message: 'Availability updated successfully',
    data: {
      preferences: updatedUser.preferences
    }
  });
}));

export default router;
