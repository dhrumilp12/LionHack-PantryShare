import express from 'express';
import { getFirestore, COLLECTIONS } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { LISTING_STATUS, IMPACT_METRICS } from '../config/constants.js';
import { authenticateToken } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get global platform statistics
 * @access  Public
 */
router.get('/stats', asyncHandler(async (req, res) => {
  const db = getFirestore();

  try {
    // Get cached stats first (for performance)
    const statsDoc = await db.collection(COLLECTIONS.METRICS).doc('global').get();
    
    let stats = {
      totalListings: 0,
      totalUsers: 0,
      totalMealsRescued: 0,
      totalCO2Saved: 0,
      totalWaterSaved: 0,
      activeListings: 0,
      completedListings: 0,
      lastUpdated: new Date()
    };

    if (statsDoc.exists) {
      stats = { ...stats, ...statsDoc.data() };
    } else {
      // Calculate fresh stats if no cached version exists
      stats = await calculateFreshStats(db);
    }

    res.json({
      success: true,
      message: 'Platform statistics retrieved successfully',
      data: {
        stats,
        lastUpdated: stats.lastUpdated
      }
    });
  } catch (error) {
    logger.error('Error fetching dashboard stats:', error);
    
    // Return basic stats on error
    res.json({
      success: true,
      message: 'Basic statistics retrieved',
      data: {
        stats: {
          totalListings: 0,
          totalUsers: 0,
          totalMealsRescued: 0,
          totalCO2Saved: 0,
          activeListings: 0,
          completedListings: 0,
          lastUpdated: new Date()
        }
      }
    });
  }
}));

/**
 * @route   GET /api/dashboard/user-stats
 * @desc    Get current user's statistics
 * @access  Private
 */
router.get('/user-stats', authenticateToken, asyncHandler(async (req, res) => {
  const userId = req.userId;
  const db = getFirestore();

  // Get user's listings stats
  const userListingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('ownerId', '==', userId)
    .get();

  // Get user's volunteer stats
  const volunteerListingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('volunteerId', '==', userId)
    .get();

  let userStats = {
    totalListingsCreated: 0,
    totalPickupsCompleted: 0,
    totalMealsShared: 0,
    totalCO2SavedByUser: 0,
    activeListings: 0,
    completedListings: 0,
    totalImpactScore: 0
  };

  // Calculate listings created stats
  userListingsSnapshot.forEach(doc => {
    const listing = doc.data();
    userStats.totalListingsCreated++;
    
    if (listing.status === LISTING_STATUS.AVAILABLE) {
      userStats.activeListings++;
    } else if (listing.status === LISTING_STATUS.DELIVERED) {
      userStats.completedListings++;
      userStats.totalMealsShared += calculateMealsFromListing(listing);
      userStats.totalCO2SavedByUser += calculateCO2FromListing(listing);
    }
  });

  // Calculate volunteer stats
  volunteerListingsSnapshot.forEach(doc => {
    const listing = doc.data();
    if (listing.status === LISTING_STATUS.DELIVERED) {
      userStats.totalPickupsCompleted++;
    }
  });

  userStats.totalImpactScore = userStats.totalMealsShared * IMPACT_METRICS.CO2_PER_MEAL;

  res.json({
    success: true,
    message: 'User statistics retrieved successfully',
    data: {
      stats: userStats
    }
  });
}));

/**
 * @route   GET /api/dashboard/recent-activity
 * @desc    Get recent platform activity
 * @access  Private
 */
