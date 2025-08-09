<template>
  <div class="create-listing-container">
    <!-- Hero Header Section -->
    <section class="create-hero">
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
              Share Food
            </div>
            
            <h1 class="hero-title">Create Food Listing</h1>
            
            <p class="hero-description">
              Share surplus food with your community and help reduce waste
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="form-container">
          <!-- Form Card -->
          <div class="form-card">
            <form @submit.prevent="handleCreateListing">
              <div class="form-content">
                <!-- Basic Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon basic">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Basic Information</h2>
                      <p class="section-description">Tell us about your food listing</p>
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
                        maxlength="100"
                        class="form-input"
                        placeholder="e.g., Fresh sandwiches from school cafeteria"
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
                        maxlength="500"
                        class="form-textarea"
                        placeholder="Describe the food, its condition, and any special notes..."
                      ></textarea>
                      <div class="character-count">{{ form.description.length }}/500 characters</div>
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

                    <div class="form-group-split">
                      <div class="form-group">
                        <label for="quantity" class="form-label">
                          Quantity <span class="required">*</span>
                        </label>
                        <input
                          id="quantity"
                          v-model.number="form.quantity"
                          type="number"
                          min="1"
                          max="1000"
                          required
                          class="form-input"
                        />
                      </div>
                      <div class="form-group">
                        <label for="unit" class="form-label">Unit</label>
                        <select
                          id="unit"
                          v-model="form.unit"
                          class="form-select"
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
                      <p class="section-description">Where can volunteers pick up the food?</p>
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
                        class="form-input"
                        placeholder="Street address, city, state"
                      />
                    </div>
                    <div class="form-group full-width">
                      <label for="locationDetails" class="form-label">
                        Location Details
                      </label>
                      <input
                        id="locationDetails"
                        v-model="form.locationDetails"
                        type="text"
                        class="form-input"
                        placeholder="Building, room, or specific instructions"
                      />
                    </div>
                  </div>
                </div>

                <!-- Timing Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon timing">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Timing Information</h2>
                      <p class="section-description">When does the food expire and when can it be picked up?</p>
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
                        type="date"
                        required
                        :min="today"
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="expiryTime" class="form-label">
                        Expiry Time <span class="required">*</span>
                      </label>
                      <input
                        id="expiryTime"
                        v-model="form.expiryTime"
                        type="time"
                        required
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="pickupStart" class="form-label">
                        Pickup Start <span class="required">*</span>
                      </label>
                      <input
                        id="pickupStart"
                        v-model="form.pickupStart"
                        type="datetime-local"
                        required
                        :min="minDateTime"
                        :max="maxDateTime"
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="pickupEnd" class="form-label">
                        Pickup End <span class="required">*</span>
                      </label>
                      <input
                        id="pickupEnd"
                        v-model="form.pickupEnd"
                        type="datetime-local"
                        required
                        :min="minDateTime"
                        :max="maxDateTime"
                        class="form-input"
                      />
                    </div>
                    <div class="form-group full-width">
                      <label for="pickupInstructions" class="form-label">
                        Pickup Instructions
                      </label>
                      <textarea
                        id="pickupInstructions"
                        v-model="form.pickupInstructions"
                        rows="3"
                        maxlength="300"
                        class="form-textarea"
                        placeholder="Any special instructions for pickup..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Contact Information Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon contact">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Contact Information</h2>
                      <p class="section-description">How can volunteers reach you?</p>
                    </div>
                  </div>

                  <div class="form-grid">
                    <div class="form-group">
                      <label for="contactName" class="form-label">
                        Contact Name <span class="required">*</span>
                      </label>
                      <input
                        id="contactName"
                        v-model="form.contactInfo.name"
                        type="text"
                        required
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="preferredContact" class="form-label">
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferredContact"
                        v-model="form.contactInfo.preferredContact"
                        class="form-select"
                      >
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="contactPhone" class="form-label">
                        Phone Number
                      </label>
                      <input
                        id="contactPhone"
                        v-model="form.contactInfo.phone"
                        type="tel"
                        class="form-input"
                      />
                    </div>
                    <div class="form-group">
                      <label for="contactEmail" class="form-label">
                        Email Address
                      </label>
                      <input
                        id="contactEmail"
                        v-model="form.contactInfo.email"
                        type="email"
                        class="form-input"
                      />
                    </div>
                  </div>
                </div>

                <!-- Food Details Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon food">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Food Details</h2>
                      <p class="section-description">Allergens and dietary information</p>
                    </div>
                  </div>

                  <!-- Allergens -->
                  <div class="form-subsection">
                    <h3 class="subsection-title">Contains Allergens</h3>
                    <div class="checkbox-grid">
                      <label 
                        v-for="(label, allergen) in ALLERGEN_LABELS" 
                        :key="allergen"
                        class="checkbox-item allergen"
                        :class="{ active: form.allergens.includes(allergen) }"
                      >
                        <input
                          type="checkbox"
                          :checked="form.allergens.includes(allergen)"
                          @change="toggleAllergen(allergen)"
                          class="checkbox-input"
                        />
                        <span class="checkbox-label">{{ label }}</span>
                        <div class="checkbox-indicator">
                          <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </label>
                    </div>
                  </div>

                  <!-- Dietary Information -->
                  <div class="form-subsection">
                    <h3 class="subsection-title">Dietary Information</h3>
                    <div class="checkbox-grid">
                      <label 
                        v-for="(label, preference) in DIETARY_PREFERENCE_LABELS" 
                        :key="preference"
                        class="checkbox-item dietary"
                        :class="{ active: form.dietaryInfo[preference] }"
                      >
                        <input
                          type="checkbox"
                          v-model="form.dietaryInfo[preference]"
                          class="checkbox-input"
                        />
                        <span class="checkbox-label">{{ label }}</span>
                        <div class="checkbox-indicator">
                          <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Images Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon images">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Images</h2>
                      <p class="section-description">Add photos to help volunteers identify your food</p>
                    </div>
                  </div>

                  <!-- Image Upload -->
                  <div class="upload-section">
                    <div class="upload-area" :class="{ uploading: uploadingImages }">
                      <div class="upload-content">
                        <div class="upload-icon">
                          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                          </svg>
                        </div>
                        <div class="upload-text">
                          <label for="images" class="upload-label">
                            <span>Upload images</span>
                            <input
                              id="images"
                              type="file"
                              multiple
                              accept="image/*"
                              :disabled="uploadingImages"
                              @change="handleImageUpload"
                              class="upload-input"
                            />
                          </label>
                          <span class="upload-hint">or drag and drop</span>
                        </div>
                        <p class="upload-info">PNG, JPG, WEBP up to 5MB (max 5 images)</p>
                      </div>
                    </div>

                    <!-- Upload Progress -->
                    <div v-if="uploadingImages" class="upload-progress">
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: `${imageUploadProgress}%` }"></div>
                      </div>
                      <span class="progress-text">{{ imageUploadProgress }}%</span>
                    </div>

                    <!-- Image Preview -->
                    <div v-if="imageUrls.length > 0" class="image-preview">
                      <div v-for="(url, index) in imageUrls" :key="index" class="preview-item">
                        <img :src="url" alt="Food image" class="preview-image" />
                        <button
                          type="button"
                          @click="removeImage(index)"
                          class="remove-image"
                        >
                          <svg class="remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Additional Options Section -->
                <div class="form-section">
                  <div class="section-header">
                    <div class="section-icon options">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                      </svg>
                    </div>
                    <div class="section-info">
                      <h2 class="section-title">Additional Options</h2>
                      <p class="section-description">Any special requirements or notes</p>
                    </div>
                  </div>

                  <div class="form-grid">
                    <div class="form-group full-width">
                      <label for="specialInstructions" class="form-label">
                        Special Instructions
                      </label>
                      <textarea
                        id="specialInstructions"
                        v-model="form.specialInstructions"
                        rows="3"
                        maxlength="300"
                        class="form-textarea"
                        placeholder="Any additional notes or requirements..."
                      ></textarea>
                    </div>
                    
                    <div class="form-group full-width">
                      <label class="checkbox-option">
                        <input
                          id="requiresTransport"
                          v-model="form.requiresTransport"
                          type="checkbox"
                          class="option-checkbox"
                        />
                        <span class="option-indicator"></span>
                        <span class="option-text">Requires volunteer transportation</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button
                  type="button"
                  @click="$router.go(-1)"
                  class="action-btn secondary"
                >
                  <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="loading || !isFormValid"
                  class="action-btn primary"
                >
                  <svg v-if="loading" class="btn-icon loading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {{ loading ? 'Creating...' : 'Create Listing' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { 
  FOOD_CATEGORIES, 
  FOOD_CATEGORY_LABELS, 
  QUANTITY_UNITS,
  ALLERGENS,
  ALLERGEN_LABELS,
  DIETARY_PREFERENCES,
  DIETARY_PREFERENCE_LABELS,
  TIME_CONSTRAINTS,
  FILE_CONSTRAINTS
} from '@/utils/constants'

