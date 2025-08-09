<template>
  <div class="edit-listing-container">
    <!-- Loading State -->
    <div v-if="loading && !listing" class="loading-state">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading listing...</p>
    </div>

    <!-- Not Found State -->
    <div v-else-if="!listing && !loading" class="error-state">
      <div class="error-icon">📋</div>
      <h1 class="error-title">Listing Not Found</h1>
      <p class="error-description">The listing you're trying to edit doesn't exist or has been removed.</p>
      <router-link to="/listings" class="error-action">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Listings
      </router-link>
    </div>

    <!-- Unauthorized Access -->
    <div v-else-if="listing && !canEdit" class="error-state">
      <div class="error-icon">🔒</div>
      <h1 class="error-title">Unauthorized</h1>
      <p class="error-description">You can only edit your own listings.</p>
      <router-link :to="`/listings/${listing.id}`" class="error-action">
        <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        View Listing
      </router-link>
    </div>

    <!-- Edit Form -->
    <div v-else-if="listing && canEdit">
      <!-- Hero Header Section -->
      <section class="hero-section">
        <div class="hero-bg">
          <div class="floating-orb orb-1"></div>
          <div class="floating-orb orb-2"></div>
          <div class="floating-orb orb-3"></div>
        </div>
        
        <div class="container">
          <div class="hero-header">
            <!-- Back Button -->
            <button @click="$router.go(-1)" class="back-button">
              <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <!-- Hero Content -->
            <div class="hero-content">
              <div class="hero-badge">
                <span class="badge-dot"></span>
                Edit Listing
              </div>
              
              <h1 class="hero-title">Update Food Listing</h1>
              
              <p class="hero-description">
                Edit your food listing information and availability
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="main-content">
        <div class="container">
          <div class="form-container">
            <!-- Basic Information Section -->
            <div class="form-card">
              <form @submit.prevent="handleUpdateListing">
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon basic">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Basic Information</h2>
                      <p class="section-description">Essential details about your food listing</p>
                    </div>
                  </div>

                  <div class="form-grid">
                    <div class="form-group full-width">
                      <label for="title" class="form-label">
                        Title <span class="required">*</span>
                      </label>
                      <input
                        id="title"
                        v-model="form.title"
                        type="text"
                        required
                        placeholder="e.g., Fresh sandwiches from deli"
                        class="form-input"
                      />
                    </div>
                    
                    <div class="form-group full-width">
                      <label for="description" class="form-label">
                        Description <span class="required">*</span>
                      </label>
                      <textarea
                        id="description"
                        v-model="form.description"
                        rows="4"
                        required
                        placeholder="Describe the food items, any dietary considerations, and pickup instructions..."
                        class="form-textarea"
                      ></textarea>
                    </div>
                    
                    <div class="form-group">
                      <label for="category" class="form-label">
                        Category <span class="required">*</span>
                      </label>
                      <select
                        id="category"
                        v-model="form.category"
                        required
                        class="form-select"
                      >
                        <option value="">Select a category</option>
                        <option v-for="(label, value) in FOOD_CATEGORY_LABELS" :key="value" :value="value">
                          {{ label }}
                        </option>
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label for="quantity" class="form-label">
                        Quantity <span class="required">*</span>
                      </label>
                      <div class="quantity-input">
                        <input
                          id="quantity"
                          v-model.number="form.quantity"
                          type="number"
                          min="1"
                          required
                          placeholder="Number"
                          class="form-input quantity-number"
                        />
                        <select
                          v-model="form.unit"
                          class="form-select quantity-unit"
                        >
                          <option v-for="unit in QUANTITY_UNITS" :key="unit" :value="unit">
                            {{ unit }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Location Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon location">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Location Information</h2>
                      <p class="section-description">Where the food can be picked up</p>
                    </div>
                  </div>

                  <div class="form-grid">
                    <div class="form-group full-width">
                      <label for="address" class="form-label">
                        Address <span class="required">*</span>
                      </label>
                      <input
                        id="address"
                        v-model="form.address"
                        type="text"
                        required
                        placeholder="Street address or landmark"
                        class="form-input"
                      />
                    </div>
                    
                    <div class="form-group full-width">
                      <label for="locationDetails" class="form-label">
                        Location Details (Optional)
                      </label>
                      <textarea
                        id="locationDetails"
                        v-model="form.locationDetails"
                        rows="2"
                        placeholder="Additional location details (e.g., building entrance, room number)"
                        class="form-textarea"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Pickup Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon pickup">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Pickup Information</h2>
                      <p class="section-description">When and how the food can be collected</p>
                    </div>
                  </div>

                  <div class="form-grid">
                    <div class="form-group">
                      <label for="expiryDate" class="form-label">
                        Expiry Date <span class="required">*</span>
                      </label>
                      <input
                        id="expiryDate"
                        v-model="form.expiryDate"
                        type="datetime-local"
                        required
                        :min="minDateTime"
                        class="form-input"
                      />
                    </div>
                    
                    <div class="form-group pickup-window">
                      <label class="form-label">
                        Pickup Window <span class="required">*</span>
                      </label>
                      <div class="pickup-inputs">
                        <input
                          v-model="form.pickupStart"
                          type="datetime-local"
                          required
                          :min="minDateTime"
                          placeholder="Start time"
                          class="form-input"
                        />
                        <input
                          v-model="form.pickupEnd"
                          type="datetime-local"
                          required
                          :min="form.pickupStart"
                          placeholder="End time"
                          class="form-input"
                        />
                      </div>
                    </div>
                    
                    <div class="form-group full-width">
                      <label for="pickupInstructions" class="form-label">
                        Pickup Instructions (Optional)
                      </label>
                      <textarea
                        id="pickupInstructions"
                        v-model="form.pickupInstructions"
                        rows="3"
                        placeholder="Any special instructions for pickup..."
                        class="form-textarea"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Dietary Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon dietary">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Dietary Information</h2>
                      <p class="section-description">Dietary preferences and restrictions (Optional)</p>
                    </div>
                  </div>

                  <div class="checkbox-grid">
                    <div v-for="(label, key) in DIETARY_PREFERENCE_LABELS" :key="key" class="checkbox-option">
                      <input
                        :id="`dietary-${key}`"
                        v-model="form.dietaryInfo[key]"
                        type="checkbox"
                        class="checkbox-input"
                      />
                      <label :for="`dietary-${key}`" class="checkbox-label">
                        {{ label }}
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Allergen Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon allergen">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Allergen Information</h2>
                      <p class="section-description">Select any allergens present in this food (Optional)</p>
                    </div>
                  </div>

                  <div class="checkbox-grid allergen-grid">
                    <div v-for="(label, key) in ALLERGEN_LABELS" :key="key" class="checkbox-option allergen-option">
                      <input
                        :id="`allergen-${key}`"
                        v-model="form.allergens"
                        :value="key"
                        type="checkbox"
                        class="checkbox-input allergen-checkbox"
                      />
                      <label :for="`allergen-${key}`" class="checkbox-label allergen-label">
                        {{ label }}
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Listing Status Section -->
                <div v-if="listing.status !== LISTING_STATUS.AVAILABLE" class="form-section">
                  <div class="section-header">
                    <div class="section-icon status">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Listing Status</h2>
                      <p class="section-description">Current status of your listing</p>
                    </div>
                  </div>

                  <div class="status-card">
                    <div class="status-content">
                      <div class="status-info">
                        <p class="status-label">Current Status</p>
                        <span :class="['status-badge', getStatusColor(listing.status)]">
                          {{ getStatusLabel(listing.status) }}
                        </span>
                      </div>
                      <div v-if="listing.status === LISTING_STATUS.CLAIMED && listing.volunteerName" class="claim-info">
                        <p class="claim-text">Claimed by: {{ listing.volunteerName }}</p>
                        <p class="claim-date">{{ formatDate(listing.claimedAt) }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional Options Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon additional">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Additional Options</h2>
                      <p class="section-description">Any special instructions or additional information</p>
                    </div>
                  </div>

                  <div class="form-grid">
                    <div class="form-group full-width">
                      <label for="specialInstructions" class="form-label">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="specialInstructions"
                        v-model="form.specialInstructions"
                        rows="3"
                        placeholder="Any additional information or special handling instructions..."
                        class="form-textarea"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Form Actions -->
                <div class="form-actions">
                  <button
                    type="button"
                    @click="confirmDelete"
                    :disabled="updating || deleting"
                    class="action-btn danger"
                  >
                    <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {{ deleting ? 'Deleting...' : 'Delete Listing' }}
                  </button>
                  
                  <div class="action-group">
                    <button
                      type="button"
                      @click="$router.go(-1)"
                      :disabled="updating"
                      class="action-btn secondary"
                    >
                      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      :disabled="updating || !isFormValid"
                      class="action-btn primary"
                    >
                      <svg v-if="updating" class="btn-icon loading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {{ updating ? 'Updating...' : 'Update Listing' }}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { 
  FOOD_CATEGORY_LABELS, 
  QUANTITY_UNITS,
  LISTING_STATUS,
  LISTING_STATUS_LABELS,
  LISTING_STATUS_COLORS,
  DIETARY_PREFERENCE_LABELS,
  ALLERGEN_LABELS
} from '@/utils/constants'

const route = useRoute()
const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const loading = ref(true)
const updating = ref(false)
const deleting = ref(false)

// Form reactive data
const form = reactive({
  title: '',
  description: '',
  category: '',
  quantity: 1,
  unit: 'portions',
  address: '',
  locationDetails: '',
  expiryDate: '',
  pickupStart: '',
  pickupEnd: '',
  pickupInstructions: '',
  dietaryInfo: {},
  allergens: [],
  specialInstructions: ''
})

// Computed properties
const listing = computed(() => {
  return listingsStore.currentListing || 
         listingsStore.listings.find(l => l.id === route.params.id)
})

const canEdit = computed(() => {
  return authStore.isAuthenticated && 
         listing.value && 
         listing.value.ownerId === authStore.user?.id
})

const minDateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 60) // Minimum 1 hour from now
  return now.toISOString().slice(0, 16)
})

