<template>
  <div class="volunteer-container">
    <!-- Hero Header Section -->
    <section class="volunteer-hero">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            Join our volunteer community
          </div>
          
          <h1 class="hero-title">
            Volunteer with 
            <span class="highlight-text">PantryShare</span>
          </h1>
          
          <p class="hero-description">
            Join our community of volunteers and help reduce food waste while fighting hunger in your neighborhood. Every action creates ripples of positive change.
          </p>
          
          <div class="hero-actions">
            <button
              @click="showSignupModal = true"
              class="action-btn primary large"
            >
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Become a Volunteer
              <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <!-- Statistics Section -->
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stat-card" v-for="(stat, index) in [
              { value: '1,247', label: 'Active Volunteers', icon: '👥' },
              { value: '52,381', label: 'Meals Saved', icon: '🍽️' },
              { value: '892', label: 'Pickups Completed', icon: '📦' },
              { value: '15,634', label: 'Pounds Rescued', icon: '⚖️' }
            ]" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="stat-icon">{{ stat.icon }}</div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Volunteer Opportunities Section -->
        <div class="opportunities-section">
          <div class="section-header">
            <div class="section-icon opportunities">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="section-info">
              <h2 class="section-title">Current Opportunities</h2>
              <p class="section-description">Find the perfect volunteer opportunity that matches your schedule and skills</p>
            </div>
          </div>

          <div class="filters-container">
            <div class="filters-card">
              <select 
                v-model="filters.type"
                class="filter-select"
              >
                <option value="">All Types</option>
                <option value="pickup">Food Pickup</option>
                <option value="delivery">Food Delivery</option>
                <option value="sorting">Food Sorting</option>
                <option value="admin">Administrative</option>
              </select>
              <select 
                v-model="filters.location"
                class="filter-select"
              >
                <option value="">All Locations</option>
                <option value="downtown">Downtown</option>
                <option value="uptown">Uptown</option>
                <option value="westside">West Side</option>
                <option value="eastside">East Side</option>
              </select>
            </div>
          </div>

          <div class="opportunities-grid">
            <div
              v-for="(opportunity, index) in filteredOpportunities"
              :key="opportunity.id"
              class="opportunity-card"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="opportunity-header">
                <div class="opportunity-info">
                  <h3 class="opportunity-title">{{ opportunity.title }}</h3>
                  <p class="opportunity-org">{{ opportunity.organization }}</p>
                </div>
                <span
                  :class="[
                    'priority-badge',
                    opportunity.urgency === 'high' ? 'priority-high' :
                    opportunity.urgency === 'medium' ? 'priority-medium' :
                    'priority-low'
                  ]"
                >
                  {{ opportunity.urgency }} priority
                </span>
              </div>
              
              <p class="opportunity-description">{{ opportunity.description }}</p>
              
              <div class="opportunity-meta">
                <div class="meta-item">
                  <div class="meta-icon volunteers">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span class="meta-text">{{ opportunity.volunteersNeeded - opportunity.volunteersSignedUp }} spots remaining</span>
                </div>
              </div>
              
              <div class="opportunity-footer">
                <div class="skills-section">
                  <span class="skills-label">Skills needed:</span>
                  <div class="skills-tags">
                    <span
                      v-for="skill in opportunity.skills.slice(0, 2)"
                      :key="skill"
                      class="skill-tag"
                    >
                      {{ skill }}
                    </span>
                    <span
                      v-if="opportunity.skills.length > 2"
                      class="skill-tag-more"
                    >
                      +{{ opportunity.skills.length - 2 }}
                    </span>
                  </div>
                </div>
                <button
                  @click="signUpForOpportunity(opportunity)"
                  :disabled="opportunity.volunteersSignedUp >= opportunity.volunteersNeeded || (opportunity.status && opportunity.status !== 'available')"
                  class="signup-btn"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          <div v-if="filteredOpportunities.length === 0" class="empty-state">
            <div class="empty-icon">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="empty-title">No opportunities found</h3>
            <p class="empty-description">Try adjusting your filters to see more opportunities.</p>
          </div>
        </div>

        <!-- How It Works Section -->
        <div class="how-it-works-section">
          <div class="section-header center">
            <div class="section-icon how-it-works">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div class="section-info">
              <h2 class="section-title">How Volunteering Works</h2>
              <p class="section-description">Simple steps to start making a difference in your community</p>
            </div>
          </div>

          <div class="steps-grid">
            <div class="step-card" v-for="(step, index) in [
              { icon: '👤', title: 'Sign Up', desc: 'Create your volunteer profile and tell us about your skills and availability.' },
              { icon: '📋', title: 'Choose Opportunities', desc: 'Browse available volunteer opportunities and sign up for ones that fit your schedule.' },
              { icon: '❤️', title: 'Make Impact', desc: 'Help rescue food and fight hunger while building stronger community connections.' }
            ]" :key="index" :style="{ animationDelay: `${index * 0.2}s` }">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-icon">{{ step.icon }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-description">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Testimonials Section -->
        <div class="testimonials-section">
          <div class="section-header center">
            <div class="section-icon testimonials">
              <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div class="section-info">
              <h2 class="section-title">What Our Volunteers Say</h2>
              <p class="section-description">Real stories from our community members</p>
            </div>
          </div>

          <div class="testimonials-grid">
            <div class="testimonial-card" v-for="(testimonial, index) in [
              { 
                name: 'Sarah M.', 
                role: 'Volunteer since 2023',
                image: 'https://wallpapercave.com/wp/wp8907719.jpg',
                quote: 'Volunteering with PantryShare has been incredibly rewarding. I love knowing that I\'m making a real difference in my community.',
                rating: 5
              },
              {
                name: 'Mike R.',
                role: 'Volunteer since 2022', 
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                quote: 'The platform makes it so easy to find volunteer opportunities that fit my schedule. Great community!',
                rating: 5
              },
              {
                name: 'Emma T.',
                role: 'Volunteer since 2023',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 
                quote: 'I\'ve met so many wonderful people through volunteering. It\'s become a highlight of my week!',
                rating: 5
              }
            ]" :key="index" :style="{ animationDelay: `${index * 0.15}s` }">
              <div class="testimonial-header">
                <img
                  :src="testimonial.image"
                  :alt="testimonial.name"
                  class="testimonial-avatar"
                />
                <div class="testimonial-info">
                  <p class="testimonial-name">{{ testimonial.name }}</p>
                  <p class="testimonial-role">{{ testimonial.role }}</p>
                  <div class="rating-stars">
                    <svg v-for="star in testimonial.rating" :key="star" class="star-icon">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p class="testimonial-quote">
                "{{ testimonial.quote }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Volunteer Signup Modal -->
    <div v-if="showSignupModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Become a Volunteer</h3>
          <button
            @click="showSignupModal = false"
            class="modal-close"
          >
            <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitVolunteerSignup" class="modal-form">
          <div class="form-group">
            <label for="volunteer-name" class="form-label">Full Name <span class="required">*</span></label>
            <input
              id="volunteer-name"
              v-model="signupForm.name"
              type="text"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="volunteer-email" class="form-label">Email <span class="required">*</span></label>
            <input
              id="volunteer-email"
              v-model="signupForm.email"
              type="email"
              required
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="volunteer-phone" class="form-label">Phone</label>
            <input
              id="volunteer-phone"
              v-model="signupForm.phone"
              type="tel"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label for="volunteer-skills" class="form-label">Skills/Interests</label>
            <select
              id="volunteer-skills"
              v-model="signupForm.skills"
              multiple
              class="form-select"
            >
              <option value="driving">Driving/Transportation</option>
              <option value="lifting">Heavy Lifting</option>
              <option value="organizing">Organization</option>
              <option value="admin">Administrative</option>
              <option value="cooking">Food Preparation</option>
              <option value="tech">Technology</option>
            </select>
            <p class="form-hint">Hold Ctrl/Cmd to select multiple</p>
          </div>
          
          <div class="modal-actions">
            <button
              type="button"
              @click="showSignupModal = false"
              class="action-btn secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="action-btn primary"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useVolunteersStore } from '@/stores/volunteers.js'
