import { body, param, query, validationResult } from 'express-validator';
import { USER_ROLES, FOOD_CATEGORIES } from '../config/constants.js';

/**
 * Handle validation result
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: 'VALIDATION_ERROR',
      details: errors.array()
    });
  }
  next();
};

/**
 * Validate user registration
 */
export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  
  body('role')
    .isIn(Object.values(USER_ROLES))
    .withMessage(`Role must be one of: ${Object.values(USER_ROLES).join(', ')}`),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters'),
  
  body('location.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('location.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  handleValidationErrors
];

/**
 * Validate user login
 */
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

/**
 * Validate profile update
 */
export const validateUpdateProfile = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be less than 50 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be less than 50 characters'),
  
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters'),
  
  handleValidationErrors
];

/**
 * Validate listing creation
 */
export const validateCreateListing = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('category')
    .isIn(Object.values(FOOD_CATEGORIES))
    .withMessage(`Category must be one of: ${Object.values(FOOD_CATEGORIES).join(', ')}`),
  
  body('quantity')
    .isFloat({ min: 0.1 })
    .withMessage('Quantity must be greater than 0'),
  
  body('unit')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit is required'),
  
  body('expiryDate')
    .isISO8601()
    .withMessage('Valid expiry date is required')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expiry date must be in the future');
      }
      return true;
    }),
  
  body('pickupWindow.start')
    .isISO8601()
    .withMessage('Valid pickup start time is required')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Pickup start time must be in the future');
      }
      return true;
    }),
  
  body('pickupWindow.end')
    .isISO8601()
    .withMessage('Valid pickup end time is required')
    .custom((value, { req }) => {
      const startTime = new Date(req.body.pickupWindow.start);
      if (new Date(value) <= startTime) {
        throw new Error('Pickup end time must be after start time');
      }
      return true;
    }),
  
  body('location.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude is required'),
  
  body('location.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude is required'),
  
  handleValidationErrors
];

/**
 * Validate listing update
 */
export const validateUpdateListing = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('quantity')
    .optional()
    .isFloat({ min: 0.1 })
    .withMessage('Quantity must be greater than 0'),
  
  handleValidationErrors
];

/**
 * Validate search parameters
 */
export const validateSearchListings = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be 0 or greater'),
  
  handleValidationErrors
];

/**
 * Validate send message
 */
export const validateSendMessage = [
  body('listingId')
    .notEmpty()
    .withMessage('Listing ID is required'),
  
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message content must be between 1 and 1000 characters'),
  
  body('type')
    .optional()
    .isIn(['text', 'image', 'location'])
    .withMessage('Message type must be text, image, or location'),
  
  handleValidationErrors
];

/**
 * Validate Object ID format
 */
export const validateObjectId = (paramName) => [
  param(paramName)
    .isLength({ min: 1 })
    .withMessage(`${paramName} is required`),
  
  handleValidationErrors
];

/**
 * Validate file upload
 */
export const validateFileUpload = (req, res, next) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
      error: 'NO_FILE_UPLOADED'
    });
  }
  
  next();
};

export default {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateCreateListing,
  validateUpdateListing,
  validateSearchListings,
  validateSendMessage,
  validateObjectId,
  validateFileUpload
};


