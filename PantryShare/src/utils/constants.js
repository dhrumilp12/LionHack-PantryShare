/**
 * Frontend constants that match backend constants
 */

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  VOLUNTEER: 'volunteer',
  SHELTER_ADMIN: 'shelter_admin',
  SCHOOL_ADMIN: 'school_admin',
  SUPER_ADMIN: 'super_admin'
}

// Listing statuses
export const LISTING_STATUS = {
  AVAILABLE: 'available',
  CLAIMED: 'claimed',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled'
}

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
}

// Food category display labels
export const FOOD_CATEGORY_LABELS = {
  [FOOD_CATEGORIES.PRODUCE]: 'Fresh Produce',
  [FOOD_CATEGORIES.DAIRY]: 'Dairy Products',
  [FOOD_CATEGORIES.MEAT]: 'Meat & Poultry',
  [FOOD_CATEGORIES.BAKERY]: 'Bakery Items',
  [FOOD_CATEGORIES.PANTRY]: 'Pantry Staples',
  [FOOD_CATEGORIES.PREPARED]: 'Prepared Foods',
  [FOOD_CATEGORIES.BEVERAGES]: 'Beverages',
  [FOOD_CATEGORIES.SNACKS]: 'Snacks',
  [FOOD_CATEGORIES.OTHER]: 'Other'
}

// Listing status display labels
export const LISTING_STATUS_LABELS = {
  [LISTING_STATUS.AVAILABLE]: 'Available',
  [LISTING_STATUS.CLAIMED]: 'Claimed',
  [LISTING_STATUS.IN_TRANSIT]: 'In Transit',
  [LISTING_STATUS.DELIVERED]: 'Delivered',
  [LISTING_STATUS.EXPIRED]: 'Expired',
  [LISTING_STATUS.CANCELLED]: 'Cancelled'
}

// Listing status colors for UI
export const LISTING_STATUS_COLORS = {
  [LISTING_STATUS.AVAILABLE]: 'text-green-600 bg-green-100',
  [LISTING_STATUS.CLAIMED]: 'text-yellow-600 bg-yellow-100',
  [LISTING_STATUS.IN_TRANSIT]: 'text-blue-600 bg-blue-100',
  [LISTING_STATUS.DELIVERED]: 'text-purple-600 bg-purple-100',
  [LISTING_STATUS.EXPIRED]: 'text-red-600 bg-red-100',
  [LISTING_STATUS.CANCELLED]: 'text-gray-600 bg-gray-100'
}

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
}

// Allergen display labels
export const ALLERGEN_LABELS = {
  [ALLERGENS.NUTS]: 'Nuts',
  [ALLERGENS.DAIRY]: 'Dairy',
  [ALLERGENS.EGGS]: 'Eggs',
  [ALLERGENS.SOY]: 'Soy',
  [ALLERGENS.WHEAT]: 'Wheat/Gluten',
  [ALLERGENS.FISH]: 'Fish',
  [ALLERGENS.SHELLFISH]: 'Shellfish',
  [ALLERGENS.SESAME]: 'Sesame'
}

// Dietary preferences
export const DIETARY_PREFERENCES = {
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten_free',
  DAIRY_FREE: 'dairy_free',
  NUT_FREE: 'nut_free',
  HALAL: 'halal',
  KOSHER: 'kosher'
}

// Dietary preference labels
export const DIETARY_PREFERENCE_LABELS = {
  [DIETARY_PREFERENCES.VEGETARIAN]: 'Vegetarian',
  [DIETARY_PREFERENCES.VEGAN]: 'Vegan',
  [DIETARY_PREFERENCES.GLUTEN_FREE]: 'Gluten-Free',
  [DIETARY_PREFERENCES.DAIRY_FREE]: 'Dairy-Free',
  [DIETARY_PREFERENCES.NUT_FREE]: 'Nut-Free',
  [DIETARY_PREFERENCES.HALAL]: 'Halal',
  [DIETARY_PREFERENCES.KOSHER]: 'Kosher'
}

// Distance units
export const DISTANCE_UNITS = {
  KILOMETERS: 'km',
  MILES: 'mi'
}

