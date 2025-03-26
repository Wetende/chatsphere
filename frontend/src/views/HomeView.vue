<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBotStore } from '@/stores/bots'

const authStore = useAuthStore()
const botStore = useBotStore()

// Use the auth store to get user info
const userName = computed(() => authStore.user?.username || 'User')

onMounted(async () => {
  try {
    await botStore.fetchBots()
  } catch (error) {
    console.error('Failed to fetch bots:', error)
  }
})
</script>

<template>
  <div class="home">
    <h1>Welcome to ChatSphere, {{ userName }}</h1>
    <p>Your AI chatbot platform</p>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 60px;
}
</style> 