const isFormValid = computed(() => {
  return form.title.trim() && 
         form.description.trim() && 
         form.category && 
         form.quantity > 0 && 
         form.address.trim() && 
         form.expiryDate && 
         form.pickupStart && 
         form.pickupEnd &&
         new Date(form.pickupEnd) > new Date(form.pickupStart) &&
         new Date(form.expiryDate) > new Date()
})

// Methods
const loadListingData = () => {
  if (!listing.value) return
  
  // Populate form with listing data
  Object.assign(form, {
    title: listing.value.title || '',
    description: listing.value.description || '',
    category: listing.value.category || '',
    quantity: listing.value.quantity || 1,
    unit: listing.value.unit || 'portions',
    address: listing.value.address || listing.value.location?.address || '',
    locationDetails: listing.value.location?.details || '',
    expiryDate: listing.value.expiryDate ? new Date(listing.value.expiryDate).toISOString().slice(0, 16) : '',
    pickupStart: listing.value.pickupWindow?.start ? new Date(listing.value.pickupWindow.start).toISOString().slice(0, 16) : '',
    pickupEnd: listing.value.pickupWindow?.end ? new Date(listing.value.pickupWindow.end).toISOString().slice(0, 16) : '',
    pickupInstructions: listing.value.pickupInstructions || '',
    dietaryInfo: { ...listing.value.dietaryInfo } || {},
    allergens: [...listing.value.allergens] || [],
    specialInstructions: listing.value.specialInstructions || ''
  })
}

