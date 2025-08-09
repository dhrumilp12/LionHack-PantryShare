<template>
  <div class="profile-container">
    <!-- Hero Header Section -->
    <section class="profile-hero">
      <div class="hero-bg">
        <div class="floating-orb orb-1"></div>
        <div class="floating-orb orb-2"></div>
        <div class="floating-orb orb-3"></div>
      </div>
      
      <div class="container">
        <div class="hero-header">
          <!-- Back Button -->
          <button @click="handleGoBack" class="back-button">
            <svg class="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <!-- Hero Content -->
          <div class="hero-content">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              Account Settings
            </div>
            
            <h1 class="hero-title">Profile Settings</h1>
            
            <p class="hero-description">
              Manage your account information and preferences
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="form-container">
          <!-- Profile Form Card -->
          <div class="form-card">
            <form @submit.prevent="handleUpdateProfile">
              <!-- Profile Photo Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon photo">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div class="section-info">
                    <h2 class="section-title">Profile Photo</h2>
                    <p class="section-description">Update your profile picture</p>
                  </div>
                </div>

                <div class="photo-section">
                  <div class="photo-display">
                    <div class="photo-wrapper">
                      <img
                        :src="profileImage"
                        :alt="form.firstName + ' ' + form.lastName"
                        class="profile-image"
                      />
                      <div class="photo-indicator" v-if="selectedImage">
                        <svg class="indicator-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div class="photo-indicator" v-else>
                        <svg class="indicator-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="photo-actions">
                    <button type="button" @click="handleImageSelect" class="photo-btn primary" :disabled="userStore.isUploading">
                      <svg v-if="!userStore.isUploading" class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <svg v-else class="btn-icon loading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {{ userStore.isUploading ? `Uploading... ${userStore.uploadProgress}%` : 'Change Photo' }}
                    </button>
                    <p class="photo-hint">JPG, PNG up to 5MB</p>
                    <input
                      ref="imageUploadRef"
                      type="file"
                      accept="image/*"
                      @change="handleImageChange"
                      class="hidden-input"
                    />
                  </div>
                </div>
              </div>

              <!-- Personal Information Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon personal">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="section-info">
                    <h2 class="section-title">Personal Information</h2>
                    <p class="section-description">Your basic profile details</p>
                  </div>
                </div>

                <div class="form-grid">
                  <div class="form-group">
                    <label for="firstName" class="form-label">
                      First Name <span class="required">*</span>
                    </label>
                    <input
                      id="firstName"
                      v-model="form.firstName"
                      type="text"
                      required
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName" class="form-label">
                      Last Name <span class="required">*</span>
                    </label>
                    <input
                      id="lastName"
                      v-model="form.lastName"
                      type="text"
                      required
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email" class="form-label">
                      Email Address <span class="required">*</span>
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      readonly
                      class="form-input"
                      style="background-color: #f3f4f6; cursor: not-allowed;"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone" class="form-label">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div class="form-group full-width">
                    <label for="bio" class="form-label">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      v-model="form.bio"
                      rows="3"
                      class="form-input"
                      placeholder="Tell us a bit about yourself..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Location Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon location">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="section-info">
                    <h2 class="section-title">Location</h2>
                    <p class="section-description">Your address and location details</p>
                  </div>
                </div>

                <div class="form-grid">
                  <div class="form-group full-width">
                    <label for="address" class="form-label">
                      Street Address
                    </label>
                    <input
                      id="address"
                      v-model="form.address"
                      type="text"
                      class="form-input"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div class="form-group">
                    <label for="city" class="form-label">
                      City
                    </label>
                    <input
                      id="city"
                      v-model="form.city"
                      type="text"
                      class="form-input"
                      placeholder="New York"
                    />
                  </div>
                  <div class="form-group">
                    <label for="state" class="form-label">
                      State
                    </label>
                    <input
                      id="state"
                      v-model="form.state"
                      type="text"
                      class="form-input"
                      placeholder="NY"
                    />
                  </div>
                  <div class="form-group">
                    <label for="zipCode" class="form-label">
                      ZIP Code
                    </label>
                    <input
                      id="zipCode"
                      v-model="form.zipCode"
                      type="text"
                      class="form-input"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </div>

              <!-- Account Type Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon account">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="section-info">
                    <h2 class="section-title">Account Type</h2>
                    <p class="section-description">Choose your primary role in the community</p>
                  </div>
                </div>

                <div class="account-options">
                  <div v-for="type in accountTypes" :key="type.value" class="account-option">
                    <input
                      :id="type.id"
                      v-model="form.preferences.accountType"
                      type="radio"
                      :value="type.value"
                      class="option-input"
                    />
                    <label :for="type.id" class="option-label" :class="{ active: form.preferences.accountType === type.value }">
                      <div class="option-content">
                        <div class="option-icon">{{ type.icon }}</div>
                        <div class="option-info">
                          <h3 class="option-title">{{ type.label }}</h3>
                          <p class="option-description">{{ type.description }}</p>
                        </div>
                        <div class="option-indicator">
                          <div class="indicator-check">
                            <svg class="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Notification Preferences Section -->
              <div class="form-section">
                <div class="section-header">
                  <div class="section-icon notifications">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.021 18.071a13.05 13.05 0 010-18.142C8.935 4.344 14.965 4.344 19.879 0M12 12m0-5v5h5" />
                    </svg>
                  </div>
                  <div class="section-info">
                    <h2 class="section-title">Notification Preferences</h2>
                    <p class="section-description">Manage how you receive updates</p>
                  </div>
                </div>

                <div class="notification-options">
                  <div v-for="notification in notificationTypes" :key="notification.id" class="notification-option">
                    <div class="notification-content">
                      <div class="notification-icon">{{ notification.icon }}</div>
                      <div class="notification-info">
                        <h3 class="notification-title">{{ notification.label }}</h3>
                        <p class="notification-description">{{ notification.description }}</p>
                      </div>
                    </div>
                    <div class="notification-toggle">
                      <button
                        type="button"
                        :class="['toggle-btn', { active: form.preferences[notification.id] }]"
                        @click="form.preferences[notification.id] = !form.preferences[notification.id]"
                      >
                        <div class="toggle-slider"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button type="button" @click="handleGoBack" class="action-btn secondary" :disabled="saving">
                  <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="saving || !isFormValid || loading"
                  class="action-btn primary"
                >
                  <svg v-if="saving" class="btn-icon loading" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <svg v-else class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ saving ? 'Saving...' : 'Save Changes' }}
                </button>
                <div v-if="hasUnsavedChanges" class="unsaved-indicator">
                  <span class="unsaved-dot"></span>
                  You have unsaved changes
                </div>
              </div>
            </form>
          </div>

          <!-- Account Actions Card -->
          <div class="actions-card">
            <div class="card-header">
              <div class="section-icon actions">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <div class="section-info">
                <h2 class="section-title">Account Actions</h2>
                <p class="section-description">Manage your account security and settings</p>
              </div>
            </div>

            <div class="action-buttons">
              <button type="button" class="account-action-btn password" @click="handlePasswordChange">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Change Password</span>
              </button>
              <button type="button" class="account-action-btn delete" @click="handleAccountDeactivation">
                <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 12M6 6l6 6" />
                </svg>
                <span>Deactivate Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notifications'