import { useNotificationStore } from '@/stores/notifications.js'
import { useAuthStore } from '@/stores/auth.js'

const showSignupModal = ref(false)
const filters = ref({
  type: '',
  location: ''
})

const signupForm = ref({
  name: '',
  email: '',
  phone: '',
  skills: []
})

// Stores
const volunteersStore = useVolunteersStore()
const notificationStore = useNotificationStore()
const authStore = useAuthStore()

// Source of truth for opportunities from store
const opportunities = computed(() => {
  return (volunteersStore.opportunities || []).map(o => ({
    id: o.id,
    title: o.title || o.name || 'Opportunity',
  organization: o.ownerName || o.organization || `${(o.owner?.firstName || '').trim()} ${(o.owner?.lastName || '').trim()}`.trim() || 'Partner',
    description: o.description || '',
    date: o.pickupWindow?.start || o.createdAt,
    location: o.location?.address || o.locationName || '—',
    type: o.type || (o.category ? 'pickup' : ''),
  urgency: ((o.urgency || o.priority || 'medium') + '').toLowerCase(),
    volunteersNeeded: o.volunteersNeeded || o.capacity || 1,
    volunteersSignedUp: o.volunteersSignedUp || o.claimCount || 0,
    skills: o.skills || [],
  status: typeof o.status === 'string' ? o.status.toLowerCase() : o.status,
  }))
})

