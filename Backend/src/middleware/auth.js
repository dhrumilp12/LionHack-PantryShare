import jwt from 'jsonwebtoken';
import { getAuth } from '../config/firebase.js';
import { logger } from '../config/logger.js';
import { MESSAGES, USER_ROLES } from '../config/constants.js';
import { UserService } from '../services/userService.js';

/**
 * Verify JWT token and attach user to request
 */
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
        error: 'No token provided'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from Firestore
    const userService = new UserService();
    const user = await userService.getUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.USER_NOT_FOUND,
        error: 'User not found'
      });
    }

    // Attach user to request object
    req.user = user;
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_TOKEN,
        error: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.INVALID_TOKEN,
        error: 'Token expired'
      });
    }

    return res.status(500).json({
      success: false,
      message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
      error: error.message
    });
  }
};

/**
 * Verify Firebase ID token (alternative auth method)
 */
export const authenticateFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const idToken = authHeader && authHeader.split(' ')[1];

    if (!idToken) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
        error: 'No token provided'
      });
    }

    // Verify Firebase ID token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    
    // Get user from Firestore
    const userService = new UserService();
    const user = await userService.getUserById(decodedToken.uid);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.USER_NOT_FOUND,
        error: 'User not found'
      });
    }

    // Attach user to request object
    req.user = user;
    req.userId = decodedToken.uid;
    
    next();
  } catch (error) {
    logger.error('Firebase authentication error:', error);
    
    return res.status(401).json({
      success: false,
      message: MESSAGES.ERROR.INVALID_TOKEN,
      error: 'Invalid Firebase token'
    });
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next(); // No token, continue without user
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userService = new UserService();
    const user = await userService.getUserById(decoded.userId);
    
    if (user) {
      req.user = user;
      req.userId = decoded.userId;
    }
    
    next();
  } catch (error) {
    // Log error but don't fail the request
    logger.warn('Optional auth failed:', error.message);
    next();
  }
};

/**
 * Authorize user roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.ERROR.UNAUTHORIZED,
        error: 'User not authenticated'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.ERROR.PERMISSION_DENIED,
        error: `Access denied. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Check if user is admin (shelter_admin, school_admin, or super_admin)
 */
export const requireAdmin = authorize(
  USER_ROLES.SHELTER_ADMIN,
  USER_ROLES.SCHOOL_ADMIN,
  USER_ROLES.SUPER_ADMIN
);

/**
 * Check if user is super admin
 */
export const requireSuperAdmin = authorize(USER_ROLES.SUPER_ADMIN);

/**
 * Check if user owns the resource or is admin
 */
export const requireOwnershipOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    const resourceUserId = req.body[resourceUserIdField] || req.params[resourceUserIdField];
    const isOwner = req.userId === resourceUserId;
    const isAdmin = [
      USER_ROLES.SHELTER_ADMIN,
      USER_ROLES.SCHOOL_ADMIN,
      USER_ROLES.SUPER_ADMIN
    ].includes(req.user?.role);

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: MESSAGES.ERROR.PERMISSION_DENIED,
        error: 'You can only access your own resources'
      });
    }

    next();
  };
};
