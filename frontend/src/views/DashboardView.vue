<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBotStore } from '@/stores/bots'
import api from '@/services/api'

// Import stores
const authStore = useAuthStore()
const botStore = useBotStore()

// State variables
const conversations = ref([])
const stats = ref({
  totalConversations: 0,
  averageResponseTime: 0
})
const isLoading = ref(true)
const error = ref(null)

// Computed properties
const userName = computed(() => authStore.user?.username || 'User')
const bots = computed(() => botStore.bots || [])
const activeBots = computed(() => bots.value.filter(bot => bot.is_active))

// Fetch dashboard data
const fetchDashboardData = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Fetch bots if not already loaded
    if (bots.value.length === 0) {
      await botStore.fetchBots()
    }
    
    // Fetch recent conversations
    // For now we're using a sample implementation since we don't have a conversations store yet
    try {
      const response = await api.conversations.getAll()
      conversations.value = response.data.slice(0, 5) // Take only 5 most recent
    } catch (err) {
      console.error('Failed to fetch conversations:', err)
      conversations.value = [] // Fallback to empty array
    }
    
    // For demo purposes, populate with sample stats if not available
    // In a real implementation, this would come from an API endpoint
    stats.value = {
      totalConversations: conversations.value.length,
      averageResponseTime: '1.5s'
    }
  } catch (err) {
    error.value = 'Failed to load dashboard data'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// Toggle bot status
const toggleBotStatus = async (bot) => {
  try {
    // Update bot status
    await botStore.updateBot(bot.id, {
      ...bot,
      is_active: !bot.is_active
    })
  } catch (err) {
    console.error('Failed to update bot status:', err)
  }
}

// View conversation details
const viewConversation = (conversationId) => {
  // This would navigate to conversation detail page
  // router.push(`/conversations/${conversationId}`)
  console.log('View conversation:', conversationId)
}

// Load data when component mounts
onMounted(fetchDashboardData)
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    
    <!-- Welcome Section -->
    <div class="welcome-section">
      <h2>Welcome back, {{ userName }}</h2>
      <p>Here's an overview of your chatbots and conversations</p>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <p>Loading dashboard data...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchDashboardData">Retry</button>
    </div>
    
    <!-- Dashboard Content -->
    <div v-else class="dashboard-content">
      <!-- Stats Section -->
      <section class="stats-section">
        <h3>Performance Stats</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <h4>Total Conversations</h4>
            <p class="stat-value">{{ stats.totalConversations }}</p>
          </div>
          <div class="stat-card">
            <h4>Average Response Time</h4>
            <p class="stat-value">{{ stats.averageResponseTime }}</p>
          </div>
          <div class="stat-card">
            <h4>Active Bots</h4>
            <p class="stat-value">{{ activeBots.length }}</p>
          </div>
        </div>
      </section>
      
      <!-- Active Bots Section -->
      <section class="bots-section">
        <div class="section-header">
          <h3>Your Chatbots</h3>
          <button class="primary-button" @click="$router.push('/create-chatbot')">+ Create New Bot</button>
        </div>
        
        <div v-if="bots.length === 0" class="empty-state">
          <p>You don't have any chatbots yet. Create your first bot to get started!</p>
        </div>
        
        <div v-else class="bots-list">
          <div v-for="bot in bots" :key="bot.id" class="bot-card">
            <div class="bot-info">
              <h4>{{ bot.name }}</h4>
              <p>{{ bot.description }}</p>
            </div>
            <div class="bot-actions">
              <div class="status-toggle">
                <span>Status: {{ bot.is_active ? 'Online' : 'Offline' }}</span>
                <button 
                  @click="toggleBotStatus(bot)" 
                  :class="['toggle-button', bot.is_active ? 'active' : 'inactive']"
                >
                  {{ bot.is_active ? 'Set Offline' : 'Set Online' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Recent Conversations Section -->
      <section class="conversations-section">
        <h3>Recent Conversations</h3>
        
        <div v-if="conversations.length === 0" class="empty-state">
          <p>No conversations yet. Your conversations will appear here once users start chatting with your bots.</p>
        </div>
        
        <div v-else class="conversations-list">
          <div v-for="conversation in conversations" :key="conversation.id" class="conversation-item">
            <div class="conversation-info">
              <h4>{{ conversation.title || 'Conversation ' + conversation.id }}</h4>
              <p>{{ new Date(conversation.created_at).toLocaleString() }}</p>
            </div>
            <button @click="viewConversation(conversation.id)" class="view-button">
              View Details
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.welcome-section {
  margin-bottom: 2rem;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.stat-card {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4361ee;
}

.bots-list, .conversations-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bot-card, .conversation-item {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bot-info, .conversation-info {
  flex: 1;
}

.bot-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.primary-button {
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.view-button {
  background-color: #e6e8eb;
  color: #4361ee;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle-button {
  background-color: #e6e8eb;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.toggle-button.active {
  background-color: #10b981;
  color: white;
}

.toggle-button.inactive {
  background-color: #ef4444;
  color: white;
}

.empty-state {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #6c757d;
}

.loading-state, .error-state {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .bot-card, .conversation-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .bot-actions {
    margin-top: 1rem;
    width: 100%;
  }
}
</style> 