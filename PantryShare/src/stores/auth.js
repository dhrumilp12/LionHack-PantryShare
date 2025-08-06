import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/auth.js'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(authService.getToken())
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role || null)
  const userName = computed(() => {
    if (!user.value) return null
    return `${user.value.firstName} ${user.value.lastName}`.trim()
  })

  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.login(credentials)
      
      if (result.success) {
        token.value = result.token
        user.value = result.user
        authService.setToken(result.token)
        
        return { success: true }
      } else {
        error.value = result.error
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      const errorMessage = 'Login failed. Please try again.'
      error.value = errorMessage
      console.error('Login error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'LOGIN_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.register(userData)
      
      if (result.success) {
        token.value = result.token
        user.value = result.user
        authService.setToken(result.token)
        
        return { success: true }
      } else {
        error.value = result.error
        return { 
          success: false, 
          error: result.error,
          code: result.code,
          details: result.details 
        }
      }
    } catch (err) {
      const errorMessage = 'Registration failed. Please try again.'
      error.value = errorMessage
      console.error('Registration error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'REGISTRATION_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const firebaseLogin = async (idToken) => {
    loading.value = true
    error.value = null
    
    try {
      const result = await authService.firebaseLogin(idToken)
      
      if (result.success) {
        token.value = result.token
        user.value = result.user
        authService.setToken(result.token)
        
        return { success: true }
      } else {
        error.value = result.error
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      const errorMessage = 'Firebase login failed. Please try again.'
      error.value = errorMessage
      console.error('Firebase login error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'FIREBASE_LOGIN_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
      // Continue with logout even if server request fails
    } finally {
      // Clear local state regardless of server response
      user.value = null
      token.value = null
      error.value = null
      authService.clearAuth()
      loading.value = false
    }
  }

  const loadUserProfile = async () => {
    if (!token.value) return { success: false, error: 'No token available' }

    loading.value = true
    error.value = null

    try {
      const result = await authService.validateToken()
      
      if (result.success) {
        user.value = result.user
        return { success: true }
      } else {
        // Token is invalid, clear auth state
        await logout()
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
      // If token validation fails, logout user
      await logout()
      
      return { 
        success: false, 
        error: 'Session expired. Please login again.',
        code: 'TOKEN_VALIDATION_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async (updates) => {
    if (!user.value) {
      return { success: false, error: 'No user logged in' }
    }

    loading.value = true
    error.value = null

    try {
      // This would typically make an API call to update profile
      // For now, we'll implement a placeholder that updates local state
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local user state
      user.value = { ...user.value, ...updates }
      
      return { success: true }
    } catch (err) {
      const errorMessage = 'Failed to update profile. Please try again.'
      error.value = errorMessage
      console.error('Error updating profile:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'PROFILE_UPDATE_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const refreshToken = async () => {
    if (!token.value) return { success: false, error: 'No token to refresh' }

    try {
      const result = await authService.refreshToken()
      
      if (result.success) {
        token.value = result.token
        if (result.user) {
          user.value = result.user
        }
        authService.setToken(result.token)
        
        return { success: true }
      } else {
        // Refresh failed, logout user
        await logout()
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      console.error('Token refresh error:', err)
      // Refresh failed, logout user
      await logout()
      
      return { 
        success: false, 
        error: 'Session expired. Please login again.',
        code: 'TOKEN_REFRESH_ERROR'
      }
    }
  }

  const forgotPassword = async (email) => {
    loading.value = true
    error.value = null

    try {
      const result = await authService.forgotPassword(email)
      
      if (result.success) {
        return { 
          success: true, 
          message: result.message 
        }
      } else {
        error.value = result.error
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to send reset email. Please try again.'
      error.value = errorMessage
      console.error('Forgot password error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'FORGOT_PASSWORD_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (token, newPassword) => {
    loading.value = true
    error.value = null

    try {
      const result = await authService.resetPassword(token, newPassword)
      
      if (result.success) {
        return { 
          success: true, 
          message: result.message 
        }
      } else {
        error.value = result.error
        return { 
          success: false, 
          error: result.error,
          code: result.code 
        }
      }
    } catch (err) {
      const errorMessage = 'Failed to reset password. Please try again.'
      error.value = errorMessage
      console.error('Reset password error:', err)
      
      return { 
        success: false, 
        error: errorMessage,
        code: 'RESET_PASSWORD_ERROR'
      }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  // Initialize auth state on store creation
  const initializeAuth = async () => {
    if (token.value) {
      await loadUserProfile()
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Computed
    isAuthenticated,
    userRole,
    userName,
    
    // Actions
    login,
    register,
    firebaseLogin,
    logout,
    loadUserProfile,
    updateProfile,
    refreshToken,
    forgotPassword,
    resetPassword,
    clearError,
    initializeAuth,
  }
})
