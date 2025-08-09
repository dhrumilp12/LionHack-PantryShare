<template>
  <div class="dashboard-container">
    <section class="dashboard-hero">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      <div class="dashboard-header">
        <div class="welcome-content">
          <div class="welcome-badge">
            <span class="badge-dot"></span>
            Welcome back
          </div>
          
          <h1 class="welcome-title">
            Hello, {{ authStore.user?.firstName || 'User' }}!
            <span class="title-accent">✨</span>
          </h1>
          
          <p class="welcome-description">
            You're making a real difference in your community. Here's your impact today.
          </p>
        </div>
        
        <div class="quick-actions">
          <button class="action-btn primary" @click="$router.push('/listings/create')">
            <svg viewBox="0 0 24 24" class="btn-icon">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <span>Create Listing</span>
          </button>
          
          <button class="action-btn secondary" @click="$router.push('/listings')">
            <svg viewBox="0 0 24 24" class="btn-icon">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span>Browse Food</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Grid -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card active-listings">
            <div class="stat-bg">
              <div class="stat-pattern"></div>
            </div>
            <div class="stat-content">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.activeListings }}</div>
                <div class="stat-label">Active Listings</div>
                <div class="stat-change">
                  <span class="change-up">↗ +12%</span>
                  <span class="change-text">from last week</span>
                </div>
              </div>
            </div>
            <div class="stat-glow glow-green"></div>
          </div>

          <div class="stat-card items-claimed">
            <div class="stat-bg">
              <div class="stat-pattern"></div>
            </div>
            <div class="stat-content">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.itemsClaimed }}</div>
                <div class="stat-label">Items Claimed</div>
                <div class="stat-change">
                  <span class="change-up">↗ +8%</span>
                  <span class="change-text">from last week</span>
                </div>
              </div>
            </div>
            <div class="stat-glow glow-blue"></div>
          </div>

          <div class="stat-card meals-saved">
            <div class="stat-bg">
              <div class="stat-pattern"></div>
            </div>
            <div class="stat-content">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.mealsSaved }}</div>
                <div class="stat-label">Meals Saved</div>
                <div class="stat-change">
                  <span class="change-up">↗ +23%</span>
                  <span class="change-text">from last week</span>
                </div>
              </div>
            </div>
            <div class="stat-glow glow-orange"></div>
          </div>

          <div class="stat-card impact-score">
            <div class="stat-bg">
              <div class="stat-pattern"></div>
            </div>
            <div class="stat-content">
              <div class="stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="stat-info">
                <div class="stat-number">{{ stats.impactScore }}</div>
                <div class="stat-label">Impact Score</div>
                <div class="stat-change">
                  <span class="change-up">↗ +15%</span>
                  <span class="change-text">from last week</span>
                </div>
              </div>
            </div>
            <div class="stat-glow glow-purple"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- Recent Listings -->
          <div class="content-card main-card">
            <div class="card-header">
              <div class="header-content">
                <h3 class="card-title">Recent Listings Near You</h3>
                <div style="display:flex; align-items:center; gap:12px;">
                  <div class="live-indicator">
                    <span class="pulse-dot"></span>
                    Live Updates
                  </div>
                  <router-link
                    to="/listings"
                    class="action-btn secondary"
                    title="View all listings"
                  >
                    View all
                  </router-link>
                </div>
              </div>
            </div>
            
            <div class="card-content">
              <div v-if="recentListings.length === 0" class="empty-state">
                <div class="empty-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-4.172a1 1 1 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"/>
                  </svg>
                </div>
                <h4 class="empty-title">No listings yet</h4>
                <p class="empty-description">Get started by creating your first food listing and help your community.</p>
                <button class="empty-action" @click="$router.push('/listings/create')">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Create Your First Listing
                </button>
              </div>
              
              <div v-else class="listings-grid">
                <div
                  v-for="(listing, index) in recentListings"
                  :key="listing.id"
                  class="listing-item"
                  :style="`animation-delay: ${index * 0.1}s`"
                  @click="$router.push(`/listings/${listing.id}`)"
                >
                  <div class="listing-image">
                    <img :src="listing.imageUrls?.[0] || '/api/placeholder/80/80'" :alt="listing.title" />
                    <div class="listing-overlay">
                      <svg viewBox="0 0 24 24" class="view-icon">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div class="listing-info">
                    <h4 class="listing-title">{{ listing.title }}</h4>
                    <p class="listing-description">{{ listing.description }}</p>
                    <div class="listing-meta">
                      <span class="listing-time">{{ formatDate(listing.createdAt) }}</span>
                      <span class="listing-status" :class="getStatusClass(listing.status)">
                        {{ listing.status }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cta-row">
                <router-link
                  to="/listings"
                  class="action-btn primary"
                  title="Browse all listings"
                >
                  Browse all listings
                </router-link>
              </div>
            </div>
          </div>

          <!-- Side Panel -->
          <div class="side-panel">
            <!-- Profile Card -->
            <div class="profile-card">
              <div class="profile-bg">
                <div class="profile-pattern"></div>
              </div>
              <div class="profile-content">
                <div class="profile-avatar">
                  <div class="avatar-ring"></div>
                  <div class="avatar-image">
                    <img
                      v-if="profileImageUrl"
                      :src="profileImageUrl"
                      alt="Profile"
                      class="avatar-img"
                    />
                    <span v-else>
                      {{ userInitial }}
                    </span>
                  </div>
                </div>
                <div class="profile-info">
                  <h4 class="profile-name">{{ authStore.user?.firstName || 'User' }}</h4>
                  <p class="profile-role">Community Helper</p>
                </div>
                <div class="profile-completion">
                  <div class="completion-bar">
                    <div class="completion-fill" style="width: 75%"></div>
                  </div>
                  <p class="completion-text">Profile 75% complete</p>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="actions-card">
              <h3 class="actions-title">Quick Actions</h3>
              <div class="actions-list">
                <button class="action-item" @click="$router.push('/volunteer')">
                  <div class="action-icon volunteer">
                    <svg viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <div class="action-content">
                    <span class="action-name">Volunteer</span>
                    <span class="action-desc">Help with food rescue</span>
                  </div>
                  <svg viewBox="0 0 24 24" class="action-arrow">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>

                <button class="action-item" @click="$router.push('/impact')">
                  <div class="action-icon impact">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 19c-5 0-8-4-8-9s4-9 9-9 8 4 8 9"/>
                      <path d="M8 19l4-7 3 3 4-6"/>
                    </svg>
                  </div>
                  <div class="action-content">
                    <span class="action-name">View Impact</span>
                    <span class="action-desc">See your contribution</span>
                  </div>
                  <svg viewBox="0 0 24 24" class="action-arrow">
                    <path d="M5 12h14m-7-7l7 7-7 7"/>
                  </svg>
                </button>

              </div>
            </div>

            <!-- Achievement Card -->
            <div class="achievement-card">
              <div class="achievement-bg">
                <div class="achievement-pattern"></div>
              </div>
              <div class="achievement-content">
                <div class="achievement-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
                    <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
                    <path d="M4 22h16"/>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                    <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
                  </svg>
                </div>
                <h4 class="achievement-title">Food Hero!</h4>
                <p class="achievement-desc">You've saved 156 meals this month. Keep up the amazing work!</p>
                <div class="achievement-badge">
                  <span>🏆</span>
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
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useListingsStore } from '@/stores/listings'

