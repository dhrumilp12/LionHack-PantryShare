/**
 * User Service
 * Handles all user-related API calls
 */

import apiClient, { ApiError } from './api.js'

class UserService {
  /**
   * Get current user profile
   */
  async getProfile() {
    try {
      const response = await apiClient.get('/users/profile')
      
      return {
        success: true,
        user: response.data.user,
      }
    } catch (error) {
      console.error('Get profile error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to load profile. Please try again.',
        code: 'PROFILE_LOAD_ERROR',
      }
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates) {
    try {
      const response = await apiClient.put('/users/profile', updates)
      
      return {
        success: true,
        user: response.data.user,
        message: response.message,
      }
    } catch (error) {
      console.error('Update profile error:', error)
      
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
        error: 'Failed to update profile. Please try again.',
        code: 'PROFILE_UPDATE_ERROR',
      }
    }
  }

  /**
   * Update user location
   */
  async updateLocation(location) {
    try {
      const response = await apiClient.put('/users/location', location)
      
      return {
        success: true,
        location: response.data.location,
        message: response.message,
      }
    } catch (error) {
      console.error('Update location error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to update location. Please try again.',
        code: 'LOCATION_UPDATE_ERROR',
      }
    }
  }

  /**
   * Get user dashboard data
   */
  async getDashboard() {
    try {
      const response = await apiClient.get('/users/dashboard')
      
      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('Get dashboard error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to load dashboard. Please try again.',
        code: 'DASHBOARD_LOAD_ERROR',
      }
    }
  }

  /**
   * Get public user profile
   */
  async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`)
      
      return {
        success: true,
        user: response.data.user,
      }
    } catch (error) {
      console.error('Get user error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to load user profile. Please try again.',
        code: 'USER_LOAD_ERROR',
      }
    }
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(file, onProgress = null) {
    try {
      const response = await apiClient.uploadFile('/upload/avatar', file, onProgress)
      
      return {
        success: true,
        imageUrl: response.data.imageUrl,
        message: response.message,
      }
    } catch (error) {
      console.error('Upload avatar error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to upload avatar. Please try again.',
        code: 'AVATAR_UPLOAD_ERROR',
      }
    }
  }

  /**
   * Change user password
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await apiClient.put('/users/change-password', {
        currentPassword,
        newPassword,
      })
      
      return {
        success: true,
        message: response.message,
      }
    } catch (error) {
      console.error('Change password error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to change password. Please try again.',
        code: 'PASSWORD_CHANGE_ERROR',
      }
    }
  }

  /**
   * Delete user account
   */
  async deleteAccount(password) {
    try {
      const response = await apiClient.delete('/users/account', {
        body: JSON.stringify({ password }),
      })
      
      return {
        success: true,
        message: response.message,
      }
    } catch (error) {
      console.error('Delete account error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to delete account. Please try again.',
        code: 'ACCOUNT_DELETE_ERROR',
      }
    }
  }

  /**
   * Get user's listings
   */
  async getUserListings(params = {}) {
    try {
      const response = await apiClient.get('/users/listings', params)
      
      return {
        success: true,
        listings: response.data.listings,
        pagination: response.data.pagination,
      }
    } catch (error) {
      console.error('Get user listings error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to load listings. Please try again.',
        code: 'LISTINGS_LOAD_ERROR',
      }
    }
  }

  /**
   * Get user's volunteer activities
   */
  async getVolunteerActivities(params = {}) {
    try {
      const response = await apiClient.get('/users/volunteer-activities', params)
      
      return {
        success: true,
        activities: response.data.activities,
        pagination: response.data.pagination,
      }
    } catch (error) {
      console.error('Get volunteer activities error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to load volunteer activities. Please try again.',
        code: 'ACTIVITIES_LOAD_ERROR',
      }
    }
  }

  /**
   * Get user notifications
   */
  async getNotifications(params = {}) {
    try {
      const response = await apiClient.get('/users/notifications', params)
      
      return {
        success: true,
        notifications: response.data.notifications,
        pagination: response.data.pagination,
      }
    } catch (error) {
      console.error('Get notifications error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to load notifications. Please try again.',
        code: 'NOTIFICATIONS_LOAD_ERROR',
      }
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId) {
    try {
      const response = await apiClient.put(`/users/notifications/${notificationId}/read`)
      
      return {
        success: true,
        message: response.message,
      }
    } catch (error) {
      console.error('Mark notification read error:', error)
      
      if (error instanceof ApiError) {
        return {
          success: false,
          error: error.message,
          code: error.code,
        }
      }

      return {
        success: false,
        error: 'Failed to mark notification as read.',
        code: 'NOTIFICATION_UPDATE_ERROR',
      }
    }
  }
}

// Create and export singleton instance
const userService = new UserService()

export { userService, UserService }
export default userService
