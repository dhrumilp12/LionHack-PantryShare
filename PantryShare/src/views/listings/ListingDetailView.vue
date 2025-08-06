<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>

    <div v-else-if="!listing" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Listing Not Found</h1>
        <p class="mt-2 text-gray-600">The listing you're looking for doesn't exist or has been removed.</p>
        <router-link
          to="/listings"
          class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Back to Listings
        </router-link>
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <div class="mb-6">
        <button
          @click="$router.go(-1)"
          class="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Image -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <img
              :src="listing.imageUrl"
              :alt="listing.title"
              class="w-full h-64 object-cover"
            />
          </div>

          <!-- Details -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {{ formatCategory(listing.category) }}
              </span>
              <span class="text-sm text-gray-500">{{ formatDate(listing.createdAt) }}</span>
            </div>

            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ listing.title }}</h1>
            
            <p class="text-gray-700 mb-6 whitespace-pre-line">{{ listing.description }}</p>

            <!-- Key Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Serves</p>
                  <p class="font-medium text-gray-900">{{ listing.servings }} people</p>
                </div>
              </div>

              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Pickup By</p>
                  <p class="font-medium text-gray-900">{{ formatPickupTime(listing.pickupBy) }}</p>
                </div>
              </div>

              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Location</p>
                  <p class="font-medium text-gray-900">{{ listing.location }}</p>
                </div>
              </div>

              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Donated By</p>
                  <p class="font-medium text-gray-900">{{ listing.donorName }}</p>
                </div>
              </div>
            </div>

            <!-- Dietary Information -->
            <div v-if="listing.isVegetarian || listing.isVegan" class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Dietary Information</h3>
              <div class="flex space-x-2">
                <span
                  v-if="listing.isVegetarian"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Vegetarian
                </span>
                <span
                  v-if="listing.isVegan"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Vegan
                </span>
              </div>
            </div>

            <!-- Pickup Instructions -->
            <div v-if="listing.pickupInstructions" class="mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Pickup Instructions</h3>
              <p class="text-gray-700 whitespace-pre-line">{{ listing.pickupInstructions }}</p>
            </div>

            <!-- Transport Notice -->
            <div v-if="listing.requiresTransport" class="mb-6">
              <div class="rounded-md bg-blue-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-blue-800">
                      Transportation Required
                    </h3>
                    <div class="mt-2 text-sm text-blue-700">
                      This listing requires volunteer transportation assistance. Please coordinate with the donor for pickup and delivery arrangements.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Action Card -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div class="text-center mb-4">
              <div class="text-2xl font-bold text-gray-900 mb-2">
                {{ listing.status === 'available' ? 'Available' : 'Claimed' }}
              </div>
              <div v-if="listing.status === 'available'" class="text-green-600 text-sm">
                Ready for pickup
              </div>
              <div v-else class="text-orange-600 text-sm">
                This item has been claimed
              </div>
            </div>

            <div v-if="listing.status === 'available'" class="space-y-3">
              <button
                @click="claimListing"
                :disabled="claiming"
                class="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {{ claiming ? 'Claiming...' : 'Claim This Food' }}
              </button>
              
              <button
                @click="contactDonor"
                class="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Contact Donor
              </button>
            </div>

            <div v-else class="text-center">
              <p class="text-sm text-gray-500">This listing is no longer available</p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Contact Name</p>
                  <p class="font-medium text-gray-900">{{ listing.donorName }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-500">Phone</p>
                  <p class="font-medium text-gray-900">{{ listing.contactPhone || 'Available after claiming' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'

const route = useRoute()
const router = useRouter()
const listingsStore = useListingsStore()

const loading = ref(true)
const claiming = ref(false)

const listing = computed(() => {
  return listingsStore.listings.find(l => l.id === route.params.id)
})

const formatCategory = (category) => {
  const categories = {
    prepared: 'Prepared Food',
    produce: 'Fresh Produce',
    bakery: 'Bakery Items',
    packaged: 'Packaged Goods',
    dairy: 'Dairy Products'
  }
  return categories[category] || category
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatPickupTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const claimListing = async () => {
  claiming.value = true
  try {
    await listingsStore.claimListing(route.params.id)
    // Show success message
    alert('Listing claimed successfully! The donor will be notified.')
  } catch (error) {
    console.error('Failed to claim listing:', error)
    alert('Failed to claim listing. Please try again.')
  } finally {
    claiming.value = false
  }
}

const contactDonor = () => {
  // In a real app, this would open a messaging interface
  if (listing.value?.contactPhone) {
    window.location.href = `tel:${listing.value.contactPhone}`
  } else {
    alert('Contact information will be available after claiming the listing.')
  }
}

onMounted(async () => {
  try {
    // Load listings if not already loaded
    if (listingsStore.listings.length === 0) {
      await listingsStore.fetchListings()
    }
    
    // If listing not found, it will show the not found message
    
  } catch (error) {
    console.error('Failed to load listing:', error)
  } finally {
    loading.value = false
  }
})
</script>
