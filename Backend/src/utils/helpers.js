import { logger } from '../config/logger.js';
import { IMPACT_METRICS } from '../config/constants.js';

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point  
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
export const degToRad = (deg) => {
  return deg * (Math.PI/180);
};

/**
 * Calculate estimated meals from food quantity
 * @param {number} quantity - Food quantity
 * @param {string} unit - Unit of measurement
 * @returns {number} Estimated number of meals
 */
export const calculateMeals = (quantity, unit) => {
  const servingWeights = {
    'kg': 1,
    'lbs': 0.453592,
    'pieces': 0.2, // Assume 200g per piece
    'servings': 0.5, // Assume 500g per serving
    'liters': 1, // Assume 1kg per liter for liquids
    'gallons': 3.78541
  };

  const weightInKg = quantity * (servingWeights[unit] || 1);
  const meals = weightInKg / IMPACT_METRICS.DEFAULT_SERVING_SIZE;
  
  return Math.max(1, Math.round(meals));
};

/**
 * Calculate CO2 savings from rescued food
 * @param {number} meals - Number of meals
 * @returns {number} CO2 saved in kg
 */
export const calculateCO2Savings = (meals) => {
  return Math.round(meals * IMPACT_METRICS.CO2_PER_MEAL * 100) / 100;
};

/**
 * Calculate water savings from rescued food
 * @param {number} meals - Number of meals
 * @returns {number} Water saved in liters
 */
export const calculateWaterSavings = (meals) => {
  return Math.round(meals * IMPACT_METRICS.WATER_PER_MEAL);
};

/**
 * Format time for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted time string
 */
export const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

/**
 * Validate coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @returns {boolean} True if coordinates are valid
 */
export const validateCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Generate a random string
 * @param {number} length - Length of string
 * @returns {string} Random string
 */
export const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Sanitize user input
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

/**
 * Check if time window is valid
 * @param {Object} timeWindow - Time window object with start and end
 * @returns {boolean} True if valid
 */
export const isValidTimeWindow = (timeWindow) => {
  if (!timeWindow || !timeWindow.start || !timeWindow.end) {
    return false;
  }

  const start = new Date(timeWindow.start);
  const end = new Date(timeWindow.end);
  const now = new Date();

  return (
    start instanceof Date && !isNaN(start) &&
    end instanceof Date && !isNaN(end) &&
    start > now &&
    end > start &&
    (end - start) <= 24 * 60 * 60 * 1000 // Max 24 hours
  );
};

/**
 * Parse and validate pagination parameters
 * @param {Object} query - Query parameters
 * @returns {Object} Parsed pagination params
 */
export const parsePagination = (query) => {
  const limit = Math.min(Math.max(parseInt(query.limit) || 20, 1), 100);
  const offset = Math.max(parseInt(query.offset) || 0, 0);
  
  return { limit, offset };
};

/**
 * Create a standardized API response
 * @param {boolean} success - Success status
 * @param {string} message - Response message
 * @param {Object} data - Response data
 * @param {Object} meta - Additional metadata
 * @returns {Object} Standardized response
 */
export const createApiResponse = (success, message, data = null, meta = null) => {
  const response = {
    success,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return response;
};

/**
 * Sleep/delay function for testing or rate limiting
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Promise with retry logic
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      logger.warn(`Retry attempt ${attempt} failed, retrying in ${delay}ms:`, error.message);
      await sleep(delay);
    }
  }
  
  throw lastError;
};

/**
 * Convert object to query string
 * @param {Object} obj - Object to convert
 * @returns {string} Query string
 */
export const objectToQueryString = (obj) => {
  const params = new URLSearchParams();
  
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && obj[key] !== undefined) {
      params.append(key, obj[key]);
    }
  });
  
  return params.toString();
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    Object.keys(obj).forEach(key => {
      clonedObj[key] = deepClone(obj[key]);
    });
    return clonedObj;
  }
};

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export default {
  calculateDistance,
  degToRad,
  calculateMeals,
  calculateCO2Savings,
  calculateWaterSavings,
  formatTimeAgo,
  validateCoordinates,
  generateRandomString,
  sanitizeInput,
  isValidTimeWindow,
  parsePagination,
  createApiResponse,
  sleep,
  retryWithBackoff,
  objectToQueryString,
  deepClone,
  isEmpty
};
