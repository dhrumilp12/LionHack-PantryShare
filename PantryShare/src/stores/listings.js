import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Mock data for development
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
    imageUrl: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
    address: '123 School St, Education City',
    location: { lat: 40.7128, lng: -74.0060 },
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
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    address: '456 Main St, Downtown',
    location: { lat: 40.7180, lng: -74.0020 },
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
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
    address: '789 Business Blvd, Tech District',
    location: { lat: 40.7200, lng: -73.9950 },
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
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    address: '321 Campus Dr, University Heights',
    location: { lat: 40.7100, lng: -74.0100 },
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
    imageUrl: 'https://images.unsplash.com/photo-1573246123716-6bccf80e61e0?w=400',
    address: '654 Market St, Uptown',
    location: { lat: 40.7250, lng: -74.0080 },
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
  const listings = ref([...mockListings])
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    status: 'Available',
    distance: 10, // km
    category: null,
    expiryDate: null,
  })

  // Computed
  const availableListings = computed(() => 
    listings.value.filter(listing => listing.status === 'Available')
  )

  const nearbyListings = computed(() => {
    // TODO: Implement distance filtering based on user location
    return availableListings.value
  })

  // Actions
  const fetchListings = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // For now, just use mock data
      // In real implementation, replace with actual API call
      // const response = await fetch('/api/listings', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('ps_token')}`,
      //   },
      // })
      
      // const data = await response.json()
      
      // if (data.success) {
      //   listings.value = data.listings || []
      // } else {
      //   throw new Error(data.message || 'Failed to fetch listings')
      // }
      
      // Using mock data for now
      listings.value = [...mockListings]
    } catch (err) {
      error.value = err.message
      console.error('Error fetching listings:', err)
    } finally {
      loading.value = false
    }
  }

  const createListing = async (listingData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create new listing with mock data
      const newListing = {
        id: Date.now().toString(),
        ...listingData,
        status: 'Available',
        ownerId: 'current-user', // In real app, get from auth store
        ownerName: 'Current User', // In real app, get from auth store
        createdAt: new Date().toISOString(),
      }
      
      listings.value.unshift(newListing)
      return { success: true, listing: newListing }
    } catch (error) {
      console.error('Error creating listing:', error)
      return { success: false, error: error.message }
    }
  }

  const updateListing = async (id, updates) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = listings.value.findIndex(l => l.id === id)
      if (index !== -1) {
        listings.value[index] = { ...listings.value[index], ...updates }
        return { success: true, listing: listings.value[index] }
      } else {
        throw new Error('Listing not found')
      }
    } catch (error) {
      console.error('Error updating listing:', error)
      return { success: false, error: error.message }
    }
  }

  const claimListing = async (listingId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = listings.value.findIndex(l => l.id === listingId)
      if (index !== -1) {
        listings.value[index].status = 'Claimed'
        listings.value[index].volunteerId = 'current-user'
        return { success: true }
      } else {
        throw new Error('Listing not found')
      }
    } catch (error) {
      console.error('Error claiming listing:', error)
      return { success: false, error: error.message }
    }
  }

  const deleteListing = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      listings.value = listings.value.filter(l => l.id !== id)
      return { success: true }
    } catch (error) {
      console.error('Error deleting listing:', error)
      return { success: false, error: error.message }
    }
  }

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    listings,
    loading,
    error,
    filters,
    availableListings,
    nearbyListings,
    fetchListings,
    createListing,
    updateListing,
    claimListing,
    deleteListing,
    setFilters,
    clearError,
  }
})
