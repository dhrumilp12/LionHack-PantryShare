<template>
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
  <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Profile Settings</h1>
        <p class="text-xl text-gray-600">Manage your account information and preferences</p>
        <div class="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- Profile Form -->
      <div class="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
        <form @submit.prevent="handleUpdateProfile">
          <!-- Profile Photo Section -->
          <div class="px-8 py-8 border-b border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Profile Photo</h2>
            <div class="flex items-center space-x-8">
              <div class="flex-shrink-0 relative">
                <img
                  :src="form.profilePhoto || defaultAvatar"
                  :alt="form.firstName + ' ' + form.lastName"
                  class="h-24 w-24 rounded-full object-cover border-4 border-white shadow-xl"
                />
                <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <button
                  type="button"
                  class="inline-flex items-center px-6 py-3 border-2 border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-500/25 transform hover:-translate-y-1 transition-all duration-200"
                >
                  <svg class="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Change Photo
                </button>
                <p class="mt-3 text-sm text-gray-500">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          <!-- Personal Info Section -->
          <div class="px-8 py-8 border-b border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(field, index) in [
                { label: 'First Name', id: 'firstName', type: 'text' },
                { label: 'Last Name', id: 'lastName', type: 'text' },
                { label: 'Email Address', id: 'email', type: 'email' },
                { label: 'Phone Number', id: 'phone', type: 'tel' }
              ]" :key="index" class="form-group">
                <label :for="field.id" class="block text-sm font-semibold text-gray-700 mb-2">
                  {{ field.label }}
                </label>
                <input
                  :id="field.id"
                  v-model="form[field.id]"
                  :type="field.type"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/25 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="px-8 py-8 border-b border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Location</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2 form-group">
                <label for="address" class="block text-sm font-semibold text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  id="address"
                  v-model="form.address"
                  type="text"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/25 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                />
              </div>
              <div class="form-group">
                <label for="city" class="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>
                <input
                  id="city"
                  v-model="form.city"
                  type="text"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/25 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                />
              </div>
              <div class="form-group">
                <label for="zipCode" class="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  id="zipCode"
                  v-model="form.zipCode"
                  type="text"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500/25 focus:border-green-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <!-- Account Type -->
          <div class="px-8 py-8 border-b border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Account Type</h2>
            <div class="space-y-4">
              <div v-for="(type, index) in [
                { id: 'donor', value: 'donor', label: 'Food Donor', desc: 'I share surplus food from my business or home', icon: '🏪' },
                { id: 'recipient', value: 'recipient', label: 'Food Recipient', desc: 'I receive food donations for myself or my family', icon: '👥' },
                { id: 'volunteer', value: 'volunteer', label: 'Volunteer', desc: 'I help transport and distribute food donations', icon: '🤝' }
              ]" :key="index" class="relative">
                <input
                  :id="type.id"
                  v-model="form.userType"
                  type="radio"
                  :value="type.value"
                  class="sr-only"
                />
                <label 
                  :for="type.id" 
                  :class="[
                    'relative flex cursor-pointer rounded-xl p-4 border-2 transition-all duration-200',
                    form.userType === type.value 
                      ? 'border-green-500 bg-gradient-to-r from-green-50 to-blue-50 shadow-lg' 
                      : 'border-gray-200 bg-white/50 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/50'
                  ]"
                >
                  <div class="flex items-start space-x-4 w-full">
                    <div class="text-2xl">{{ type.icon }}</div>
                    <div class="flex-1">
                      <div class="flex items-center">
                        <div class="text-lg font-semibold text-gray-900">{{ type.label }}</div>
                        <div v-if="form.userType === type.value" class="ml-auto">
                          <div class="h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                            <svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p class="mt-1 text-sm text-gray-600">{{ type.desc }}</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Notification Preferences -->
          <div class="px-8 py-8 border-b border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <div class="space-y-6">
              <div v-for="(notif, index) in [
                { label: 'Email Notifications', description: 'Receive updates about new listings and messages', model: 'emailNotifications', icon: '📧' },
                { label: 'SMS Notifications', description: 'Receive urgent updates via text message', model: 'smsNotifications', icon: '📱' }
              ]" :key="index" class="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50/50 to-blue-50/50 border border-gray-100">
                <div class="flex items-start space-x-3">
                  <div class="text-xl">{{ notif.icon }}</div>
                  <div>
                    <p class="text-lg font-semibold text-gray-900">{{ notif.label }}</p>
                    <p class="text-sm text-gray-600">{{ notif.description }}</p>
                  </div>
                </div>
                <button
                  type="button"
                  :class="[
                    form[notif.model] ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-300',
                    'relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500/25'
                  ]"
                  @click="form[notif.model] = !form[notif.model]"
                >
                  <span
                    :class="[
                      form[notif.model] ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out'
                    ]"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="px-8 py-8">
            <div class="flex justify-end space-x-4">
              <button
                type="button"
                class="px-6 py-3 border-2 border-gray-300 rounded-xl shadow-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-8 py-3 border-2 border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:opacity-50 transform hover:-translate-y-1 transition-all duration-200"
              >
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Account Actions -->
      <div class="mt-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
        <div class="px-8 py-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Account Actions</h2>
          <div class="flex flex-wrap gap-4">
            <button
              type="button"
              class="inline-flex items-center px-6 py-3 border-2 border-blue-300 rounded-xl shadow-lg text-base font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-200 transform hover:-translate-y-1"
            >
              <svg class="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
            <button
              type="button"
              class="inline-flex items-center px-6 py-3 border-2 border-red-300 rounded-xl shadow-lg text-base font-semibold text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-4 focus:ring-red-500/25 transition-all duration-200 transform hover:-translate-y-1"
            >
              <svg class="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>  
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(false)

const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  userType: 'recipient',
  profilePhoto: '',
  emailNotifications: true,
  smsNotifications: false
})

const handleUpdateProfile = async () => {
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    authStore.updateProfile(form)
    alert('Profile updated successfully!')
  } catch (error) {
    console.error('Profile update failed:', error)
    alert('Failed to update profile. Please try again.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (authStore.user) {
    Object.assign(form, {
      firstName: authStore.user.firstName || '',
      lastName: authStore.user.lastName || '',
      email: authStore.user.email || '',
      phone: authStore.user.phone || '',
      address: authStore.user.address || '',
      city: authStore.user.city || '',
      zipCode: authStore.user.zipCode || '',
      userType: authStore.user.userType || 'recipient',
      profilePhoto: authStore.user.profilePhoto || '',
      emailNotifications: authStore.user.emailNotifications ?? true,
      smsNotifications: authStore.user.smsNotifications ?? false
    })
  }
})
</script>

<style scoped>
/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
  backdrop-filter: blur(20px);
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: -5%;
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
  bottom: 10%;
  left: 50%;
  animation-delay: 6s;
}

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

/* Form Groups */
.form-group {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Input Focus Effects */
input:focus {
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Button Hover Effects */
button:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

/* Radio Button Custom Styling */
input[type="radio"]:checked + label {
  transform: scale(1.02);
}
</style>