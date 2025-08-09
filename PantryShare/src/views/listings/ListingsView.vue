<template>
  <div class="listings-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      <div class="hero-content">
        <div class="hero-left">
          <div class="badge">
            <span class="badge-dot"></span>
            Food Rescue Listings
          </div>
          <h1 class="hero-title">Find fresh food <span class="highlight-text">near you</span></h1>
          <p class="hero-description">Browse available food from local donors and help reduce waste in your community.</p>
          <div class="hero-actions">
            <router-link to="/listings/create" class="btn-primary">
              <svg viewBox="0 0 24 24" class="btn-icon"><path d="M12 6v12M6 12h12"/></svg>
              Create Listing
            </router-link>
            <router-link to="/map" class="btn-secondary">
              <svg viewBox="0 0 24 24" class="btn-icon"><path d="M9 20l-5-2V6l5 2 6-2 5 2v12l-5-2-6 2z"/></svg>
              View Map
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="content-section">
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <!-- Search -->
          <div class="lg:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div class="relative">
              <input
                id="search"
                v-model="filters.search"
                type="text"
                placeholder="Search listings..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Category Filter -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              v-model="filters.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Categories</option>
              <option v-for="(label, value) in FOOD_CATEGORY_LABELS" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              v-model="filters.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="available">Available</option>
              <option value="claimed">Claimed</option>
              <option value="all">All Status</option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              id="sort"
              v-model="filters.sortBy"
              @change="filters.sortOrder = SORT_OPTIONS.find(opt => opt.value === filters.sortBy)?.order || 'desc'"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option v-for="option in SORT_OPTIONS" :key="`${option.value}-${option.order}`" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="mt-4 flex justify-between items-center">
          <div class="text-sm text-gray-500">
            {{ filteredListings.length }} listing{{ filteredListings.length !== 1 ? 's' : '' }} found
          </div>
          <button
            @click="resetFilters"
            class="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="listingsStore.loading || localLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>

      <!-- No Results State -->
      <div v-else-if="filteredListings.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-4.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-gray-900">
          {{ filters.search ? 'No matching listings found' : 'No listings found' }}
        </h3>
        <p class="mt-1 text-gray-500">
          {{ filters.search ? 'Try adjusting your search criteria.' : 'Be the first to create a listing in your area!' }}
        </p>
        <div class="mt-6">
          <router-link
            to="/listings/create"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Listing
          </router-link>
        </div>
      </div>

      <!-- Listings Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="listing in filteredListings"
          :key="listing.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
          @click="viewDetails(listing)"
        >
          <!-- Image -->
          <div class="aspect-w-16 aspect-h-9 relative">
            <img
              :src="listing.imageUrls?.[0] || 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop'"
              :alt="listing.title"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <!-- Status Badge -->
            <div class="absolute top-3 right-3">
              <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`">
                {{ getStatusLabel(listing.status) }}
              </span>
            </div>
            <!-- Expiry Warning -->
            <div v-if="isExpiringSoon(listing.expiryDate)" class="absolute top-3 left-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                Expires soon
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Category and Quantity -->
            <div class="flex items-center justify-between mb-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ formatCategory(listing.category) }}
              </span>
              <span class="text-sm text-gray-500">{{ listing.quantity }} {{ listing.unit }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
              {{ listing.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ listing.description }}</p>
            
            <!-- Details -->
            <div class="space-y-2">
              <!-- Location -->
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="truncate">{{ listing.address || listing.location }}</span>
              </div>

              <!-- Expiry Date -->
              <div class="flex items-center text-sm">
                <svg class="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span :class="isExpiringSoon(listing.expiryDate) ? 'text-red-600 font-medium' : 'text-gray-500'">
                  {{ formatExpiryDate(listing.expiryDate) }}
                </span>
              </div>

              <!-- Owner -->
              <div class="flex items-center text-sm text-gray-500">
                <svg class="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="truncate">{{ listing.ownerName || 'Community Member' }}</span>
              </div>
            </div>

            <!-- Action Button -->
            <div class="mt-4 pt-4 border-t border-gray-100">
              <button
                v-if="listing.status === 'available' && listingsStore.canClaimListing(listing)"
                @click.stop="claimListing(listing)"
                class="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Claim Listing
              </button>
              <button
                v-else-if="listing.status === 'available'"
                @click.stop="viewDetails(listing)"
                class="w-full bg-green-100 text-green-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                View Details
              </button>
              <button
                v-else
                disabled
                class="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
              >
                {{ getStatusLabel(listing.status) }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="listingsStore.pagination.hasMore && !listingsStore.loading" class="text-center mt-8">
        <button
          @click="loadMore"
          class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Load More Listings
        </button>
      </div>

      <!-- Error State -->
      <div v-if="listingsStore.error" class="text-center py-8">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div class="flex">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error loading listings</h3>
              <p class="mt-1 text-sm text-red-700">{{ listingsStore.error }}</p>
              <button
                @click="listingsStore.fetchListings"
                class="mt-2 text-sm text-red-800 underline hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { 
  FOOD_CATEGORY_LABELS, 
  LISTING_STATUS_LABELS,
  LISTING_STATUS_COLORS,
  DISTANCE_OPTIONS,
  SORT_OPTIONS
} from '@/utils/constants'

const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()

const localLoading = ref(false)

const filters = ref({
  search: '',
  category: '',
  distance: '',
  status: 'available',
  sortBy: 'createdAt',
  sortOrder: 'desc'
})

const filteredListings = computed(() => {
  let listings = [...listingsStore.listings]

  // Apply local filters
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    listings = listings.filter(listing =>
      listing.title.toLowerCase().includes(search) ||
      listing.description.toLowerCase().includes(search) ||
      listing.address?.toLowerCase().includes(search) ||
      listing.ownerName?.toLowerCase().includes(search)
    )
  }

  if (filters.value.category) {
    listings = listings.filter(listing => listing.category === filters.value.category)
  }

  if (filters.value.status && filters.value.status !== 'all') {
    listings = listings.filter(listing => listing.status === filters.value.status)
  }

  // Apply sorting
  if (filters.value.sortBy) {
    listings.sort((a, b) => {
      let aValue = a[filters.value.sortBy]
      let bValue = b[filters.value.sortBy]

      // Handle date sorting
      if (filters.value.sortBy.includes('Date') || filters.value.sortBy.includes('At')) {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      // Handle numeric sorting
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.value.sortOrder === 'desc' ? bValue - aValue : aValue - bValue
      }

      // Handle string and date sorting
      if (aValue < bValue) return filters.value.sortOrder === 'desc' ? 1 : -1
      if (aValue > bValue) return filters.value.sortOrder === 'desc' ? -1 : 1
      return 0
    })
  }

  return listings
})

// Utility functions
const formatCategory = (category) => {
  return FOOD_CATEGORY_LABELS[category] || category
}

const formatDistance = (distance) => {
  return `${distance} km away`
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatExpiryDate = (date) => {
  if (!date) return ''
  const expiry = new Date(date)
  const now = new Date()
  const diffMs = expiry - now
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffHours / 24)

  if (diffMs < 0) return 'Expired'
  if (diffHours < 1) return 'Expires soon'
  if (diffHours < 24) return `Expires in ${diffHours}h`
  return `Expires in ${diffDays}d`
}

const getStatusColor = (status) => {
  return LISTING_STATUS_COLORS[status] || 'text-gray-600 bg-gray-100'
}

const getStatusLabel = (status) => {
  return LISTING_STATUS_LABELS[status] || status
}

const isExpiringSoon = (expiryDate) => {
  if (!expiryDate) return false
  const expiry = new Date(expiryDate)
  const now = new Date()
  const diffHours = (expiry - now) / (1000 * 60 * 60)
  return diffHours <= 6 && diffHours > 0
}

const claimListing = async (listing) => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'login' })
    return
  }

  try {
    const result = await listingsStore.claimListing(listing.id)
    if (result.success) {
      router.push({ name: 'listing-detail', params: { id: listing.id } })
    }
  } catch (error) {
    console.error('Failed to claim listing:', error)
  }
}

const viewDetails = (listing) => {
  router.push({ name: 'listing-detail', params: { id: listing.id } })
}

const loadMore = async () => {
  if (listingsStore.loading || !listingsStore.pagination.hasMore) {
    return
  }

  await listingsStore.loadMore()
}

const applyFilters = async () => {
  localLoading.value = true
  
  try {
    // Update store filters
    listingsStore.setFilters({
      category: filters.value.category || null,
      status: filters.value.status,
      sortBy: filters.value.sortBy,
      sortOrder: filters.value.sortOrder
    })
    
    // Fetch listings with new filters
    await listingsStore.fetchListings({
      offset: 0 // Reset pagination
    })
  } catch (error) {
    console.error('Failed to apply filters:', error)
  } finally {
    localLoading.value = false
  }
}

const resetFilters = async () => {
  filters.value = {
    search: '',
    category: '',
    distance: '',
    status: 'available',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
  
  await applyFilters()
}

// Watch for filter changes and trigger search
watch(
  () => [filters.value.category, filters.value.status, filters.value.sortBy, filters.value.sortOrder],
  () => {
    applyFilters()
  }
)

// Debounced search
let searchTimeout = null
watch(
  () => filters.value.search,
  (newSearch) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    
    searchTimeout = setTimeout(async () => {
      if (newSearch.trim().length >= 2) {
        await listingsStore.searchListings(newSearch.trim(), {
          category: filters.value.category,
          status: filters.value.status
        })
      } else if (newSearch.trim().length === 0) {
        // Reset to regular listings when search is cleared
        await applyFilters()
      }
    }, 500)
  }
)

onMounted(async () => {
  // Initial load
  if (listingsStore.listings.length === 0) {
    await listingsStore.fetchListings()
  }
})
</script>

<style scoped>
/* Global */
.listings-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

/* Hero (borrowed from HomeView theme) */
.hero-section {
  padding-bottom: 90px;
  padding-top: 140px;
  min-height: 60vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-bg { position: absolute; inset: 0; z-index: 0; }
.floating-orb { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); animation: float 6s ease-in-out infinite; }
.orb-1 { width: 180px; height: 180px; top: 15%; left: 10%; animation-delay: 0s; }
.orb-2 { width: 130px; height: 130px; top: 55%; right: 15%; animation-delay: 2s; }
.orb-3 { width: 90px; height: 90px; bottom: 15%; left: 60%; animation-delay: 4s; }

.hero-content { position: relative; z-index: 1; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.hero-left { max-width: 680px; }
.badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border-radius: 24px; color: white; font-size: 14px; font-weight: 500; margin-bottom: 16px; }
.badge-dot { width: 8px; height: 8px; background: #00ff88; border-radius: 50%; animation: pulse 2s infinite; }
.hero-title { font-size: clamp(36px, 5vw, 56px); font-weight: 800; line-height: 1.1; color: white; margin-bottom: 16px; }
.highlight-text { background: linear-gradient(45deg, #00ff88, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-description { font-size: 18px; color: rgba(255,255,255,0.9); margin-bottom: 28px; max-width: 520px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 14px 24px; background: linear-gradient(45deg, #00ff88, #00d4ff); color: white; border: none; border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all .3s ease; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,255,136,.25); }
.btn-secondary { display: inline-flex; align-items: center; gap: 10px; padding: 14px 24px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all .3s ease; }
.btn-secondary:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }
.btn-icon { width: 18px; height: 18px; stroke: currentColor; stroke-width: 2; fill: none; }

.content-section { background: #f8f9fa; }

.line-clamp-1 {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animations */
@keyframes float { 0%,100%{ transform: translateY(0) rotate(0deg);} 50%{ transform: translateY(-12px) rotate(3deg);} }
@keyframes pulse { 0%,100%{ opacity:1; transform:scale(1);} 50%{ opacity:.7; transform:scale(1.1);} }

/* Responsive */
@media (max-width: 768px) {
  .hero-section { padding-top: 110px; min-height: 50vh; }
  .hero-title { font-size: 32px; }
}
</style>
