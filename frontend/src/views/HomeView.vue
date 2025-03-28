<script setup>
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useBotStore } from '@/stores/bots'

const authStore = useAuthStore()
const botStore = useBotStore()

// Use the auth store to get user info
const userName = computed(() => authStore.user?.username || 'User')

onMounted(async () => {
  // Only fetch bots if the user is authenticated
  if (authStore.isAuthenticated) {
    try {
      await botStore.fetchBots()
    } catch (error) {
      console.error('Failed to fetch bots:', error)
    }
  }
})
</script>

<template>
  <div class="home-container">
    <section class="welcome-section">
      <div class="content">
        <h1>Welcome to ChatSphere - Your AI Chat Platform!</h1>
        <p class="subtitle">Create, customize, and deploy intelligent chatbots in minutes</p>
        
        <div v-if="authStore.isAuthenticated" class="action-buttons">
          <router-link to="/dashboard" class="btn-primary">Go to Dashboard</router-link>
          <router-link to="/bots" class="btn-secondary">Manage Bots</router-link>
        </div>
        <div v-else class="action-buttons">
          <router-link to="/try" class="btn-primary">Try Demo</router-link>
          <router-link to="/login" class="btn-secondary">Login</router-link>
          <router-link to="/register" class="btn-tertiary">Create Account</router-link>
        </div>
      </div>
      <div class="illustration">
        <img src="../assets/chat-illustration.svg" alt="Chat Illustration" />
      </div>
    </section>
    
    <section class="features-section">
      <h2>Key Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3>AI-Powered Chatbots</h3>
          <p>Create custom AI assistants tailored to your needs</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <h3>Smart Conversations</h3>
          <p>Manage and organize all your chat interactions in one place</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📄</div>
          <h3>Document Analysis</h3>
          <p>Upload files for your bots to reference during conversations</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Analytics & Insights</h3>
          <p>Track bot performance and conversation trends</p>
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <h2>Ready to get started?</h2>
      <p>Join ChatSphere today and revolutionize your chat experience</p>
      <div class="cta-buttons">
        <router-link to="/register" class="btn-primary">Sign Up for Free</router-link>
        <router-link to="/about" class="btn-text">Learn More</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 1rem 0;
}

.welcome-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  min-height: 60vh;
}

.content {
  flex: 1;
}

.illustration {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration img {
  max-width: 100%;
  height: auto;
}

h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: var(--color-heading);
  line-height: 1.2;
}

.subtitle {
  font-size: 1.5rem;
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: rgba(79, 70, 229, 0.05);
}

.btn-tertiary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: transparent;
  color: var(--color-primary);
  border: none;
}

.btn-tertiary:hover {
  text-decoration: underline;
  background-color: rgba(79, 70, 229, 0.05);
}

.features-section {
  text-align: center;
  padding: 2rem 0;
}

.features-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: var(--color-background-soft);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
}

.feature-card p {
  color: var(--color-text-light);
  font-size: 0.95rem;
}

.cta-section {
  background-color: var(--color-background-soft);
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.cta-section p {
  color: var(--color-text-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-text {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.btn-text:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .welcome-section {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
  
  h1 {
    font-size: 2.25rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section {
    padding: 2rem 1rem;
  }
}
</style> 