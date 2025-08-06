<template>
  <footer class="footer-container">
    <div class="footer-bg">
      <div class="footer-orb orb-1"></div>
      <div class="footer-orb orb-2"></div>
      <div class="footer-orb orb-3"></div>
    </div>
    
    <div class="footer-content">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Brand Section -->
        <div class="brand-section">
          <div class="brand-header">
            <div class="brand-logo">
              <img 
                src="/src/assets/Logo.png" 
                alt="PantryShare Logo" 
                class="logo-image"
              />
              <div class="logo-glow"></div>
            </div>
            <div class="brand-info">
              <span class="brand-name">PantryShare</span>
              <span class="brand-tagline">Food rescue platform</span>
            </div>
          </div>
          
          <p class="brand-description">
            Transforming food waste into community impact. Every rescued meal is a step 
            toward a more sustainable future where technology meets compassion.
          </p>
          
          <div class="social-links">
            <a href="#" class="social-link facebook" aria-label="Follow us on Facebook">
              <svg viewBox="0 0 24 24" class="social-icon">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <div class="social-ripple"></div>
            </a>
            
            <a href="#" class="social-link twitter" aria-label="Follow us on Twitter">
              <svg viewBox="0 0 24 24" class="social-icon">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <div class="social-ripple"></div>
            </a>
            
            <a href="#" class="social-link instagram" aria-label="Follow us on Instagram">
              <svg viewBox="0 0 24 24" class="social-icon">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <div class="social-ripple"></div>
            </a>
            
            <a href="#" class="social-link linkedin" aria-label="Connect with us on LinkedIn">
              <svg viewBox="0 0 24 24" class="social-icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div class="social-ripple"></div>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="footer-nav">
          <div class="nav-column">
            <h3 class="nav-title">Platform</h3>
            <ul class="nav-list">
              <li>
                <router-link to="/how-it-works" class="nav-link">
                  <span>How it works</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/about" class="nav-link">
                  <span>About us</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/impact" class="nav-link">
                  <span>Our impact</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/volunteer" class="nav-link">
                  <span>Volunteer</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
            </ul>
          </div>
          
          <div class="nav-column">
            <h3 class="nav-title">Community</h3>
            <ul class="nav-list">
              <li>
                <router-link to="/partners" class="nav-link">
                  <span>Partners</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/blog" class="nav-link">
                  <span>Blog</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/events" class="nav-link">
                  <span>Events</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/newsletter" class="nav-link">
                  <span>Newsletter</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
            </ul>
          </div>
          
          <div class="nav-column">
            <h3 class="nav-title">Support</h3>
            <ul class="nav-list">
              <li>
                <router-link to="/contact" class="nav-link">
                  <span>Contact us</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/help" class="nav-link">
                  <span>Help center</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/privacy" class="nav-link">
                  <span>Privacy</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
              <li>
                <router-link to="/terms" class="nav-link">
                  <span>Terms</span>
                  <svg viewBox="0 0 24 24" class="nav-arrow">
                    <path d="M7 17l9.2-9.2M17 17V7H7"/>
                  </svg>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Impact Stats Section -->
      <div class="impact-section">
        <div class="impact-header">
          <h3 class="impact-title">Live impact tracker</h3>
          <div class="impact-subtitle">Updated in real-time</div>
        </div>
        
        <div class="impact-grid">
          <div class="impact-card" v-for="(stat, index) in impactStats" :key="index">
            <div class="stat-visual">
              <div :class="`stat-icon stat-icon-${index + 1}`">
                <span>{{ stat.icon }}</span>
              </div>
              <div class="stat-pulse"></div>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ formatNumber(stat.value) }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-change">
                <span class="change-arrow">↗</span>
                <span>{{ stat.change }} this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <div class="newsletter-text">
            <h3 class="newsletter-title">Stay in the loop</h3>
            <p class="newsletter-description">
              Get weekly updates on food rescue impact, new features, and community stories.
            </p>
          </div>
          
          <div class="newsletter-form">
            <div class="input-group">
              <input 
                type="email" 
                placeholder="Enter your email"
                class="newsletter-input"
                v-model="emailInput"
              />
              <button class="newsletter-btn" @click="subscribeNewsletter">
                <span>Subscribe</span>
                <svg viewBox="0 0 24 24" class="btn-icon">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
                <div class="btn-ripple"></div>
              </button>
            </div>
            <div class="newsletter-note">
              No spam, unsubscribe anytime. Read our 
              <router-link to="/privacy" class="privacy-link">privacy policy</router-link>.
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="footer-bottom">
        <div class="bottom-content">
          <div class="copyright">
            <p>© {{ currentYear }} PantryShare. Crafted with ❤️ for LionHacks Summer 2025.</p>
            <div class="hackathon-badge">
              <span class="badge-dot"></span>
              <span>Hackathon Project</span>
            </div>
          </div>
          
          <div class="bottom-links">
            <router-link to="/privacy" class="bottom-link">Privacy</router-link>
            <router-link to="/terms" class="bottom-link">Terms</router-link>
            <router-link to="/cookies" class="bottom-link">Cookies</router-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const emailInput = ref('')

// Computed
const currentYear = computed(() => new Date().getFullYear())

