<template>
  <div class="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-2xl w-full space-y-10">
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
            Join PantryShare
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
            Create your account and start making a difference in your community
          </p>
        </div>
      </div>

      <!-- Registration Form -->
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
                  Registration failed
                </h3>
                <div class="mt-2 text-base text-red-700">
                  {{ error }}
                </div>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-8">
            <!-- Name Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label for="firstName" class="block text-base font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': validationErrors.firstName }"
                  placeholder="John"
                />
                <p v-if="validationErrors.firstName" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ validationErrors.firstName }}
                </p>
              </div>
              <div class="space-y-3">
                <label for="lastName" class="block text-base font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': validationErrors.lastName }"
                  placeholder="Doe"
                />
                <p v-if="validationErrors.lastName" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ validationErrors.lastName }}
                </p>
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-3">
              <label for="email" class="block text-base font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': validationErrors.email }"
                placeholder="john@example.com"
              />
              <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ validationErrors.email }}
              </p>
            </div>

            <!-- Phone -->
            <div class="space-y-3">
              <label for="phone" class="block text-base font-semibold text-gray-700">
                Phone Number <span class="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': validationErrors.phone }"
                placeholder="+1 (555) 123-4567"
              />
              <p v-if="validationErrors.phone" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ validationErrors.phone }}
              </p>
            </div>

            <!-- Password Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label for="password" class="block text-base font-semibold text-gray-700">
                  Password
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="w-full px-5 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': validationErrors.password }"
                    placeholder="Create password"
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
                <p v-if="validationErrors.password" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ validationErrors.password }}
                </p>
              </div>
              <div class="space-y-3">
                <label for="confirmPassword" class="block text-base font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div class="relative">
                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    required
                    class="w-full px-5 py-4 pr-14 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg bg-gray-50 hover:bg-white hover:border-gray-300"
                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-100': validationErrors.confirmPassword }"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <EyeIcon v-if="!showConfirmPassword" class="h-6 w-6" />
                    <EyeSlashIcon v-else class="h-6 w-6" />
                  </button>
                </div>
                <p v-if="validationErrors.confirmPassword" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                  <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  {{ validationErrors.confirmPassword }}
                </p>
              </div>
            </div>

            <!-- User Type -->
            <div class="space-y-3">
              <label for="role" class="block text-base font-semibold text-gray-700">
                I want to
              </label>
              <select
                id="role"
                v-model="form.role"
                required
                class="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-gray-900 text-lg bg-gray-50 hover:bg-white hover:border-gray-300 cursor-pointer"
              >
                <option value="" disabled class="text-gray-400">Select how you'd like to help</option>
                <option value="student">🎓 Student (Create/Receive food listings)</option>
                <option value="volunteer">🚚 Volunteer (Help with food rescue)</option>
                <option value="shelter_admin">🏠 Shelter Admin (Manage shelter operations)</option>
                <option value="school_admin">🏫 School Admin (Manage school food programs)</option>
              </select>
            </div>
            <p v-if="validationErrors.role" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
              <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              {{ validationErrors.role }}
            </p>

            <!-- Terms Agreement -->
            <div class="pt-4">
              <label class="flex items-start group cursor-pointer">
                <input
                  id="agree-terms"
                  v-model="form.agreeTerms"
                  type="checkbox"
                  required
                  class="h-5 w-5 text-green-500 focus:ring-green-500 border-gray-300 rounded-lg transition-colors duration-200 mt-1 flex-shrink-0"
                  :class="{ 'border-red-300': validationErrors.agreeTerms }"
                />
                <span class="ml-4 text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                  I agree to the 
                  <router-link to="/terms" class="text-green-600 hover:text-green-700 font-semibold underline">
                    Terms of Service
                  </router-link> 
                  and 
                  <router-link to="/privacy" class="text-green-600 hover:text-green-700 font-semibold underline">
                    Privacy Policy
                  </router-link>
                </span>
              </label>
              <p v-if="validationErrors.agreeTerms" class="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-3 rounded-xl border border-red-200">
                <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                {{ validationErrors.agreeTerms }}
              </p>
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
                  Creating your account...
                </span>
                <span v-else>Create PantryShare Account</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Sign In Link -->
      <div class="text-center py-8">
        <p class="text-xl text-gray-600">
          Already have an account?
          <router-link 
            to="/auth/login" 
            class="text-green-600 hover:text-green-700 font-bold transition-colors duration-200 hover:underline ml-2"
          >
            Sign in here
          </router-link>
        </p>
      </div>

      <!-- Additional Info -->
      <div class="bg-green-50 rounded-2xl border-2 border-green-100 p-6 text-center">
        <h3 class="font-heading font-bold text-lg text-green-800 mb-3">
          Join thousands making a difference
        </h3>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-green-600">15K+</div>
            <div class="text-sm text-green-700">Meals Rescued</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600">39K kg</div>
            <div class="text-sm text-green-700">CO₂ Saved</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-green-600">2K+</div>
            <div class="text-sm text-green-700">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNotificationStore } from '@/stores/notifications'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { register, loading, error } = useAuth()
