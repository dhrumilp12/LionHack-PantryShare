# PantryShare Frontend-Backend Integration

This document explains how the frontend connects to the backend API with proper authentication, error handling, and state management.

## 🏗️ Architecture Overview

```
Frontend (Vue 3)
├── Services Layer
│   ├── api.js (HTTP Client)
│   ├── auth.js (Authentication)
│   ├── user.js (User Management)
│   └── interceptors.js (Global Handlers)
├── Stores (Pinia)
│   ├── auth.js (Authentication State)
│   ├── notifications.js (Global Notifications)
│   └── listings.js (Listings State)
├── Composables
│   └── useAuth.js (Auth Utilities)
└── Components/Views
    ├── Auth Views (Login/Register)
    └── Protected Routes
```

## 🔐 Authentication Flow

### 1. User Registration
```javascript
// Frontend
const result = await authStore.register({
  email: 'user@example.com',
  password: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  role: 'student'
})

// Backend API: POST /api/auth/register
{
  "email": "user@example.com",
  "password": "hashedPassword",
  "firstName": "John",
  "lastName": "Doe", 
  "role": "student"
}
```

### 2. User Login
```javascript
// Frontend
const result = await authStore.login({
  email: 'user@example.com',
  password: 'password123'
})

// Backend API: POST /api/auth/login
// Returns: { user, token }
```

### 3. Token Management
- JWT tokens stored in localStorage
- Automatic token refresh every 6 hours
- Request interceptors add Bearer token
- Response interceptors handle 401 errors

## 🛡️ Security Features

### Token Handling
```javascript
// Automatic token attachment
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('ps_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Error Handling
```javascript
// Global error handling
axios.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      // Auto logout and redirect
      authStore.logout()
      router.push('/auth/login')
    }
    return Promise.reject(new ApiError(error))
  }
)
```

## 🚀 Services

### API Client (`services/api.js`)
- Axios-based HTTP client
- Request/response interceptors
- Error handling and retry logic
- File upload support
- Progress tracking

```javascript
import apiClient from '@/services/api.js'

// GET request with params
const response = await apiClient.get('/listings', {
  category: 'produce',
  distance: 10
})

// POST request
const response = await apiClient.post('/listings', listingData)

// File upload with progress
const response = await apiClient.uploadFile(
  '/upload/image', 
  file, 
  (progress) => console.log(`${progress}% uploaded`)
)
```

### Auth Service (`services/auth.js`)
- Authentication methods
- Token management
- Password reset functionality

```javascript
import authService from '@/services/auth.js'

// Login
const result = await authService.login(credentials)

// Register
const result = await authService.register(userData)

// Refresh token
const result = await authService.refreshToken()
```

### User Service (`services/user.js`)
- Profile management
- Dashboard data
- User preferences

```javascript
import userService from '@/services/user.js'

// Get profile
const profile = await userService.getProfile()

// Update profile
const result = await userService.updateProfile(updates)

// Get dashboard
const dashboard = await userService.getDashboard()
```

## 🏪 State Management

### Auth Store (`stores/auth.js`)
```javascript
import { useAuthStore } from '@/stores/auth.js'

const authStore = useAuthStore()

// State
authStore.user           // Current user object
authStore.token          // JWT token
authStore.loading        // Loading state
authStore.isAuthenticated // Boolean

// Actions
await authStore.login(credentials)
await authStore.register(userData)
await authStore.logout()
await authStore.loadUserProfile()
```

### Using Composables
```javascript
import { useAuth } from '@/composables/useAuth.js'

const { 
  user, 
  isAuthenticated, 
  login, 
  logout, 
  loading 
} = useAuth()
```

## 🛠️ Environment Configuration

### Development (`.env.development`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_NODE_ENV=development
VITE_DEBUG=true
```

### Production (`.env.production`)
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_SOCKET_URL=https://your-api-domain.com
VITE_NODE_ENV=production
VITE_DEBUG=false
```

## 🛣️ Route Protection

### Auth Guards
```javascript
// Router configuration
{
  path: '/dashboard',
  component: DashboardView,
  meta: { requiresAuth: true }
}

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})
```

### Role-based Access
```javascript
// Admin routes
{
  path: '/admin',
  component: AdminView,
  meta: { 
    requiresAuth: true,
    requiresAdmin: true 
  }
}

// Guard implementation
if (to.meta.requiresAdmin && !authStore.isAdmin) {
  next('/unauthorized')
}
```

## 📱 Component Usage

### Login Component
```vue
<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" required />
    <input v-model="password" type="password" required />
    <button :disabled="loading" type="submit">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth.js'

const { login, loading } = useAuth()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const result = await login({
    email: email.value,
    password: password.value
  })
  
  if (result.success) {
    // Handle success
  } else {
    // Handle error
  }
}
</script>
```

### Protected Component
```vue
<template>
  <div v-if="isAuthenticated">
    <h1>Welcome, {{ userName }}!</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth.js'

const { isAuthenticated, userName, logout } = useAuth()
</script>
```

## 🔄 Error Handling

### Global Error Handler
```javascript
// interceptors.js
export function handleApiError(error) {
  if (error.isUnauthorized) {
    authStore.logout()
    router.push('/auth/login')
  } else if (error.isValidationError) {
    notificationStore.error('Validation Error', error.message)
  } else {
    notificationStore.error('Error', error.message)
  }
}
```

### Component Error Handling
```javascript
try {
  const result = await apiCall()
  if (result.success) {
    // Handle success
  } else {
    // Handle API error
    notificationStore.error('Error', result.error)
  }
} catch (error) {
  // Handle network/unexpected errors
  console.error('Unexpected error:', error)
  notificationStore.error('Error', 'Something went wrong')
}
```

## 🧪 Testing

### Mock Authentication
```javascript
// For development/testing
const mockAuth = {
  login: async (credentials) => ({
    success: true,
    user: mockUser,
    token: 'mock-token'
  })
}
```

## 🚀 Deployment

### Backend URL Configuration
1. Update environment variables for production
2. Ensure CORS is configured for your domain
3. Set up SSL certificates
4. Configure rate limiting

### Frontend Build
```bash
npm run build
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/firebase-login` - Firebase authentication
- `POST /api/auth/refresh-token` - Token refresh
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### User Management
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/location` - Update user location
- `GET /api/users/dashboard` - Get dashboard data

### Listings
- `GET /api/listings` - Get listings with filters
- `POST /api/listings` - Create new listing
- `GET /api/listings/:id` - Get listing details
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing

## 🔧 Development Tips

1. **Use TypeScript**: Consider adding TypeScript for better type safety
2. **API Documentation**: Keep API docs updated with backend changes
3. **Error Boundaries**: Implement Vue error boundaries for component errors
4. **Loading States**: Always show loading indicators for better UX
5. **Caching**: Implement smart caching for frequently accessed data
6. **Offline Support**: Consider service workers for offline functionality

## 🐛 Common Issues

### CORS Errors
- Ensure backend CORS configuration includes frontend domain
- Check preflight request handling

### Token Expiry
- Implement automatic token refresh
- Handle refresh failures gracefully

### Network Errors
- Implement retry logic for failed requests
- Show appropriate error messages

### State Sync
- Use proper reactive state management
- Handle component unmounting properly
