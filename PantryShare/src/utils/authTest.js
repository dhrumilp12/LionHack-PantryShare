/**
 * Auth Integration Test
 * Simple test to verify frontend-backend auth connection
 */

import { useAuthStore } from '@/stores/auth.js'
import authService from '@/services/auth.js'

// Test credentials
const testCredentials = {
  email: 'test@pantryshare.com',
  password: 'test123456'
}

const testUserData = {
  email: 'newuser@pantryshare.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User',
  role: 'student'
}

/**
 * Test authentication flow
 */
export async function testAuthFlow() {
  console.log('🧪 Testing Auth Integration...')
  
  try {
    // Test 1: Register new user
    console.log('1. Testing user registration...')
    const registerResult = await authService.register(testUserData)
    
    if (registerResult.success) {
      console.log('✅ Registration successful')
    } else {
      console.log('❌ Registration failed:', registerResult.error)
    }

    // Test 2: Login with credentials
    console.log('2. Testing user login...')
    const loginResult = await authService.login(testCredentials)
    
    if (loginResult.success) {
      console.log('✅ Login successful')
      console.log('User:', loginResult.user)
      console.log('Token:', loginResult.token.substring(0, 20) + '...')
    } else {
      console.log('❌ Login failed:', loginResult.error)
    }

    // Test 3: Token validation
    console.log('3. Testing token validation...')
    const validateResult = await authService.validateToken()
    
    if (validateResult.success) {
      console.log('✅ Token validation successful')
    } else {
      console.log('❌ Token validation failed:', validateResult.error)
    }

    // Test 4: Profile loading (using store)
    console.log('4. Testing profile loading with store...')
    const authStore = useAuthStore()
    const profileResult = await authStore.loadUserProfile()
    
    if (profileResult && profileResult.success) {
      console.log('✅ Profile loaded successfully')
    } else {
      console.log('❌ Profile loading failed:', profileResult?.error)
    }

    console.log('🎉 Auth integration test completed!')
    
  } catch (error) {
    console.error('❌ Auth integration test failed:', error)
  }
}

/**
 * Test API connectivity
 */
export async function testApiConnectivity() {
  console.log('🌐 Testing API Connectivity...')
  
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL.replace('/api', '/health')
    )
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ Backend is running:', data)
    } else {
      console.log('❌ Backend health check failed:', response.status)
    }
  } catch (error) {
    console.log('❌ Cannot connect to backend:', error.message)
  }
}

/**
 * Run all tests
 */
export async function runIntegrationTests() {
  console.log('🚀 Starting Integration Tests...')
  console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL)
  
  await testApiConnectivity()
  await testAuthFlow()
  
  console.log('✨ Integration tests completed!')
}

// Export for use in dev tools
if (import.meta.env.VITE_DEBUG === 'true') {
  window.runIntegrationTests = runIntegrationTests
  window.testAuthFlow = testAuthFlow
  window.testApiConnectivity = testApiConnectivity
}
