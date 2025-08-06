<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading && !listing" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>

      <!-- Not Found State -->
      <div v-else-if="!listing" class="text-center py-12">
        <h1 class="text-2xl font-bold text-gray-900">Listing Not Found</h1>
        <p class="mt-2 text-gray-600">The listing you're trying to edit doesn't exist or has been removed.</p>
        <router-link
          to="/listings"
          class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Back to Listings
        </router-link>
      </div>

      <!-- Edit Form -->
      <div v-else>
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <button
              @click="$router.go(-1)"
              class="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 class="text-3xl font-bold text-gray-900">Edit Food Listing</h1>
          </div>
          <p class="text-gray-600">Update your food listing information</p>
        </div>

        <!-- Form -->
        <div class="bg-white shadow-sm rounded-lg">
          <form @submit.prevent="handleUpdateListing">
            <div class="px-6 py-6 space-y-6">
              <!-- Basic Information -->
              <div>
                <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      id="title"
                      v-model="form.title"
                      type="text"
                      required
                      placeholder="e.g., Fresh sandwiches from deli"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      v-model="form.description"
                      rows="4"
                      required
                      placeholder="Describe the food items, any dietary considerations, and pickup instructions..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                  <div>
                    <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      id="category"
                      v-model="form.category"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select a category</option>
                      <option value="prepared">Prepared Food</option>
                      <option value="produce">Fresh Produce</option>
                      <option value="bakery">Bakery Items</option>
                      <option value="packaged">Packaged Goods</option>
                      <option value="dairy">Dairy Products</option>
                    </select>
                  </div>
                  <div>
                    <label for="servings" class="block text-sm font-medium text-gray-700 mb-1">
                      Serves (approx.)
                    </label>
                    <input
                      id="servings"
                      v-model.number="form.servings"
                      type="number"
                      min="1"
                      placeholder="Number of people"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Pickup Information -->
              <div>
                <h2 class="text-lg font-medium text-gray-900 mb-4">Pickup Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label for="location" class="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Location *
                    </label>
                    <input
                      id="location"
                      v-model="form.location"
                      type="text"
                      required
                      placeholder="Address or general area"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label for="pickupDate" class="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Date *
                    </label>
                    <input
                      id="pickupDate"
                      v-model="form.pickupDate"
                      type="date"
                      required
                      :min="today"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label for="pickupTime" class="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Time *
                    </label>
                    <input
                      id="pickupTime"
                      v-model="form.pickupTime"
                      type="time"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label for="pickupInstructions" class="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Instructions
                    </label>
                    <textarea
                      id="pickupInstructions"
                      v-model="form.pickupInstructions"
                      rows="3"
                      placeholder="Any special instructions for pickup (e.g., use side entrance, call upon arrival)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Contact Information -->
              <div>
                <h2 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="contactName" class="block text-sm font-medium text-gray-700 mb-1">
                      Contact Name *
                    </label>
                    <input
                      id="contactName"
                      v-model="form.contactName"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label for="contactPhone" class="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contactPhone"
                      v-model="form.contactPhone"
                      type="tel"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Listing Status -->
              <div>
                <h2 class="text-lg font-medium text-gray-900 mb-4">Listing Status</h2>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <input
                      id="available"
                      v-model="form.status"
                      type="radio"
                      value="available"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label for="available" class="ml-3 block text-sm text-gray-700">
                      Available for pickup
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="claimed"
                      v-model="form.status"
                      type="radio"
                      value="claimed"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label for="claimed" class="ml-3 block text-sm text-gray-700">
                      Claimed/Reserved
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="completed"
                      v-model="form.status"
                      type="radio"
                      value="completed"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label for="completed" class="ml-3 block text-sm text-gray-700">
                      Completed/Picked up
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="expired"
                      v-model="form.status"
                      type="radio"
                      value="expired"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label for="expired" class="ml-3 block text-sm text-gray-700">
                      Expired/No longer available
                    </label>
                  </div>
                </div>
              </div>

              <!-- Additional Options -->
              <div>
                <h2 class="text-lg font-medium text-gray-900 mb-4">Additional Options</h2>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <input
                      id="requiresTransport"
                      v-model="form.requiresTransport"
                      type="checkbox"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label for="requiresTransport" class="ml-3 block text-sm text-gray-700">
                      This listing requires volunteer transportation
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="isVegetarian"
                      v-model="form.isVegetarian"
                      type="checkbox"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label for="isVegetarian" class="ml-3 block text-sm text-gray-700">
                      Vegetarian-friendly
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="isVegan"
                      v-model="form.isVegan"
                      type="checkbox"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label for="isVegan" class="ml-3 block text-sm text-gray-700">
                      Vegan-friendly
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                @click="deleteListing"
                class="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Listing
              </button>
              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="$router.go(-1)"
                  class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="updating"
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {{ updating ? 'Updating...' : 'Update Listing' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()

const loading = ref(true)
const updating = ref(false)

const listing = computed(() => {
  return listingsStore.listings.find(l => l.id === route.params.id)
})

const form = reactive({
  title: '',
  description: '',
  category: '',
  servings: 1,
  location: '',
  pickupDate: '',
  pickupTime: '',
  pickupInstructions: '',
  contactName: '',
  contactPhone: '',
  status: 'available',
  requiresTransport: false,
  isVegetarian: false,
  isVegan: false
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const loadListingData = () => {
  if (listing.value) {
    // Convert pickup date/time back to form format
    const pickupDate = new Date(listing.value.pickupBy)
    
    Object.assign(form, {
      title: listing.value.title || '',
      description: listing.value.description || '',
      category: listing.value.category || '',
      servings: listing.value.servings || 1,
      location: listing.value.location || '',
      pickupDate: pickupDate.toISOString().split('T')[0],
      pickupTime: pickupDate.toTimeString().slice(0, 5),
      pickupInstructions: listing.value.pickupInstructions || '',
      contactName: listing.value.donorName || '',
      contactPhone: listing.value.contactPhone || '',
      status: listing.value.status || 'available',
      requiresTransport: listing.value.requiresTransport || false,
      isVegetarian: listing.value.isVegetarian || false,
      isVegan: listing.value.isVegan || false
    })
  }
}

const handleUpdateListing = async () => {
  updating.value = true
  
  try {
    const updatedData = {
      ...form,
      pickupBy: new Date(`${form.pickupDate}T${form.pickupTime}`).toISOString(),
      donorName: form.contactName,
      updatedAt: new Date().toISOString()
    }
    
    await listingsStore.updateListing(route.params.id, updatedData)
    
    // Redirect to listing detail or listings page
    router.push(`/listings/${route.params.id}`)
    
  } catch (error) {
    console.error('Failed to update listing:', error)
    alert('Failed to update listing. Please try again.')
  } finally {
    updating.value = false
  }
}

const deleteListing = async () => {
  if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
    try {
      await listingsStore.deleteListing(route.params.id)
      router.push('/listings')
    } catch (error) {
      console.error('Failed to delete listing:', error)
      alert('Failed to delete listing. Please try again.')
    }
  }
}

onMounted(async () => {
  try {
    // Load listings if not already loaded
    if (listingsStore.listings.length === 0) {
      await listingsStore.fetchListings()
    }
    
    // Check if user owns this listing (in a real app)
    // For now, we'll allow editing any listing for demo purposes
    
    loadListingData()
    
  } catch (error) {
    console.error('Failed to load listing:', error)
  } finally {
    loading.value = false
  }
})
</script>
