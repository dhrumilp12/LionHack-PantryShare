<template>
  <div class="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-lg w-full space-y-10">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center space-x-4 pb-10 group">
          <img 
            src="/src/assets/Logo.png" 
            alt="PantryShare Logo" 
            class="w-14 h-14 rounded-xl shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300"
          />
          <span class="font-heading font-bold text-3xl text-gray-800 group-hover:text-green-600 transition-colors duration-300">PantryShare</span>
        </router-link>
        
        <div class="space-y-4">
          <h2 class="font-heading text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Reset Password
          </h2>
          <p class="text-xl pb-8 text-gray-600 leading-relaxed max-w-md mx-auto">
            Enter your new password below. Make sure it's secure and easy for you to remember.
          </p>
        </div>
      </div>

      <!-- Form Container -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm">
        <div class="px-10 py-12 space-y-8">
          <!-- Loading State -->
          <div v-if="validatingToken" class="text-center space-y-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p class="text-gray-600">Validating reset token...</p>
          </div>

          <!-- Invalid Token -->
          <div v-else-if="tokenError" class="rounded-2xl bg-red-50 border-2 border-red-200 p-5">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-bold text-red-800">
                  Invalid or Expired Link
                </h3>
                <div class="mt-2 text-base text-red-700">
                  {{ tokenError }}
                </div>
                <div class="mt-4">
                  <router-link 
                    to="/auth/forgot-password" 
                    class="inline-flex items-center text-red-600 hover:text-red-700 font-semibold"
                  >
                    Request a new reset link
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-else-if="error" class="rounded-2xl bg-red-50 border-2 border-red-200 p-5">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-bold text-red-800">
                  Error
                </h3>
                <div class="mt-2 text-base text-red-700">
                  {{ error }}
                </div>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-else-if="success" class="rounded-2xl bg-green-50 border-2 border-green-200 p-5">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-bold text-green-800">
                  Password Reset Successful!
                </h3>
                <div class="mt-2 text-base text-green-700">
                  Your password has been successfully reset. You can now login with your new password.
                </div>
                <div class="mt-4">
                  <router-link 
                    to="/auth/login" 
                    class="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold"
                  >
                    Go to Login
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Reset Form -->
          <form v-else-if="tokenValid && !success" @submit.prevent="handleResetPassword" class="space-y-8">
            <!-- Token Info -->
            <div class="bg-blue-50 rounded-2xl border-2 border-blue-100 p-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-blue-700 text-sm">
                  Resetting password for: <strong>{{ tokenData?.email }}</strong>
                </p>
              </div>
            </div>

            <!-- New Password Input -->
            <div class="space-y-3">
              <label for="newPassword" class="block text-base font-semibold text-gray-700">
                New Password
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                  placeholder="Enter your new password"
                  minlength="8"
                />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <svg v-if="showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p class="text-sm text-gray-500">Password must be at least 8 characters long</p>
            </div>

            <!-- Confirm Password Input -->
            <div class="space-y-3">
              <label for="confirmPassword" class="block text-base font-semibold text-gray-700">
                Confirm New Password
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full px-5 py-4 pl-12 pr-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                  placeholder="Confirm your new password"
                  minlength="8"
                />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <svg v-if="showConfirmPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="loading || !passwordsMatch"
                class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting Password...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Reset Password
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Sign In Link -->
      <div class="text-center py-8">
        <p class="text-xl text-gray-600">
          Remember your password?
          <router-link 
            to="/auth/login" 
            class="text-green-600 hover:text-green-700 font-bold transition-colors duration-200 hover:underline ml-2"
          >
            Sign in here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import apiClient from '@/services/api'

const route = useRoute()
const { loading } = useAuth()

// Form state
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Component state
const validatingToken = ref(true)
const tokenValid = ref(false)
const tokenData = ref(null)
const tokenError = ref('')
const error = ref('')
const success = ref(false)

// Computed properties
const passwordsMatch = computed(() => {
  return newPassword.value && confirmPassword.value && newPassword.value === confirmPassword.value
})

// Validate token on mount
onMounted(async () => {
  // Get token from route params or query params
  const token = route.params.token || route.query.token
  
  if (!token) {
    tokenError.value = 'No reset token provided'
    validatingToken.value = false
    return
  }
  
  try {
    // Add timestamp to prevent caching and clear any previous errors
    error.value = ''
    tokenError.value = ''
    
    const response = await apiClient.get(`/auth/validate-reset-token/${token}`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      },
      // Add timestamp to URL to prevent caching
      params: { t: Date.now() }
    })
    
    if (response.data.success) {
      tokenValid.value = true
      tokenData.value = response.data.data
      console.log('Token validation successful:', response.data)
    } else {
      tokenError.value = response.data.message || 'Invalid reset token'
    }
  } catch (err) {
    console.error('Token validation error:', err)
    tokenError.value = err.response?.data?.message || 'Failed to validate reset token'
  } finally {
    validatingToken.value = false
  }
})

const handleResetPassword = async () => {
  error.value = ''
  
  // Validation
  if (!newPassword.value) {
    error.value = 'Please enter your new password'
    return
  }
  
  if (newPassword.value.length < 8) {
    error.value = 'Password must be at least 8 characters long'
    return
  }
  
  if (!confirmPassword.value) {
    error.value = 'Please confirm your new password'
    return
  }
  
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  
  try {
    const response = await apiClient.post('/auth/reset-password', {
      token: route.params.token || route.query.token,
      newPassword: newPassword.value
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    
    if (response.data.success) {
      success.value = true
      console.log('Password reset successful')
    } else {
      error.value = response.data.message || 'Failed to reset password'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to reset password. Please try again.'
    console.error('Reset password error:', err)
  }
}
</script>
