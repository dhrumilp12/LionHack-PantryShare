<template>
  <div class="map-container">
    <!-- Map Header -->
    <div class="map-header">
      <div class="header-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
      </div>
      
      <div class="ps-container">
        <div class="header-content">
          <div class="header-text">
            <div class="live-badge">
              <div class="badge-dot"></div>
              <span>Live food rescue map</span>
            </div>
            <h1 class="header-title">Food Rescue Map</h1>
            <p class="header-description">Find surplus food opportunities near you</p>
          </div>
          
          <!-- Controls -->
          <div class="header-controls">
            <!-- Filters -->
            <div class="filter-group">
              <select
                v-model="filters.status"
                @change="fetchListings"
                class="modern-select"
              >
                <option value="">All Status</option>
                <option value="Available">Available</option>
                <option value="Claimed">Claimed</option>
              </select>
              
              <select
                v-model="filters.distance"
                @change="fetchListings"
                class="modern-select"
              >
                <option value="5">5km</option>
                <option value="10">10km</option>
                <option value="25">25km</option>
                <option value="50">50km</option>
              </select>

              <button 
                v-if="mapLoaded && userLocation" 
                @click="centerOnUserLocation"
                class="location-btn"
                title="Center on my location"
              >
                <MapPinIcon class="w-4 h-4" />
              </button>
            </div>
            
            <!-- Toggle View -->
            <div class="view-toggle">
              <button
                @click="switchToMapView"
                :class="viewMode === 'map' ? 'active' : ''"
                class="toggle-btn"
              >
                <MapIcon class="w-4 h-4 mr-2" />
                Map
              </button>
              <button
                @click="viewMode = 'list'"
                :class="viewMode === 'list' ? 'active' : ''"
                class="toggle-btn"
              >
                <ListBulletIcon class="w-4 h-4 mr-2" />
                List
              </button>
            </div>
            
            <!-- Add Listing Button -->
            <router-link
              v-if="isAuthenticated"
              to="/listings/create"
              class="add-listing-btn"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Add Listing
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content-area">
      <!-- Map View -->
      <div v-if="viewMode === 'map'" class="map-view">
        <!-- Google Maps Container - Always render when in map view -->
        <div 
          ref="mapContainer" 
          class="google-map" 
          :class="{ 'map-loading': !mapLoaded }"
          id="google-maps-container"
        ></div>
        
        <!-- Map Loading Overlay -->
        <div v-if="!mapLoaded" class="map-loading-overlay">
          <div class="map-content">
            <div class="map-icon-container">
              <div class="loading-spinner">
                <div class="spinner-ring"></div>
              </div>
            </div>
            <h3 class="map-title">Loading Interactive Map</h3>
            <p class="map-description">Initializing Google Maps...</p>
            
            <!-- Browser Compatibility Notice -->
            <div class="browser-notice">
              <p class="notice-text">
                <strong>Having trouble?</strong> If the map doesn't load, try:
              </p>
              <ul class="notice-list">
                <li>Disabling tracking prevention for this site</li>
                <li>Refreshing the page</li>
                <li>Using the list view instead</li>
              </ul>
              <div class="notice-actions">
                <button 
                  @click="retryMapInitialization" 
                  class="retry-map-btn"
                >
                  Retry Map
                </button>
                <button 
                  @click="viewMode = 'list'" 
                  class="switch-to-list-btn"
                >
                  Switch to List View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="list-view">
        <div class="ps-container">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner">
              <div class="spinner-ring"></div>
            </div>
            <p class="loading-text">Finding food opportunities...</p>
          </div>
          
          <!-- Empty State -->
          <div v-else-if="!visibleListings.length" class="empty-state">
            <div class="empty-icon">
              <MapPinIcon class="empty-icon-svg" />
              <div class="empty-pulse"></div>
            </div>
            <h3 class="empty-title">No listings found</h3>
            <p class="empty-description">
              There are no food listings in your area right now.
            </p>
            <router-link
              v-if="isAuthenticated"
              to="/listings/create"
              class="empty-action-btn"
            >
              <PlusIcon class="w-5 h-5 mr-2" />
              Be the first to add one
            </router-link>
          </div>
          
          <!-- Listings Grid -->
          <div v-else class="listings-grid">
            <ListingCard
              v-for="listing in visibleListings"
              :key="listing.id"
              :listing="listing"
              :distance="getDistance(listing)"
            />
          </div>
          
          <!-- Load More -->
          <div v-if="hasMoreListings" class="load-more-section">
            <button
              @click="loadMore"
              :disabled="loading"
              class="load-more-btn"
            >
              <span v-if="loading" class="loading-content">
                <div class="mini-spinner"></div>
                Loading...
              </span>
              <span v-else>Load More</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button (Mobile) -->
    <router-link
      v-if="isAuthenticated"
      to="/listings/create"
      class="floating-action-btn"
    >
      <PlusIcon class="w-6 h-6" />
      <div class="fab-pulse"></div>
    </router-link>

    <!-- Location Permission Modal -->
    <div
      v-if="showLocationModal"
      class="location-modal-overlay"
    >
      <div class="location-modal">
        <div class="modal-content">
          <div class="modal-icon">
            <MapPinIcon class="modal-icon-svg" />
            <div class="modal-icon-pulse"></div>
          </div>
          <h3 class="modal-title">Enable Location Access</h3>
          <p class="modal-description">
            Allow PantryShare to access your location to show nearby food opportunities and calculate distances.
          </p>
          <div class="modal-actions">
            <button
              @click="requestLocation"
              class="modal-btn primary"
            >
              Allow Location
            </button>
            <button
              @click="showLocationModal = false"
              class="modal-btn secondary"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, nextTick, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useListingsStore } from '@/stores/listings'