const handleUpdateListing = async () => {
  if (!isFormValid.value) {
    notificationStore.error('Invalid Form', 'Please fill in all required fields correctly.')
    return
  }

  updating.value = true
  
  try {
    // Format data for API
    const updateData = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      quantity: parseInt(form.quantity),
      unit: form.unit,
      location: {
        address: form.address.trim(),
        ...(listing.value.location?.latitude && { latitude: listing.value.location.latitude }),
        ...(listing.value.location?.longitude && { longitude: listing.value.location.longitude }),
        ...(form.locationDetails && { details: form.locationDetails.trim() })
      },
      expiryDate: new Date(form.expiryDate).toISOString(),
      pickupWindow: {
        start: new Date(form.pickupStart).toISOString(),
        end: new Date(form.pickupEnd).toISOString()
      },
      ...(form.pickupInstructions && { pickupInstructions: form.pickupInstructions.trim() }),
      ...(Object.keys(form.dietaryInfo).length > 0 && { dietaryInfo: form.dietaryInfo }),
      ...(form.allergens.length > 0 && { allergens: form.allergens }),
      ...(form.specialInstructions && { specialInstructions: form.specialInstructions.trim() })
    }
    
    const result = await listingsStore.updateListing(route.params.id, updateData)
    
    if (result.success) {
      router.push(`/listings/${route.params.id}`)
    } else {
      throw new Error(result.error || 'Failed to update listing')
    }
    
  } catch (error) {
    console.error('Failed to update listing:', error)
    notificationStore.error('Update Failed', error.message || 'Failed to update listing. Please try again.')
  } finally {
    updating.value = false
  }
}

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
    deleteListing()
  }
}

