import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'PantryShare - Community Food Rescue Platform'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: {
        title: 'About - PantryShare'
      }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/MapView.vue'),
      meta: {
        title: 'Food Map - PantryShare'
      }
    },
    
    // Authentication Routes
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        title: 'Login - PantryShare',
        requiresGuest: true
      }
    },
    {
      path: '/login',
      redirect: '/auth/login'
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        title: 'Sign Up - PantryShare',
        requiresGuest: true
      }
    },
    {
      path: '/register',
      redirect: '/auth/register'
    },
    {
      path: '/auth/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: {
        title: 'Forgot Password - PantryShare',
        requiresGuest: true
      }
    },
    {
      path: '/forgot-password',
      redirect: '/auth/forgot-password'
    },
    {
      path: '/auth/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/views/auth/ResetPasswordView.vue'),
      meta: {
        title: 'Reset Password - PantryShare',
        requiresGuest: true
      }
    },
    {
      path: '/auth/reset-password',
      name: 'reset-password-query',
      component: () => import('@/views/auth/ResetPasswordView.vue'),
      meta: {
        title: 'Reset Password - PantryShare',
        requiresGuest: true
      }
    },
    
    // Protected Routes
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - PantryShare',
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: {
        title: 'Profile - PantryShare',
        requiresAuth: true
      }
    },
    
    // Listing Routes
    {
      path: '/listings',
      name: 'listings',
      component: () => import('@/views/listings/ListingsView.vue'),
      meta: {
        title: 'Food Listings - PantryShare'
      }
    },
    {
      path: '/listings/create',
      name: 'create-listing',
      component: () => import('@/views/listings/CreateListingView.vue'),
      meta: {
        title: 'Create Listing - PantryShare',
        requiresAuth: true
      }
    },
    {
      path: '/listings/:id',
      name: 'listing-detail',
      component: () => import('@/views/listings/ListingDetailView.vue'),
      meta: {
        title: 'Listing Details - PantryShare'
      }
    },
    {
      path: '/listings/:id/edit',
      name: 'edit-listing',
      component: () => import('@/views/listings/EditListingView.vue'),
      meta: {
        title: 'Edit Listing - PantryShare',
        requiresAuth: true
      }
    },
    
    // Messaging Routes
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/MessagesView.vue'),
      meta: {
        title: 'Messages - PantryShare',
        requiresAuth: true
      }
    },
    {
      path: '/messages/:id',
      name: 'message-thread',
      component: () => import('@/views/MessageThreadView.vue'),
      meta: {
        title: 'Message Thread - PantryShare',
        requiresAuth: true
      }
    },
    
    // Volunteer Routes
    {
      path: '/volunteer',
      name: 'volunteer',
      component: () => import('@/views/VolunteerView.vue'),
      meta: {
        title: 'Volunteer - PantryShare'
      }
    },
    
    // Static Pages
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () => import('@/views/HowItWorksView.vue'),
      meta: {
        title: 'How It Works - PantryShare'
      }
    },
    {
      path: '/impact',
      name: 'impact',
      component: () => import('@/views/ImpactView.vue'),
      meta: {
        title: 'Our Impact - PantryShare'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: {
        title: 'Contact Us - PantryShare'
      }
    },
    
    // Error Routes
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/UnauthorizedView.vue'),
      meta: {
        title: 'Unauthorized - PantryShare'
      }
    },
    {
      path: '/404',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: 'Page Not Found - PantryShare'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Wait for auth initialization if needed
  if (authStore.token && !authStore.user && !authStore.loading) {
    try {
      await authStore.loadUserProfile()
    } catch (error) {
      console.error('Failed to load user profile during navigation:', error)
    }
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }
  
  // Check admin routes
  if (to.meta.requiresAdmin) {
    const adminRoles = ['shelter_admin', 'school_admin', 'super_admin']
    if (!authStore.isAuthenticated) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
      return
    }
    
    if (!adminRoles.includes(authStore.userRole)) {
      next('/unauthorized')
      return
    }
  }
  
  next()
})

export default router
