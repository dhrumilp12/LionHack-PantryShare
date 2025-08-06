<template>
  <teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <transition-group
        name="notification"
        tag="div"
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-x-full"
        enter-to-class="transform opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 translate-x-full"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="ps-card ps-card--hover max-w-sm"
          :class="getNotificationClasses(notification.type)"
        >
          <div class="flex items-start p-4">
            <!-- Icon -->
            <div class="flex-shrink-0 mr-3">
              <component
                :is="getNotificationIcon(notification.type)"
                class="w-5 h-5"
                :class="getIconClasses(notification.type)"
              />
            </div>
            
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h4 v-if="notification.title" class="font-medium text-sm mb-1" :class="getTitleClasses(notification.type)">
                {{ notification.title }}
              </h4>
              <p class="text-sm" :class="getMessageClasses(notification.type)">
                {{ notification.message }}
              </p>
            </div>
            
            <!-- Dismiss Button -->
            <button
              v-if="notification.dismissible"
              @click="removeNotification(notification.id)"
              class="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-black/5 transition-colors duration-200"
              :class="getDismissClasses(notification.type)"
            >
              <XMarkIcon class="w-4 h-4" />
            </button>
          </div>
          
          <!-- Progress Bar -->
          <div
            v-if="notification.duration > 0"
            class="h-1 bg-black/10 overflow-hidden"
          >
            <div
              class="h-full transition-all ease-linear"
              :class="getProgressClasses(notification.type)"
              :style="{ 
                width: '100%',
                animation: `progress ${notification.duration}ms linear forwards`
              }"
            ></div>
          </div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notifications'
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const notificationStore = useNotificationStore()

// Computed
const notifications = computed(() => notificationStore.notifications)

// Methods
const removeNotification = (id) => {
  notificationStore.removeNotification(id)
}

const getNotificationIcon = (type) => {
  const icons = {
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
  }
  return icons[type] || InformationCircleIcon
}

const getNotificationClasses = (type) => {
  const classes = {
    success: 'border-l-4 border-success bg-success/5',
    warning: 'border-l-4 border-warning bg-warning/5',
    error: 'border-l-4 border-error bg-error/5',
    info: 'border-l-4 border-primary-500 bg-primary-500/5',
  }
  return classes[type] || classes.info
}

const getIconClasses = (type) => {
  const classes = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-primary-500',
  }
  return classes[type] || classes.info
}

const getTitleClasses = (type) => {
  const classes = {
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-primary-500',
  }
  return classes[type] || classes.info
}

const getMessageClasses = (type) => {
  const classes = {
    success: 'text-success/80',
    warning: 'text-warning/80',
    error: 'text-error/80',
    info: 'text-primary-500/80',
  }
  return classes[type] || classes.info
}

const getDismissClasses = (type) => {
  const classes = {
    success: 'text-success/60 hover:text-success',
    warning: 'text-warning/60 hover:text-warning',
    error: 'text-error/60 hover:text-error',
    info: 'text-primary-500/60 hover:text-primary-500',
  }
  return classes[type] || classes.info
}

const getProgressClasses = (type) => {
  const classes = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-primary-500',
  }
  return classes[type] || classes.info
}
</script>

<style scoped>
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>