import { useNotificationStore } from '@/stores/notifications'
import { Loader } from '@googlemaps/js-api-loader'
import {
  MapIcon,
  MapPinIcon,
  ListBulletIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline'
import ListingCard from '@/components/listings/ListingCard.vue'

const authStore = useAuthStore()
const listingsStore = useListingsStore()
const notificationStore = useNotificationStore()

// Map refs and state
const mapContainer = ref(null)
const map = ref(null)
const mapLoaded = ref(false)
const markers = ref([])
const userLocationMarker = ref(null)

// State
const viewMode = ref('map')
const showLocationModal = ref(false)
const userLocation = ref(null)
const page = ref(1)
const itemsPerPage = 12

const filters = reactive({
  status: 'Available',
  distance: 10,
  category: '',
})

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)
const loading = computed(() => listingsStore.loading)
const allListings = computed(() => listingsStore.listings)

const visibleListings = computed(() => {
  const filtered = allListings.value.filter(listing => {
    // Status filter
    if (filters.status && listing.status !== filters.status) {
      return false
    }
    
    // Distance filter (if user location is available)
    if (userLocation.value && listing.location) {
      const distance = calculateDistance(
        userLocation.value.latitude,
        userLocation.value.longitude,
        listing.location.lat,
        listing.location.lng
      )
      if (distance > filters.distance) {
        return false
      }
    }
    
    return true
  })
  
  // Pagination for list view
  return filtered.slice(0, page.value * itemsPerPage)
})

const hasMoreListings = computed(() => {
  return visibleListings.value.length < allListings.value.length
})