router.get('/recent-activity', authenticateToken, asyncHandler(async (req, res) => {
  const { limit = 20 } = req.query;
  const db = getFirestore();

  // Get recent listings
  const recentListingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('isActive', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(parseInt(limit))
    .get();

  const recentActivity = [];

  recentListingsSnapshot.forEach(doc => {
    const listing = doc.data();
    recentActivity.push({
      id: doc.id,
      type: 'listing_created',
      title: listing.title,
      category: listing.category,
      location: listing.location?.address || 'Location not specified',
      createdAt: listing.createdAt,
      status: listing.status,
      quantity: listing.quantity,
      unit: listing.unit
    });
  });

  // Sort by creation time
  recentActivity.sort((a, b) => {
    const aTime = a.createdAt?.toDate() || new Date(0);
    const bTime = b.createdAt?.toDate() || new Date(0);
    return bTime - aTime;
  });

  res.json({
    success: true,
    message: 'Recent activity retrieved successfully',
    data: {
      activity: recentActivity.slice(0, parseInt(limit))
    }
  });
}));

/**
 * @route   GET /api/dashboard/impact-chart
 * @desc    Get impact data for charts
 * @access  Private
 */
router.get('/impact-chart', authenticateToken, asyncHandler(async (req, res) => {
  const { period = '30d', type = 'meals' } = req.query;
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
    case '1y':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }

  // Get completed listings in the date range
  const completedListingsSnapshot = await db
    .collection(COLLECTIONS.LISTINGS)
    .where('status', '==', LISTING_STATUS.DELIVERED)
    .where('deliveredAt', '>=', startDate)
    .where('deliveredAt', '<=', endDate)
    .orderBy('deliveredAt', 'asc')
    .get();

  // Group data by day
  const dailyData = {};
  
  completedListingsSnapshot.forEach(doc => {
    const listing = doc.data();
    const deliveryDate = listing.deliveredAt.toDate();
    const dateKey = deliveryDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: dateKey,
        meals: 0,
        co2Saved: 0,
        waterSaved: 0,
        listingsCompleted: 0
      };
    }

    const meals = calculateMealsFromListing(listing);
    dailyData[dateKey].meals += meals;
    dailyData[dateKey].co2Saved += calculateCO2FromListing(listing);
    dailyData[dateKey].waterSaved += calculateWaterFromListing(listing);
    dailyData[dateKey].listingsCompleted++;
  });

  // Convert to array and fill missing dates
  const chartData = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateKey = currentDate.toISOString().split('T')[0];
    chartData.push(dailyData[dateKey] || {
      date: dateKey,
      meals: 0,
      co2Saved: 0,
      waterSaved: 0,
      listingsCompleted: 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  res.json({
    success: true,
    message: 'Impact chart data retrieved successfully',
    data: {
      chartData,
      period,
      type,
      summary: {
        totalMeals: chartData.reduce((sum, day) => sum + day.meals, 0),
        totalCO2Saved: chartData.reduce((sum, day) => sum + day.co2Saved, 0),
        totalWaterSaved: chartData.reduce((sum, day) => sum + day.waterSaved, 0),
        totalListingsCompleted: chartData.reduce((sum, day) => sum + day.listingsCompleted, 0)
      }
    }
  });
}));

/**
 * @route   GET /api/dashboard/leaderboard
 * @desc    Get leaderboard data
 * @access  Private
 */
router.get('/leaderboard', authenticateToken, asyncHandler(async (req, res) => {
  const { type = 'impact', limit = 10 } = req.query;
  const db = getFirestore();

  // Get users with stats
  const usersSnapshot = await db
    .collection(COLLECTIONS.USERS)
    .where('isActive', '==', true)
    .orderBy('stats.impactScore', 'desc')
    .limit(parseInt(limit))
    .get();

  const leaderboard = [];

  usersSnapshot.forEach(doc => {
    const user = doc.data();
    leaderboard.push({
      id: doc.id,
      name: `${user.firstName} ${user.lastName}`,
      profileImage: user.profileImage,
      impactScore: user.stats?.impactScore || 0,
      totalListings: user.stats?.totalListings || 0,
      totalPickups: user.stats?.totalPickups || 0,
      totalDeliveries: user.stats?.totalDeliveries || 0
    });
  });

  res.json({
    success: true,
    message: 'Leaderboard retrieved successfully',
    data: {
      leaderboard,
      type,
      limit: parseInt(limit)
    }
  });
}));

/**
 * Helper function to calculate fresh stats
 */
async function calculateFreshStats(db) {
  try {
    // Get total users
    const usersSnapshot = await db.collection(COLLECTIONS.USERS).get();
    const totalUsers = usersSnapshot.size;

    // Get listings stats
    const listingsSnapshot = await db.collection(COLLECTIONS.LISTINGS).get();
    const totalListings = listingsSnapshot.size;

    let activeListings = 0;
    let completedListings = 0;
    let totalMealsRescued = 0;
    let totalCO2Saved = 0;
    let totalWaterSaved = 0;

    listingsSnapshot.forEach(doc => {
      const listing = doc.data();
      
      if (listing.status === LISTING_STATUS.AVAILABLE) {
        activeListings++;
      } else if (listing.status === LISTING_STATUS.DELIVERED) {
        completedListings++;
        totalMealsRescued += calculateMealsFromListing(listing);
        totalCO2Saved += calculateCO2FromListing(listing);
        totalWaterSaved += calculateWaterFromListing(listing);
      }
    });

    const stats = {
      totalListings,
      totalUsers,
      totalMealsRescued,
      totalCO2Saved,
      totalWaterSaved,
      activeListings,
      completedListings,
      lastUpdated: new Date()
    };

    // Cache the stats
    await db.collection(COLLECTIONS.METRICS).doc('global').set(stats);

    return stats;
  } catch (error) {
    logger.error('Error calculating fresh stats:', error);
    throw error;
  }
}

/**
 * Helper functions for impact calculations
 */
function calculateMealsFromListing(listing) {
  const quantity = listing.quantity || 1;
  const servingSize = IMPACT_METRICS.DEFAULT_SERVING_SIZE;
  return Math.round(quantity / servingSize);
}

function calculateCO2FromListing(listing) {
  const meals = calculateMealsFromListing(listing);
  return meals * IMPACT_METRICS.CO2_PER_MEAL;
}

function calculateWaterFromListing(listing) {
  const meals = calculateMealsFromListing(listing);
  return meals * IMPACT_METRICS.WATER_PER_MEAL;
}

export default router;