// Composables
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()
const notificationStore = useNotificationStore()

// State
const loading = ref(false)
const saving = ref(false)
const imageUploadRef = ref(null)
const selectedImage = ref(null)
const imagePreview = ref(null)

// Default avatar
const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bio: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  role: 'recipient',
  profileImage: '',
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    weeklyDigest: true,
    // UI-only selection for the Account Type section; we'll map to role if needed
    accountType: 'recipient',
  }
})

// Computed
const profileImage = computed(() => {
  console.log('=== Profile Image Debug ===')
  console.log('imagePreview.value:', imagePreview.value)
  console.log('form.profileImage:', form.profileImage)
  console.log('authStore.user?.profileImage:', authStore.user?.profileImage)
  console.log('userStore.profile?.profileImage:', userStore.profile?.profileImage)
  console.log('defaultAvatar:', defaultAvatar)
  
  const result = imagePreview.value || 
                 form.profileImage || 
                 authStore.user?.profileImage || 
                 userStore.profile?.profileImage || 
                 defaultAvatar
  console.log('Final profileImage result:', result)
  return result
})

const hasUnsavedChanges = computed(() => {
  if (!userStore.profile) return false
  
  const profile = userStore.profile
  return (
    form.firstName !== (profile.firstName || '') ||
    form.lastName !== (profile.lastName || '') ||
    form.phone !== (profile.phone || '') ||
    form.bio !== (profile.bio || '') ||
    form.address !== (profile.address || '') ||
    form.city !== (profile.city || '') ||
    form.state !== (profile.state || '') ||
    form.zipCode !== (profile.zipCode || '') ||
    JSON.stringify(form.preferences) !== JSON.stringify(profile.preferences || {})
  )
})

