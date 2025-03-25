<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBotStore } from '@/stores/bots'

const authStore = useAuthStore()
const botStore = useBotStore()

onMounted(async () => {
  try {
    await botStore.fetchBots()
  } catch (error) {
    console.error('Failed to fetch bots:', error)
  }
})
</script>

<template>
  <main>
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Welcome to ChatSphere</h1>
        <p v-if="authStore.user">Hello, {{ authStore.user.username }}!</p>
      </header>
      
      <section class="stats-section">
        <div class="stat-card">
          <h3>Your Bots</h3>
          <div class="stat-value">{{ botStore.bots.length }}</div>
        </div>
      </section>
      
      <section class="recent-activity">
        <h2>Recent Bots</h2>
        <div v-if="botStore.loading">Loading bots...</div>
        
        <div v-else-if="botStore.bots.length === 0" class="empty-state">
          <p>You haven't created any bots yet.</p>
          <button class="create-button" @click="$router.push('/bots')">Create Your First Bot</button>
        </div>
        
        <div v-else class="bots-grid">
          <div 
            v-for="bot in botStore.bots.slice(0, 3)" 
            :key="bot.id" 
            class="bot-card"
            @click="$router.push(`/bots/${bot.id}`)"
          >
            <div class="bot-avatar">
              <!-- Display bot avatar or placeholder -->
              <img 
                :src="bot.avatar || 'https://via.placeholder.com/50'" 
                :alt="bot.name"
              />
            </div>
            <div class="bot-info">
              <h3>{{ bot.name }}</h3>
              <p>{{ bot.description || 'No description available' }}</p>
            </div>
          </div>
        </div>
        
        <div class="view-all" v-if="botStore.bots.length > 3">
          <button class="view-all-button" @click="$router.push('/bots')">View All Bots</button>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-header {
  margin-bottom: 40px;
  text-align: center;
}

.dashboard-header h1 {
  font-size: 32px;
  margin-bottom: 8px;
  color: #333;
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  text-align: center;
}

.stat-card h3 {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #4361ee;
}

.recent-activity {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.recent-activity h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
}

.create-button {
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.bots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.bot-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
}

.bot-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
}

.bot-avatar {
  margin-right: 15px;
}

.bot-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.bot-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #333;
}

.bot-info p {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.view-all {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.view-all-button {
  background-color: transparent;
  color: #4361ee;
  border: 1px solid #4361ee;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.view-all-button:hover {
  background-color: #4361ee;
  color: white;
}
</style> 