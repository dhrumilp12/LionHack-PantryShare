<template>
  <div class="listing-detail-container">
    <!-- Hero Header Section -->
    <section class="listing-hero">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <div class="container">
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
          <p class="loading-text">Loading listing details...</p>
        </div>

        <div v-else-if="!listing" class="not-found-container">
          <div class="not-found-content">
            <div class="not-found-icon">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.44-.896-6-2.364C5.33 15.14 8.79 17 12 17s6.67-1.86 6-4.364z" />
              </svg>
            </div>
            <h1 class="not-found-title">Listing Not Found</h1>
            <p class="not-found-description">The listing you're looking for doesn't exist or has been removed.</p>
            <router-link to="/listings" class="not-found-action">
              <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Listings
            </router-link>
          </div>
        </div>

        <div v-else class="hero-header">
          <!-- Back Button -->
          <button @click="$router.go(-1)" class="back-button">
            <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Listings
          </button>

          <!-- Hero Content -->
          <div class="hero-content">
            <div class="status-badge">
              <span :class="['status-indicator', getStatusColorClass(listing.status)]">
                <span class="status-dot"></span>
                {{ getStatusLabel(listing.status) }}
              </span>
            </div>
            
            <h1 class="hero-title">{{ listing.title }}</h1>
            
            <div class="hero-meta">
              <div class="meta-item">
                <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ formatCategory(listing.category) }}
              </div>
              
              <div class="meta-item">
                <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ listing.address }}
              </div>
              
              <div class="meta-item">
                <svg class="meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span :class="{ 'expiring-soon': isExpiringSoon(listing.expiryDate) }">
                  {{ formatExpiryDate(listing.expiryDate) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section v-if="listing" class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- Main Content Column -->
          <div class="main-column">
            <!-- Image Gallery Card -->
            <div class="content-card image-gallery-card">
              <div v-if="listing.imageUrls && listing.imageUrls.length > 0" class="image-container">
                <div class="image-wrapper">
                  <img :src="currentImage" :alt="listing.title" class="main-image" />
                  <div class="image-overlay">
                    <div class="image-controls">
                      <button v-if="listing.imageUrls.length > 1" @click="currentImageIndex = Math.max(0, currentImageIndex - 1)" 
                              :disabled="currentImageIndex === 0" class="image-nav prev">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      <button v-if="listing.imageUrls.length > 1" @click="currentImageIndex = Math.min(listing.imageUrls.length - 1, currentImageIndex + 1)" 
                              :disabled="currentImageIndex === listing.imageUrls.length - 1" class="image-nav next">
                        <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Image indicators -->
                <div v-if="listing.imageUrls.length > 1" class="image-indicators">
                  <button v-for="(image, index) in listing.imageUrls" :key="index" @click="currentImageIndex = index"
                          :class="['indicator', { active: currentImageIndex === index }]">
                  </button>
                </div>
              </div>
              
              <div v-else class="no-image-placeholder">
                <div class="placeholder-icon">
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p class="placeholder-text">No images available</p>
              </div>
            </div>

            <!-- Details Card -->
            <div class="content-card details-card">
              <div class="card-header">
                <div class="posted-info">
                  <span class="posted-label">Posted {{ formatDate(listing.createdAt) }}</span>
                  <div v-if="listing.updatedAt !== listing.createdAt" class="updated-info">
                    Updated {{ formatDate(listing.updatedAt) }}
                  </div>
                </div>
              </div>

              <div class="card-content">
                <div class="description-section">
                  <h2 class="section-title">Description</h2>
                  <p class="description-text">{{ listing.description }}</p>
                </div>

                <!-- Key Information Grid -->
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-icon quantity">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div class="info-content">
                      <span class="info-label">Quantity</span>
                      <span class="info-value">{{ listing.quantity }} {{ listing.unit }}</span>
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="info-icon category">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <div class="info-content">
                      <span class="info-label">Category</span>
                      <span class="info-value">{{ formatCategory(listing.category) }}</span>
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="info-icon location">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="info-content">
                      <span class="info-label">Location</span>
                      <span class="info-value">{{ listing.address }}</span>
                    </div>
                  </div>

                  <div class="info-item">
                    <div class="info-icon expiry">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div class="info-content">
                      <span class="info-label">Expires</span>
                      <span :class="['info-value', { 'expiring-soon': isExpiringSoon(listing.expiryDate) }]">
                        {{ formatExpiryDate(listing.expiryDate) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Pickup Window -->
                <div class="pickup-section">
                  <h3 class="section-title">Pickup Window</h3>
                  <div class="pickup-card">
                    <div class="pickup-content">
                      <div class="pickup-time">
                        <div class="time-label">Available for pickup:</div>
                        <div class="time-range">{{ formatPickupWindow(listing.pickupWindow) }}</div>
                      </div>
                      <div class="pickup-status">
                        <span v-if="isPickupActive(listing.pickupWindow)" class="status-badge active">
                          <span class="status-dot"></span>
                          Available Now
                        </span>
                        <span v-else-if="isPickupUpcoming(listing.pickupWindow)" class="status-badge upcoming">
                          <span class="status-dot"></span>
                          Upcoming
                        </span>
                        <span v-else class="status-badge ended">
                          <span class="status-dot"></span>
                          Ended
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Dietary Information -->
                <div v-if="hasDietaryInfo" class="dietary-section">
                  <h3 class="section-title">Dietary Information</h3>
                  <div class="tags-container">
                    <span v-for="(value, key) in listing.dietaryInfo" :key="key" v-show="value" 
                          class="tag dietary-tag">
                      {{ DIETARY_PREFERENCE_LABELS[key] }}
                    </span>
                  </div>
                </div>

                <!-- Allergen Information -->
                <div v-if="listing.allergens && listing.allergens.length > 0" class="allergen-section">
                  <h3 class="section-title warning">⚠️ Allergen Information</h3>
                  <p class="allergen-warning">This food contains the following allergens:</p>
                  <div class="tags-container">
                    <span v-for="allergen in listing.allergens" :key="allergen" class="tag allergen-tag">
                      {{ ALLERGEN_LABELS[allergen] }}
                    </span>
                  </div>
                </div>

                <!-- Instructions -->
                <div v-if="listing.pickupInstructions" class="instructions-section">
                  <h3 class="section-title">Pickup Instructions</h3>
                  <div class="instructions-card">
                    <p class="instructions-text">{{ listing.pickupInstructions }}</p>
                  </div>
                </div>

                <div v-if="listing.specialInstructions" class="instructions-section">
                  <h3 class="section-title">Special Instructions</h3>
                  <div class="instructions-card special">
                    <p class="instructions-text">{{ listing.specialInstructions }}</p>
                  </div>
                </div>

                <!-- Stats -->
                <div class="stats-section">
                  <div class="stats-item">
                    <span class="stat-value">{{ listing.viewCount || 0 }}</span>
                    <span class="stat-label">views</span>
                  </div>
                  <div class="stats-item">
                    <span class="stat-value">{{ listing.claimCount || 0 }}</span>
                    <span class="stat-label">claims</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <!-- Action Card -->
            <div class="content-card action-card">
              <div class="action-header">
                <h3 class="action-title">
                  {{ listing.status === LISTING_STATUS.AVAILABLE ? 'Available for Pickup' : getStatusLabel(listing.status) }}
                </h3>
              </div>

              <div class="action-content">
                <!-- Available Status Actions -->
                <div v-if="listing.status === LISTING_STATUS.AVAILABLE" class="action-buttons">
                  <!-- Owner Actions -->
                  <div v-if="isOwner" class="owner-actions">
                    <router-link :to="`/listings/${listing.id}/edit`" class="action-btn primary">
                      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Listing
                    </router-link>
                    <button @click="updateStatus(LISTING_STATUS.CANCELLED)" :disabled="updating" class="action-btn secondary">
                      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel Listing
                    </button>
                  </div>

                  <!-- Volunteer Actions -->
                  <div v-else-if="authStore.isAuthenticated" class="volunteer-actions">
                    <button @click="claimListing" :disabled="claiming || !canClaim" class="action-btn claim">
                      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span v-if="claiming">Claiming...</span>
                      <span v-else-if="!canClaim">Cannot Claim</span>
                      <span v-else>Claim This Food</span>
                    </button>
                    <p v-if="!canClaim" class="action-note">{{ claimDisabledReason }}</p>
                  </div>

                  <!-- Guest Actions -->
                  <div v-else class="guest-actions">
                    <router-link to="/auth/login" class="action-btn login">
                      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login to Claim
                    </router-link>
                    <p class="action-note">Sign in to claim this food listing</p>
                  </div>
                </div>

                <!-- Other Status Actions -->
                <div v-else class="status-actions">
                  <div v-if="listing.status === LISTING_STATUS.CLAIMED" class="claimed-status">
                    <div class="status-info">
                      <p class="status-message">This listing has been claimed</p>
                      <div v-if="volunteerName" class="volunteer-info">
                        by {{ volunteerName }}
                      </div>
                    </div>
                    
                    <!-- Owner can update status -->
                    <div v-if="isOwner" class="owner-actions">
                      <button @click="updateStatus(LISTING_STATUS.IN_TRANSIT)" :disabled="updating" class="action-btn secondary">
                        Mark as In Transit
                      </button>
                      <button @click="updateStatus(LISTING_STATUS.DELIVERED)" :disabled="updating" class="action-btn primary">
                        Mark as Delivered
                      </button>
                    </div>
                    
                    <!-- Volunteer can update status -->
                    <div v-else-if="isVolunteer" class="volunteer-actions">
                      <button @click="updateStatus(LISTING_STATUS.IN_TRANSIT)" :disabled="updating" class="action-btn secondary">
                        Mark as Picked Up
                      </button>
                      <button @click="updateStatus(LISTING_STATUS.DELIVERED)" :disabled="updating" class="action-btn primary">
                        Mark as Delivered
                      </button>
                    </div>
                  </div>

                  <div v-else-if="listing.status === LISTING_STATUS.DELIVERED" class="delivered-status">
                    <div class="success-icon">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="status-message success">Successfully Delivered</p>
                    <p class="status-description">This food has been delivered to those in need</p>
                  </div>

                  <div v-else-if="listing.status === LISTING_STATUS.EXPIRED" class="expired-status">
                    <div class="expired-icon">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p class="status-message expired">Expired</p>
                    <p class="status-description">This listing has expired</p>
                  </div>

                  <div v-else-if="listing.status === LISTING_STATUS.CANCELLED" class="cancelled-status">
                    <div class="cancelled-icon">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p class="status-message cancelled">Cancelled</p>
                    <p class="status-description">This listing was cancelled by the owner</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Information Card -->
            <div class="content-card contact-card">
              <div class="card-header">
                <h3 class="card-title">Posted By</h3>
              </div>
              
              <div class="card-content">
                <div class="poster-info">
                  <div class="poster-avatar">
                    <div class="avatar-ring"></div>
                    <div class="avatar-content">
                      <img v-if="ownerProfileImageUrl" :src="ownerProfileImageUrl" :alt="ownerName" class="avatar-img" @error="onAvatarError" />
                      <span v-else>{{ ownerInitials }}</span>
                    </div>
                  </div>
                  <div class="poster-details">
                    <p class="poster-name">{{ ownerName }}</p>
                    <p class="poster-role">Food Provider</p>
                  </div>
                </div>
                
                <!-- Contact info shown only to claimed volunteers or owners -->
                <div v-if="showContactInfo" class="contact-info">
                  <div v-if="listing.contactInfo?.phone" class="contact-item">
                    <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a :href="`tel:${listing.contactInfo.phone}`" class="contact-link">
                      {{ listing.contactInfo.phone }}
                    </a>
                  </div>
                  <div v-if="listing.contactInfo?.email" class="contact-item">
                    <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a :href="`mailto:${listing.contactInfo.email}`" class="contact-link">
                      {{ listing.contactInfo.email }}
                    </a>
                  </div>
                </div>
                
                <div v-else class="contact-placeholder">
                  <svg class="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p class="placeholder-text">Contact information will be available after claiming the listing</p>
                </div>
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
import { useRoute, useRouter } from 'vue-router'
import { useListingsStore } from '@/stores/listings'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { 
  LISTING_STATUS,
  LISTING_STATUS_LABELS,
  LISTING_STATUS_COLORS,
  FOOD_CATEGORY_LABELS,
  DIETARY_PREFERENCE_LABELS,
  ALLERGEN_LABELS
} from '@/utils/constants'

const route = useRoute()
const router = useRouter()
const listingsStore = useListingsStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const loading = ref(true)
const claiming = ref(false)
const updating = ref(false)
const currentImageIndex = ref(0)

// Computed properties
const listing = computed(() => {
  return listingsStore.currentListing || 
         listingsStore.listings.find(l => l.id === route.params.id)
})

const currentImage = computed(() => {
  if (!listing.value?.imageUrls?.length) return null
  return listing.value.imageUrls[currentImageIndex.value]
})

const isOwner = computed(() => {
  return authStore.isAuthenticated && 
         listing.value && 
         listing.value.ownerId === authStore.user?.id
})

const isVolunteer = computed(() => {
  return authStore.isAuthenticated && 
         listing.value && 
         listing.value.volunteerId === authStore.user?.id
})

const showContactInfo = computed(() => {
  return isOwner.value || isVolunteer.value
})

const canClaim = computed(() => {
  if (!authStore.isAuthenticated || !listing.value) return false
  if (listing.value.status !== LISTING_STATUS.AVAILABLE) return false
  if (isOwner.value) return false
  if (isPickupExpired.value) return false
  return true
})

const claimDisabledReason = computed(() => {
  if (!authStore.isAuthenticated) return 'Please login to claim'
  if (isOwner.value) return 'Cannot claim your own listing'
  if (listing.value?.status !== LISTING_STATUS.AVAILABLE) return 'Listing not available'
  if (isPickupExpired.value) return 'Pickup window has expired'
  return ''
})

const isPickupExpired = computed(() => {
  if (!listing.value?.pickupWindow?.end) return false
  
  // Helper function to convert Firestore Timestamp to Date
  const convertToDate = (date) => {
    if (date && typeof date === 'object' && date._seconds) {
      return new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000)
    }
    return new Date(date)
  }
  
  const endDate = convertToDate(listing.value.pickupWindow.end)
  return endDate < new Date()
})

const hasDietaryInfo = computed(() => {
  return listing.value?.dietaryInfo && 
         Object.values(listing.value.dietaryInfo).some(value => value === true)
})

const ownerName = computed(() => {
  if (!listing.value?.owner) return 'Anonymous'
  const { firstName, lastName } = listing.value.owner
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  } else if (firstName) {
    return firstName
  } else if (lastName) {
    return lastName
  }
  return 'Anonymous'
})

const ownerInitials = computed(() => {
  if (!listing.value?.owner) return 'U'
  const { firstName, lastName } = listing.value.owner
  let initials = ''
  if (firstName) initials += firstName.charAt(0).toUpperCase()
  if (lastName) initials += lastName.charAt(0).toUpperCase()
  return initials || 'U'
})

// Owner avatar image handling
const ownerImageError = ref(false)
const ownerProfileImageUrl = computed(() => {
  if (ownerImageError.value) return null
  const img = listing.value?.owner?.profileImage || listing.value?.owner?.avatarUrl
  return img || null
})
const onAvatarError = () => {
  ownerImageError.value = true
}

const volunteerName = computed(() => {
  if (!listing.value?.volunteer) return null
  const { firstName, lastName } = listing.value.volunteer
  if (firstName && lastName) {
    return `${firstName} ${lastName}`
  } else if (firstName) {
    return firstName
  } else if (lastName) {
    return lastName
  }
  return null
})

// Methods
const formatCategory = (category) => {
  return FOOD_CATEGORY_LABELS[category] || category
}

const formatDate = (date) => {
  if (!date) return ''
  
  // Handle Firestore Timestamp objects
  if (date && typeof date === 'object' && date._seconds) {
    const timestamp = new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000)
    return timestamp.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Handle regular date strings or Date objects
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPickupWindow = (pickupWindow) => {
  if (!pickupWindow) return 'Not specified'
  
  // Helper function to convert Firestore Timestamp to Date
  const convertToDate = (date) => {
    if (date && typeof date === 'object' && date._seconds) {
      return new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000)
    }
    return new Date(date)
  }
  
  const start = convertToDate(pickupWindow.start)
  const end = convertToDate(pickupWindow.end)
  
  const formatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  
  return `${start.toLocaleDateString('en-US', formatOptions)} - ${end.toLocaleDateString('en-US', formatOptions)}`
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
  if (diffDays === 1) return 'Expires tomorrow'
  return `Expires in ${diffDays} days`
}

const isExpiringSoon = (expiryDate) => {
  if (!expiryDate) return false
  const expiry = new Date(expiryDate)
  const now = new Date()
  const diffHours = (expiry - now) / (1000 * 60 * 60)
  return diffHours <= 6 && diffHours > 0
}

const isPickupActive = (pickupWindow) => {
  if (!pickupWindow) return false
  
  // Helper function to convert Firestore Timestamp to Date
  const convertToDate = (date) => {
    if (date && typeof date === 'object' && date._seconds) {
      return new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000)
    }
    return new Date(date)
  }
  
  const now = new Date()
  const start = convertToDate(pickupWindow.start)
  const end = convertToDate(pickupWindow.end)
  return now >= start && now <= end
}

const isPickupUpcoming = (pickupWindow) => {
  if (!pickupWindow) return false
  
  // Helper function to convert Firestore Timestamp to Date
  const convertToDate = (date) => {
    if (date && typeof date === 'object' && date._seconds) {
      return new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1000000)
    }
    return new Date(date)
  }
  
  const now = new Date()
  const start = convertToDate(pickupWindow.start)
  return now < start
}