const isFormValid = computed(() => {
  return form.firstName.trim() && form.lastName.trim() && form.email.trim()
})

// Account type options
const accountTypes = [
  {
    id: 'donor',
    value: 'donor',
    label: 'Food Donor',
    description: 'I share surplus food from my business or home',
    icon: '🏪'
  },
  {
    id: 'recipient',
    value: 'recipient',
    label: 'Food Recipient',
    description: 'I receive food donations for myself or my family',
    icon: '👥'
  },
  {
    id: 'volunteer',
    value: 'volunteer',
    label: 'Volunteer',
    description: 'I help transport and distribute food donations',
    icon: '🤝'
  }
]

// Notification options
const notificationTypes = [
  {
    id: 'emailNotifications',
    label: 'Email Notifications',
    description: 'Receive important updates via email',
    icon: '📧'
  },
  {
    id: 'smsNotifications',
    label: 'SMS Notifications',
    description: 'Get text messages for urgent updates',
    icon: '�'
  },
  {
    id: 'marketingEmails',
    label: 'Marketing Emails',
    description: 'Receive promotional content and tips',
    icon: '📬'
  },
  {
    id: 'weeklyDigest',
    label: 'Weekly Digest',
    description: 'Get a summary of your weekly activity',
    icon: '�'
  }
]

// Methods
const loadProfile = async () => {
  loading.value = true
  
  try {
    console.log('=== Loading Profile ===')
    const result = await userStore.loadProfile()
    console.log('UserStore loadProfile result:', result)
    
    if (result.success && result.user) {
      console.log('Profile loaded successfully, calling populateForm with:', result.user)
      populateForm(result.user)
    } else {
      console.error('Failed to load profile:', result.error)
      notificationStore.error('Failed to Load Profile', result.error || 'Could not load your profile data.')
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    notificationStore.error('Error', 'An unexpected error occurred while loading your profile.')
  } finally {
    loading.value = false
  }
}

const populateForm = (profile) => {
  console.log('=== Populating Form ===')
  console.log('Profile data received:', profile)
  console.log('Profile keys:', Object.keys(profile))
  console.log('Profile profileImage:', profile.profileImage)
  
  
  form.firstName = profile.firstName || ''
  form.lastName = profile.lastName || ''
  form.email = profile.email || ''
  form.phone = profile.phone || ''
  form.bio = profile.bio || ''
  form.address = profile.address || ''
  form.city = profile.city || ''
  form.state = profile.state || ''
  form.zipCode = profile.zipCode || ''
  form.role = profile.role || 'recipient'
  form.profileImage = profile.profileImage
  
  console.log('Form profileImage set to:', form.profileImage)
  
  // Handle preferences
  if (profile.preferences) {
    Object.assign(form.preferences, profile.preferences)
  }

  // Map backend role to visible account type in preferences if missing
  if (!form.preferences.accountType) {
    // Student maps to recipient by default for the triad in the UI
    const roleToAccountTypeMap = {
      student: 'recipient',
      recipient: 'recipient',
      donor: 'donor',
      volunteer: 'volunteer',
    }
    form.preferences.accountType = roleToAccountTypeMap[form.role] || 'recipient'
  }
}

const handleImageSelect = () => {
  imageUploadRef.value?.click()
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (!file) return

  console.log('Selected file:', file.name, file.type, file.size)

  // Validate file type
  if (!file.type.startsWith('image/')) {
    notificationStore.error('Invalid File', 'Please select a valid image file.')
    return
  }

  // Validate file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    notificationStore.error('File Too Large', 'Please select an image smaller than 5MB.')
    return
  }

  selectedImage.value = file

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)

  // Auto-upload the image immediately
  uploadProfileImage()
}

