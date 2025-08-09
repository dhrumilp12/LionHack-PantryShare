import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import volunteersService from '@/services/volunteers.js'
import apiClient, { ApiError } from '@/services/api.js'
import { useNotificationStore } from './notifications.js'
import { useAuthStore } from './auth.js'

export const useVolunteersStore = defineStore('volunteers', () => {
  // State
  const opportunities = ref([])
  const nearbyVolunteers = ref([])
  const stats = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const hasMore = ref(false)

  // Filters
  const filters = ref({
    latitude: null,
    longitude: null,
    radius: 15,
    limit: 20,
  })

  // Computed
  const totalOpportunities = computed(() => opportunities.value.length)

  const loadOpportunities = async (opts = {}) => {
    const notificationStore = useNotificationStore()
    const authStore = useAuthStore()

    loading.value = true
    error.value = null

    try {
      const params = { ...filters.value, ...opts }
      // Try private volunteers endpoint first if authenticated
      let res
      if (authStore.isAuthenticated) {
        try {
          res = await volunteersService.getOpportunities(params)
        } catch (e) {
          // If forbidden/unauthorized, fall back below
          if (!(e instanceof ApiError) || (!e.isUnauthorized && !e.isForbidden)) {
            throw e
          }
        }
      }

      // Fallback: public listings (for demo) if no auth or forbidden
      if (!res || res?.success === false) {
        const publicParams = { status: 'available', limit: params.limit || 20 }
        const pub = await apiClient.get('/listings', publicParams)
        // Normalize to same shape used below
        res = {
          success: true,
          data: { opportunities: pub.data?.listings || pub.listings || [] },
          message: pub.message
        }
      }
      if (res?.success) {
        opportunities.value = res.data?.opportunities || []
        hasMore.value = !!res.data?.hasMore
        return { success: true, opportunities: opportunities.value }
      }
  const message = res?.message || 'Failed to fetch opportunities.'
      error.value = message
      notificationStore.error(message, 'Opportunities')
      return { success: false, error: message }
    } catch (err) {
      error.value = err.message || 'Failed to load opportunities.'
      notificationStore.error(error.value, 'Opportunities')
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const claim = async (listingId) => {
    const notificationStore = useNotificationStore()
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
      const msg = 'Please log in as a volunteer to claim.'
      notificationStore.error(msg, 'Claim')
      return { success: false, error: msg }
    }

    try {
      const res = await volunteersService.claimOpportunity(listingId)
      if (res?.success) {
        notificationStore.success('You have successfully claimed this opportunity.', 'Claimed')
        // Update local list (optimistic)
        opportunities.value = opportunities.value.map(o => o.id === listingId ? { ...o, status: 'claimed' } : o)
        return { success: true, data: res.data }
      }
      const message = res?.message || 'Failed to claim.'
      notificationStore.error(message, 'Claim')
      return { success: false, error: message }
    } catch (err) {
      const message = err.message || 'Failed to claim.'
      notificationStore.error(message, 'Claim')
      return { success: false, error: message }
    }
  }

  const loadNearby = async (opts = {}) => {
    loading.value = true
    error.value = null

    try {
      const res = await volunteersService.getNearbyVolunteers(opts)
      if (res?.success) {
        nearbyVolunteers.value = res.data?.volunteers || []
        return { success: true, volunteers: nearbyVolunteers.value }
      }
      error.value = res?.message || 'Failed to fetch nearby volunteers.'
      return { success: false, error: error.value }
    } catch (err) {
      error.value = err.message || 'Failed to fetch nearby volunteers.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const loadStats = async (volunteerId) => {
    loading.value = true
    error.value = null

    try {
      const res = await volunteersService.getVolunteerStats(volunteerId)
      if (res?.success) {
        stats.value = res.data || null
        return { success: true, stats: stats.value }
      }
      error.value = res?.message || 'Failed to load stats.'
      return { success: false, error: error.value }
    } catch (err) {
      error.value = err.message || 'Failed to load stats.'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateAvailability = async (availability) => {
    const notificationStore = useNotificationStore()
    loading.value = true
    error.value = null

    try {
      const res = await volunteersService.updateAvailability(availability)
      if (res?.success) {
        notificationStore.success('Availability updated.')
        return { success: true }
      }
      error.value = res?.message || 'Failed to update availability.'
      notificationStore.error(error.value)
      return { success: false, error: error.value }
    } catch (err) {
      error.value = err.message || 'Failed to update availability.'
      notificationStore.error(error.value)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const setLocation = (lat, lng) => {
    filters.value.latitude = lat
    filters.value.longitude = lng
  }

  return {
    // state
    opportunities,
    nearbyVolunteers,
    stats,
    loading,
    error,
    hasMore,
    filters,

    // getters
    totalOpportunities,

    // actions
    loadOpportunities,
    claim,
    loadNearby,
    loadStats,
    updateAvailability,
    setLocation,
  }
})