const notificationStore = useNotificationStore()

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
  agreeTerms: false
})

const errors = reactive({
  general: '',
  validation: null
})

// Computed validation messages
const validationErrors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
  agreeTerms: ''
})

const validateForm = () => {
  // Clear previous errors
  Object.keys(validationErrors).forEach(key => {
    validationErrors[key] = ''
  })
  
  let isValid = true

  // First name validation
  if (!form.firstName.trim()) {
    validationErrors.firstName = 'First name is required'
    isValid = false
  } else if (form.firstName.trim().length < 2) {
    validationErrors.firstName = 'First name must be at least 2 characters'
    isValid = false
  }

  // Last name validation
  if (!form.lastName.trim()) {
    validationErrors.lastName = 'Last name is required'
    isValid = false
  } else if (form.lastName.trim().length < 2) {
    validationErrors.lastName = 'Last name must be at least 2 characters'
    isValid = false
  }

  // Email validation
  if (!form.email) {
    validationErrors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    validationErrors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Phone validation (optional but format check if provided)
  if (form.phone && !/^\+?[\d\s\-\(\)]+$/.test(form.phone)) {
    validationErrors.phone = 'Please enter a valid phone number'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    validationErrors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    validationErrors.password = 'Password must be at least 6 characters long'
    isValid = false
  }

  // Confirm password validation
  if (!form.confirmPassword) {
    validationErrors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (form.password !== form.confirmPassword) {
    validationErrors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  // Role validation
  if (!form.role) {
    validationErrors.role = 'Please select your role'
    isValid = false
  }

  // Terms validation
  if (!form.agreeTerms) {
    validationErrors.agreeTerms = 'You must agree to the Terms of Service and Privacy Policy'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  errors.general = ''
  errors.validation = null
  
  if (!validateForm()) {
    return
  }

  try {
    const result = await register({
      email: form.email,
      password: form.password,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim() || undefined,
      role: form.role,
    })
    
    if (result.success) {
      notificationStore.success('Welcome to PantryShare!', 'Registration successful')
      router.push('/dashboard')
    } else {
      errors.general = result.error || 'Registration failed. Please try again.'
      
      // Handle validation errors from server
      if (result.details && Array.isArray(result.details)) {
        result.details.forEach(detail => {
          if (detail.path && validationErrors.hasOwnProperty(detail.path)) {
            validationErrors[detail.path] = detail.msg
          }
        })
      }
      
      // Handle specific error codes
      if (result.code === 'EMAIL_ALREADY_EXISTS') {
        validationErrors.email = 'An account with this email already exists'
      }
    }
  } catch (err) {
    errors.general = err.message || 'Registration failed. Please try again.'
    console.error('Registration error:', err)
  }
}
</script>