const getStatusColor = (status) => {
  return LISTING_STATUS_COLORS[status] || 'text-gray-600 bg-gray-100'
}

const getStatusColorClass = (status) => {
  const statusClasses = {
    [LISTING_STATUS.AVAILABLE]: 'available',
    [LISTING_STATUS.CLAIMED]: 'claimed',
    [LISTING_STATUS.IN_TRANSIT]: 'in-transit',
    [LISTING_STATUS.DELIVERED]: 'delivered',
    [LISTING_STATUS.EXPIRED]: 'expired',
    [LISTING_STATUS.CANCELLED]: 'cancelled'
  }
  return statusClasses[status] || 'default'
}

const getStatusLabel = (status) => {
  return LISTING_STATUS_LABELS[status] || status
}

const claimListing = async () => {
  if (!canClaim.value) return
  
  claiming.value = true
  
  try {
    const result = await listingsStore.claimListing(route.params.id)
    
    if (result.success) {
      // Refresh the listing to get updated data
      await listingsStore.fetchListingById(route.params.id)
    } else {
      throw new Error(result.error || 'Failed to claim listing')
    }
  } catch (error) {
    console.error('Failed to claim listing:', error)
    notificationStore.error('Claim Failed', error.message || 'Failed to claim listing. Please try again.')
  } finally {
    claiming.value = false
  }
}

