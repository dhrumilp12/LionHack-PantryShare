import express from 'express';
import bcrypt from 'bcrypt';
import { logger } from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';
import { UserService } from '../services/userService.js';
import { authenticateToken, requireOwnershipOrAdmin } from '../middleware/auth.js';
import { validateUpdateProfile } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const userService = new UserService();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticateToken, asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: MESSAGES.ERROR.USER_NOT_FOUND,
      error: 'USER_NOT_FOUND'
    });
  }

  // Remove sensitive information
  const { password, ...userProfile } = user;

  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    data: {
      user: userProfile
    }
  });
}));

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/profile', authenticateToken, validateUpdateProfile, asyncHandler(async (req, res) => {
  const updateData = req.body;
  const userId = req.userId;

  // Remove fields that shouldn't be updated via this endpoint
  const { password, email, role, isActive, stats, ...allowedUpdates } = updateData;

  const updatedUser = await userService.updateUser(userId, allowedUpdates);

  // Remove password from response
  const { password: _, ...userResponse } = updatedUser;

  logger.info(`User profile updated: ${userId}`);

  res.json({
    success: true,
    message: MESSAGES.SUCCESS.USER_UPDATED,
    data: {
      user: userResponse
    }
  });
}));

/**
 * @route   PUT /api/users/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put('/change-password', authenticateToken, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Current password and new password are required',
      error: 'MISSING_PASSWORDS'
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'New password must be at least 8 characters long',
      error: 'PASSWORD_TOO_SHORT'
    });
  }

  // Get current user
  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: MESSAGES.ERROR.USER_NOT_FOUND,
      error: 'USER_NOT_FOUND'
    });
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      message: 'Current password is incorrect',
      error: 'INVALID_CURRENT_PASSWORD'
    });
  }

  // Hash new password
  const saltRounds = 12;
  const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

  // Update password
  await userService.updateUser(userId, { password: hashedNewPassword });

  logger.info(`Password changed for user: ${userId}`);

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
}));

/**
 * @route   PUT /api/users/location
 * @desc    Update user location
 * @access  Private
 */
router.put('/location', authenticateToken, asyncHandler(async (req, res) => {
  const { latitude, longitude, address } = req.body;
  const userId = req.userId;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required',
      error: 'MISSING_COORDINATES'
    });
  }

  // Validate coordinates
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return res.status(400).json({
      success: false,
      message: 'Invalid coordinates',
      error: 'INVALID_COORDINATES'
    });
  }

  await userService.updateUserLocation(userId, latitude, longitude, address);

  res.json({
    success: true,
    message: 'Location updated successfully'
  });
}));

/**
 * @route   GET /api/users/dashboard
 * @desc    Get user dashboard data
 * @access  Private
 */
router.get('/dashboard', authenticateToken, asyncHandler(async (req, res) => {
  const userId = req.userId;

  const dashboardData = await userService.getUserDashboard(userId);

  res.json({
    success: true,
    message: 'Dashboard data retrieved successfully',
    data: dashboardData
  });
}));

/**
 * @route   GET /api/users/:id
 * @desc    Get user profile by ID (public info only)
 * @access  Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: MESSAGES.ERROR.USER_NOT_FOUND,
      error: 'USER_NOT_FOUND'
    });
  }

  // Return only public information
  const publicProfile = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImage: user.profileImage,
    bio: user.bio,
    role: user.role,
    createdAt: user.createdAt,
    stats: {
      totalListings: user.stats?.totalListings || 0,
      impactScore: user.stats?.impactScore || 0
    }
  };

  res.json({
    success: true,
    message: 'User profile retrieved successfully',
    data: {
      user: publicProfile
    }
  });
}));

/**
 * @route   PUT /api/users/:id
 * @desc    Update user by ID (admin only)
 * @access  Private (Admin)
 */
router.put('/:id', authenticateToken, requireOwnershipOrAdmin('id'), validateUpdateProfile, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedUser = await userService.updateUser(id, updateData);

  // Remove password from response
  const { password: _, ...userResponse } = updatedUser;

  logger.info(`User ${id} updated by ${req.userId}`);

  res.json({
    success: true,
    message: MESSAGES.SUCCESS.USER_UPDATED,
    data: {
      user: userResponse
    }
  });
}));

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user account
 * @access  Private (Owner or Admin)
 */
router.delete('/:id', authenticateToken, requireOwnershipOrAdmin('id'), asyncHandler(async (req, res) => {
  const { id } = req.params;

  await userService.deleteUser(id);

  logger.info(`User ${id} deleted by ${req.userId}`);

  res.json({
    success: true,
    message: 'User account deleted successfully'
  });
}));

/**
 * @route   GET /api/users/nearby/volunteers
 * @desc    Get nearby volunteers
 * @access  Private
 */
router.get('/nearby/volunteers', authenticateToken, asyncHandler(async (req, res) => {
  const { latitude, longitude, radius = 10 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required',
      error: 'MISSING_COORDINATES'
    });
  }

  const volunteers = await userService.getUsersByLocation(
    parseFloat(latitude),
    parseFloat(longitude),
    parseFloat(radius)
  );

  // Filter only volunteers and remove sensitive information
  const volunteerProfiles = volunteers
    .filter(user => user.role === 'volunteer')
    .map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
      distance: user.distance,
      stats: {
        totalPickups: user.stats?.totalPickups || 0,
        rating: user.stats?.rating || 5.0
      }
    }));

  res.json({
    success: true,
    message: 'Nearby volunteers retrieved successfully',
    data: {
      volunteers: volunteerProfiles,
      searchRadius: parseFloat(radius),
      center: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      }
    }
  });
}));

/**
 * @route   PUT /api/users/preferences
 * @desc    Update user preferences
 * @access  Private
 */
router.put('/preferences', authenticateToken, asyncHandler(async (req, res) => {
  const { preferences } = req.body;
  const userId = req.userId;

  if (!preferences || typeof preferences !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Valid preferences object is required',
      error: 'INVALID_PREFERENCES'
    });
  }

  const updatedUser = await userService.updateUser(userId, { preferences });

  // Remove password from response
  const { password: _, ...userResponse } = updatedUser;

  res.json({
    success: true,
    message: 'Preferences updated successfully',
    data: {
      user: userResponse
    }
  });
}));

/**
 * @route   POST /api/users/deactivate
 * @desc    Deactivate user account
 * @access  Private
 */
router.post('/deactivate', authenticateToken, asyncHandler(async (req, res) => {
  const userId = req.userId;

  await userService.setUserActiveStatus(userId, false);

  logger.info(`User ${userId} deactivated their account`);

  res.json({
    success: true,
    message: 'Account deactivated successfully'
  });
}));

/**
 * @route   POST /api/users/reactivate
 * @desc    Reactivate user account
 * @access  Private
 */
router.post('/reactivate', authenticateToken, asyncHandler(async (req, res) => {
  const userId = req.userId;

  await userService.setUserActiveStatus(userId, true);

  logger.info(`User ${userId} reactivated their account`);

  res.json({
    success: true,
    message: 'Account reactivated successfully'
  });
}));

export default router;