const uploadProfileImage = async () => {
  if (!selectedImage.value) return { success: true }

  console.log('Starting image upload...', selectedImage.value.name)

  try {
    const result = await userStore.uploadProfileImage(selectedImage.value)
    
    console.log('Upload result:', result)
    
    if (result.success) {
      // Update form with new image URL
      form.profileImage = result.imageUrl
      
      // Also update the user profile with the new image URL
      console.log('Updating user profile with new image URL:', result.imageUrl)
      const profileUpdateResult = await userStore.updateProfile({ 
        profileImage: result.imageUrl 
      })
      
      if (profileUpdateResult.success) {
        console.log('Profile updated with new image URL')
        selectedImage.value = null
        imagePreview.value = null
        notificationStore.success('Image Uploaded', 'Profile image updated successfully!')
        return { success: true, imageUrl: result.imageUrl }
      } else {
        console.error('Failed to update profile with image URL:', profileUpdateResult.error)
        notificationStore.error('Profile Update Failed', 'Image uploaded but failed to update profile.')
        return { success: false, error: 'Failed to update profile with image' }
      }
    } else {
      notificationStore.error('Upload Failed', result.error || 'Failed to upload profile image.')
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    notificationStore.error('Upload Failed', 'An unexpected error occurred while uploading the image.')
    return { success: false, error: 'Failed to upload image' }
  }
}

const handleUpdateProfile = async () => {
  if (!isFormValid.value) {
    notificationStore.error('Validation Error', 'Please fill in all required fields.')
    return
  }

  saving.value = true

  try {
    // Upload image first if selected
    if (selectedImage.value) {
      const uploadResult = await uploadProfileImage()
      if (!uploadResult.success) {
        notificationStore.error('Upload Failed', uploadResult.error || 'Failed to upload profile image.')
        return
      }
    }

    // Prepare update data
    const updateData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      bio: form.bio.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      zipCode: form.zipCode.trim(),
      preferences: {
        ...form.preferences,
        accountType: form.preferences.accountType || 'recipient'
      }
    }

    // Remove empty fields
    Object.keys(updateData).forEach(key => {
      if (key !== 'preferences' && (!updateData[key] || updateData[key] === '')) {
        delete updateData[key]
      }
    })

    // Update profile
    const result = await userStore.updateProfile(updateData)
    
    if (result.success) {
      // Success notification is handled by the store
      // Optionally redirect or perform other actions
    } else {
      // Error notification is handled by the store
      console.error('Profile update failed:', result.error)
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    notificationStore.error('Update Failed', 'An unexpected error occurred while updating your profile.')
  } finally {
    saving.value = false
  }
}

const handleLocationUpdate = async () => {
  if (!form.address || !form.city) {
    notificationStore.error('Missing Information', 'Please provide both address and city for location update.')
    return
  }

  try {
    // Here you would typically geocode the address to get coordinates
    // For now, we'll use a placeholder implementation
    const locationData = {
      address: `${form.address}, ${form.city}, ${form.state} ${form.zipCode}`.trim(),
      latitude: 0, // This should be from geocoding
      longitude: 0, // This should be from geocoding
    }

    await userStore.updateLocation(locationData)
  } catch (error) {
    console.error('Error updating location:', error)
    notificationStore.error('Location Update Failed', 'Failed to update your location.')
  }
}

const handlePreferencesUpdate = async () => {
  try {
    await userStore.updatePreferences(form.preferences)
  } catch (error) {
    console.error('Error updating preferences:', error)
    notificationStore.error('Preferences Update Failed', 'Failed to update your preferences.')
  }
}

const handlePasswordChange = () => {
  // For now, show a simple prompt - in production, this would open a proper modal/form
  notificationStore.info('Password Change', 'Password change functionality will be implemented in a separate modal.')
  // TODO: Implement password change modal
}

const handleAccountDeactivation = async () => {
  const confirmed = confirm('Are you sure you want to deactivate your account? This action can be reversed later.')
  
  if (!confirmed) return

  try {
    const result = await userStore.deactivateAccount()
    
    if (result.success) {
      // Redirect to home or login page
      router.push('/')
    }
  } catch (error) {
    console.error('Error deactivating account:', error)
    notificationStore.error('Deactivation Failed', 'Failed to deactivate your account.')
  }
}

const handleGoBack = () => {
  if (hasUnsavedChanges.value) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to leave?')
    if (!confirmed) return
  }
  
  router.go(-1)
}

// Lifecycle
onMounted(async () => {
  await loadProfile()
})

// Watch for auth changes
watch(() => authStore.user, (newUser) => {
  if (newUser) {
    populateForm(newUser)
  }
}, { immediate: true })
</script>

<style scoped>
/* Floating Orbs Container */
.orb-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

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