const updateStatus = async (newStatus, additionalData = {}) => {
  updating.value = true
  
  try {
    const result = await listingsStore.updateListingStatus(route.params.id, newStatus, additionalData)
    
    if (result.success) {
      // Refresh the listing to get updated data
      await listingsStore.fetchListingById(route.params.id)
    } else {
      throw new Error(result.error || 'Failed to update status')
    }
  } catch (error) {
    console.error('Failed to update status:', error)
    notificationStore.error('Update Failed', error.message || 'Failed to update listing status.')
  } finally {
    updating.value = false
  }
}

// Lifecycle
onMounted(async () => {
  try {
    // Check if we have the listing in store
    if (!listing.value) {
      // Fetch the specific listing
      await listingsStore.fetchListingById(route.params.id)
    }
  } catch (error) {
    console.error('Failed to load listing:', error)
    notificationStore.error('Load Failed', 'Failed to load listing details.')
  } finally {
    loading.value = false
  }
})

// Watch for route changes
watch(() => route.params.id, async (newId) => {
  if (newId) {
    loading.value = true
    try {
      await listingsStore.fetchListingById(newId)
    } catch (error) {
      console.error('Failed to load listing:', error)
    } finally {
      loading.value = false
    }
  }
})
</script>

<style scoped>
/* Global Styles */
.listing-detail-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  margin-top: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.listing-hero {
  padding: 40px 0;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  animation: float 6s ease-in-out infinite;
}