// Impact statistics - these would come from your store
const impactStats = computed(() => [
  {
    icon: '🍽️',
    value: 47329,
    label: 'Meals rescued',
    change: '+23%'
  },
  {
    icon: '🌱',
    value: 2847,
    label: 'Tons CO₂ saved',
    change: '+31%'
  },
  {
    icon: '👥',
    value: 1284,
    label: 'Active volunteers',
    change: '+18%'
  },
  {
    icon: '🏪',
    value: 156,
    label: 'Partner locations',
    change: '+42%'
  }
])

// Methods
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const subscribeNewsletter = () => {
  if (emailInput.value) {
    // Handle newsletter subscription
    console.log('Subscribing:', emailInput.value)
    emailInput.value = ''
  }
}
</script>

<style scoped>
/* Footer Container */
.footer-container {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  overflow: hidden;
}

.footer-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.footer-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  backdrop-filter: blur(20px);
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: -5%;
  animation-delay: 3s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 50%;
  animation-delay: 6s;
}

.footer-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px 0;
}

/* Main Footer */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 80px;
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 60px;
  }
}

/* Brand Section */
.brand-section {
  max-width: 400px;
}

.brand-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.brand-logo {
  position: relative;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  overflow: hidden;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

.logo-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 18px;
  z-index: -1;
  opacity: 0.5;
  animation: pulse 3s ease-in-out infinite;
}

.brand-info {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.brand-tagline {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin-top: 4px;
}

.brand-description {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

.social-link.facebook {
  background: linear-gradient(45deg, #1877f2, #42a5f5);
}

.social-link.twitter {
  background: linear-gradient(45deg, #1da1f2, #0d8bd9);
}

.social-link.instagram {
  background: linear-gradient(45deg, #e4405f, #fd1d1d, #fcb045);
}

.social-link.linkedin {
  background: linear-gradient(45deg, #0077b5, #00a0dc);
}

.social-link:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.social-icon {
  width: 20px;
  height: 20px;
  fill: white;
  z-index: 2;
}

.social-ripple {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  transition: transform 0.3s ease;
}

.social-link:hover .social-ripple {
  transform: scale(1);
}

/* Footer Navigation */
.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

@media (max-width: 640px) {
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.nav-column {
  display: flex;
  flex-direction: column;
}

.nav-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  position: relative;
}

.nav-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 1px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  margin-bottom: 12px;
}

.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 15px;
  transition: all 0.3s ease;
  group: ;
}

.nav-link:hover {
  color: #667eea;
  padding-left: 8px;
}

.nav-arrow {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.nav-link:hover .nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Impact Section */
.impact-section {
  margin-bottom: 80px;
}

.impact-header {
  text-align: center;
  margin-bottom: 40px;
}

.impact-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.impact-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.impact-subtitle::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .impact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .impact-grid {
    grid-template-columns: 1fr;
  }
}

.impact-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.impact-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}

.stat-visual {
  position: relative;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  position: relative;
  z-index: 2;
}

.stat-icon-1 {
  background: linear-gradient(45deg, #00ff88, #00d4ff);
}

.stat-icon-2 {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.stat-icon-3 {
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
}

.stat-icon-4 {
  background: linear-gradient(45deg, #f093fb, #f5576c);
}

.stat-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.stat-change {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  color: #00ff88;
}

.change-arrow {
  font-weight: bold;
}

/* Newsletter Section */
.newsletter-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 60px;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

@media (max-width: 768px) {
  .newsletter-content {
    grid-template-columns: 1fr;
    gap: 24px;
    text-align: center;
  }
}

.newsletter-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.newsletter-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

@media (max-width: 480px) {
  .input-group {
    flex-direction: column;
  }
}

.newsletter-input {
  flex: 1;
  padding: 16px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-btn {
  position: relative;
  padding: 16px 24px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.newsletter-btn:active .btn-ripple {
  width: 100px;
  height: 100px;
}

.newsletter-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

.privacy-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.privacy-link:hover {
  color: #764ba2;
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 32px 0;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

@media (max-width: 640px) {
  .bottom-content {
    flex-direction: column;
    text-align: center;
  }
}

.copyright {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.copyright p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 0;
}

.hackathon-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #00ff88;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.bottom-links {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.bottom-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.bottom-link:hover {
  color: #667eea;
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(10px) rotate(-3deg);
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

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    padding: 60px 24px 0;
  }
  
  .footer-main {
    gap: 60px;
    margin-bottom: 60px;
  }
  
  .impact-section {
    margin-bottom: 60px;
  }
  
  .newsletter-section {
    padding: 32px;
    margin-bottom: 40px;
  }
}

@media (max-width: 768px) {
  .brand-section {
    max-width: none;
  }
  
  .newsletter-title {
    font-size: 24px;
  }
  
  .impact-title {
    font-size: 28px;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 40px 16px 0;
  }
  
  .brand-header {
    justify-content: center;
    text-align: center;
  }
  
  .brand-description {
    text-align: center;
  }
  
  .nav-title {
    text-align: center;
  }
  
  .nav-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .newsletter-section {
    padding: 24px;
  }
  
  .newsletter-title {
    font-size: 20px;
  }
  
  .impact-title {
    font-size: 24px;
  }
  
  .stat-value {
    font-size: 24px;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .footer-container {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }
  
  .impact-card:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .newsletter-section {
    background: rgba(255, 255, 255, 0.03);
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .nav-link {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .brand-description {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .newsletter-description {
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>