const filteredOpportunities = computed(() => {
  let filtered = opportunities.value

  if (filters.value.type) {
    filtered = filtered.filter(opp => opp.type === filters.value.type)
  }

  if (filters.value.location) {
    filtered = filtered.filter(opp => 
      opp.location.toLowerCase().includes(filters.value.location.toLowerCase())
    )
  }

  return filtered.sort((a, b) => {
    const urgencyOrder = { high: 3, medium: 2, low: 1 }
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency]
    }
    return new Date(a.date) - new Date(b.date)
  })
})

const signUpForOpportunity = async (opportunity) => {
  if (opportunity.volunteersSignedUp >= opportunity.volunteersNeeded) return
  if (!authStore.isAuthenticated) {
    notificationStore.error('Please log in to sign up.', 'Login required')
    return
  }
  const confirmed = window.confirm(`Sign up for "${opportunity.title}"?`)
  if (!confirmed) return
  const res = await volunteersStore.claim(opportunity.id)
  if (res.success) {
    notificationStore.success('Signed up successfully!', 'Volunteer')
  }
}

const submitVolunteerSignup = () => {
  console.log('Volunteer signup:', signupForm.value)
  alert('Thank you for signing up! We will contact you with volunteer opportunities.')
  showSignupModal.value = false
  
  signupForm.value = {
    name: '',
    email: '',
    phone: '',
    skills: []
  }
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  // Attempt geolocation for better matching, fallback to defaults
  try {
    await new Promise((resolve) => {
      if (!('geolocation' in navigator)) return resolve()
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          volunteersStore.setLocation(pos.coords.latitude, pos.coords.longitude)
          resolve()
        },
        () => resolve(),
        { enableHighAccuracy: false, timeout: 3000 }
      )
    })
  } catch (_) {
    // ignore
  }
  await volunteersStore.loadOpportunities()
})
</script>

<style scoped>
/* Volunteer Container */
.volunteer-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f9fc 0%, #e9f4f7 100%);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Hero Section */
.volunteer-hero {
  position: relative;
  padding: 2rem 0 4rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  filter: blur(40px);
  animation: float 15s infinite linear;
}

.orb-1 {
  width: 200px;
  height: 200px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
  animation-duration: 20s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 60%;
  animation-delay: -10s;
  animation-duration: 25s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg);
  }
  25% { 
    transform: translateY(-20px) translateX(10px) rotate(90deg);
  }
  50% { 
    transform: translateY(-10px) translateX(-10px) rotate(180deg);
  }
  75% { 
    transform: translateY(-30px) translateX(5px) rotate(270deg);
  }
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.1;
}

