/**
 * HTTP Interceptors
 * Global request/response interceptors for API calls
 */

import { useAuthStore } from '@/stores/auth.js'
import { useNotificationStore } from '@/stores/notifications.js'
import router from '@/router/index.js'

/**
 * Setup API interceptors
 */
export function setupInterceptors() {
  // This would be called in main.js after setting up stores
  console.log('Setting up API interceptors...')
}

/**
 * Global error handler for API responses
 */
export function handleApiError(error, showNotification = true) {
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()

  // Handle different types of errors
  if (error.isUnauthorized) {
    // Token expired or invalid
    authStore.logout()
    router.push('/auth/login')
    
    if (showNotification) {
      notificationStore.error('Session Expired', 'Please log in again to continue.')
    }
    return
  }

  if (error.isForbidden) {
    // Access denied
    router.push('/unauthorized')
    
    if (showNotification) {
      notificationStore.error('Access Denied', 'You don\'t have permission to perform this action.')
    }
    return
  }

  if (error.isNotFound) {
    // Resource not found
    if (showNotification) {
      notificationStore.error('Not Found', 'The requested resource was not found.')
    }
    return
  }

  if (error.isValidationError) {
    // Validation errors
    if (showNotification) {
      notificationStore.error('Validation Error', 'Please check your input and try again.')
    }
    return
  }

  if (error.isServerError) {
    // Server errors
    if (showNotification) {
      notificationStore.error('Server Error', 'Something went wrong on our end. Please try again later.')
    }
    return
  }

  if (error.isNetworkError) {
    // Network errors
    if (showNotification) {
      notificationStore.error('Connection Error', 'Please check your internet connection and try again.')
    }
    return
  }

  if (error.isTimeoutError) {
    // Timeout errors
    if (showNotification) {
      notificationStore.error('Request Timeout', 'The request took too long to complete. Please try again.')
    }
    return
  }

  // Generic error
  if (showNotification) {
    notificationStore.error('Error', error.message || 'An unexpected error occurred.')
  }
}

/**
 * Token refresh utility
 */
export async function attemptTokenRefresh() {
  const authStore = useAuthStore()
  
  try {
    const result = await authStore.refreshToken()
    
    if (!result.success) {
      // Refresh failed, logout user
      authStore.logout()
      router.push('/auth/login')
      return false
    }
    
    return true
  } catch (error) {
    console.error('Token refresh failed:', error)
    authStore.logout()
    router.push('/auth/login')
    return false
  }
}

/**
 * Request retry utility
 */
export async function retryRequest(requestFn, maxRetries = 3, delay = 1000) {
  let lastError
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      lastError = error
      
      // Don't retry on certain errors
      if (error.isUnauthorized || error.isForbidden || error.isValidationError) {
        throw error
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }
  
  throw lastError
}

/**
 * Cache utility for API responses
 */
class ApiCache {
  constructor() {
    this.cache = new Map()
    this.ttl = new Map()
  }

  set(key, value, ttlMs = 300000) { // Default 5 minutes
    this.cache.set(key, value)
    this.ttl.set(key, Date.now() + ttlMs)
  }

  get(key) {
    const expiry = this.ttl.get(key)
    
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key)
      this.ttl.delete(key)
      return null
    }
    
    return this.cache.get(key)
  }

  delete(key) {
    this.cache.delete(key)
    this.ttl.delete(key)
  }

  clear() {
    this.cache.clear()
    this.ttl.clear()
  }

  // Generate cache key from URL and params
  generateKey(url, params = {}) {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')
    
    return `${url}${paramString ? `?${paramString}` : ''}`
  }
}

// Create singleton cache instance
export const apiCache = new ApiCache()

/**
 * Cached request wrapper
 */
export async function cachedRequest(requestFn, cacheKey, ttlMs = 300000) {
  // Check cache first
  const cached = apiCache.get(cacheKey)
  if (cached) {
    return cached
  }
  
  try {
    const result = await requestFn()
    
    // Cache successful responses
    if (result.success) {
      apiCache.set(cacheKey, result, ttlMs)
    }
    
    return result
  } catch (error) {
    throw error
  }
}

/**
 * Clear cache for specific patterns
 */
export function clearCachePattern(pattern) {
  const regex = new RegExp(pattern)
  
  for (const key of apiCache.cache.keys()) {
    if (regex.test(key)) {
      apiCache.delete(key)
    }
  }
}

export default {
  setupInterceptors,
  handleApiError,
  attemptTokenRefresh,
  retryRequest,
  apiCache,
  cachedRequest,
  clearCachePattern,
}
