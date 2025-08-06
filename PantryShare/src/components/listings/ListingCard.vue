<template>
  <div class="ps-card ps-card--hover cursor-pointer group" @click="handleClick">
    <!-- Image -->
    <div class="relative h-48 bg-gray-200 overflow-hidden">
      <img
        v-if="listing.imageUrl"
        :src="listing.imageUrl"
        :alt="listing.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
        <PhotoIcon class="w-12 h-12 text-gray-400" />
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-3 left-3">
        <span class="ps-badge" :class="getStatusBadgeClass(listing.status)">
          {{ listing.status }}
        </span>
      </div>
      
      <!-- Distance Badge -->
      <div v-if="distance" class="absolute top-3 right-3">
        <span class="ps-badge ps-badge--primary bg-black/50 text-white">
          {{ distance }}km
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="ps-card__content">
      <!-- Title & Description -->
      <h3 class="font-heading font-semibold text-lg mb-2 line-clamp-1">
        {{ listing.title || listing.description }}
      </h3>
      <p class="text-neutral-600 text-sm mb-3 line-clamp-2">
        {{ listing.description }}
      </p>
      
      <!-- Metadata -->
      <div class="space-y-2 mb-4">
        <!-- Quantity -->
        <div class="flex items-center text-sm text-neutral-600">
          <UsersIcon class="w-4 h-4 mr-2" />
          <span>{{ listing.quantity }} {{ listing.unit || 'portions' }}</span>
        </div>
        
        <!-- Pickup Time -->
        <div v-if="listing.pickupWindow" class="flex items-center text-sm text-neutral-600">
          <ClockIcon class="w-4 h-4 mr-2" />
          <span>Pickup: {{ formatPickupTime(listing.pickupWindow) }}</span>
        </div>
        
        <!-- Expiry -->
        <div v-if="listing.expiryDate" class="flex items-center text-sm">
          <CalendarIcon class="w-4 h-4 mr-2" />
          <span :class="getExpiryClass(listing.expiryDate)">
            Expires: {{ formatDate(listing.expiryDate) }}
          </span>
        </div>
        
        <!-- Location -->
        <div v-if="listing.address" class="flex items-center text-sm text-neutral-600">
          <MapPinIcon class="w-4 h-4 mr-2" />
          <span class="line-clamp-1">{{ listing.address }}</span>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <!-- Owner Avatar -->
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-medium">
              {{ listing.ownerName?.charAt(0)?.toUpperCase() || 'U' }}
            </span>
          </div>
          <div>
            <div class="text-sm font-medium">{{ listing.ownerName || 'Anonymous' }}</div>
            <div class="text-xs text-neutral-500">{{ formatDate(listing.createdAt) }}</div>
          </div>
        </div>
        
        <!-- Action Button -->
        <button
          v-if="listing.status === 'Available' && canClaim"
          @click.stop="handleClaim"
          :disabled="loading"
          class="ps-btn ps-btn--primary ps-btn--sm"
        >
          <span v-if="loading">Claiming...</span>
          <span v-else>Claim</span>
        </button>
        
        <button
          v-else-if="listing.status === 'Claimed'"
          class="ps-btn ps-btn--text ps-btn--sm cursor-not-allowed opacity-50"
          disabled
        >
          Claimed
        </button>
        
        <button
          v-else-if="listing.status === 'Delivered'"
          class="ps-btn ps-btn--text ps-btn--sm cursor-not-allowed opacity-50"
          disabled
        >
          Delivered
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useListingsStore } from '@/stores/listings'
import { useNotificationStore } from '@/stores/notifications'
import {
  PhotoIcon,
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  listing: {
    type: Object,
    required: true,
  },
  distance: {
    type: Number,
    default: null,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const authStore = useAuthStore()
const listingsStore = useListingsStore()
const notificationStore = useNotificationStore()

// State
const loading = ref(false)

// Computed
const canClaim = computed(() => {
  return authStore.isAuthenticated && 
         props.listing.ownerId !== authStore.user?.id &&
         props.listing.status === 'Available'
})

// Methods
const handleClick = () => {
  router.push(`/listings/${props.listing.id}`)
}

const handleClaim = async () => {
  if (!authStore.isAuthenticated) {
    notificationStore.warning('Please login to claim listings')
    router.push('/login')
    return
  }

  loading.value = true
  try {
    const result = await listingsStore.claimListing(props.listing.id)
    if (result.success) {
      notificationStore.success('Listing claimed successfully!')
    } else {
      notificationStore.error(result.error || 'Failed to claim listing')
    }
  } finally {
    loading.value = false
  }
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'Available': 'ps-badge--success',
    'Claimed': 'ps-badge--warning',
    'Delivered': 'ps-badge--primary',
    'Expired': 'ps-badge--error',
  }
  return classes[status] || 'ps-badge--primary'
}

const getExpiryClass = (expiryDate) => {
  const now = new Date()
  const expiry = new Date(expiryDate)
  const hoursUntilExpiry = (expiry - now) / (1000 * 60 * 60)
  
  if (hoursUntilExpiry < 0) {
    return 'text-error'
  } else if (hoursUntilExpiry < 12) {
    return 'text-warning'
  }
  return 'text-neutral-600'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)
  
  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  } else if (diffInHours < 168) { // 7 days
    return `${Math.floor(diffInHours / 24)}d ago`
  } else {
    return date.toLocaleDateString()
  }
}

const formatPickupTime = (pickupWindow) => {
  if (!pickupWindow) return ''
  
  const start = new Date(pickupWindow.start)
  const end = new Date(pickupWindow.end)
  
  // If same day, show time range
  if (start.toDateString() === end.toDateString()) {
    return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  }
  
  return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
