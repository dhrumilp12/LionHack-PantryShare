<template>
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
  <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
     <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Create Food Listing</h1>
        <p class="mt-2 text-gray-600">Share surplus food with your community</p>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-sm rounded-lg">
        <form @submit.prevent="handleCreateListing">
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
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              @click="$router.go(-1)"
                class="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
                class="px-8 py-3 border-2 border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:opacity-50 transform hover:-translate-y-1 transition-all duration-200"
            >
              {{ loading ? 'Creating...' : 'Create Listing' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()

const loading = ref(false)

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
  requiresTransport: false,
  isVegetarian: false,
  isVegan: false
})

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const handleCreateListing = async () => {
  loading.value = true
  
  try {
    const listingData = {
      ...form,
      pickupBy: new Date(`${form.pickupDate}T${form.pickupTime}`).toISOString(),
      donorId: authStore.user?.id,
      donorName: form.contactName,
      status: 'available',
      createdAt: new Date().toISOString()
    }
    
    await listingsStore.createListing(listingData)
    
    // Redirect to listings page or the new listing detail
    router.push('/listings')
    
  } catch (error) {
    console.error('Failed to create listing:', error)
    // Show error message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Pre-fill contact information from user profile
  if (authStore.user) {
    form.contactName = `${authStore.user.firstName} ${authStore.user.lastName}`.trim()
    form.contactPhone = authStore.user.phone || ''
  }
})
</script>