const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const loading = ref(false)
const uploadingImages = ref(false)
const imageUploadProgress = ref(0)
const imageFiles = ref([])
const imageUrls = ref([])

const form = reactive({
  title: '',
  description: '',
  category: '',
  quantity: 1,
  unit: 'portions',
  address: '',
  locationDetails: '',
  latitude: null,
  longitude: null,
  expiryDate: '',
  expiryTime: '',
  pickupStart: '',
  pickupEnd: '',
  pickupInstructions: '',
  contactInfo: {
    name: '',
    phone: '',
    email: '',
    preferredContact: 'phone'
  },
  allergens: [],
  dietaryInfo: {},
  specialInstructions: '',
  requiresTransport: false
})

// Computed properties
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const minDateTime = computed(() => {
  const now = new Date()
  now.setHours(now.getHours() + TIME_CONSTRAINTS.MIN_PICKUP_HOURS)
  return now.toISOString().slice(0, 16)
})

const maxDateTime = computed(() => {
  const future = new Date()
  future.setDate(future.getDate() + TIME_CONSTRAINTS.MAX_PICKUP_DAYS)
  return future.toISOString().slice(0, 16)
})

const minExpiryDateTime = computed(() => {
  const now = new Date()
  now.setHours(now.getHours() + TIME_CONSTRAINTS.MIN_EXPIRY_HOURS)
  return now.toISOString().slice(0, 16)
})

