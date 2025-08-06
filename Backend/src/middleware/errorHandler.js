import { logger } from '../config/logger.js';
import { MESSAGES } from '../config/constants.js';

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
  logger.error('Error Handler:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Default error response
  let error = {
    success: false,
    message: MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  };

  // Validation errors
  if (err.name === 'ValidationError') {
    error.message = MESSAGES.ERROR.VALIDATION_ERROR;
    error.details = Object.values(err.errors).map(e => e.message);
    return res.status(400).json(error);
  }

  // Duplicate key error (MongoDB/Firestore)
  if (err.code === 11000) {
    error.message = 'Duplicate field value entered';
    error.field = Object.keys(err.keyValue)[0];
    return res.status(400).json(error);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = MESSAGES.ERROR.INVALID_TOKEN;
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error.message = MESSAGES.ERROR.INVALID_TOKEN;
    error.details = 'Token expired';
    return res.status(401).json(error);
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.message = MESSAGES.ERROR.FILE_UPLOAD_ERROR;
    error.details = 'File too large';
    return res.status(400).json(error);
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error.message = MESSAGES.ERROR.FILE_UPLOAD_ERROR;
    error.details = 'Too many files';
    return res.status(400).json(error);
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error.message = MESSAGES.ERROR.FILE_UPLOAD_ERROR;
    error.details = 'Unexpected field';
    return res.status(400).json(error);
  }

  // Firebase errors
  if (err.code && err.code.startsWith('auth/')) {
    error.message = 'Authentication error';
    error.details = err.message;
    return res.status(401).json(error);
  }

  if (err.code && err.code.startsWith('permission-denied')) {
    error.message = MESSAGES.ERROR.PERMISSION_DENIED;
    return res.status(403).json(error);
  }

  // Rate limiting errors
  if (err.status === 429) {
    error.message = 'Too many requests';
    error.details = 'Please try again later';
    return res.status(429).json(error);
  }

  // Custom app errors
  if (err.statusCode) {
    error.message = err.message;
    return res.status(err.statusCode).json(error);
  }

  // Default to 500 server error
  res.status(500).json(error);
};

/**
 * Handle 404 errors for undefined routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = {
    success: false,
    message: 'Route not found',
    details: `Cannot ${req.method} ${req.originalUrl}`
  };

  logger.warn('404 Error:', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  res.status(404).json(error);
};

/**
 * Async error wrapper
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Custom error class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create error response
 */
export const createError = (message, statusCode = 500, details = null) => {
  const error = new AppError(message, statusCode);
  if (details) {
    error.details = details;
  }
  return error;
};
