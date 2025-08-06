/**
 * Auth Composable
 * Provides authentication utilities and automatic token management
 */

import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  // Computed properties
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.error)
  const userRole = computed(() => authStore.userRole)
  const userName = computed(() => authStore.userName)

  // Auto token refresh interval
  let refreshInterval = null

  /**
   * Initialize authentication
   */
  const initAuth = async () => {
    await authStore.initializeAuth()
    
    // Set up automatic token refresh (refresh every 6 hours)
    if (authStore.isAuthenticated) {
      setupTokenRefresh()
    }
  }

  /**
   * Setup automatic token refresh
   */
  const setupTokenRefresh = () => {
    // Clear existing interval
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }

    // Refresh token every 6 hours (6 * 60 * 60 * 1000 ms)
    refreshInterval = setInterval(async () => {
      if (authStore.isAuthenticated) {
        const result = await authStore.refreshToken()
        if (!result.success) {
          console.warn('Token refresh failed:', result.error)
          // Redirect to login if refresh fails
          await redirectToLogin()
        }
      }
    }, 6 * 60 * 60 * 1000)
  }

  /**
   * Clear token refresh interval
   */
  const clearTokenRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval)
      refreshInterval = null
    }
  }

  /**
   * Login wrapper
   */
  const login = async (credentials) => {
    const result = await authStore.login(credentials)
    
    if (result.success) {
      setupTokenRefresh()
    }
    
    return result
  }

  /**
   * Register wrapper
   */
  const register = async (userData) => {
    const result = await authStore.register(userData)
    
    if (result.success) {
      setupTokenRefresh()
    }
    
    return result
  }

  /**
   * Logout wrapper
   */
  const logout = async () => {
    clearTokenRefresh()
    await authStore.logout()
    
    // Redirect to home page after logout
    router.push('/')
  }

  /**
   * Redirect to login page
   */
  const redirectToLogin = async (redirectPath = null) => {
    clearTokenRefresh()
    await authStore.logout()
    
    const query = redirectPath ? { redirect: redirectPath } : {}
    router.push({ name: 'login', query })
  }

  /**
   * Check if user has specific role
   */
  const hasRole = (role) => {
    return authStore.userRole === role
  }

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = (roles) => {
    return roles.includes(authStore.userRole)
  }

  /**
   * Check if user is admin (any admin role)
   */
  const isAdmin = computed(() => {
    const adminRoles = ['shelter_admin', 'school_admin', 'super_admin']
    return adminRoles.includes(authStore.userRole)
  })

  /**
   * Check if user is super admin
   */
  const isSuperAdmin = computed(() => authStore.userRole === 'super_admin')

  /**
   * Guard function for protected routes
   */
  const requireAuth = () => {
    if (!authStore.isAuthenticated) {
      redirectToLogin(router.currentRoute.value.fullPath)
      return false
    }
    return true
  }

  /**
   * Guard function for admin routes
   */
  const requireAdmin = () => {
    if (!authStore.isAuthenticated) {
      redirectToLogin(router.currentRoute.value.fullPath)
      return false
    }
    
    if (!isAdmin.value) {
      router.push('/unauthorized')
      return false
    }
    
    return true
  }

  /**
   * Clear auth error
   */
  const clearError = () => {
    authStore.clearError()
  }

  // Lifecycle
  onMounted(async () => {
    await initAuth()
  })

  onUnmounted(() => {
    clearTokenRefresh()
  })

  return {
    // State
    isAuthenticated,
    user,
    loading,
    error,
    userRole,
    userName,
    isAdmin,
    isSuperAdmin,

    // Actions
    login,
    register,
    logout,
    redirectToLogin,
    clearError,

    // Utilities
    hasRole,
    hasAnyRole,
    requireAuth,
    requireAdmin,
    initAuth,

    // Store methods
    updateProfile: authStore.updateProfile,
    forgotPassword: authStore.forgotPassword,
    resetPassword: authStore.resetPassword,
    firebaseLogin: authStore.firebaseLogin,
  }
}

/**
 * Route guard for authentication
 */
export const authGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

/**
 * Route guard for admin access
 */
export const adminGuard = (to, from, next) => {
  const authStore = useAuthStore()
  const adminRoles = ['shelter_admin', 'school_admin', 'super_admin']
  
  if (!authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  } else if (!adminRoles.includes(authStore.userRole)) {
    next('/unauthorized')
  } else {
    next()
  }
}

/**
 * Route guard for guest users (redirects authenticated users)
 */
export const guestGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
}
