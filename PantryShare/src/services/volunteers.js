/**
 * Volunteers API Service
 * Connects frontend to backend volunteer-related endpoints
 */

import apiClient, { ApiError } from './api.js'

class VolunteersService {
  constructor() {
    this.endpoints = {
      nearby: '/volunteers/nearby',
      match: '/volunteers/match',
      opportunities: '/volunteers/opportunities',
      stats: (volunteerId) => `/volunteers/${volunteerId}/stats`,
      availability: '/volunteers/availability',
      // Claim is a listing action but used from the volunteer flow
      claim: (listingId) => `/listings/${listingId}/claim`,
    }
  }

  async getOpportunities(params = {}) {
    try {
      return await apiClient.get(this.endpoints.opportunities, params)
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Failed to load opportunities')
    }
  }

  async getNearbyVolunteers(params = {}) {
    try {
      return await apiClient.get(this.endpoints.nearby, params)
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Failed to load nearby volunteers')
    }
  }

  async matchVolunteers(payload) {
    try {
      return await apiClient.post(this.endpoints.match, payload)
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Failed to match volunteers')
    }
  }

  async getVolunteerStats(volunteerId) {
    try {
      return await apiClient.get(this.endpoints.stats(volunteerId))
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Failed to load volunteer stats')
    }
  }

  async updateAvailability(payload) {
    try {
      return await apiClient.put(this.endpoints.availability, payload)
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Failed to update availability')
    }
  }

  async claimOpportunity(listingId) {
    try {
      return await apiClient.post(this.endpoints.claim(listingId), {})
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Failed to claim opportunity')
    }
  }
}

export const volunteersService = new VolunteersService()
export default volunteersService
