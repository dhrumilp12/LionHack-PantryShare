import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getAuth } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';
import { UserService } from '../services/userService.js';
import EmailService from '../services/emailService.js';
import PasswordResetService from '../services/passwordResetService.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = express.Router();
const userService = new UserService();
const emailService = new EmailService();
const passwordResetService = new PasswordResetService();

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

  // Send welcome email (don't wait for it)
  emailService.sendWelcomeEmail(email, firstName).catch(error => {
    logger.error('Failed to send welcome email:', error);
  });

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

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address',
      error: 'INVALID_EMAIL'
    });
  }

  const user = await userService.getUserByEmail(email.toLowerCase());
  
  // Always return success to prevent email enumeration
  res.json({
    success: true,
    message: 'If an account with that email exists, a password reset link has been sent'
  });

  if (user && user.isActive) {
    try {
      // Revoke any existing reset tokens for this user
      await passwordResetService.revokeUserTokens(user.id);
      
      // Create new reset token
      const resetResult = await passwordResetService.createResetToken(user.id, email.toLowerCase());
      
      if (resetResult.success) {
        // Send password reset email
        await emailService.sendPasswordResetEmail(
          email.toLowerCase(),
          user.firstName,
          resetResult.token
        );
        
        logger.info(`Password reset email sent to user: ${user.id} (${email})`);
      }
    } catch (error) {
      logger.error('Error processing password reset request:', error);
      // Don't expose the error to the client
    }
  } else {
    // Log attempted reset for non-existent or inactive user
    logger.warn(`Password reset attempted for non-existent/inactive user: ${email}`);
  }
}));

/**
 * @route   GET /api/auth/validate-reset-token/:token
 * @desc    Validate password reset token
 * @access  Public
 */
router.get('/validate-reset-token/:token', asyncHandler(async (req, res) => {
  const { token } = req.params;

  // Prevent caching of token validation
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Reset token is required',
      error: 'MISSING_TOKEN'
    });
  }

  try {
    const tokenValidation = await passwordResetService.validateResetToken(token);
    
    if (!tokenValidation.success) {
      return res.status(400).json({
        success: false,
        message: tokenValidation.error,
        error: 'INVALID_TOKEN'
      });
    }

    // Return basic info without sensitive data
    res.json({
      success: true,
      message: 'Token is valid',
      data: {
        email: tokenValidation.data.email,
        expiresAt: tokenValidation.data.expiresAt
      }
    });
  } catch (error) {
    logger.error('Error validating reset token:', error);
    
    res.status(500).json({
      success: false,
      message: 'An error occurred while validating the token',
      error: 'VALIDATION_FAILED'
    });
  }
}));

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  // Prevent caching
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Token and new password are required',
      error: 'MISSING_FIELDS'
    });
  }

  // Validate password strength
  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long',
      error: 'WEAK_PASSWORD'
    });
  }

  try {
    // Validate reset token
    const tokenValidation = await passwordResetService.validateResetToken(token);
    
    if (!tokenValidation.success) {
      return res.status(400).json({
        success: false,
        message: tokenValidation.error,
        error: 'INVALID_TOKEN'
      });
    }

    const { userId, email } = tokenValidation.data;
    
    // Get user to ensure they still exist and are active
    const user = await userService.getUserById(userId);
    if (!user || !user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'User account not found or inactive',
        error: 'USER_NOT_FOUND'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    await userService.updateUser(userId, { password: hashedPassword });

    // Mark token as used
    await passwordResetService.markTokenAsUsed(tokenValidation.data.id);

    // Revoke any other active reset tokens for this user
    await passwordResetService.revokeUserTokens(userId);

    logger.info(`Password successfully reset for user: ${userId} (${email})`);

    res.json({
      success: true,
      message: 'Password reset successful. You can now login with your new password.'
    });
  } catch (error) {
    logger.error('Error resetting password:', error);
    
    res.status(500).json({
      success: false,
      message: 'An error occurred while resetting your password. Please try again.',
      error: 'RESET_FAILED'
    });
  }
}));

export default router;