/* Animation Utilities */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Profile Container */
.profile-container {
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

/* Profile Hero Section */
.profile-hero {
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

.hero-header {
  position: relative;
  z-index: 10;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.back-icon {
  width: 20px;
  height: 20px;
}

.hero-content {
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
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hero-description {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Main Content */
.main-content {
  position: relative;
  padding: 4rem 0;
  z-index: 1;
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 4rem 0 2rem;
  text-align: center;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Form Container */
.form-container {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Form Card */
.form-card {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px 24px 0 0;
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

/* Form Sections */
.form-section {
  margin-bottom: 3rem;
}

.form-section:last-child {
  margin-bottom: 0;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Section Cards */
.section-card, .profile-card, .personal-info-card, .location-card, .account-type-card, .notifications-card, .actions-card {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 20px 60px rgba(102, 126, 234, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.section-card::before, .profile-card::before, .personal-info-card::before, .location-card::before, .account-type-card::before, .notifications-card::before, .actions-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px 24px 0 0;
}

.section-card:hover, .profile-card:hover, .personal-info-card:hover, .location-card:hover, .account-type-card:hover, .notifications-card:hover, .actions-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 32px 80px rgba(102, 126, 234, 0.12),
    0 16px 32px rgba(0, 0, 0, 0.06);
}

/* Section Headers */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-description {
  color: #64748b;
  font-size: 1rem;
}

/* Avatar Upload */
.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-upload {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.avatar-upload:hover .avatar-preview {
  transform: scale(1.05);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.upload-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  opacity: 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.avatar-upload:hover .upload-overlay {
  opacity: 1;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Photo Section */
.photo-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.photo-display {
  flex-shrink: 0;
}

.photo-wrapper {
  position: relative;
  display: inline-block;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.photo-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.indicator-icon {
  width: 16px;
  height: 16px;
}

.photo-actions {
  flex: 1;
}

.photo-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
}

.photo-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.photo-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.photo-hint {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

/* Form Elements */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
  margin-left: 0.25rem;
}

.form-input, .form-select {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

/* Account Options */
.account-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.account-option {
  position: relative;
}

.option-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.option-label {
  display: block;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.option-label:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.option-label.active {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.option-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.option-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.option-info {
  flex: 1;
}

.option-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.option-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.option-indicator {
  flex-shrink: 0;
}

.indicator-check {
  width: 24px;
  height: 24px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.option-label.active .indicator-check {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
}

.check-icon {
  width: 14px;
  height: 14px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.option-label.active .check-icon {
  opacity: 1;
}

/* Account Types */
.account-type-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.account-type-option {
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  text-align: center;
  position: relative;
}

.account-type-option:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.account-type-option.selected {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.account-type-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  display: block;
}

.account-type-label {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.account-type-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
}

/* Notification Options */
.notification-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  transition: all 0.3s ease;
}

.notification-option:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.notification-icon {
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
}

.notification-info {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.notification-description {
  color: #64748b;
  font-size: 0.9rem;
}

/* Toggle Switch */
.notification-toggle {
  flex-shrink: 0;
}

.toggle-btn {
  position: relative;
  width: 52px;
  height: 28px;
  background: #e5e7eb;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.toggle-btn.active .toggle-slider {
  transform: translateX(24px);
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
  position: relative;
}

.unsaved-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f59e0b;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: auto;
}

.unsaved-dot {
  width: 8px;
  height: 8px;
  background: #f59e0b;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(245, 158, 11, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
  }
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  gap: 8px;
  min-width: 120px;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.action-btn.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.action-btn.secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.btn-icon.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Account Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.account-action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  flex: 1;
  min-width: 180px;
}

.account-action-btn.password {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.account-action-btn.password:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.account-action-btn.delete {
  background: #ef4444;
  color: white;
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
}

.account-action-btn.delete:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(239, 68, 68, 0.4);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-container {
    background: linear-gradient(135deg, #f6f9fc 0%, #e9f4f7 100%);
  }
  
  .profile-hero {
    padding: 1.5rem 0 3rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
  
  .main-content {
    padding: 3rem 0;
  }
  
  .form-card, .profile-card, .personal-info-card, .location-card, .account-type-card, .notifications-card, .actions-card {
    padding: 1.5rem;
    border-radius: 20px;
    margin-bottom: 1.5rem;
  }
  
  .section-header, .card-header {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .section-icon {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .photo-section {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .account-type-grid {
    grid-template-columns: 1fr;
  }
  
  .account-type-option, .option-label {
    padding: 1.25rem;
  }
  
  .notification-option {
    padding: 1.25rem;
  }
  
  .notification-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .form-actions {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
    padding: 16px 24px;
  }
  
  .profile-image, .avatar-preview {
    width: 100px;
    height: 100px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .account-action-btn {
    min-width: auto;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .form-card, .profile-card, .personal-info-card, .location-card, .account-type-card, .notifications-card, .actions-card {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }
  
  .notification-content {
    text-align: left;
  }
  
  .option-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .option-indicator {
    align-self: flex-end;
  }
}
</style>