.highlight-text {
  background: linear-gradient(45deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-actions {
  margin-top: 2rem;
}

/* Action Buttons */
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.action-btn.primary {
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.4);
}

.action-btn.primary.large {
  padding: 18px 36px;
  font-size: 1.1rem;
  border-radius: 16px;
}

.action-btn.secondary {
  background: white;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.action-btn.secondary:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-1px);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

/* Main Content */
.main-content {
  position: relative;
  padding: 4rem 0;
  z-index: 1;
}

/* Statistics Section */
.stats-section {
  margin-bottom: 4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px 20px 0 0;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.section-header.center {
  flex-direction: column;
  text-align: center;
  gap: 0.75rem;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 
    0 8px 24px rgba(102, 126, 234, 0.3),
    0 4px 12px rgba(118, 75, 162, 0.2);
  transition: all 0.3s ease;
}

.section-icon:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 
    0 12px 32px rgba(102, 126, 234, 0.4),
    0 6px 16px rgba(118, 75, 162, 0.3);
}

.section-icon .icon {
  width: 24px;
  height: 24px;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #64748b;
  font-size: 1.1rem;
}

/* Opportunities Section */
.opportunities-section {
  margin-bottom: 4rem;
}

.filters-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.filters-card {
  display: flex;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160px;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

/* Opportunities Grid */
.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.opportunity-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.opportunity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px 20px 0 0;
}

.opportunity-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

.opportunity-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.opportunity-info {
  flex: 1;
}

.opportunity-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.opportunity-org {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.priority-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.priority-high {
  background: linear-gradient(45deg, #ef4444, #f97316);
  color: white;
}

.priority-medium {
  background: linear-gradient(45deg, #f59e0b, #eab308);
  color: white;
}

.priority-low {
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
}

.opportunity-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.opportunity-meta {
  margin-bottom: 1.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.meta-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: white;
}

.meta-icon.volunteers {
  background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
}

.meta-icon .icon {
  width: 16px;
  height: 16px;
}

.meta-text {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.opportunity-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.skills-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
}

.skills-label {
  color: #9ca3af;
  font-size: 0.8rem;
  font-weight: 500;
}

.skills-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  background: linear-gradient(45deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.skill-tag-more {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(156, 163, 175, 0.2);
  color: #374151;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.signup-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.signup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.signup-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.empty-icon .icon {
  width: 32px;
  height: 32px;
  color: #9ca3af;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.empty-description {
  color: #64748b;
}

/* How It Works Section */
.how-it-works-section {
  margin-bottom: 4rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.step-card {
  position: relative;
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem 2rem;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.step-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px 20px 0 0;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

.step-number {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

.step-icon {
  font-size: 3rem;
  margin: 1rem 0 1.5rem;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.step-description {
  color: #64748b;
  line-height: 1.6;
}

/* Testimonials Section */
.testimonials-section {
  margin-bottom: 4rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px 20px 0 0;
}

.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.testimonial-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.testimonial-info {
  margin-left: 1rem;
  flex: 1;
}

.testimonial-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.testimonial-role {
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 0.125rem;
}

.star-icon {
  width: 16px;
  height: 16px;
  fill: #fbbf24;
}

.testimonial-quote {
  color: #4b5563;
  font-style: italic;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 
    0 30px 80px rgba(0, 0, 0, 0.2),
    0 12px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px 20px 0 0;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.modal-close {
  padding: 0.5rem;
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.modal-close:hover {
  color: #4b5563;
  background: #f3f4f6;
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-input, .form-select {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #1f2937;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-select {
  min-height: 100px;
}

.form-hint {
  color: #9ca3af;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.modal-actions .action-btn {
  flex: 1;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .action-btn.primary.large {
    padding: 16px 24px;
    font-size: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
  
  .opportunities-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-card {
    flex-direction: column;
  }
  
  .steps-grid, .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .opportunity-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  .hero-title {
    font-size: 1.75rem;
  }
  
  .opportunity-card, .step-card, .testimonial-card {
    padding: 1.5rem;
  }
}
</style>