const authStore = useAuthStore()
const listingsStore = useListingsStore()

const stats = ref({
  activeListings: 12,
  itemsClaimed: 8,
  mealsSaved: 156,
  impactScore: 450
})

const recentListings = computed(() => {
  return listingsStore.listings.slice(0, 6)
})

// Profile avatar helpers
const profileImageUrl = computed(() => authStore.user?.profileImage || authStore.user?.avatarUrl || '')
const userInitial = computed(() => {
  const first = authStore.user?.firstName
  const last = authStore.user?.lastName
  const name = (first && last) ? `${first} ${last}` : (first || authStore.user?.name || 'U')
  return (name?.charAt(0) || 'U').toUpperCase()
})

const formatDate = (date) => {
  if (!date) return ''
  // Support Firestore Timestamp objects and ISO/date strings
  let d
  if (date && typeof date === 'object' && date._seconds) {
    d = new Date(date._seconds * 1000 + (date._nanoseconds || 0) / 1e6)
  } else {
    d = new Date(date)
  }
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClass = (status) => {
  const statusMap = {
    'available': 'status-available',
    'claimed': 'status-claimed',
    'completed': 'status-completed'
  }
  return statusMap[status?.toLowerCase()] || 'status-available'
}

onMounted(async () => {
  // Load recent listings if not already loaded
  if (listingsStore.listings.length === 0) {
    await listingsStore.fetchListings()
  }
})
</script>

<style scoped>
/* Global Styles */
.dashboard-container {
  margin-top: 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Dashboard Hero */
.dashboard-hero {
  padding: 60px 0 40px;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
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
  width: 150px;
  height: 150px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 100px;
  height: 100px;
  top: 50%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 80px;
  height: 80px;
  bottom: 10%;
  left: 60%;
  animation-delay: 4s;
}

.dashboard-header {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.welcome-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  color: white;
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

.welcome-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;
  color: white;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-accent {
  font-size: 32px;
  animation: bounce 2s ease-in-out infinite;
}

.welcome-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  max-width: 500px;
}

.quick-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-btn.primary {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Stats Section */
.stats-section {
  padding: 40px 0;
  position: relative;
  z-index: 1;
  margin-top: -20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.stat-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.stat-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.stat-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background: radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px);
  background-size: 20px 20px;
}

.stat-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.active-listings .stat-icon {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  color: white;
}

.items-claimed .stat-icon {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.meals-saved .stat-icon {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
}

.impact-score .stat-icon {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
  font-weight: 500;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.change-up {
  color: #00ff88;
  font-weight: 600;
}

.change-text {
  color: #888;
}

.stat-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 0 0 20px 20px;
}

.glow-green {
  background: linear-gradient(90deg, #00ff88, #00d4ff);
}

.glow-blue {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.glow-orange {
  background: linear-gradient(90deg, #ff6b6b, #ffa500);
}

.glow-purple {
  background: linear-gradient(90deg, #f093fb, #f5576c);
}

/* Main Content */
.main-content {
  padding: 40px 0 80px;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.content-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.main-card {
  min-height: 600px;
}

.card-header {
  padding: 32px 32px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 75, 87, 0.1);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #ff4757;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.card-content {
  padding: 0 32px 32px;
}

.cta-row {
  text-align: center;
  margin-top: 16px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(45deg, #f8f9fa, #e9ecef);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
  stroke: #999;
  stroke-width: 2;
  fill: none;
}

.empty-title {
  font-size: 20px;
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
  line-height: 1.6;
}

.empty-action {
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
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-action:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
}

.empty-action svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

/* Listings Grid */
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.listing-item {
  background: #f8f9fa;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.6s ease forwards;
}

.listing-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border-color: #00ff88;
}

.listing-image {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.listing-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.listing-item:hover .listing-image img {
  transform: scale(1.05);
}

.listing-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(0, 255, 136, 0.8), rgba(0, 212, 255, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.listing-item:hover .listing-overlay {
  opacity: 1;
}

.view-icon {
  width: 32px;
  height: 32px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

.listing-info {
  padding: 20px;
}

.listing-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  line-height: 1.3;
}

.listing-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.listing-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.listing-time {
  color: #888;
}

.listing-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-available {
  background: rgba(0, 255, 136, 0.1);
  color: #00aa5e;
}

.status-claimed {
  background: rgba(255, 165, 0, 0.1);
  color: #cc8800;
}

.status-completed {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

/* Side Panel */
.side-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Profile Card */
.profile-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.profile-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.profile-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background: radial-gradient(circle at 30% 70%, white 1px, transparent 1px);
  background-size: 20px 20px;
}

.profile-content {
  position: relative;
  z-index: 2;
  padding: 32px;
  text-align: center;
}

.profile-avatar {
  position: relative;
  margin: 0 auto 20px;
  width: 80px;
  height: 80px;
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  animation: rotate 3s linear infinite;
}

.avatar-image {
  position: relative;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
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

.profile-name {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.profile-role {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
}

.profile-completion {
  text-align: left;
}

.completion-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.completion-fill {
  height: 100%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  border-radius: 4px;
  transition: width 2s ease;
}

.completion-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

/* Actions Card */
.actions-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.actions-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.action-item:hover {
  background: white;
  border-color: #00ff88;
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 255, 136, 0.1);
}

.action-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.action-icon.volunteer {
  background: linear-gradient(45deg, #f093fb, #f5576c);
}

.action-icon.impact {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.action-icon.settings {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
}

.action-icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.action-content {
  flex: 1;
  text-align: left;
}

.action-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.action-desc {
  display: block;
  font-size: 12px;
  color: #666;
}

.action-arrow {
  width: 16px;
  height: 16px;
  stroke: #999;
  stroke-width: 2;
  fill: none;
  transition: all 0.3s ease;
}

.action-item:hover .action-arrow {
  stroke: #00ff88;
  transform: translateX(2px);
}

/* Achievement Card */
.achievement-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.achievement-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
}

.achievement-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background: radial-gradient(circle at 70% 30%, white 1px, transparent 1px);
  background-size: 15px 15px;
}

.achievement-content {
  position: relative;
  z-index: 2;
  padding: 24px;
  text-align: center;
}

.achievement-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.achievement-icon svg {
  width: 28px;
  height: 28px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

.achievement-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.achievement-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 16px;
}

.achievement-badge {
  font-size: 24px;
  animation: bounce 2s ease-in-out infinite;
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

@keyframes bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
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

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .dashboard-header {
    flex-direction: column;
    text-align: center;
    gap: 32px;
  }
  
  .quick-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .action-btn {
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
  }
  
  .listings-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 32px;
  }
  
  .card-title {
    font-size: 20px;
  }
  
  .stat-card {
    padding: 24px;
  }
  
  .stat-number {
    font-size: 28px;
  }
  
  .card-content,
  .card-header {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (max-width: 480px) {
  .dashboard-hero {
    padding: 40px 0 30px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-title {
    font-size: 28px;
  }
  
  .stat-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .side-panel {
    order: -1;
  }
}
</style>