// Distance options for filters
export const DISTANCE_OPTIONS = [
  { value: 1, label: '1 km' },
  { value: 2, label: '2 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 20, label: '20 km' },
  { value: 50, label: '50 km' }
]

// Quantity units
export const QUANTITY_UNITS = [
  'portions',
  'servings',
  'meals',
  'items',
  'pieces',
  'pounds',
  'kilograms',
  'ounces',
  'grams',
  'liters',
  'milliliters',
  'cups',
  'bags',
  'boxes',
  'containers'
]

// Sort options for listings
export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Newest First', order: 'desc' },
  { value: 'createdAt', label: 'Oldest First', order: 'asc' },
  { value: 'expiryDate', label: 'Expiring Soon', order: 'asc' },
  { value: 'quantity', label: 'Most Food', order: 'desc' },
  { value: 'viewCount', label: 'Most Popular', order: 'desc' }
]

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  POSTAL_CODE: /^[A-Za-z0-9\s\-]{3,10}$/
}

// File upload constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 5,
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp']
}

// Time constants for form validation
export const TIME_CONSTRAINTS = {
  MIN_PICKUP_HOURS: 1, // Minimum hours from now for pickup
  MAX_PICKUP_DAYS: 7, // Maximum days from now for pickup
  MIN_EXPIRY_HOURS: 2, // Minimum hours from now for expiry
  MAX_EXPIRY_DAYS: 30 // Maximum days from now for expiry
}

// Default values for forms
export const FORM_DEFAULTS = {
  LISTING: {
    quantity: 1,
    unit: 'portions',
    category: '',
    pickupWindowHours: 4,
    allergens: [],
    dietaryInfo: {}
  }
}

// API endpoint paths (relative to base URL)
export const API_ENDPOINTS = {
  LISTINGS: '/listings',
  SEARCH: '/listings/search',
  UPLOAD: '/upload/images',
  AUTH: '/auth',
  USERS: '/users',
  DASHBOARD: '/dashboard'
}

// Notification types for toast messages
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

// Route names for navigation
export const ROUTE_NAMES = {
  HOME: 'home',
  LISTINGS: 'listings',
  LISTING_DETAIL: 'listing-detail',
  CREATE_LISTING: 'create-listing',
  EDIT_LISTING: 'edit-listing',
  PROFILE: 'profile',
  DASHBOARD: 'dashboard',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password'
}

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to log in to perform this action.',
  FORBIDDEN: 'You don\'t have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  LISTING_NOT_FOUND: 'Listing not found or has been removed.',
  LISTING_ALREADY_CLAIMED: 'This listing has already been claimed.',
  LISTING_EXPIRED: 'This listing has expired.',
  FILE_TOO_LARGE: 'File size is too large. Maximum size is 5MB.',
  INVALID_FILE_TYPE: 'Invalid file type. Only images are allowed.'
}

// Success messages
export const SUCCESS_MESSAGES = {
  LISTING_CREATED: 'Your food listing has been created successfully!',
  LISTING_UPDATED: 'Your listing has been updated successfully!',
  LISTING_DELETED: 'Your listing has been deleted successfully!',
  LISTING_CLAIMED: 'You have successfully claimed this listing!',
  STATUS_UPDATED: 'Status updated successfully!',
  PROFILE_UPDATED: 'Your profile has been updated successfully!',
  PASSWORD_CHANGED: 'Your password has been changed successfully!'
}

export default {
  USER_ROLES,
  LISTING_STATUS,
  LISTING_STATUS_LABELS,
  LISTING_STATUS_COLORS,
  FOOD_CATEGORIES,
  FOOD_CATEGORY_LABELS,
  ALLERGENS,
  ALLERGEN_LABELS,
  DIETARY_PREFERENCES,
  DIETARY_PREFERENCE_LABELS,
  DISTANCE_UNITS,
  DISTANCE_OPTIONS,
  QUANTITY_UNITS,
  SORT_OPTIONS,
  VALIDATION_PATTERNS,
  FILE_CONSTRAINTS,
  TIME_CONSTRAINTS,
  FORM_DEFAULTS,
  API_ENDPOINTS,
  NOTIFICATION_TYPES,
  ROUTE_NAMES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
}