const deleteListing = async () => {
  deleting.value = true
  
  try {
    const result = await listingsStore.deleteListing(route.params.id)
    
    if (result.success) {
      router.push('/listings')
    } else {
      throw new Error(result.error || 'Failed to delete listing')
    }
  } catch (error) {
    console.error('Failed to delete listing:', error)
    notificationStore.error('Delete Failed', error.message || 'Failed to delete listing. Please try again.')
  } finally {
    deleting.value = false
  }
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status) => {
  return LISTING_STATUS_COLORS[status] || 'text-gray-600 bg-gray-100'
}

const getStatusLabel = (status) => {
  return LISTING_STATUS_LABELS[status] || status
}

// Watch for listing changes
watch(listing, (newListing) => {
  if (newListing) {
    loadListingData()
  }
}, { immediate: true })

// Lifecycle
onMounted(async () => {
  try {
    // Check if we have the listing in store
    if (!listing.value) {
      // Fetch the specific listing
      await listingsStore.fetchListingById(route.params.id)
    }
    
    // Load form data once listing is available
    if (listing.value) {
      loadListingData()
    }
    
  } catch (error) {
    console.error('Failed to load listing:', error)
    notificationStore.error('Load Failed', 'Failed to load listing for editing.')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Edit Listing Container */
.edit-listing-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #e9f4f7 100%);
}

/* Loading and Error States */
.loading-state, .error-state {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6f9fc 0%, #e9f4f7 100%);
  z-index: 50;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(102, 126, 234, 0.1);
  border-left: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  margin-top: 1rem;
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.error-description {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 500px;
}

.error-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.error-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 2rem 0 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  filter: blur(40px);
  animation: float 15s infinite linear;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
  animation-duration: 20s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 60%;
  animation-delay: -10s;
  animation-duration: 25s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% { 
    transform: translateY(-20px) translateX(10px) rotate(90deg);
  }
  50% { 
    transform: translateY(-10px) translateX(-10px) rotate(180deg);
  }
  75% { 
    transform: translateY(-30px) translateX(5px) rotate(270deg);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.hero-header {
  position: relative;
  z-index: 10;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.back-icon {
  width: 20px;
  height: 20px;
}

.hero-content {
  text-align: center;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hero-description {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Main Content */
.main-content {
  position: relative;
  padding: 4rem 0;
  z-index: 1;
}

/* Form Container */
.form-container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Form Card */
.form-card {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px 24px 0 0;
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

/* Form Sections */
.form-section {
  margin-bottom: 3rem;
}

.form-section:last-child {
  margin-bottom: 0;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 
    0 8px 24px rgba(102, 126, 234, 0.3),
    0 4px 12px rgba(118, 75, 162, 0.2);
  transition: all 0.3s ease;
}

.section-icon:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 12px 32px rgba(102, 126, 234, 0.4),
    0 6px 16px rgba(118, 75, 162, 0.3);
}

.section-icon .icon {
  width: 24px;
  height: 24px;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #64748b;
  font-size: 1rem;
}

/* Form Elements */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group.pickup-window {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Quantity Input */
.quantity-input {
  display: flex;
  gap: 0.5rem;
}

.quantity-number {
  flex: 1;
}

.quantity-unit {
  min-width: 140px;
}

/* Pickup Inputs */
.pickup-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Checkbox Grids */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.allergen-grid {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.checkbox-option:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.02);
  transform: translateY(-1px);
}

.checkbox-input {
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-input:checked {
  background: #667eea;
  border-color: #667eea;
}

.allergen-checkbox:checked {
  background: #ef4444;
  border-color: #ef4444;
}

.checkbox-label {
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  flex: 1;
}

/* Status Card */
.status-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
}

.status-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-info .status-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
}

.claim-info {
  text-align: right;
}

.claim-text {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.claim-date {
  color: #9ca3af;
  font-size: 0.85rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0 0;
  border-top: 2px solid #f3f4f6;
  margin-top: 2rem;
}

.action-group {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.action-btn.secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.action-btn.secondary:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.action-btn.danger {
  background: white;
  color: #ef4444;
  border: 2px solid #fca5a5;
}

.action-btn.danger:hover:not(:disabled) {
  background: #fef2f2;
  border-color: #ef4444;
  transform: translateY(-1px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-icon.loading {
  animation: spin 1s linear infinite;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .form-card {
    padding: 1.5rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .pickup-inputs {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .action-group {
    justify-content: center;
  }
  
  .status-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .claim-info {
    text-align: left;
  }
}
</style>
