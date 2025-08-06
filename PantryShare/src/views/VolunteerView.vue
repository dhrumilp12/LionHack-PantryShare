<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <!-- Background Orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
      <div class="floating-orb orb-4"></div>
    </div>

    <div class="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center pb-16">
        <div class="badge mb-6">
          <span class="badge-dot"></span>
          Join our volunteer community
        </div>
        <h1 class="text-5xl font-bold text-gray-900 pb-6 leading-tight">
          Volunteer with 
          <span class="highlight-text">PantryShare</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Join our community of volunteers and help reduce food waste while fighting hunger in your neighborhood. Every action creates ripples of positive change.
        </p>
        <div class="pt-4">
          <button
            @click="showSignupModal = true"
            class="btn-primary large"
          >
            <svg class="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Become a Volunteer
            <svg class="h-5 w-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 pb-16 max-w-6xl mx-auto">
        <div class="stat-card" v-for="(stat, index) in [
          { value: '1,247', label: 'Active Volunteers', icon: '👥' },
          { value: '52,381', label: 'Meals Saved', icon: '🍽️' },
          { value: '892', label: 'Pickups Completed', icon: '📦' },
          { value: '15,634', label: 'Pounds Rescued', icon: '⚖️' }
        ]" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="text-3xl mb-3">{{ stat.icon }}</div>
          <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-2">{{ stat.value }}</div>
          <div class="text-sm text-gray-600 font-medium">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Volunteer Opportunities -->
      <div class="pb-16 max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Current Opportunities</h2>
          <p class="text-xl text-gray-600">Find the perfect volunteer opportunity that matches your schedule and skills</p>
          <div class="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="flex justify-center mb-8">
          <div class="flex gap-x-4 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">
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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(opportunity, index) in filteredOpportunities"
            :key="opportunity.id"
            class="opportunity-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="flex items-start justify-between pb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-1">{{ opportunity.title }}</h3>
                <p class="text-sm text-gray-600 font-medium">{{ opportunity.organization }}</p>
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
            
            <p class="text-gray-600 pb-6 leading-relaxed">{{ opportunity.description }}</p>
            
            <div class="space-y-3 pb-6">
              <div class="flex items-center text-sm text-gray-600 gap-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {{ opportunity.volunteersNeeded - opportunity.volunteersSignedUp }} spots remaining
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-x-2">
                <span class="text-xs text-gray-500 font-medium">Skills needed:</span>
                <div class="flex flex-wrap gap-1">
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
                :disabled="opportunity.volunteersSignedUp >= opportunity.volunteersNeeded"
                class="btn-signup"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div v-if="filteredOpportunities.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No opportunities found</h3>
          <p class="text-gray-600">Try adjusting your filters to see more opportunities.</p>
        </div>
      </div>

      <!-- How It Works -->
      <div class="pb-16 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">How Volunteering Works</h2>
          <p class="text-xl text-gray-600">Simple steps to start making a difference in your community</p>
          <div class="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="step-card" v-for="(step, index) in [
            { icon: '👤', title: 'Sign Up', desc: 'Create your volunteer profile and tell us about your skills and availability.' },
            { icon: '📋', title: 'Choose Opportunities', desc: 'Browse available volunteer opportunities and sign up for ones that fit your schedule.' },
            { icon: '❤️', title: 'Make Impact', desc: 'Help rescue food and fight hunger while building stronger community connections.' }
          ]" :key="index" :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-icon-wrapper">
              <div class="text-4xl mb-4">{{ step.icon }}</div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ step.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Volunteer Testimonials -->
      <div class="pb-16 max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">What Our Volunteers Say</h2>
          <p class="text-xl text-gray-600">Real stories from our community members</p>
          <div class="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="testimonial-card" v-for="(testimonial, index) in [
            { 
              name: 'Sarah M.', 
              role: 'Volunteer since 2023',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
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
            <div class="flex items-center pb-6">
              <img
                :src="testimonial.image"
                :alt="testimonial.name"
                class="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div class="pl-4">
                <p class="text-lg font-bold text-gray-900">{{ testimonial.name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
                <div class="flex mt-2">
                  <svg v-for="star in testimonial.rating" :key="star" class="w-4 h-4 text-yellow-400 fill-current">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <p class="text-gray-700 italic leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Volunteer Signup Modal -->
    <div v-if="showSignupModal" class="modal-overlay">
      <div class="modal-content">
        <div class="flex items-center justify-between pb-6">
          <h3 class="text-2xl font-bold text-gray-900">Become a Volunteer</h3>
          <button
            @click="showSignupModal = false"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitVolunteerSignup" class="space-y-6">
          <div>
            <label for="volunteer-name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              id="volunteer-name"
              v-model="signupForm.name"
              type="text"
              required
              class="form-input"
            />
          </div>
          
          <div>
            <label for="volunteer-email" class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              id="volunteer-email"
              v-model="signupForm.email"
              type="email"
              required
              class="form-input"
            />
          </div>
          
          <div>
            <label for="volunteer-phone" class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              id="volunteer-phone"
              v-model="signupForm.phone"
              type="tel"
              class="form-input"
            />
          </div>
          
          <div>
            <label for="volunteer-skills" class="block text-sm font-semibold text-gray-700 mb-2">Skills/Interests</label>
            <select
              id="volunteer-skills"
              v-model="signupForm.skills"
              multiple
              class="form-input"
            >
              <option value="driving">Driving/Transportation</option>
              <option value="lifting">Heavy Lifting</option>
              <option value="organizing">Organization</option>
              <option value="admin">Administrative</option>
              <option value="cooking">Food Preparation</option>
              <option value="tech">Technology</option>
            </select>
            <p class="text-xs text-gray-500 pt-2">Hold Ctrl/Cmd to select multiple</p>
          </div>
          
          <div class="flex gap-x-4 pt-4">
            <button
              type="button"
              @click="showSignupModal = false"
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn-primary flex-1"
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
import { ref, computed } from 'vue'

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

// Mock volunteer opportunities
const opportunities = ref([
  {
    id: '1',
    title: 'Food Pickup from Downtown Bakery',
    organization: 'Sunshine Bakery',
    description: 'Help pick up day-old pastries and bread for distribution to local shelters.',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Downtown',
    type: 'pickup',
    urgency: 'high',
    volunteersNeeded: 3,
    volunteersSignedUp: 1,
    skills: ['driving', 'lifting']
  },
  {
    id: '2',
    title: 'Food Sorting at Community Center',
    organization: 'Hope Community Center',
    description: 'Sort and organize donated food items for distribution.',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Uptown',
    type: 'sorting',
    urgency: 'medium',
    volunteersNeeded: 5,
    volunteersSignedUp: 2,
    skills: ['organizing', 'admin']
  },
  {
    id: '3',
    title: 'Delivery to Senior Center',
    organization: 'Golden Years Senior Center',
    description: 'Deliver prepared meals to seniors in need.',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'West Side',
    type: 'delivery',
    urgency: 'high',
    volunteersNeeded: 2,
    volunteersSignedUp: 0,
    skills: ['driving']
  },
  {
    id: '4',
    title: 'Administrative Support',
    organization: 'PantryShare HQ',
    description: 'Help with data entry and volunteer coordination tasks.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'East Side',
    type: 'admin',
    urgency: 'low',
    volunteersNeeded: 2,
    volunteersSignedUp: 1,
    skills: ['admin', 'tech']
  },
  {
    id: '5',
    title: 'School Cafeteria Pickup',
    organization: 'Green Valley Elementary',
    description: 'Collect surplus food from school cafeteria after lunch.',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    location: 'Downtown',
    type: 'pickup',
    urgency: 'medium',
    volunteersNeeded: 2,
    volunteersSignedUp: 1,
    skills: ['driving', 'lifting']
  }
])

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

const signUpForOpportunity = (opportunity) => {
  if (opportunity.volunteersSignedUp >= opportunity.volunteersNeeded) {
    return
  }

  if (confirm(`Sign up for "${opportunity.title}"?`)) {
    opportunity.volunteersSignedUp++
    alert('Successfully signed up! You will receive a confirmation email shortly.')
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
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Highlight Text */
.highlight-text {
  background: linear-gradient(45deg, #10b981, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  background: linear-gradient(45deg, #10b981, #3b82f6);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
}

.btn-primary.large {
  padding: 20px 40px;
  font-size: 18px;
  border-radius: 20px;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  color: #374151;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.btn-signup {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background: linear-gradient(45deg, #10b981, #3b82f6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-signup:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.btn-signup:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%);
  backdrop-filter: blur(20px);
  animation: float 12s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  top: 5%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  top: 40%;
  right: -5%;
  animation-delay: 4s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: 60%;
  animation-delay: 8s;
}

.orb-4 {
  width: 150px;
  height: 150px;
  bottom: 5%;
  right: 20%;
  animation-delay: 2s;
}

/* Statistics Cards */
.stat-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  padding: 32px 24px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.stat-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
}

/* Filter Select */
.filter-select {
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
}

/* Opportunity Cards */
.opportunity-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  padding: 32px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.opportunity-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  border-color: rgba(16, 185, 129, 0.3);
}

/* Priority Badges */
.priority-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
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

/* Skill Tags */
.skill-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  background: linear-gradient(45deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.skill-tag-more {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(156, 163, 175, 0.2);
  color: #374151;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

/* Step Cards */
.step-card {
  position: relative;
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  padding: 40px 32px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #10b981, #3b82f6);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

.step-icon-wrapper {
  margin: 20px 0;
}

/* Testimonial Cards */
.testimonial-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  padding: 32px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  animation: slideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
  border-color: rgba(16, 185, 129, 0.3);
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
  padding: 20px;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 32px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid rgba(229, 231, 235, 0.8);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-30px) rotate(120deg);
  }
  66% {
    transform: translateY(30px) rotate(240deg);
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

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .btn-primary.large {
    padding: 16px 32px;
    font-size: 16px;
  }
  
  .stat-card {
    padding: 24px 16px;
  }
}
</style>