const maxExpiryDateTime = computed(() => {
  const future = new Date()
  future.setDate(future.getDate() + TIME_CONSTRAINTS.MAX_EXPIRY_DAYS)
  return future.toISOString().slice(0, 16)
})

const isFormValid = computed(() => {
  return form.title.trim() &&
         form.description.trim() &&
         form.category &&
         form.quantity > 0 &&
         form.address.trim() &&
         form.expiryDate &&
         form.expiryTime &&
         form.pickupStart &&
         form.pickupEnd &&
         form.contactInfo.name.trim() &&
         (form.contactInfo.phone.trim() || form.contactInfo.email.trim())
})

// Methods
const handleImageUpload = async (event) => {
  const files = Array.from(event.target.files)
  
  if (files.length === 0) return
  
  // Validate file constraints
  for (const file of files) {
    if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
      notificationStore.error('File too large', `${file.name} is larger than 5MB`)
      return
    }
    
    if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
      notificationStore.error('Invalid file type', `${file.name} is not a supported image format`)
      return
    }
  }
  
  if (imageFiles.value.length + files.length > FILE_CONSTRAINTS.MAX_FILES) {
    notificationStore.error('Too many files', `Maximum ${FILE_CONSTRAINTS.MAX_FILES} images allowed`)
    return
  }
  
  uploadingImages.value = true
  imageUploadProgress.value = 0
  
  try {
    const urls = await listingsStore.uploadImages(files, (progress) => {
      imageUploadProgress.value = progress
    })
    
    imageUrls.value.push(...urls)
    imageFiles.value.push(...files)
    
    notificationStore.success('Images uploaded', 'Your images have been uploaded successfully')
  } catch (error) {
    console.error('Image upload failed:', error)
    notificationStore.error('Upload failed', 'Failed to upload images. Please try again.')
  } finally {
    uploadingImages.value = false
    imageUploadProgress.value = 0
  }
}

