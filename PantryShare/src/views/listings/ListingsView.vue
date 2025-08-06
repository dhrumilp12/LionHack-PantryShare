<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Food Listings</h1>
          <p class="mt-2 text-gray-600">Discover available food in your community</p>
        </div>
        <router-link
          to="/listings/create"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Listing
        </router-link>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              id="search"
              v-model="filters.search"
              type="text"
              placeholder="Search listings..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              v-model="filters.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Categories</option>
              <option value="prepared">Prepared Food</option>
              <option value="produce">Fresh Produce</option>
              <option value="bakery">Bakery Items</option>
              <option value="packaged">Packaged Goods</option>
              <option value="dairy">Dairy Products</option>
            </select>
          </div>
          <div>
            <label for="distance" class="block text-sm font-medium text-gray-700 mb-1">
              Distance
            </label>
            <select
              id="distance"
              v-model="filters.distance"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Distance</option>
              <option value="1">Within 1 mile</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
            </select>
          </div>
          <div>
            <label for="pickup" class="block text-sm font-medium text-gray-700 mb-1">
              Pickup Time
            </label>
            <select
              id="pickup"
              v-model="filters.pickupTime"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Listings Grid -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>

      <div v-else-if="filteredListings.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-4.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">No listings found</h3>
        <p class="mt-1 text-gray-500">Try adjusting your search criteria or create a new listing.</p>
        <div class="mt-6">
          <router-link
            to="/listings/create"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Create Your First Listing
          </router-link>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="listing in filteredListings"
          :key="listing.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          @click="$router.push(`/listings/${listing.id}`)"
        >
          <div class="aspect-w-16 aspect-h-9">
            <img
              :src="listing.imageUrl"
              :alt="listing.title"
              class="w-full h-48 object-cover"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ formatCategory(listing.category) }}
              </span>
              <span class="text-sm text-gray-500">{{ formatDistance(listing.distance) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ listing.title }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ listing.description }}</p>
            
            <div class="space-y-2">
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ listing.location }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Pickup by {{ formatDate(listing.pickupBy) }}
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ listing.donorName }}
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-sm text-gray-500">Serves:</span>
                <span class="ml-1 text-sm font-medium text-gray-900">{{ listing.servings }} people</span>
              </div>
              <button
                class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-green-600 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                @click.stop="claimListing(listing)"
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore && !loading" class="text-center mt-8">
        <button
          @click="loadMore"
          class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Load More Listings
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useRouter } from 'vue-router'

const router = useRouter()
const listingsStore = useListingsStore()

const loading = ref(false)
const hasMore = ref(true)

const filters = ref({
  search: '',
  category: '',
  distance: '',
  pickupTime: ''
})

const filteredListings = computed(() => {
  let listings = listingsStore.listings

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    listings = listings.filter(listing =>
      listing.title.toLowerCase().includes(search) ||
      listing.description.toLowerCase().includes(search) ||
      listing.location.toLowerCase().includes(search)
    )
  }

  if (filters.value.category) {
    listings = listings.filter(listing => listing.category === filters.value.category)
  }

  // Additional filters would be implemented here with real data
  return listings
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

const formatDistance = (distance) => {
  return `${distance} miles away`
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const claimListing = async (listing) => {
  try {
    await listingsStore.claimListing(listing.id)
    // Show success message or redirect
    router.push(`/listings/${listing.id}`)
  } catch (error) {
    console.error('Failed to claim listing:', error)
    // Show error message
  }
}

const loadMore = async () => {
  loading.value = true
  try {
    // In a real app, this would load more listings from the API
    await new Promise(resolve => setTimeout(resolve, 1000))
    hasMore.value = false // For demo purposes
  } catch (error) {
    console.error('Failed to load more listings:', error)
  } finally {
    loading.value = false
  }
}

// Watch for filter changes and trigger search
watch(filters, () => {
  // In a real app, you might debounce this and make API calls
}, { deep: true })

onMounted(async () => {
  loading.value = true
  try {
    await listingsStore.fetchListings()
  } catch (error) {
    console.error('Failed to load listings:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
