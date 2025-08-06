import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  // State
  const notifications = ref([])

  // Actions
  const addNotification = (notification) => {
    const id = Date.now().toString()
    const newNotification = {
      id,
      type: 'info', // 'success', 'warning', 'error', 'info'
      title: '',
      message: '',
      duration: 4000,
      dismissible: true,
      ...notification,
    }
    
    notifications.value.unshift(newNotification)
    
    // Auto dismiss after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Helper methods for different notification types
  const success = (message, title = 'Success') => {
    return addNotification({
      type: 'success',
      title,
      message,
    })
  }

  const error = (message, title = 'Error') => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration: 6000, // Longer duration for errors
    })
  }

  const warning = (message, title = 'Warning') => {
    return addNotification({
      type: 'warning',
      title,
      message,
    })
  }

  const info = (message, title = 'Info') => {
    return addNotification({
      type: 'info',
      title,
      message,
    })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
  }
})