const removeImage = (index) => {
  imageUrls.value.splice(index, 1)
  imageFiles.value.splice(index, 1)
}

const toggleAllergen = (allergen) => {
  const index = form.allergens.indexOf(allergen)
  if (index === -1) {
    form.allergens.push(allergen)
  } else {
    form.allergens.splice(index, 1)
  }
}

const toggleDietaryInfo = (preference) => {
  form.dietaryInfo[preference] = !form.dietaryInfo[preference]
}

const validateDates = () => {
  const now = new Date()
  const expiryDateTime = new Date(`${form.expiryDate}T${form.expiryTime}`)
  const pickupStartDateTime = new Date(form.pickupStart)
  const pickupEndDateTime = new Date(form.pickupEnd)
  
  if (expiryDateTime <= now) {
    throw new Error('Expiry date must be in the future')
  }
  
  if (pickupStartDateTime <= now) {
    throw new Error('Pickup start time must be in the future')
  }
  
  if (pickupEndDateTime <= pickupStartDateTime) {
    throw new Error('Pickup end time must be after start time')
  }
  
  if (expiryDateTime <= pickupEndDateTime) {
    throw new Error('Food should not expire before pickup window ends')
  }
}

const handleCreateListing = async () => {
  if (!isFormValid.value) {
    notificationStore.error('Invalid form', 'Please fill in all required fields')
    return
  }
  
  loading.value = true
  
  try {
    // Validate dates
    validateDates()
    
    // Prepare listing data
    const listingData = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      quantity: parseInt(form.quantity),
      unit: form.unit,
      address: form.address.trim(),
      locationDetails: form.locationDetails.trim(),
      latitude: form.latitude,
      longitude: form.longitude,
      expiryDate: new Date(`${form.expiryDate}T${form.expiryTime}`).toISOString(),
      pickupStart: new Date(form.pickupStart).toISOString(),
      pickupEnd: new Date(form.pickupEnd).toISOString(),
      pickupInstructions: form.pickupInstructions.trim(),
      contactInfo: {
        name: form.contactInfo.name.trim(),
        phone: form.contactInfo.phone.trim(),
        email: form.contactInfo.email.trim(),
        preferredContact: form.contactInfo.preferredContact
      },
      allergens: form.allergens,
      dietaryInfo: form.dietaryInfo,
      specialInstructions: form.specialInstructions.trim(),
      requiresTransport: form.requiresTransport,
      imageUrls: imageUrls.value
    }
    
    const result = await listingsStore.createListing(listingData)
    
    if (result.success) {
      // Redirect to the new listing or listings page
      router.push({ name: 'listing-detail', params: { id: result.listing.id } })
    }
    
  } catch (error) {
    console.error('Failed to create listing:', error)
    notificationStore.error('Creation failed', error.message)
  } finally {
    loading.value = false
  }
}

const getCurrentLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.latitude = position.coords.latitude
        form.longitude = position.coords.longitude
        notificationStore.success('Location found', 'Your current location has been detected')
      },
      (error) => {
        console.error('Geolocation error:', error)
        notificationStore.warning('Location not available', 'Please enter your address manually')
      }
    )
  } else {
    notificationStore.warning('Geolocation not supported', 'Please enter your address manually')
  }
}

onMounted(() => {
  // Pre-fill contact information from user profile
  if (authStore.user) {
    form.contactInfo.name = authStore.user.name || `${authStore.user.firstName} ${authStore.user.lastName}`.trim()
    form.contactInfo.phone = authStore.user.phone || ''
    form.contactInfo.email = authStore.user.email || ''
  }
  
  // Auto-detect location
  getCurrentLocation()
})
</script>

<style scoped>
/* ===== HERO SECTION ===== */
.create-listing-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.create-hero {
  position: relative;
  padding: 2rem 0 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
}

.orb-2 {
  width: 200px;
  height: 200px;
  top: 20%;
  right: -100px;
  animation-delay: 2s;
  background: radial-gradient(circle at 70% 30%, rgba(139, 69, 19, 0.3), rgba(139, 69, 19, 0.1));
}

