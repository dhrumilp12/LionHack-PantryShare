/**
 * API Client for PantryShare Frontend
 * Handles all HTTP requests to the backend API using Axios
 */

import axios from 'axios'

class ApiClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    this.timeout = 30000 // 30 seconds
    
    // Create axios instance
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  /**
   * Setup request and response interceptors
   */
  setupInterceptors() {
    // Request interceptor - add auth token and handle FormData
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('ps_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // Handle FormData - let browser set Content-Type with boundary
        if (config.data instanceof FormData) {
          delete config.headers['Content-Type']
        }
        
        return config
      },
      (error) => {
        return Promise.reject(this.createApiError(error))
      }
    )

    // Response interceptor - handle errors and extract data
    this.client.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        if (error.response) {
          // Server responded with error status
          const apiError = this.createApiError(error)
          return Promise.reject(apiError)
        } else if (error.request) {
          // Network error
          return Promise.reject(new ApiError(
            'Network error occurred',
            0,
            'NETWORK_ERROR'
          ))
        } else {
          // Request setup error
          return Promise.reject(new ApiError(
            error.message || 'Request failed',
            0,
            'REQUEST_ERROR'
          ))
        }
      }
    )
  }

  /**
   * Create ApiError from axios error
   */
  createApiError(error) {
    if (error.response) {
      const { status, data } = error.response
      return new ApiError(
        data.message || `HTTP ${status}: ${error.response.statusText}`,
        status,
        data.error || 'UNKNOWN_ERROR',
        data.details || null
      )
    }
    
    if (error.code === 'ECONNABORTED') {
      return new ApiError('Request timeout', 408, 'TIMEOUT_ERROR')
    }
    
    return new ApiError(
      error.message || 'Network error occurred',
      0,
      'NETWORK_ERROR'
    )
  }

  // HTTP method helpers
  async get(endpoint, params = {}) {
    return this.client.get(endpoint, { params })
  }

  async post(endpoint, data) {
    return this.client.post(endpoint, data)
  }

  async put(endpoint, data) {
    return this.client.put(endpoint, data)
  }

  async patch(endpoint, data) {
    return this.client.patch(endpoint, data)
  }

  async delete(endpoint, data = null) {
    return this.client.delete(endpoint, data ? { data } : {})
  }

  /**
   * Upload file with progress support
   */
  async uploadFile(endpoint, formDataOrFile, onProgress = null) {
    let formData
    
    // Handle both FormData and File inputs
    if (formDataOrFile instanceof FormData) {
      formData = formDataOrFile
    } else {
      formData = new FormData()
      formData.append('image', formDataOrFile)
    }

    const config = {
      headers: {
        // Don't set Content-Type manually for FormData
        // Let the browser set it with the boundary
      },
    }

    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentComplete = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )
        onProgress(percentComplete)
      }
    }

    return this.client.post(endpoint, formData, config)
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(endpoint, files, onProgress = null) {
    const formData = new FormData()
    
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`files`, file)
      })
    } else {
      // Single file
      formData.append('files', files)
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentComplete = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        )
        onProgress(percentComplete)
      }
    }

    return this.client.post(endpoint, formData, config)
  }

  /**
   * Download file
   */
  async downloadFile(endpoint, filename = null) {
    const response = await this.client.get(endpoint, {
      responseType: 'blob',
    })

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename || 'download')
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)

    return response
  }

  /**
   * Cancel all pending requests
   */
  cancelAllRequests() {
    // This would require tracking active requests with cancel tokens
    // Implementation depends on specific needs
    console.log('Cancelling all pending requests...')
  }

  /**
   * Update base URL
   */
  setBaseURL(baseURL) {
    this.baseURL = baseURL
    this.client.defaults.baseURL = baseURL
  }

  /**
   * Update default headers
   */
  setDefaultHeader(key, value) {
    this.client.defaults.headers.common[key] = value
  }

  /**
   * Remove default header
   */
  removeDefaultHeader(key) {
    delete this.client.defaults.headers.common[key]
  }
}

/**
 * Custom API Error class
 */
class ApiError extends Error {
  constructor(message, status = 0, code = 'UNKNOWN_ERROR', details = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }

  get isNetworkError() {
    return this.status === 0 || this.code === 'NETWORK_ERROR'
  }

  get isTimeoutError() {
    return this.status === 408 || this.code === 'TIMEOUT_ERROR'
  }

  get isUnauthorized() {
    return this.status === 401
  }

  get isForbidden() {
    return this.status === 403
  }

  get isNotFound() {
    return this.status === 404
  }

  get isValidationError() {
    return this.status === 400 && this.code === 'VALIDATION_ERROR'
  }

  get isServerError() {
    return this.status >= 500
  }

  get isClientError() {
    return this.status >= 400 && this.status < 500
  }
}

// Create and export singleton instance
const apiClient = new ApiClient()

export { apiClient, ApiError }
export default apiClient
