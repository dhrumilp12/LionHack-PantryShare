/**
 * User Store
 * Manages user profile state and operations
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import userService from '@/services/user.js'
import { useAuthStore } from './auth.js'
import { useNotificationStore } from './notifications.js'

export const useUserStore = defineStore('user', () => {
  // State
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const uploadProgress = ref(0)
  const isUploading = ref(false)

  // Computed
  const fullName = computed(() => {
    if (!profile.value) return ''
    return `${profile.value.firstName || ''} ${profile.value.lastName || ''}`.trim()
  })

  const displayName = computed(() => {
    if (!profile.value) return 'User'
    return profile.value.firstName || profile.value.email || 'User'
  })

  const hasCompleteProfile = computed(() => {
    if (!profile.value) return false
    return !!(
      profile.value.firstName &&
      profile.value.lastName &&
      profile.value.email
    )
  })

  const userStats = computed(() => {
    return profile.value?.stats || {
      totalListings: 0,
      totalPickups: 0,
      impactScore: 0,
      rating: 5.0
    }
  })

  // Actions
  const loadProfile = async (forceRefresh = false) => {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    // Return cached profile unless force refresh
    if (profile.value && !forceRefresh) {
      return { success: true, user: profile.value }
    }

    loading.value = true
    error.value = null

    try {
      const result = await userService.getProfile()
      
      if (result.success) {
        profile.value = result.user
        
        // Update auth store user data if different
        if (authStore.user?.id === result.user.id) {
          authStore.user = { ...authStore.user, ...result.user }
        }
        
        return { success: true, user: result.user }
      } else {
        error.value = result.error
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to load profile. Please try again.'
      error.value = errorMessage
      console.error('Load profile error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'PROFILE_LOAD_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (updates) => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    loading.value = true
    error.value = null

    try {
      const result = await userService.updateProfile(updates)
      
      if (result.success) {
        profile.value = result.user
        
        // Update auth store user data
        if (authStore.user?.id === result.user.id) {
          authStore.user = { ...authStore.user, ...result.user }
        }

        notificationStore.success('Profile Updated', result.message || 'Your profile has been updated successfully.')
        
        return { success: true, user: result.user }
      } else {
        error.value = result.error
        notificationStore.error('Update Failed', result.error)
        
        return { 
          success: false, 
          error: result.error,
          code: result.code,
          details: result.details
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to update profile. Please try again.'
      error.value = errorMessage
      notificationStore.error('Update Failed', errorMessage)
      console.error('Update profile error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'PROFILE_UPDATE_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const updateLocation = async (locationData) => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    loading.value = true
    error.value = null

    try {
      const result = await userService.updateLocation(locationData)
      
      if (result.success) {
        // Update profile with new location data
        if (profile.value) {
          profile.value = {
            ...profile.value,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            address: locationData.address
          }
        }

        notificationStore.success('Location Updated', result.message || 'Your location has been updated successfully.')
        
        return { success: true }
      } else {
        error.value = result.error
        notificationStore.error('Update Failed', result.error)
        
        return { 
          success: false, 
          error: result.error,
          code: result.code
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to update location. Please try again.'
      error.value = errorMessage
      notificationStore.error('Update Failed', errorMessage)
      console.error('Update location error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'LOCATION_UPDATE_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const updatePreferences = async (preferences) => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    loading.value = true
    error.value = null

    try {
      const result = await userService.updatePreferences(preferences)
      
      if (result.success) {
        profile.value = result.user

        // Update auth store user data
        if (authStore.user?.id === result.user.id) {
          authStore.user = { ...authStore.user, ...result.user }
        }

        notificationStore.success('Preferences Updated', result.message || 'Your preferences have been updated successfully.')
        
        return { success: true, user: result.user }
      } else {
        error.value = result.error
        notificationStore.error('Update Failed', result.error)
        
        return { 
          success: false, 
          error: result.error,
          code: result.code
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to update preferences. Please try again.'
      error.value = errorMessage
      notificationStore.error('Update Failed', errorMessage)
      console.error('Update preferences error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'PREFERENCES_UPDATE_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const uploadProfileImage = async (file) => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    console.log('User store: Starting image upload for file:', file.name)

    isUploading.value = true
    uploadProgress.value = 0
    error.value = null

    try {
      const result = await userService.uploadProfileImage(
        file,
        (progress) => {
          uploadProgress.value = progress
          console.log('Upload progress:', progress + '%')
        }
      )
      
      console.log('User store: Upload service result:', result)
      
      if (result.success) {
        // Update profile with new image URL
        if (profile.value) {
          profile.value = {
            ...profile.value,
            profileImage: result.imageUrl
          }
        }

        // Update auth store user data
        if (authStore.user) {
          authStore.user = {
            ...authStore.user,
            profileImage: result.imageUrl
          }
        }

        notificationStore.success('Image Uploaded', result.message || 'Your profile image has been updated successfully.')
        
        return { success: true, imageUrl: result.imageUrl }
      } else {
        error.value = result.error
        notificationStore.error('Upload Failed', result.error)
        
        return { 
          success: false, 
          error: result.error,
          code: result.code
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to upload image. Please try again.'
      error.value = errorMessage
      notificationStore.error('Upload Failed', errorMessage)
      console.error('Upload image error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'IMAGE_UPLOAD_ERROR'
      }
    } finally {
      isUploading.value = false
      uploadProgress.value = 0
    }
  }

  const deactivateAccount = async () => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    loading.value = true
    error.value = null

    try {
      const result = await userService.deactivateAccount()
      
      if (result.success) {
        notificationStore.success('Account Deactivated', result.message || 'Your account has been deactivated.')
        
        return { success: true }
      } else {
        error.value = result.error
        notificationStore.error('Deactivation Failed', result.error)
        
        return { 
          success: false, 
          error: result.error,
          code: result.code
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to deactivate account. Please try again.'
      error.value = errorMessage
      notificationStore.error('Deactivation Failed', errorMessage)
      console.error('Deactivate account error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'ACCOUNT_DEACTIVATE_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const reactivateAccount = async () => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    if (!authStore.isAuthenticated) {
      error.value = 'User not authenticated'
      return { success: false, error: 'User not authenticated' }
    }

    loading.value = true
    error.value = null

    try {
      const result = await userService.reactivateAccount()
      
      if (result.success) {
        notificationStore.success('Account Reactivated', result.message || 'Your account has been reactivated.')
        
        return { success: true }
      } else {
        error.value = result.error
        notificationStore.error('Reactivation Failed', result.error)
        
        return { 
          success: false, 
          error: result.error,
          code: result.code
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to reactivate account. Please try again.'
      error.value = errorMessage
      notificationStore.error('Reactivation Failed', errorMessage)
      console.error('Reactivate account error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'ACCOUNT_REACTIVATE_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    profile.value = null
    loading.value = false
    error.value = null
    uploadProgress.value = 0
    isUploading.value = false
  }

  return {
    // State
    profile,
    loading,
    error,
    uploadProgress,
    isUploading,
    
    // Computed
    fullName,
    displayName,
    hasCompleteProfile,
    userStats,
    
    // Actions
    loadProfile,
    updateProfile,
    updateLocation,
    updatePreferences,
    uploadProfileImage,
    deactivateAccount,
    reactivateAccount,
    clearError,
    resetState,
  }
})
