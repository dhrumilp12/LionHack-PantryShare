<template>
  <header class="header-container">
    <div class="header-backdrop"></div>
    
    <nav class="header-nav">
      <div class="nav-content">
        <!-- Logo -->
        <router-link to="/" class="logo-container">
          <div class="logo-wrapper">
            <img 
              src="/src/assets/Logo.png" 
              alt="PantryShare Logo" 
              class="logo-image"
            />
      
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="desktop-nav">
          <div class="nav-links">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.to"
              class="nav-link"
              :class="{ 'nav-link-active': $route.path === item.to }"
            >
              <component :is="item.icon" class="nav-icon" />
              <span>{{ item.name }}</span>
              <div class="nav-indicator"></div>
            </router-link>
          </div>
        </div>

        <!-- User Actions -->
        <div class="user-actions">
          <!-- Notifications -->
          <button
            v-if="isAuthenticated"
            @click="toggleNotifications"
            class="action-btn notification-btn"
            :class="{ 'active': showNotifications }"
          >
            <BellIcon class="action-icon" />
            <span
              v-if="unreadCount > 0"
              class="notification-badge"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
            <div class="btn-glow"></div>
          </button>

          <!-- User Menu -->
          <div v-if="isAuthenticated" class="user-menu-container" ref="userMenuRef">
            <button
              @click="toggleUserMenu"
              class="user-menu-trigger"
            >
              <div class="avatar-container">
                <div class="avatar">
                  <img v-if="profileImageUrl" :src="profileImageUrl" alt="Profile" class="avatar-image" />
                  <span v-else class="avatar-text">{{ userInitial }}</span>
                  <div class="avatar-ring"></div>
                </div>
                <div class="user-info">
                  <span class="user-name">{{ displayName }}</span>
                  <span class="user-role">{{ user?.role || 'Volunteer' }}</span>
                </div>
              </div>
              <ChevronDownIcon class="chevron-icon" :class="{ 'rotate': showUserMenu }" />
            </button>

            <!-- User Dropdown -->
            <transition
              enter-active-class="dropdown-enter-active"
              enter-from-class="dropdown-enter-from"
              enter-to-class="dropdown-enter-to"
              leave-active-class="dropdown-leave-active"
              leave-from-class="dropdown-leave-from"
              leave-to-class="dropdown-leave-to"
            >
              <div v-if="showUserMenu" class="user-dropdown">
                <div class="dropdown-header">
                  <div class="dropdown-avatar">
                    <img v-if="profileImageUrl" :src="profileImageUrl" alt="Profile" class="dropdown-avatar-image" />
                    <span v-else>{{ userInitial }}</span>
                  </div>
                  <div class="dropdown-user-info">
                    <div class="dropdown-name">{{ displayName }}</div>
                    <div class="dropdown-email">{{ user?.email || 'user@example.com' }}</div>
                  </div>
                </div>
                
                <div class="dropdown-divider"></div>
                
                <div class="dropdown-section">
                  <router-link
                    to="/profile"
                    class="dropdown-item"
                    @click="closeUserMenu"
                  >
                    <UserIcon class="dropdown-icon" />
                    <span>Profile</span>
                  </router-link>
                  <router-link
                    to="/dashboard"
                    class="dropdown-item"
                    @click="closeUserMenu"
                  >
                    <ChartBarIcon class="dropdown-icon" />
                    <span>Dashboard</span>
                  </router-link>
                </div>
                
                <div class="dropdown-divider"></div>
                
                <div class="dropdown-section">
                  <button
                    @click="handleLogout"
                    class="dropdown-item logout-item"
                  >
                    <ArrowRightOnRectangleIcon class="dropdown-icon" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- Auth Buttons -->
          <div v-else class="auth-buttons">
            <router-link 
              to="/login" 
              class="auth-btn login-btn"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              class="auth-btn signup-btn"
            >
              <span>Sign Up</span>
              <div class="btn-shine"></div>
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="mobile-menu-btn"
          >
            <div class="hamburger" :class="{ 'open': showMobileMenu }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="mobile-nav-enter-active"
        enter-from-class="mobile-nav-enter-from"
        enter-to-class="mobile-nav-enter-to"
        leave-active-class="mobile-nav-leave-active"
        leave-from-class="mobile-nav-leave-from"
        leave-to-class="mobile-nav-leave-to"
      >
        <div v-if="showMobileMenu" class="mobile-nav">
          <div class="mobile-nav-content">
            <div class="mobile-nav-links">
              <router-link
                v-for="item in navigationItems"
                :key="item.name"
                :to="item.to"
                class="mobile-nav-link"
                :class="{ 'active': $route.path === item.to }"
                @click="closeMobileMenu"
              >
                <component :is="item.icon" class="mobile-nav-icon" />
                <span>{{ item.name }}</span>
                <div class="mobile-nav-arrow">→</div>
              </router-link>
            </div>
            
            <div v-if="!isAuthenticated" class="mobile-auth-section">
              <div class="mobile-auth-divider"></div>
              <div class="mobile-auth-buttons">
                <router-link 
                  to="/login" 
                  class="mobile-auth-btn login"
                  @click="closeMobileMenu"
                >
                  Login
                </router-link>
                <router-link 
                  to="/register" 
                  class="mobile-auth-btn signup"
                  @click="closeMobileMenu"
                >
                  Sign Up
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import {
  BellIcon,
  UserIcon,
  ChartBarIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  HomeIcon,
  MapPinIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

// State
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const showNotifications = ref(false)
const userMenuRef = ref(null)

// Computed
const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)
const unreadCount = computed(() => notificationStore.notifications.length)

