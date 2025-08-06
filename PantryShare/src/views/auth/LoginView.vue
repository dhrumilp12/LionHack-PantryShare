<template>
  <div class="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-lg w-full space-y-10">
      <!-- Header -->
      <div class="text-center">
        <router-link to="/" class="inline-flex items-center space-x-4 mb-10 group">
          <img 
            src="/src/assets/Logo.png" 
            alt="PantryShare Logo" 
            class="w-14 h-14 rounded-xl shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300"
          />
          <span class="font-heading font-bold text-3xl text-gray-800 group-hover:text-green-600 transition-colors duration-300">PantryShare</span>
        </router-link>
        
        <div class="space-y-4">
          <h2 class="font-heading text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Welcome back
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
            Sign in to your account to continue rescuing food and making a difference
          </p>
        </div>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm">
        <div class="px-10 py-12 space-y-8">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Email -->
            <div class="space-y-3">
              <label for="email" class="block text-base font-semibold text-gray-700">
                Email address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                :class="{ 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50': errors.email }"
                placeholder="Enter your email address"
              />
              <p v-if="errors.email" class="mt-3 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div class="space-y-3">
              <label for="password" class="block text-base font-semibold text-gray-700">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="w-full px-5 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                  :class="{ 'border-red-300 focus:ring-red-100 focus:border-red-500 bg-red-50': errors.password }"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <EyeIcon v-if="!showPassword" class="h-6 w-6" />
                  <EyeSlashIcon v-else class="h-6 w-6" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-3 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                <svg class="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ errors.password }}
              </p>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between pt-2">
              <label class="flex items-center group cursor-pointer">
                <input
                  v-model="form.rememberMe"
                  type="checkbox"
                  class="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded-lg transition-colors duration-200"
                />
                <span class="ml-3 text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-200 font-medium">Remember me</span>
              </label>
              <router-link
                to="/forgot-password"
                class="text-base text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 hover:underline"
              >
                Forgot password?
              </router-link>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
                <span v-else>Sign in to PantryShare</span>
              </button>
            </div>

            <!-- General Error -->
            <div v-if="errors.general" class="rounded-2xl bg-red-50 border-2 border-red-200 p-5">
              <div class="flex">
                <XCircleIcon class="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div class="ml-4">
                  <h3 class="text-base font-bold text-red-800">
                    Sign in failed
                  </h3>
                  <div class="mt-2 text-base text-red-700">
                    {{ errors.general }}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Sign Up Link -->
      <div class="text-center pt-4">
        <p class="text-xl text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-green-600 hover:text-green-700 font-bold transition-colors duration-200 hover:underline ml-2">
            Sign up for free
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNotificationStore } from '@/stores/notifications'
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const { login, loading, error, clearError } = useAuth()
const notificationStore = useNotificationStore()

// State
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const errors = reactive({
  email: '',
  password: '',
  general: '',
})

// Methods
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  // Email validation
  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  clearError()
  errors.general = ''

  try {
    const result = await login({
      email: form.email,
      password: form.password,
    })

    if (result.success) {
      notificationStore.success('Welcome back!', 'Login successful')
      
      // Redirect to intended page or dashboard
      const redirectTo = router.currentRoute.value.query.redirect || '/dashboard'
      router.push(redirectTo)
    } else {
      errors.general = result.error || 'Invalid email or password'
      
      // Focus on the appropriate field based on error code
      if (result.code === 'USER_NOT_FOUND' || result.code === 'EMAIL_NOT_FOUND') {
        errors.email = 'No account found with this email address'
      } else if (result.code === 'INVALID_PASSWORD') {
        errors.password = 'Incorrect password'
      }
    }
  } catch (error) {
    errors.general = 'An unexpected error occurred. Please try again.'
    console.error('Login error:', error)
  }
}
</script>