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
            Forgot Password?
          </h2>
          <p class="text-xl pb-8 text-gray-600 leading-relaxed max-w-md mx-auto">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      <!-- Form Container -->
      <div class="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-sm">
        <div class="px-10 py-12 space-y-8">
          <!-- Error Message -->
          <div v-if="error" class="rounded-2xl bg-red-50 border-2 border-red-200 p-5">
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
          <div v-if="success" class="rounded-2xl bg-green-50 border-2 border-green-200 p-5">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-bold text-green-800">
                  Email sent successfully!
                </h3>
                <div class="mt-2 text-base text-green-700">
                  Check your email for password reset instructions. If you don't see the email, check your spam folder.
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleForgotPassword" class="space-y-8">
            <!-- Email Input -->
            <div v-if="!success" class="space-y-3">
              <label for="email" class="block text-base font-semibold text-gray-700">
                Email Address
              </label>
              <div class="relative">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                  placeholder="Enter your email address"
                />
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div v-if="!success" class="pt-4">
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
                  Sending Reset Link...
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Reset Link
                </span>
              </button>
            </div>

            <!-- Success Actions -->
            <div v-if="success" class="space-y-4 pt-4">
              <router-link 
                to="/auth/login" 
                class="w-full inline-flex items-center justify-center py-5 px-8 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200"
              >
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Back to Login
              </router-link>
              
              <button
                @click="success = false; email = ''; error = ''"
                class="w-full inline-flex items-center justify-center py-4 px-6 border-2 border-gray-200 text-gray-700 font-semibold text-lg rounded-2xl hover:bg-gray-50 hover:border-gray-300 transform hover:scale-[1.02] transition-all duration-200"
              >
                Send Another Email
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

      <!-- Help Section -->
      <div class="bg-blue-50 rounded-2xl border-2 border-blue-100 p-6 text-center">
        <div class="flex items-center justify-center mb-4">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 class="font-heading font-bold text-lg text-blue-800 mb-2">
          Need Help?
        </h3>
        <p class="text-blue-700 mb-4">
          If you're having trouble with password reset, our support team is here to help.
        </p>
        <router-link 
          to="/contact" 
          class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
        >
          Contact Support
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { forgotPassword, loading } = useAuth()

const email = ref('')
const error = ref('')
const success = ref(false)

const handleForgotPassword = async () => {
  error.value = ''
  
  // Basic email validation
  if (!email.value) {
    error.value = 'Please enter your email address'
    return
  }
  
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    error.value = 'Please enter a valid email address'
    return
  }
  
  try {
    const result = await forgotPassword(email.value)
    
    if (result.success) {
      success.value = true
    } else {
      error.value = result.error || 'Failed to send reset email. Please try again.'
    }
  } catch (err) {
    error.value = err.message || 'Failed to send reset email. Please try again.'
    console.error('Forgot password error:', err)
  }
}
</script>