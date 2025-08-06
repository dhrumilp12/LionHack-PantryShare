import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getAuth } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';
import { UserService } from '../services/userService.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const userService = new UserService();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, role, phone, location, bio } = req.body;

  // Check if user already exists
  const existingUser = await userService.getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email',
      error: 'EMAIL_ALREADY_EXISTS'
    });
  }

  // Hash password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user data - only include defined values
  const userData = {
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    role
  };

  // Only add optional fields if they are provided
  if (phone && phone.trim()) {
    userData.phone = phone.trim();
  }
  
  if (bio && bio.trim()) {
    userData.bio = bio.trim();
  }
  
  if (location) {
    userData.location = location;
  }

  // Create user in Firestore
  const newUser = await userService.createUser(userData);

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  // Remove password from response
  const { password: _, ...userResponse } = newUser;

  logger.info(`New user registered: ${newUser.id} (${email})`);

  res.status(201).json({
    success: true,
    message: MESSAGES.SUCCESS.USER_REGISTERED,
    data: {
      user: userResponse,
      token
    }
  });
}));

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_CREDENTIALS,
      error: 'USER_NOT_FOUND'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      message: 'Account has been deactivated',
      error: 'ACCOUNT_DEACTIVATED'
    });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_CREDENTIALS,
      error: 'INVALID_PASSWORD'
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { 
      userId: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  // Remove password from response
  const { password: _, ...userResponse } = user;

  logger.info(`User logged in: ${user.id} (${email})`);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: userResponse,
      token
    }
  });
}));

/**
 * @route   POST /api/auth/firebase-login
 * @desc    Login with Firebase ID token
 * @access  Public
 */
router.post('/firebase-login', asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      success: false,
      message: 'Firebase ID token is required',
      error: 'MISSING_ID_TOKEN'
    });
  }

  try {
    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    // Check if user exists in our database
    let user = await userService.getUserById(decodedToken.uid);
    
    if (!user) {
      // Create new user from Firebase data
      const userData = {
        email: decodedToken.email,
        firstName: decodedToken.name?.split(' ')[0] || 'User',
        lastName: decodedToken.name?.split(' ').slice(1).join(' ') || '',
        role: 'student', // Default role
        emailVerified: decodedToken.email_verified || false,
        profileImage: decodedToken.picture
      };

      user = await userService.createUser(userData);
      logger.info(`New user created from Firebase: ${user.id} (${decodedToken.email})`);
    } else {
      logger.info(`Existing user logged in via Firebase: ${user.id} (${decodedToken.email})`);
    }

    // Generate our own JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      message: 'Firebase login successful',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error) {
    logger.error('Firebase login error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid Firebase token',
      error: 'INVALID_FIREBASE_TOKEN'
    });
  }
}));

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh JWT token
 * @access  Private (requires valid token)
 */
router.post('/refresh-token', asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
      error: 'MISSING_TOKEN'
    });
  }

  try {
    // Verify current token (even if expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    
    // Check if user still exists and is active
    const user = await userService.getUserById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive',
        error: 'USER_INACTIVE'
      });
    }

    // Generate new token
    const newToken = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken
      }
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: 'INVALID_TOKEN'
    });
  }
}));

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client-side token removal)
 * @access  Private
 */
router.post('/logout', (req, res) => {
  // For JWT tokens, logout is primarily client-side
  // Server can optionally maintain a blacklist of tokens
  
  logger.info('User logout request received');
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
      error: 'MISSING_EMAIL'
    });
  }

  const user = await userService.getUserByEmail(email);
  
  // Always return success to prevent email enumeration
  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent'
  });

  if (user) {
    // TODO: Implement password reset email functionality
    // This would typically involve:
    // 1. Generate a secure reset token
    // 2. Store it in the database with expiration
    // 3. Send email with reset link
    logger.info(`Password reset requested for user: ${user.id} (${email})`);
  }
}));

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Token and new password are required',
      error: 'MISSING_FIELDS'
    });
  }

  // TODO: Implement password reset token verification and password update
  // This is a placeholder implementation
  
  res.json({
    success: true,
    message: 'Password reset successful'
  });
}));

export default router;