// Methods
const initializeMap = async () => {
  try {
    console.log('initializeMap called')
    console.log('mapContainer.value:', mapContainer.value)
    console.log('viewMode:', viewMode.value)
    
    // Check if map container exists and is properly mounted
    if (!mapContainer.value || !mapContainer.value.isConnected) {
      console.error('Map container not found or not connected to DOM')
      notificationStore.error('Map container not available')
      return
    }

    // Ensure the container has proper dimensions
    const containerRect = mapContainer.value.getBoundingClientRect()
    if (containerRect.width === 0 || containerRect.height === 0) {
      console.error('Map container has no dimensions:', containerRect)
      notificationStore.error('Map container not properly sized')
      return
    }

    console.log('Map container found and ready:', mapContainer.value)
    console.log('Container dimensions:', containerRect)
    console.log('Initializing Google Maps...')
    
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCOyoJijb-Ytqjdfa8bItwQ81lGvfGIUGs',
      version: 'weekly',
      libraries: ['places', 'marker']
    })

    await loader.load()
    console.log('Google Maps API loaded successfully')
    
    // Default center (San Francisco)
    let center = { lat: 37.7749, lng: -122.4194 }
    
    // Use user location if available
    if (userLocation.value) {
      center = {
        lat: userLocation.value.latitude,
        lng: userLocation.value.longitude
      }
    }

    console.log('Creating map with center:', center)

    // Initialize map with additional options to prevent observer errors
    map.value = new google.maps.Map(mapContainer.value, {
      center,
      zoom: userLocation.value ? 13 : 10,
      mapId: 'PANTRYSHARE_MAP', // Required for AdvancedMarkerElement
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      gestureHandling: 'greedy',
      disableDefaultUI: false,
      clickableIcons: false,
    })

    console.log('Map created successfully')

    // Wait for map to be fully initialized before proceeding
    await new Promise((resolve) => {
      const listener = google.maps.event.addListenerOnce(map.value, 'idle', () => {
        console.log('Map idle event fired - map is ready')
        resolve()
      })
      
      // Fallback timeout in case idle event doesn't fire
      setTimeout(resolve, 2000)
    })

    mapLoaded.value = true
    console.log('Map marked as loaded')
    
    // Add markers for listings
    addListingMarkers()
    
    // Add user location marker if we have user location
    if (userLocation.value) {
      addUserLocationMarker()
    }
    
    notificationStore.success('Map loaded successfully')
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    
    // Check for specific API blocking errors
    if (error.message && error.message.includes('ApiTargetBlockedMapError')) {
      notificationStore.error('Maps blocked by browser privacy settings. Please disable tracking prevention for this site or switch to list view.')
    } else if (error.message && error.message.includes('network')) {
      notificationStore.error('Network error loading map. Please check your internet connection.')
    } else {
      notificationStore.error('Failed to load map. Please try refreshing the page.')
    }
    
    mapLoaded.value = false
    
    // Auto-switch to list view if map fails
    setTimeout(() => {
      if (!mapLoaded.value) {
        viewMode.value = 'list'
        notificationStore.info('Switched to list view due to map loading issues.')
      }
    }, 3000)
  }
}

const addListingMarkers = () => {
  // Check if map is ready
  if (!map.value || !mapLoaded.value) {
    console.log('Map not ready for markers')
    return
  }

  console.log('Adding markers for', visibleListings.value.length, 'listings')
  
  // Clear existing markers
  markers.value.forEach(marker => {
    try {
      marker.map = null // For AdvancedMarkerElement
    } catch (error) {
      console.warn('Error removing marker:', error)
    }
  })
  markers.value = []

  // Add markers for each listing with location
  visibleListings.value.forEach(listing => {
    if (listing.location && listing.location.lat && listing.location.lng) {
      try {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: {
            lat: listing.location.lat,
            lng: listing.location.lng
          },
          map: map.value,
          title: listing.title,
          content: createCustomMarkerIcon(listing.status)
        })

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: createInfoWindowContent(listing)
        })

        // Add click listener
        marker.addListener('click', () => {
          // Close all other info windows
          markers.value.forEach(m => {
            if (m.infoWindow) {
              try {
                m.infoWindow.close()
              } catch (error) {
                console.warn('Error closing info window:', error)
              }
            }
          })
          
          infoWindow.open(map.value, marker)
        })

        marker.infoWindow = infoWindow
        markers.value.push(marker)
      } catch (error) {
        console.error('Error creating marker for listing:', listing.id, error)
      }
    }
  })
  
  console.log('Added', markers.value.length, 'markers to map')
}

