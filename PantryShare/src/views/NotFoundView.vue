<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- Error Code -->
      <div>
        <h1 class="font-heading text-9xl font-bold text-primary-500">404</h1>
        <h2 class="mt-6 font-heading text-3xl font-bold text-neutral-800">
          Page not found
        </h2>
        <p class="mt-2 text-neutral-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
      </div>
      
      <!-- Illustration -->
      <div class="my-8">
        <div class="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
          <div class="text-center">
            <div class="text-6xl mb-4">🍕</div>
            <p class="text-gray-500 text-sm">
              This page seems to have been<br>
              rescued by someone else!
            </p>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/" class="ps-btn ps-btn--primary">
          <HomeIcon class="w-4 h-4 mr-2" />
          Go back home
        </router-link>
        <router-link to="/map" class="ps-btn ps-btn--secondary">
          <MapPinIcon class="w-4 h-4 mr-2" />
          Explore listings
        </router-link>
      </div>
      
      <!-- Help Text -->
      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          If you think this is a mistake, please 
          <router-link to="/contact" class="text-primary-500 hover:text-primary-600">
            contact us
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'
</script>