// Derived display fields
const displayName = computed(() => {
  const u = user.value
  if (!u) return 'User'
  // Prefer first/last if present; else name; fallback "User"
  const full = `${u.firstName || ''} ${u.lastName || ''}`.trim()
  return full || u.name || 'User'
})

const profileImageUrl = computed(() => user.value?.profileImage || user.value?.avatarUrl || '')
const userInitial = computed(() => (displayName.value?.charAt(0) || 'U').toUpperCase())

// Navigation items
const navigationItems = computed(() => {
  const baseItems = [
    { name: 'Home', to: '/', icon: HomeIcon },
    { name: 'Discover', to: '/map', icon: MapPinIcon },
  ]

  if (isAuthenticated.value) {
    baseItems.push(
      { name: 'Share Food', to: '/listings/create', icon: PlusIcon },
      { name: 'Messages', to: '/messages', icon: ChatBubbleLeftRightIcon }
    )
  }

  return baseItems
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showNotifications.value = false
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
}

const handleLogout = async () => {
  authStore.logout()
  closeUserMenu()
  notificationStore.success('Logged out successfully')
  router.push('/')
}

// Click outside handler
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

// Scroll handler for backdrop blur
const handleScroll = () => {
  const header = document.querySelector('.header-container')
  if (window.scrollY > 20) {
    header?.classList.add('scrolled')
  } else {
    header?.classList.remove('scrolled')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Header Container */
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.header-container.scrolled .header-backdrop {
  background: rgba(255, 255, 255, 0.95);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

.header-nav {
  position: relative;
  z-index: 10;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo-container {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-image {
  width: full;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.brand-tagline {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

/* Desktop Navigation */
.desktop-nav {
  display: none;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
    align-items: center;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 16px;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.nav-link-active {
  color: #667eea;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
}

.nav-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link-active .nav-indicator {
  width: 60%;
}

/* User Actions */
.user-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  position: relative;
  padding: 12px;
  border: none;
  background: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.action-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.action-icon {
  width: 20px;
  height: 20px;
  color: #666;
  stroke-width: 2;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  font-size: 10px;
  font-weight: 700;
  border-radius: 10px;
  padding: 2px 6px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

.btn-glow {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  transition: opacity 0.3s ease;
}

.action-btn.active .btn-glow {
  opacity: 1;
}

/* User Menu */
.user-menu-container {
  position: relative;
}

.user-menu-trigger {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border: none;
  background: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-menu-trigger:hover {
  background: rgba(102, 126, 234, 0.1);
}

.avatar-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  position: relative;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-text {
  color: white;
  font-weight: 700;
  font-size: 16px;
}

.avatar-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ff88, #00d4ff);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-menu-trigger:hover .avatar-ring {
  opacity: 1;
}

.user-info {
  display: none;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 1024px) {
  .user-info {
    display: flex;
  }
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1;
}

.user-role {
  font-size: 12px;
  color: #666;
  line-height: 1;
}

.chevron-icon {
  width: 16px;
  height: 16px;
  color: #666;
  transition: transform 0.3s ease;
}

.chevron-icon.rotate {
  transform: rotate(180deg);
}

/* User Dropdown */
.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 280px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 16px;
}

.dropdown-avatar {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
}

.dropdown-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.dropdown-user-info {
  flex: 1;
}

.dropdown-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.dropdown-email {
  font-size: 14px;
  opacity: 0.8;
}

.dropdown-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.dropdown-section {
  padding: 8px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-item:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.logout-item:hover {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
}

/* Auth Buttons */
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-btn {
  color: #666;
  background: rgba(102, 126, 234, 0.1);
}

.login-btn:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.signup-btn {
  color: white;
  background: linear-gradient(45deg, #667eea, #764ba2);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.signup-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.signup-btn:hover .btn-shine {
  left: 100%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: block;
  padding: 12px;
  border: none;
  background: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.mobile-menu-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.hamburger {
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.hamburger span {
  width: 100%;
  height: 2px;
  background: #666;
  border-radius: 1px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

.hamburger.open span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 16px;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.mobile-nav-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.mobile-nav-arrow {
  margin-left: auto;
  color: #667eea;
  font-weight: 600;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.mobile-nav-link:hover .mobile-nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

.mobile-auth-section {
  margin-top: 20px;
}

.mobile-auth-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

.mobile-auth-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-auth-btn {
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
}

.mobile-auth-btn.login {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.mobile-auth-btn.signup {
  color: white;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

/* Animations */
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

.dropdown-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.dropdown-leave-active {
  transition: all 0.2s ease-in;
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.mobile-nav-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mobile-nav-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.mobile-nav-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav-leave-active {
  transition: all 0.2s ease-in;
}

.mobile-nav-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>