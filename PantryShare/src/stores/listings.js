import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { listingsService } from '@/services/listings.js'
import { useAuthStore } from './auth.js'
import { useNotificationStore } from './notifications.js'

// Mock data for development (fallback)
const mockListings = [
  {
    id: '1',
    title: 'Fresh Sandwiches from School Cafeteria',
    description: 'We have 20 fresh sandwiches left over from lunch service. Mixed varieties including turkey, ham, and vegetarian options.',
    quantity: 20,
    unit: 'sandwiches',
    status: 'Available',
    ownerId: 'user1',
    ownerName: 'Lincoln High School',
    imageUrls: ['https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400'],
    address: '123 School St, Education City',
    location: { lat: 40.7128, lng: -74.0060 },
    coordinates: { lat: 40.7128, lng: -74.0060 }, // Add coordinates for map
    expiryDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    pickupWindow: {
      start: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(), // 1 hour from now
      end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: '2',
    title: 'Bakery Surplus - Bread & Pastries',
    description: 'End-of-day surplus from our family bakery. Includes artisan breads, croissants, and muffins.',
    quantity: 15,
    unit: 'items',
    status: 'Available',
    ownerId: 'user2',
    ownerName: 'Corner Bakery',
    imageUrls: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'],
    address: '456 Main St, Downtown',
    location: { lat: 40.7180, lng: -74.0020 },
    coordinates: { lat: 40.7180, lng: -74.0020 }, // Add coordinates for map
    expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
    pickupWindow: {
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    title: 'Fruit Bowl Surplus',
    description: 'Fresh fruit cups and whole fruits from our office cafeteria. Perfect for healthy snacks.',
    quantity: 30,
    unit: 'portions',
    status: 'Claimed',
    ownerId: 'user3',
    ownerName: 'Tech Corp Cafeteria',
    volunteerId: 'volunteer1',
    imageUrls: ['https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400'],
    address: '789 Business Blvd, Tech District',
    location: { lat: 40.7200, lng: -73.9950 },
    coordinates: { lat: 40.7200, lng: -73.9950 }, // Add coordinates for map
    expiryDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours from now
    pickupWindow: {
      start: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
  },
  {
    id: '4',
    title: 'Pizza Slices Available',
    description: 'Leftover pizza from student event. Cheese and pepperoni slices available for pickup.',
    quantity: 12,
    unit: 'slices',
    status: 'Available',
    ownerId: 'user4',
    ownerName: 'University Student Union',
    imageUrls: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'],
    address: '321 Campus Dr, University Heights',
    location: { lat: 40.7100, lng: -74.0100 },
    coordinates: { lat: 40.7100, lng: -74.0100 }, // Add coordinates for map
    expiryDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    pickupWindow: {
      start: new Date().toISOString(),
      end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    },
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: '5',
    title: 'Grocery Store Produce',
    description: 'Fresh vegetables and fruits that are still good but approaching sell-by date.',
    quantity: 25,
    unit: 'pounds',
    status: 'Available',
    ownerId: 'user5',
    ownerName: 'Green Grocer',
    imageUrls: ['https://images.unsplash.com/photo-1573246123716-6bccf80e61e0?w=400'],
    address: '654 Market St, Uptown',
    location: { lat: 40.7250, lng: -74.0080 },
    coordinates: { lat: 40.7250, lng: -74.0080 }, // Add coordinates for map
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
    pickupWindow: {
      start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      end: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    },
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
  },
]

export const useListingsStore = defineStore('listings', () => {
  // State
  const listings = ref([])
  const currentListing = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchResults = ref([])
  const searchLoading = ref(false)
  const pagination = ref({
    hasMore: false,
    lastDoc: null,
    limit: 20,
    offset: 0
  })
  const filters = ref({
    status: 'available',
    distance: 10, // km
    category: null,
    expiryDate: null,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Get auth and notification stores
  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()

  // Computed
  const availableListings = computed(() => 
    listings.value.filter(listing => listing.status === 'available')
  )

  const userListings = computed(() => {
    if (!authStore.user?.id) return []
    return listings.value.filter(listing => listing.ownerId === authStore.user.id)
  })

  const claimedListings = computed(() => {
    if (!authStore.user?.id) return []
    return listings.value.filter(listing => listing.volunteerId === authStore.user.id)
  })

  const nearbyListings = computed(() => {
    // TODO: Implement distance filtering based on user location
    return availableListings.value
  })

  // Actions
  const fetchListings = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      // Merge with current filters
      const queryParams = {
        ...filters.value,
        ...params,
        ...(authStore.user?.location && {
          latitude: authStore.user.location.latitude,
          longitude: authStore.user.location.longitude
        })
      }

      const response = await listingsService.getListings(queryParams)
      
      if (response.success) {
        // Replace or append listings based on pagination
        if (params.offset === 0 || !params.offset) {
          listings.value = response.data.listings.map(listing => 
            listingsService.formatListingFromApi({ data: { listing } })
          )
        } else {
          const newListings = response.data.listings.map(listing => 
            listingsService.formatListingFromApi({ data: { listing } })
          )
          listings.value.push(...newListings)
        }
        
        // Update pagination info
        pagination.value = {
          hasMore: response.data.pagination?.hasMore || false,
          lastDoc: response.data.pagination?.lastDoc || null,
          limit: response.data.pagination?.limit || 20,
          offset: response.data.pagination?.offset || 0
        }
      } else {
        throw new Error(response.message || 'Failed to fetch listings')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching listings:', err)
      
      // Show user-friendly error message
      notificationStore.error('Failed to load listings', 'Please check your connection and try again.')
      
      // Fallback to mock data in development
      if (import.meta.env.MODE === 'development') {
        console.warn('Using mock data as fallback')
        listings.value = [...mockListings]
      }
    } finally {
      loading.value = false
    }
  }

  const fetchListingById = async (id) => {
    if (!id) {
      throw new Error('Listing ID is required')
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await listingsService.getListingById(id)
      
      if (response.success) {
        const formattedListing = listingsService.formatListingFromApi(response)
        currentListing.value = formattedListing
        
        // Also update in listings array if present
        const index = listings.value.findIndex(l => l.id === id)
        if (index !== -1) {
          listings.value[index] = formattedListing
        }
        
        return formattedListing
      } else {
        throw new Error(response.message || 'Failed to fetch listing')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error fetching listing:', err)
      notificationStore.error('Failed to load listing', err.message)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchListings = async (searchTerm, searchFilters = {}) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      searchResults.value = []
      return
    }

    searchLoading.value = true
    error.value = null
    
    try {
      const response = await listingsService.searchListings(searchTerm, {
        ...filters.value,
        ...searchFilters
      })
      
      if (response.success) {
        searchResults.value = response.data.listings.map(listing => 
          listingsService.formatListingFromApi({ data: { listing } })
        )
      } else {
        throw new Error(response.message || 'Search failed')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error searching listings:', err)
      notificationStore.error('Search failed', err.message)
      searchResults.value = []
    } finally {
      searchLoading.value = false
    }
  }

  const createListing = async (listingData) => {
    if (!authStore.isAuthenticated) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null
    
    try {
      // Format data for API
      const formattedData = listingsService.formatListingForApi(listingData)
      
      const response = await listingsService.createListing(formattedData)
      
      if (response.success) {
        const newListing = listingsService.formatListingFromApi(response)
        
        // Add to beginning of listings array
        listings.value.unshift(newListing)
        
        notificationStore.success('Listing created!', 'Your food listing has been posted successfully.')
        
        return { success: true, listing: newListing }
      } else {
        throw new Error(response.message || 'Failed to create listing')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error creating listing:', err)
      notificationStore.error('Failed to create listing', err.message)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateListing = async (id, updates) => {
    if (!authStore.isAuthenticated) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await listingsService.updateListing(id, updates)
      
      if (response.success) {
        const updatedListing = listingsService.formatListingFromApi(response)
        
        // Update in listings array
        const index = listings.value.findIndex(l => l.id === id)
        if (index !== -1) {
          listings.value[index] = updatedListing
        }
        
        // Update current listing if it's the same
        if (currentListing.value?.id === id) {
          currentListing.value = updatedListing
        }
        
        notificationStore.success('Listing updated!', 'Your changes have been saved.')
        
        return { success: true, listing: updatedListing }
      } else {
        throw new Error(response.message || 'Failed to update listing')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error updating listing:', err)
      notificationStore.error('Failed to update listing', err.message)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const claimListing = async (listingId) => {
    if (!authStore.isAuthenticated) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await listingsService.claimListing(listingId)
      
      if (response.success) {
        // Update listing in store
        const index = listings.value.findIndex(l => l.id === listingId)
        if (index !== -1) {
          listings.value[index] = {
            ...listings.value[index],
            status: 'claimed',
            volunteerId: authStore.user.id,
            volunteerName: authStore.user.name,
            claimedAt: new Date().toISOString()
          }
        }
        
        // Update current listing if it's the same
        if (currentListing.value?.id === listingId) {
          currentListing.value = {
            ...currentListing.value,
            status: 'claimed',
            volunteerId: authStore.user.id,
            volunteerName: authStore.user.name,
            claimedAt: new Date().toISOString()
          }
        }
        
        notificationStore.success('Listing claimed!', 'You have successfully claimed this listing.')
        
        return { success: true }
      } else {
        throw new Error(response.message || 'Failed to claim listing')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error claiming listing:', err)
      notificationStore.error('Failed to claim listing', err.message)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateListingStatus = async (listingId, status, additionalData = {}) => {
    if (!authStore.isAuthenticated) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await listingsService.updateListingStatus(listingId, status, additionalData)
      
      if (response.success) {
        const updatedListing = listingsService.formatListingFromApi(response)
        
        // Update in listings array
        const index = listings.value.findIndex(l => l.id === listingId)
        if (index !== -1) {
          listings.value[index] = updatedListing
        }
        
        // Update current listing if it's the same
        if (currentListing.value?.id === listingId) {
          currentListing.value = updatedListing
        }
        
        notificationStore.success('Status updated!', `Listing status changed to ${status}.`)
        
        return { success: true, listing: updatedListing }
      } else {
        throw new Error(response.message || 'Failed to update status')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error updating listing status:', err)
      notificationStore.error('Failed to update status', err.message)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const deleteListing = async (id) => {
    if (!authStore.isAuthenticated) {
      throw new Error('Authentication required')
    }

    loading.value = true
    error.value = null
    
    try {
      const response = await listingsService.deleteListing(id)
      
      if (response.success) {
        // Remove from listings array
        listings.value = listings.value.filter(l => l.id !== id)
        
        // Clear current listing if it's the same
        if (currentListing.value?.id === id) {
          currentListing.value = null
        }
        
        notificationStore.success('Listing deleted!', 'Your listing has been removed.')
        
        return { success: true }
      } else {
        throw new Error(response.message || 'Failed to delete listing')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error deleting listing:', err)
      notificationStore.error('Failed to delete listing', err.message)
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const uploadImages = async (files, onProgress = null) => {
    try {
      const response = await listingsService.uploadImages(files, onProgress)
      
      if (response.success) {
        return response.data.urls || []
      } else {
        throw new Error(response.message || 'Failed to upload images')
      }
    } catch (err) {
      console.error('Error uploading images:', err)
      notificationStore.error('Failed to upload images', err.message)
      throw err
    }
  }

  const loadMore = async () => {
    if (!pagination.value.hasMore || loading.value) {
      return
    }

    const params = {
      ...filters.value,
      offset: listings.value.length,
      startAfter: pagination.value.lastDoc
    }

    await fetchListings(params)
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentListing = () => {
    currentListing.value = null
  }

  const clearSearchResults = () => {
    searchResults.value = []
  }

  // Utility functions
  const getListingById = (id) => {
    return listings.value.find(l => l.id === id)
  }

  const isListingOwner = (listing) => {
    return authStore.user?.id === listing?.ownerId
  }

  const isListingVolunteer = (listing) => {
    return authStore.user?.id === listing?.volunteerId
  }

  const canEditListing = (listing) => {
    return isListingOwner(listing) && ['available', 'claimed'].includes(listing?.status)
  }

  const canClaimListing = (listing) => {
    return !isListingOwner(listing) && 
           listing?.status === 'available' && 
           authStore.isAuthenticated &&
           authStore.userRole === 'volunteer'
  }

  const canUpdateStatus = (listing) => {
    return (isListingOwner(listing) || isListingVolunteer(listing)) &&
           ['claimed', 'in_transit'].includes(listing?.status)
  }

  return {
    // State
    listings,
    currentListing,
    loading,
    error,
    searchResults,
    searchLoading,
    pagination,
    filters,
    
    // Computed
    availableListings,
    userListings,
    claimedListings,
    nearbyListings,
    
    // Actions
    fetchListings,
    fetchListingById,
    searchListings,
    createListing,
    updateListing,
    claimListing,
    updateListingStatus,
    deleteListing,
    uploadImages,
    loadMore,
    setFilters,
    clearError,
    clearCurrentListing,
    clearSearchResults,
    
    // Utilities
    getListingById,
    isListingOwner,
    isListingVolunteer,
    canEditListing,
    canClaimListing,
    canUpdateStatus
  }
})
