/**
 * Authentication Service
 * Handles all auth-related API calls
 */

import apiClient, { ApiError } from './api.js'

class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role || 'student',
        phone: userData.phone || undefined,
        bio: userData.bio || undefined,
        location: userData.location || undefined,
      })

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      }
    } catch (error) {
      console.error('Registration error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
          details: error.details,
        }
      }

      return {
        success: false,
        error: 'Registration failed. Please try again.',
        code: 'REGISTRATION_ERROR',
      }
    }
  }

  /**
   * Login user with email and password
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      })

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      }
    } catch (error) {
      console.error('Login error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Login failed. Please try again.',
        code: 'LOGIN_ERROR',
      }
    }
  }

  /**
   * Login with Firebase ID token
   */
  async firebaseLogin(idToken) {
    try {
      const response = await apiClient.post('/auth/firebase-login', {
        idToken,
      })

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      }
    } catch (error) {
      console.error('Firebase login error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Firebase login failed. Please try again.',
        code: 'FIREBASE_LOGIN_ERROR',
      }
    }
  }

  /**
   * Refresh JWT token
   */
  async refreshToken() {
    try {
      const response = await apiClient.post('/auth/refresh-token')

      return {
        success: true,
        token: response.data.token,
        user: response.data.user,
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      
      return {
        success: false,
        error: 'Session expired. Please login again.',
        code: 'TOKEN_REFRESH_ERROR',
      }
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout')
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout fails on server, we still clear local storage
      return { success: true }
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email })

      return {
        success: true,
        message: response.message,
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to send reset email. Please try again.',
        code: 'FORGOT_PASSWORD_ERROR',
      }
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword,
      })

      return {
        success: true,
        message: response.message,
      }
    } catch (error) {
      console.error('Reset password error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to reset password. Please try again.',
        code: 'RESET_PASSWORD_ERROR',
      }
    }
  }

  /**
   * Validate token and get user profile
   */
  async validateToken() {
    try {
      const response = await apiClient.get('/users/profile')

      return {
        success: true,
        user: response.data.user,
      }
    } catch (error) {
      console.error('Token validation error:', error)
      
      return {
        success: false,
        error: 'Invalid session. Please login again.',
        code: 'TOKEN_VALIDATION_ERROR',
      }
    }
  }

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated() {
    const token = localStorage.getItem('ps_token')
    return !!token
  }

  /**
   * Get stored auth token
   */
  getToken() {
    return localStorage.getItem('ps_token')
  }

  /**
   * Store auth token
   */
  setToken(token) {
    if (token) {
      localStorage.setItem('ps_token', token)
    } else {
      localStorage.removeItem('ps_token')
    }
  }

  /**
   * Clear all auth data
   */
  clearAuth() {
    localStorage.removeItem('ps_token')
    localStorage.removeItem('ps_user')
  }
}

// Create and export singleton instance
const authService = new AuthService()

export { authService, AuthService }
export default authService
