// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth.js'

// ====== Guard IntersectionObserver.observe globally ======
if (typeof IntersectionObserver !== 'undefined') {
  const originalObserve = IntersectionObserver.prototype.observe
  IntersectionObserver.prototype.observe = function(target) {
    if (!(target instanceof Element)) {
      // skip any null or non-Element targets
      console.warn('Skipping IntersectionObserver.observe on non-Element:', target)
      return
    }
    return originalObserve.call(this, target)
  }
}

// Import global styles
import './assets/main.css'

// Create the Vue app
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth store after Pinia is set up
const authStore = useAuthStore()

// Initialize authentication state
authStore.initializeAuth().catch(error => {
  console.error('Failed to initialize auth:', error)
})

// Mount the app
app.mount('#app')
