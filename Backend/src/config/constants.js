/**
 * Application constants
 */

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  VOLUNTEER: 'volunteer',
  SHELTER_ADMIN: 'shelter_admin',
  SCHOOL_ADMIN: 'school_admin',
  SUPER_ADMIN: 'super_admin'
};

// Listing statuses
export const LISTING_STATUS = {
  AVAILABLE: 'available',
  CLAIMED: 'claimed',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
};

// Food categories
export const FOOD_CATEGORIES = {
  PRODUCE: 'produce',
  DAIRY: 'dairy',
  MEAT: 'meat',
  BAKERY: 'bakery',
  PANTRY: 'pantry',
  PREPARED: 'prepared',
  BEVERAGES: 'beverages',
  SNACKS: 'snacks',
  OTHER: 'other'
};

// Allergen types
export const ALLERGENS = {
  NUTS: 'nuts',
  DAIRY: 'dairy',
  EGGS: 'eggs',
  SOY: 'soy',
  WHEAT: 'wheat',
  FISH: 'fish',
  SHELLFISH: 'shellfish',
  SESAME: 'sesame'
};

// Notification types
export const NOTIFICATION_TYPES = {
  NEW_LISTING: 'new_listing',
  LISTING_CLAIMED: 'listing_claimed',
  PICKUP_REMINDER: 'pickup_reminder',
  DELIVERY_CONFIRMED: 'delivery_confirmed',
  MESSAGE_RECEIVED: 'message_received',
  VOLUNTEER_MATCHED: 'volunteer_matched'
};

// Message types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  LOCATION: 'location',
  SYSTEM: 'system'
};

// Distance units
export const DISTANCE_UNITS = {
  KILOMETERS: 'km',
  MILES: 'mi'
};

// API response messages
export const MESSAGES = {
  SUCCESS: {
    LISTING_CREATED: 'Listing created successfully',
    LISTING_UPDATED: 'Listing updated successfully',
    LISTING_DELETED: 'Listing deleted successfully',
    LISTING_CLAIMED: 'Listing claimed successfully',
    USER_REGISTERED: 'User registered successfully',
    USER_UPDATED: 'User profile updated successfully',
    MESSAGE_SENT: 'Message sent successfully',
    VOLUNTEER_MATCHED: 'Volunteer matched successfully'
  },
  ERROR: {
    LISTING_NOT_FOUND: 'Listing not found',
    LISTING_ALREADY_CLAIMED: 'Listing already claimed',
    LISTING_EXPIRED: 'Listing has expired',
    USER_NOT_FOUND: 'User not found',
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_CREDENTIALS: 'Invalid credentials',
    VALIDATION_ERROR: 'Validation error',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    FILE_UPLOAD_ERROR: 'File upload error',
    INVALID_TOKEN: 'Invalid or expired token',
    PERMISSION_DENIED: 'Permission denied'
  }
};

// File upload constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp']
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  POSTAL_CODE: /^[A-Za-z0-9\s\-]{3,10}$/
};

// Distance calculations
export const DISTANCE_LIMITS = {
  MAX_DELIVERY_DISTANCE: 50, // kilometers
  DEFAULT_SEARCH_RADIUS: 10, // kilometers
  MIN_SEARCH_RADIUS: 1 // kilometers
};

// Time constants
export const TIME_CONSTANTS = {
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  DAYS_IN_WEEK: 7,
  DEFAULT_PICKUP_WINDOW: 2, // hours
  MAX_PICKUP_WINDOW: 24, // hours
  LISTING_EXPIRY_BUFFER: 1 // hours before actual expiry
};

// Cache durations (in seconds)
export const CACHE_DURATION = {
  USER_PROFILE: 300, // 5 minutes
  LISTINGS: 60, // 1 minute
  DASHBOARD_STATS: 900, // 15 minutes
  SEARCH_RESULTS: 180 // 3 minutes
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0
};

// Rate limiting
export const RATE_LIMITS = {
  LISTING_CREATION: 10, // per hour
  MESSAGE_SENDING: 100, // per hour
  FILE_UPLOAD: 20 // per hour
};

// Impact calculation constants
export const IMPACT_METRICS = {
  CO2_PER_MEAL: 2.5, // kg CO2e saved per meal
  WATER_PER_MEAL: 25, // liters saved per meal
  DEFAULT_SERVING_SIZE: 0.5 // kg per serving
};

// Socket events
export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  NEW_MESSAGE: 'new_message',
  MESSAGE_SENT: 'message_sent',
  LISTING_UPDATE: 'listing_update',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  NOTIFICATION: 'notification'
};

export default {
  USER_ROLES,
  LISTING_STATUS,
  FOOD_CATEGORIES,
  ALLERGENS,
  NOTIFICATION_TYPES,
  MESSAGE_TYPES,
  DISTANCE_UNITS,
  MESSAGES,
  FILE_CONSTRAINTS,
  VALIDATION_PATTERNS,
  DISTANCE_LIMITS,
  TIME_CONSTANTS,
  CACHE_DURATION,
  PAGINATION,
  RATE_LIMITS,
  IMPACT_METRICS,
  SOCKET_EVENTS
};