const createCustomMarkerIcon = (status) => {
  // Create SVG marker based on status
  const color = status === 'Available' ? '#00ff88' : '#666'
  
  // Create a DOM element for the marker
  const markerElement = document.createElement('div')
  markerElement.innerHTML = `
    <div style="
      width: 40px; 
      height: 40px; 
      background: ${color}; 
      border: 3px solid white; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      position: relative;
    ">
      <div style="
        width: 16px; 
        height: 16px; 
        background: white; 
        border-radius: 50%;
      "></div>
    </div>
  `
  
  return markerElement.firstElementChild
}

const createUserLocationIcon = () => {
  // Create a distinctive blue marker for user location
  const markerElement = document.createElement('div')
  markerElement.innerHTML = `
    <div style="
      width: 48px; 
      height: 48px; 
      background: #2196F3; 
      border: 4px solid white; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      box-shadow: 0 4px 12px rgba(33,150,243,0.4);
      position: relative;
    ">
      <div style="
        width: 20px; 
        height: 20px; 
        background: white; 
        border-radius: 50%;
        display: flex; 
        align-items: center; 
        justify-content: center;
      ">
        <div style="
          width: 8px; 
          height: 8px; 
          background: #2196F3; 
          border-radius: 50%;
        "></div>
      </div>
    </div>
  `
  
  return markerElement.firstElementChild
}

