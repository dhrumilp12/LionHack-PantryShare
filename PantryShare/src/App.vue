<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Load user profile if token exists
  if (authStore.token) {
    authStore.loadUserProfile()
  }
})
</script>