.orb-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  bottom: 15%;
  left: 70%;
  animation-delay: 4s;
}

/* Loading State */
.loading-container {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top: 4px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  animation-delay: -0.4s;
  border-top-color: rgba(255, 255, 255, 0.6);
}

.spinner-ring:nth-child(3) {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  animation-delay: -0.8s;
  border-top-color: rgba(255, 255, 255, 0.4);
}

.loading-text {
  color: white;
  font-size: 18px;
  font-weight: 500;
}

/* Not Found State */
.not-found-container {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 60px 20px;
}

.not-found-content {
  max-width: 500px;
  margin: 0 auto;
}

.not-found-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-icon .icon {
  width: 40px;
  height: 40px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

.not-found-title {
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.not-found-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
  line-height: 1.6;
}

.not-found-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.not-found-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.action-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Hero Header */
.hero-header {
  position: relative;
  z-index: 1;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 32px;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(-4px);
}

.back-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.status-badge {
  margin-bottom: 20px;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-indicator.available {
  background: rgba(0, 255, 136, 0.15);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.3);
}

.status-indicator.claimed {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.status-indicator.delivered {
  background: rgba(40, 167, 69, 0.15);
  color: #28a745;
  border: 1px solid rgba(40, 167, 69, 0.3);
}

.status-indicator.expired {
  background: rgba(220, 53, 69, 0.15);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.status-indicator.cancelled {
  background: rgba(108, 117, 125, 0.15);
  color: #6c757d;
  border: 1px solid rgba(108, 117, 125, 0.3);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.1;
  color: white;
  margin-bottom: 24px;
}

.hero-meta {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  font-weight: 500;
}

.meta-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.expiring-soon {
  color: #ff6b6b !important;
  font-weight: 700;
}

/* Main Content */
.main-content {
  padding: 40px 0 80px;
  position: relative;
  z-index: 1;
  margin-top: -20px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.main-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Content Cards */
.content-card {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* Image Gallery */
.image-gallery-card {
  overflow: hidden;
}

.image-container {
  position: relative;
}

.image-wrapper {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.content-card:hover .main-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-controls {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
}

.image-nav {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.image-nav:hover:not(:disabled) {
  background: white;
  transform: scale(1.1);
}

.image-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-icon {
  width: 24px;
  height: 24px;
  stroke: #1a1a1a;
  stroke-width: 2;
  fill: none;
}

.image-indicators {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.05));
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  transform: scale(1.2);
}

.no-image-placeholder {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.placeholder-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #dee2e6, #adb5bd);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.placeholder-icon .icon {
  width: 40px;
  height: 40px;
  stroke: #6c757d;
  stroke-width: 2;
  fill: none;
}

.placeholder-text {
  color: #6c757d;
  font-size: 16px;
  font-weight: 500;
}

/* Details Card */
.details-card .card-header {
  padding: 24px 32px;
  border-bottom: 1px solid #f0f0f0;
}

.posted-info {
  text-align: right;
}

.posted-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.updated-info {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.card-content {
  padding: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.section-title.warning {
  color: #dc3545;
}

.description-section {
  margin-bottom: 32px;
}

.description-text {
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  white-space: pre-line;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border: 1px solid #e9ecef;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.info-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.info-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon.quantity {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.info-icon.category {
  background: linear-gradient(45deg, #f093fb, #f5576c);
}

.info-icon.location {
  background: linear-gradient(45deg, #4facfe, #00f2fe);
}

.info-icon.expiry {
  background: linear-gradient(45deg, #43e97b, #38f9d7);
}

.info-icon .icon {
  width: 24px;
  height: 24px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  font-size: 12px;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 600;
}

/* Pickup Section */
.pickup-section {
  margin-bottom: 32px;
}

.pickup-card {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border: 1px solid #90caf9;
  border-radius: 16px;
  padding: 24px;
}

.pickup-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.time-label {
  font-size: 14px;
  color: #1565c0;
  font-weight: 600;
  margin-bottom: 8px;
}

.time-range {
  font-size: 16px;
  color: #0d47a1;
  font-weight: 700;
}

.pickup-status .status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(76, 175, 80, 0.15);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.status-badge.upcoming {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.status-badge.ended {
  background: rgba(158, 158, 158, 0.15);
  color: #9e9e9e;
  border: 1px solid rgba(158, 158, 158, 0.3);
}

/* Tags */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dietary-tag {
  background: rgba(76, 175, 80, 0.1);
  color: #388e3c;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.allergen-tag {
  background: rgba(244, 67, 54, 0.1);
  color: #d32f2f;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

/* Sections */
.dietary-section,
.allergen-section,
.instructions-section {
  margin-bottom: 32px;
}

.allergen-warning {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.instructions-card {
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border: 1px solid #e9ecef;
}

.instructions-card.special {
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border-color: #f1c40f;
}

.instructions-text {
  font-size: 14px;
  line-height: 1.6;
  color: #444;
  white-space: pre-line;
}

/* Stats */
.stats-section {
  display: flex;
  gap: 32px;
  padding-top: 24px;
  border-top: 1px solid #e9ecef;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #1a1a1a;
}

.stat-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Action Card */
.action-card {
  position: sticky;
  top: 20px;
}

.action-header {
  text-align: center;
  padding: 24px 24px 0;
}

.action-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.action-content {
  padding: 24px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.owner-actions,
.volunteer-actions,
.guest-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.primary {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.action-btn.secondary {
  background: white;
  color: #666;
  border: 2px solid #e9ecef;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #dee2e6;
  transform: translateY(-2px);
}

.action-btn.claim {
  background: linear-gradient(45deg, #4caf50, #8bc34a);
  color: white;
}

.action-btn.claim:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
}

.action-btn.login {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.action-btn.login:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.action-note {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 8px;
}

/* Status Actions */
.status-actions {
  text-align: center;
}

.claimed-status,
.delivered-status,
.expired-status,
.cancelled-status {
  text-align: center;
}

.status-info {
  margin-bottom: 20px;
}

.status-message {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.status-message.success {
  color: #28a745;
}

.status-message.expired {
  color: #dc3545;
}

.status-message.cancelled {
  color: #6c757d;
}

.status-description {
  font-size: 14px;
  color: #666;
}

.volunteer-info {
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.success-icon,
.expired-icon,
.cancelled-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon {
  background: linear-gradient(45deg, #28a745, #20c997);
}

.expired-icon {
  background: linear-gradient(45deg, #dc3545, #fd7e14);
}

.cancelled-icon {
  background: linear-gradient(45deg, #6c757d, #adb5bd);
}

.success-icon .icon,
.expired-icon .icon,
.cancelled-icon .icon {
  width: 30px;
  height: 30px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

/* Contact Card */
.contact-card .card-header {
  padding: 20px 24px 0;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.poster-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.poster-avatar {
  position: relative;
  width: 60px;
  height: 60px;
}

.avatar-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  animation: rotate 3s linear infinite;
}

.avatar-content {
  position: relative;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: #667eea;
  z-index: 2;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.poster-details {
  flex: 1;
}

.poster-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.poster-role {
  font-size: 14px;
  color: #666;
}

.contact-info {
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  width: 16px;
  height: 16px;
  stroke: #666;
  stroke-width: 2;
  fill: none;
}

.contact-link {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  color: #0056b3;
}

.contact-placeholder {
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
  text-align: center;
}

.contact-placeholder .placeholder-icon {
  width: 40px;
  height: 40px;
  background: #f8f9fa;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}

.contact-placeholder .placeholder-icon svg {
  width: 20px;
  height: 20px;
  stroke: #999;
  stroke-width: 2;
  fill: none;
}

.contact-placeholder .placeholder-text {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(3deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .sidebar {
    order: -1;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .hero-meta {
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .listing-hero {
    padding: 30px 0;
    min-height: 300px;
  }
  
  .hero-title {
    font-size: 28px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .pickup-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .stats-section {
    gap: 20px;
  }
  
  .card-content {
    padding: 24px;
  }
  
  .action-content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 24px;
  }
  
  .meta-item {
    font-size: 14px;
  }
  
  .content-card {
    border-radius: 16px;
  }
  
  .image-wrapper {
    height: 250px;
  }
  
  .orb-1, .orb-2, .orb-3 {
    width: 60px;
    height: 60px;
  }
}
</style>