const addUserLocationMarker = () => {
  console.log('addUserLocationMarker called')
  console.log('userLocation.value:', userLocation.value)
  console.log('map.value:', map.value)
  console.log('mapLoaded.value:', mapLoaded.value)
  
  if (!userLocation.value || !map.value || !mapLoaded.value) {
    console.log('Prerequisites not met for user location marker')
    return
  }

  // Remove existing user location marker
  if (userLocationMarker.value) {
    console.log('Removing existing user location marker')
    userLocationMarker.value.map = null
  }

  try {
    console.log('Creating user location marker at:', userLocation.value.latitude, userLocation.value.longitude)
    
    // Create new user location marker
    userLocationMarker.value = new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat: userLocation.value.latitude,
        lng: userLocation.value.longitude
      },
      map: map.value,
      title: 'Your Location',
      content: createUserLocationIcon(),
      zIndex: 1000 // Ensure user marker appears on top
    })

    // Create info window for user location
    const userInfoWindow = new google.maps.InfoWindow({
      content: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #2196F3;">📍 Your Location</h3>
          <p style="margin: 0; font-size: 14px; color: #666;">You are here</p>
        </div>
      `
    })

    // Add click listener to show info window
    userLocationMarker.value.addListener('click', () => {
      userInfoWindow.open(map.value, userLocationMarker.value)
    })

    console.log('User location marker created successfully:', userLocationMarker.value)
  } catch (error) {
    console.error('Error creating user location marker:', error)
  }
}

const createInfoWindowContent = (listing) => {
  const distance = getDistance(listing)
  const distanceText = distance ? `${distance} km away` : ''
  
  return `
    <div style="max-width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">${listing.title}</h3>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${listing.description || 'No description available'}</p>
      <div style="margin: 8px 0; font-size: 12px;">
        <span style="background: ${listing.status === 'Available' ? '#00ff88' : '#666'}; color: white; padding: 2px 8px; border-radius: 12px; font-weight: 500;">
          ${listing.status}
        </span>
        ${listing.quantity ? `<span style="margin-left: 8px; color: #666;">${listing.quantity}</span>` : ''}
        ${distanceText ? `<span style="margin-left: 8px; color: #666;">${distanceText}</span>` : ''}
      </div>
      <div style="margin-top: 12px;">
        <a href="/listings/${listing.id}" style="display: inline-block; padding: 8px 16px; background: #667eea; color: white; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 500;">
          View Details
        </a>
      </div>
    </div>
  `
}

const centerOnUserLocation = () => {
  if (userLocation.value && map.value) {
    map.value.setCenter({
      lat: userLocation.value.latitude,
      lng: userLocation.value.longitude
    })
    map.value.setZoom(15)
    
    // Add or update user location marker
    addUserLocationMarker()
  }
}

const retryMapInitialization = async () => {
  console.log('Retrying map initialization...')
  mapLoaded.value = false
  
  // Reset the map and markers
  if (map.value) {
    map.value = null
  }
  
  if (userLocationMarker.value) {
    userLocationMarker.value = null
  }
  
  // Clear listing markers
  markers.value.forEach(marker => {
    try {
      marker.map = null // For AdvancedMarkerElement
    } catch (error) {
      console.warn('Error removing marker during retry:', error)
    }
  })
  markers.value = []
  
  // Wait a moment then try again
  setTimeout(async () => {
    await initializeMap()
  }, 1000)
}

const switchToMapView = async () => {
  console.log('switchToMapView called')
  viewMode.value = 'map'
  
  // Wait for the DOM to update
  await nextTick()
  
  // Use requestAnimationFrame to ensure DOM is fully rendered
  requestAnimationFrame(async () => {
    console.log('requestAnimationFrame callback - about to initialize map')
    if (!mapLoaded.value) {
      await initializeMap()
    }
  })
}

const fetchListings = async () => {
  await listingsStore.fetchListings()
  // Update markers when listings change
  if (mapLoaded.value) {
    addListingMarkers()
  }
}

const loadMore = () => {
  page.value++
}

const requestLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        showLocationModal.value = false
        notificationStore.success('Location access granted')
        
        // Center map on user location and add marker if map is loaded
        if (mapLoaded.value) {
          centerOnUserLocation()
        } else {
          // If map isn't loaded yet, the marker will be added when it loads
          console.log('User location obtained, will add marker when map loads')
        }
      },
      (error) => {
        console.error('Error getting location:', error)
        notificationStore.error('Unable to access location')
        showLocationModal.value = false
      }
    )
  } else {
    notificationStore.error('Geolocation is not supported by this browser')
    showLocationModal.value = false
  }
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula for calculating distance between two points
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = R * c
  return distance
}

const getDistance = (listing) => {
  if (!userLocation.value || !listing.location) return null
  
  const distance = calculateDistance(
    userLocation.value.latitude,
    userLocation.value.longitude,
    listing.location.lat,
    listing.location.lng
  )
  
  return Math.round(distance * 10) / 10 // Round to 1 decimal place
}

// Watchers
// Watch for filter changes to update markers
watch(filters, () => {
  if (mapLoaded.value) {
    addListingMarkers()
  }
}, { deep: true })

// Watch for user location changes to add/update user marker
watch(userLocation, (newLocation) => {
  if (newLocation && mapLoaded.value) {
    addUserLocationMarker()
  }
}, { deep: true })

// Lifecycle
onMounted(async () => {
  console.log('onMounted called')
  
  // Fetch listings
  await fetchListings()
  
  // Initialize map after DOM is ready if in map view
  if (viewMode.value === 'map') {
    console.log('Initial view mode is map, waiting for DOM')
    await nextTick()
    
    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(async () => {
      console.log('requestAnimationFrame callback in onMounted - about to initialize map')
      await initializeMap()
    })
  }
  
  // Check if location access should be requested
  if ('geolocation' in navigator && !userLocation.value) {
    // Show location modal after a brief delay
    setTimeout(() => {
      showLocationModal.value = true
    }, 1500)
  }
})
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.map-container {
 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.ps-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header Section */
.map-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 0;
  overflow: hidden;
}

.header-bg {
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
  top: -60px;
  right: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 80px;
  height: 80px;
  bottom: -40px;
  left: 20%;
  animation-delay: 3s;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.header-text {
  flex: 1;
  min-width: 300px;
}

.live-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.header-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 8px;
}

.header-description {
  font-size: 18px;
  opacity: 0.9;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 12px;
}

.modern-select {
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.modern-select:hover {
  background: rgba(255, 255, 255, 0.25);
}

.modern-select option {
  background: #1a1a1a;
  color: white;
}

.location-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 44px;
  height: 44px;
}

.location-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.view-toggle {
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 4px;
  gap: 4px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-listing-btn {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-listing-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
}

/* Content Area */
.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Map View */
.map-view {
  flex: 1;
  position: relative;
}

.google-map {
  width: 100%;
  height: 100%;
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.google-map.map-loading {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.map-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.map-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.map-icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.map-icon {
  width: 64px;
  height: 64px;
  color: #667eea;
}

.icon-pulse {
  position: absolute;
  inset: -20px;
  border: 2px solid #667eea;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse-ring 2s infinite;
}

.map-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.map-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
}

.browser-notice {
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.notice-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.notice-list {
  font-size: 14px;
  color: #666;
  margin: 12px 0 20px 20px;
  line-height: 1.6;
}

.notice-list li {
  margin-bottom: 4px;
}

.notice-actions {
  display: flex;
  gap: 12px;
}

.retry-map-btn {
  flex: 1;
  padding: 12px 20px;
  background: #f8f9fa;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-map-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

.switch-to-list-btn {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch-to-list-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.map-listings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.map-listing-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.map-listing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.listing-pin {
  position: relative;
  width: 48px;
  height: 48px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pin-dot {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.listing-info {
  flex: 1;
  text-align: left;
}

.listing-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.listing-address {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.listing-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.available {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
}

.status-badge.claimed {
  background: #e9ecef;
  color: #666;
}

.quantity-text {
  font-size: 12px;
  color: #666;
}

/* List View */
.list-view {
  flex: 1;
  background: #f8f9fa;
  padding: 40px 0;
  overflow-y: auto;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.loading-spinner {
  position: relative;
  margin-bottom: 24px;
}

.spinner-ring {
  width: 60px;
  height: 60px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 16px;
  color: #666;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.empty-icon-svg {
  width: 64px;
  height: 64px;
  color: #ccc;
}

.empty-pulse {
  position: absolute;
  inset: -20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse-ring 2s infinite;
}

.empty-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.empty-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.empty-action-btn {
  display: inline-flex;
  align-items: center;
  padding: 16px 32px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Listings Grid */
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

/* Load More Section */
.load-more-section {
  text-align: center;
  padding: 40px 0;
}

.load-more-btn {
  padding: 16px 32px;
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e9ecef;
  border-top: 2px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Floating Action Button */
.floating-action-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
  transition: all 0.3s ease;
  z-index: 50;
}

.floating-action-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 35px rgba(0, 255, 136, 0.4);
}

.fab-pulse {
  position: absolute;
  inset: -8px;
  border: 2px solid #00ff88;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse-ring 2s infinite;
}

/* Location Modal */
.location-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.location-modal {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  overflow: hidden;
  transform: scale(0.9);
  animation: modal-appear 0.3s ease forwards;
}

.modal-content {
  padding: 40px 32px;
  text-align: center;
}

.modal-icon {
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
}

.modal-icon-svg {
  width: 48px;
  height: 48px;
  color: #667eea;
}

.modal-icon-pulse {
  position: absolute;
  inset: -16px;
  border: 2px solid #667eea;
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse-ring 2s infinite;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.modal-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 32px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn.primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.modal-btn.secondary {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e9ecef;
}

.modal-btn.secondary:hover {
  background: #e9ecef;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
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

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes modal-appear {
  to {
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
  
  .header-controls {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .filter-group {
    flex: 1;
    justify-content: center;
  }
  
  .modern-select {
    flex: 1;
    min-width: auto;
  }
  
  .listings-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .map-listings {
    max-width: 100%;
  }
  
  .floating-action-btn {
    display: flex;
  }
  
  .add-listing-btn {
    display: none;
  }
}

@media (max-width: 480px) {
  .ps-container {
    padding: 0 16px;
  }
  
  .header-title {
    font-size: 24px;
  }
  
  .header-description {
    font-size: 16px;
  }
  
  .map-listing-card {
    padding: 16px;
  }
  
  .modal-content {
    padding: 32px 24px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .view-toggle {
    width: 100%;
    justify-content: center;
  }
  
  .toggle-btn {
    flex: 1;
    justify-content: center;
  }
  
  .browser-notice {
    margin: 0 16px;
    padding: 20px;
  }
  
  .notice-actions {
    flex-direction: column;
    gap: 8px;
  }
}

/* Hide floating action button on desktop */
@media (min-width: 769px) {
  .floating-action-btn {
    display: none;
  }
}
</style>