.orb-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 20%;
  animation-delay: 4s;
  background: radial-gradient(circle at 50% 50%, rgba(76, 175, 80, 0.25), rgba(76, 175, 80, 0.08));
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-header {
  position: relative;
  z-index: 10;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
}

.back-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.hero-content {
  text-align: center;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.hero-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* ===== MAIN CONTENT ===== */
.main-content {
  background: #f8fafc;
  padding: 3rem 0;
  position: relative;
  z-index: 5;
}

.form-container {
  position: relative;
}

.form-card {
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  position: relative;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.form-content {
  padding: 2.5rem;
}

/* ===== FORM SECTIONS ===== */
.form-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.section-icon.basic {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.section-icon.location {
  background: linear-gradient(135deg, #10b981 0%, #047857 100%);
}

.section-icon.timing {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.section-icon.contact {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.section-icon.food {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.section-icon.images {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.section-icon.options {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
}

.section-icon .icon {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.section-description {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;
}

/* ===== FORM FIELDS ===== */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group-split {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  grid-column: 1 / -1;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.required {
  color: #ef4444;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.character-count {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
  text-align: right;
}

/* ===== SUBSECTIONS ===== */
.form-subsection {
  margin-top: 1.5rem;
}

.subsection-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

/* ===== CHECKBOXES ===== */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.checkbox-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.checkbox-item:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.checkbox-item.active {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.checkbox-item.allergen.active {
  border-color: #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.05) 100%);
}

.checkbox-item.dietary.active {
  border-color: #10b981;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(4, 120, 87, 0.05) 100%);
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-label {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.checkbox-indicator {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.checkbox-item.active .checkbox-indicator {
  background: #667eea;
  border-color: #667eea;
}

.checkbox-item.allergen.active .checkbox-indicator {
  background: #ef4444;
  border-color: #ef4444;
}

.checkbox-item.dietary.active .checkbox-indicator {
  background: #10b981;
  border-color: #10b981;
}

.check-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.checkbox-item.active .check-icon {
  opacity: 1;
}

/* ===== CHECKBOX OPTIONS ===== */
.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: background-color 0.2s ease;
}

.checkbox-option:hover {
  background: #f8fafc;
}

.option-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.option-indicator {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.option-checkbox:checked + .option-indicator {
  background: #667eea;
  border-color: #667eea;
}

.option-checkbox:checked + .option-indicator::after {
  content: '✓';
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
}

.option-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* ===== IMAGE UPLOAD ===== */
.upload-section {
  margin-top: 1rem;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.upload-area:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.upload-area.uploading {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 3rem;
  height: 3rem;
  color: #94a3b8;
}

.upload-icon .icon {
  width: 100%;
  height: 100%;
}

.upload-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.upload-label {
  font-weight: 600;
  color: #667eea;
  cursor: pointer;
  text-decoration: underline;
}

.upload-input {
  display: none;
}

.upload-hint {
  font-size: 0.875rem;
  color: #64748b;
}

.upload-info {
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

/* ===== UPLOAD PROGRESS ===== */
.upload-progress {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 0.5rem;
  background: #e2e8f0;
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
}

/* ===== IMAGE PREVIEW ===== */
.image-preview {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 2px solid #e2e8f0;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-image:hover {
  background: rgba(239, 68, 68, 0.8);
}

.remove-icon {
  width: 0.75rem;
  height: 0.75rem;
}

/* ===== FORM ACTIONS ===== */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem 2.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.action-btn.secondary {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.action-btn.secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  color: #475569;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid transparent;
}

.action-btn.primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-icon {
  width: 1rem;
  height: 1rem;
}

.btn-icon.loading {
  animation: spin 1s linear infinite;
}

/* ===== ANIMATIONS ===== */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(1deg);
  }
  50% {
    transform: translateY(-10px) rotate(-1deg);
  }
  75% {
    transform: translateY(-30px) rotate(0.5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .form-content {
    padding: 1.5rem;
  }
  
  .form-actions {
    padding: 1.5rem;
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .section-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }
  
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group-split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .orb-1,
  .orb-2,
  .orb-3 {
    display: none;
  }
  
  .hero-content {
    padding: 1rem 0;
  }
  
  .main-content {
    padding: 1.5rem 0;
  }
}
</style>
