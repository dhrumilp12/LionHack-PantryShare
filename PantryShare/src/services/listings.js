/**
 * Listings API Service
 * Handles all listing-related API calls
 */

import { apiClient } from './api.js'
import { handleApiError, cachedRequest, clearCachePattern } from './interceptors.js'

class ListingsService {
  constructor() {
    this.endpoints = {
      listings: '/listings',
      search: '/listings/search',
      claim: (id) => `/listings/${id}/claim`,
      status: (id) => `/listings/${id}/status`,
      analytics: (id) => `/listings/${id}/analytics`,
      userListings: (userId) => `/listings/user/${userId}`
    }
  }

  /**
   * Get listings with filters and pagination
   */
  async getListings(params = {}) {
    try {
      const {
        latitude,
        longitude,
        radius = 10,
        category,
        status,
        limit = 20,
        offset = 0,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        startAfter
      } = params

      const queryParams = {
        ...(latitude && longitude && { latitude, longitude }),
        ...(radius && { radius }),
        ...(category && { category }),
        ...(status && { status }),
        limit,
        offset,
        sortBy,
        sortOrder,
        ...(startAfter && { startAfter })
      }

      // Use cached request for better performance
      const cacheKey = `listings_${JSON.stringify(queryParams)}`
      
      return await cachedRequest(
        () => apiClient.get(this.endpoints.listings, queryParams),
        cacheKey,
        60000 // 1 minute cache
      )
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Search listings by text
   */
  async searchListings(searchTerm, filters = {}) {
    try {
      if (!searchTerm || searchTerm.trim().length < 2) {
        throw new Error('Search term must be at least 2 characters long')
      }

      const params = {
        q: searchTerm.trim(),
        ...filters
      }

      return await apiClient.get(this.endpoints.search, params)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Get specific listing by ID
   */
  async getListingById(id) {
    try {
      if (!id) {
        throw new Error('Listing ID is required')
      }

      const cacheKey = `listing_${id}`
      
      const response = await cachedRequest(
        () => apiClient.get(`${this.endpoints.listings}/${id}`),
        cacheKey,
        300000 // 5 minutes cache
      )
      console.log('Listing fetched:', response.data)
      return response
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Create a new listing
   */
  async createListing(listingData) {
    try {
      // Validate required fields
      this.validateListingData(listingData)

      const result = await apiClient.post(this.endpoints.listings, listingData)
      
      // Clear listings cache after creating
      clearCachePattern(/^listings_/)
      
      return result
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Update a listing
   */
  async updateListing(id, updateData) {
    try {
      if (!id) {
        throw new Error('Listing ID is required')
      }

      const result = await apiClient.put(`${this.endpoints.listings}/${id}`, updateData)
      
      // Clear related cache entries
      clearCachePattern(/^listings_/)
      clearCachePattern(`listing_${id}`)
      
      return result
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Claim a listing
   */
  async claimListing(id) {
    try {
      if (!id) {
        throw new Error('Listing ID is required')
      }

      const result = await apiClient.post(this.endpoints.claim(id))
      
      // Clear related cache entries
      clearCachePattern(/^listings_/)
      clearCachePattern(`listing_${id}`)
      
      return result
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Update listing status
   */
  async updateListingStatus(id, status, additionalData = {}) {
    try {
      if (!id) {
        throw new Error('Listing ID is required')
      }

      if (!status) {
        throw new Error('Status is required')
      }

      const result = await apiClient.put(this.endpoints.status(id), {
        status,
        ...additionalData
      })
      
      // Clear related cache entries
      clearCachePattern(/^listings_/)
      clearCachePattern(`listing_${id}`)
      
      return result
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Delete a listing
   */
  async deleteListing(id) {
    try {
      if (!id) {
        throw new Error('Listing ID is required')
      }

      const result = await apiClient.delete(`${this.endpoints.listings}/${id}`)
      
      // Clear related cache entries
      clearCachePattern(/^listings_/)
      clearCachePattern(`listing_${id}`)
      
      return result
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Get listing analytics
   */
  async getListingAnalytics(id) {
    try {
      if (!id) {
        throw new Error('Listing ID is required')
      }

      return await apiClient.get(this.endpoints.analytics(id))
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Get listings by user
   */
  async getUserListings(userId, params = {}) {
    try {
      if (!userId) {
        throw new Error('User ID is required')
      }

      return await apiClient.get(this.endpoints.userListings(userId), params)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Upload listing images
   */
  async uploadImages(files, onProgress = null) {
    try {
      if (!files || files.length === 0) {
        throw new Error('At least one file is required')
      }

      return await apiClient.uploadFiles('/upload/images', files, onProgress)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  /**
   * Validate listing data before sending to API
   */
  validateListingData(data) {
    const requiredFields = ['title', 'description', 'category', 'quantity', 'location', 'expiryDate', 'pickupWindow']
    
    for (const field of requiredFields) {
      if (!data[field]) {
        throw new Error(`${field} is required`)
      }
    }

    // Validate dates
    const expiryDate = new Date(data.expiryDate)
    const now = new Date()
    
    if (expiryDate <= now) {
      throw new Error('Expiry date must be in the future')
    }

    // Validate pickup window
    if (data.pickupWindow) {
      const pickupStart = new Date(data.pickupWindow.start)
      const pickupEnd = new Date(data.pickupWindow.end)
      
      if (pickupStart <= now) {
        throw new Error('Pickup start time must be in the future')
      }
      
      if (pickupEnd <= pickupStart) {
        throw new Error('Pickup end time must be after start time')
      }
    }

    // Validate quantity
    if (data.quantity && data.quantity <= 0) {
      throw new Error('Quantity must be greater than 0')
    }
  }

  /**
   * Format listing data for API
   */
  formatListingForApi(formData) {
    return {
      title: formData.title?.trim(),
      description: formData.description?.trim(),
      category: formData.category,
      quantity: parseInt(formData.quantity) || 1,
      unit: formData.unit || 'portions',
      location: {
        address: formData.address?.trim(),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        ...(formData.locationDetails && { details: formData.locationDetails.trim() })
      },
      expiryDate: formData.expiryDate,
      pickupWindow: {
        start: formData.pickupStart,
        end: formData.pickupEnd
      },
      ...(formData.pickupInstructions && { 
        pickupInstructions: formData.pickupInstructions.trim() 
      }),
      ...(formData.contactInfo && { contactInfo: formData.contactInfo }),
      ...(formData.allergens && formData.allergens.length > 0 && { 
        allergens: formData.allergens 
      }),
      ...(formData.dietaryInfo && { dietaryInfo: formData.dietaryInfo }),
      ...(formData.imageUrls && formData.imageUrls.length > 0 && { 
        imageUrls: formData.imageUrls 
      }),
      ...(formData.specialInstructions && { 
        specialInstructions: formData.specialInstructions.trim() 
      })
    }
  }

  /**
   * Format listing data from API for frontend
   */
  formatListingFromApi(apiData) {
    if (!apiData) return null

    // Handle different response structures
    let listing
    if (apiData.success && apiData.data) {
      listing = apiData.data.listing || apiData.data
    } else if (apiData.data) {
      listing = apiData.data.listing || apiData.data
    } else {
      listing = apiData
    }

    if (!listing) return null

    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      category: listing.category,
      quantity: listing.quantity,
      unit: listing.unit || 'portions',
      status: listing.status,
      location: listing.location,
      address: listing.location?.address,
      coordinates: listing.location?.latitude && listing.location?.longitude 
        ? { lat: listing.location.latitude, lng: listing.location.longitude }
        : null,
      expiryDate: listing.expiryDate,
      pickupWindow: listing.pickupWindow,
      pickupInstructions: listing.pickupInstructions,
      contactInfo: listing.contactInfo,
      allergens: listing.allergens || [],
      dietaryInfo: listing.dietaryInfo || {},
      imageUrls: listing.imageUrls || [],
      specialInstructions: listing.specialInstructions,
      owner: listing.owner,
      ownerId: listing.ownerId,
      ownerName: listing.owner?.name || listing.ownerName,
      volunteer: listing.volunteer,
      volunteerId: listing.volunteerId,
      volunteerName: listing.volunteer?.name || listing.volunteerName,
      viewCount: listing.viewCount || 0,
      claimCount: listing.claimCount || 0,
      isActive: listing.isActive,
      createdAt: listing.createdAt,
      updatedAt: listing.updatedAt,
      claimedAt: listing.claimedAt,
      deliveredAt: listing.deliveredAt
    }
  }
}

// Create and export singleton instance
export const listingsService = new ListingsService()
export default listingsService
