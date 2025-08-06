<template>
  <div class="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="max-w-md w-full text-center space-y-8">
      <!-- Icon -->
      <div class="flex justify-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>

      <!-- Header -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">
          Access Denied
        </h1>
        <p class="text-lg text-gray-600">
          You don't have permission to access this page.
        </p>
      </div>

      <!-- Description -->
      <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <p class="text-gray-700 mb-4">
          This page requires additional permissions that your account doesn't currently have. 
          If you believe this is an error, please contact your administrator.
        </p>
      </div>

      <!-- Actions -->
      <div class="space-y-4">
        <router-link 
          to="/dashboard" 
          class="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Dashboard
        </router-link>

        <router-link 
          to="/" 
          class="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Home
        </router-link>
      </div>

      <!-- Contact -->
      <div class="pt-4">
        <p class="text-sm text-gray-500 mb-2">
          Need help?
        </p>
        <router-link 
          to="/contact" 
          class="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
        >
          Contact Support
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this simple error page
</script>
