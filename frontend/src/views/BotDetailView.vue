<template>
  <div class="bot-detail-container">
    <div v-if="isLoading" class="loading-state">
      <p>Loading bot details...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="fetchBot">Retry</button>
    </div>
    
    <div v-else-if="!bot" class="not-found-state">
      <p>Bot not found. It may have been deleted or you don't have access to it.</p>
    </div>
    
    <div v-else class="bot-detail-content">
      <!-- Bot Header -->
      <div class="bot-header">
        <div class="bot-info">
          <h1 class="bot-name">{{ bot.name }}</h1>
          <p class="bot-description">{{ bot.description }}</p>
        </div>
        <div class="bot-actions">
          <button class="action-button">
            <span>{{ bot.is_active ? 'Online' : 'Offline' }}</span>
            <span class="status-indicator" :class="{ active: bot.is_active }"></span>
          </button>
        </div>
      </div>
      
      <!-- Navigation Tabs -->
      <div class="tab-navigation">
        <button 
          @click="selectedTab = 'overview'"
          :class="['tab-button', { active: selectedTab === 'overview' }]"
        >
          Overview
        </button>
        <button 
          @click="selectedTab = 'settings'"
          :class="['tab-button', { active: selectedTab === 'settings' }]"
        >
          Settings
        </button>
        <button 
          @click="selectedTab = 'training'"
          :class="['tab-button', { active: selectedTab === 'training' }]"
        >
          Training
        </button>
        <button 
          @click="selectedTab = 'widget'"
          :class="['tab-button', { active: selectedTab === 'widget' }]"
        >
          Widget
        </button>
        <button 
          @click="selectedTab = 'analytics'"
          :class="['tab-button', { active: selectedTab === 'analytics' }]"
        >
          Analytics
        </button>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Overview Tab -->
        <div v-if="selectedTab === 'overview'" class="tab-pane">
          <h2>Overview</h2>
          <div class="overview-stats">
            <div class="stat-card">
              <h3>Model</h3>
              <p class="stat-value">{{ bot.model_type }}</p>
            </div>
            <div class="stat-card">
              <h3>Status</h3>
              <p class="stat-value">{{ bot.is_active ? 'Online' : 'Offline' }}</p>
            </div>
            <div class="stat-card">
              <h3>Created</h3>
              <p class="stat-value">{{ new Date(bot.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
          
          <div class="recent-conversations">
            <h3>Recent Conversations</h3>
            <p>No conversations yet.</p>
          </div>
        </div>
        
        <!-- Widget Tab -->
        <div v-if="selectedTab === 'widget'" class="tab-pane">
          <h2>Chat Widget</h2>
          <p class="tab-description">
            Customize and preview your chat widget. Once you're happy with it, copy the embed 
            code to add it to your website.
          </p>
          
          <div class="widget-section">
            <div class="widget-customization">
              <h3>Customize Widget</h3>
              
              <div class="form-group">
                <label for="position">Widget Position</label>
                <select id="position" v-model="selectedPosition">
                  <option 
                    v-for="option in positionOptions" 
                    :key="option.value" 
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="button-text">Button Text</label>
                <input 
                  type="text" 
                  id="button-text" 
                  v-model="buttonText"
                  placeholder="Chat with us"
                />
              </div>
              
              <div class="form-group">
                <label for="primary-color">Primary Color</label>
                <div class="color-input">
                  <input 
                    type="color" 
                    id="primary-color" 
                    v-model="widgetConfig.primaryColor"
                  />
                  <input 
                    type="text" 
                    v-model="widgetConfig.primaryColor"
                    class="color-text"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="text-color">Text Color</label>
                <div class="color-input">
                  <input 
                    type="color" 
                    id="text-color" 
                    v-model="widgetConfig.textColor"
                  />
                  <input 
                    type="text" 
                    v-model="widgetConfig.textColor"
                    class="color-text"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="bg-color">Background Color</label>
                <div class="color-input">
                  <input 
                    type="color" 
                    id="bg-color" 
                    v-model="widgetConfig.backgroundColor"
                  />
                  <input 
                    type="text" 
                    v-model="widgetConfig.backgroundColor"
                    class="color-text"
                  />
                </div>
              </div>
            </div>
            
            <div class="widget-preview-container">
              <h3>Widget Preview</h3>
              <div class="widget-preview">
                <ChatWidget 
                  :botId="botId"
                  :theme="widgetConfig"
                  :position="selectedPosition"
                  :widgetButtonText="buttonText"
                />
              </div>
            </div>
          </div>
          
          <div class="embed-code-section">
            <h3>Embed Code</h3>
            <p>Copy and paste this code into your website to add the chat widget.</p>
            
            <div class="code-container">
              <pre class="embed-code"><code>{{ embedCode }}</code></pre>
              <button 
                class="copy-button"
                @click="copyEmbedCode"
                :class="{ success: copySuccess }"
              >
                {{ copySuccess ? 'Copied!' : 'Copy' }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Other tabs (to be implemented) -->
        <div v-if="selectedTab === 'settings'" class="tab-pane">
          <h2>Settings</h2>
          <p>Bot settings will be available here in a future update.</p>
        </div>
        
        <div v-if="selectedTab === 'training'" class="tab-pane">
          <h2>Training</h2>
          <p>Upload documents and train your bot in a future update.</p>
        </div>
        
        <div v-if="selectedTab === 'analytics'" class="tab-pane">
          <h2>Analytics</h2>
          <p>Conversation analytics will be available here in a future update.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBotStore } from '@/stores/bots'
import ChatWidget from '@/components/ChatWidget.vue'

const route = useRoute()
const botStore = useBotStore()

// State variables
const isLoading = ref(true)
const error = ref(null)
const selectedTab = ref('overview')
const copySuccess = ref(false)
const copyTimeout = ref(null)

// Get bot ID from route params
const botId = computed(() => route.params.id)

// Get bot from store
const bot = computed(() => botStore.getBotById(botId.value))

// Widget configuration
const widgetConfig = computed(() => ({
  primaryColor: bot.value?.configuration?.theme?.primary_color || '#4361ee',
  textColor: bot.value?.configuration?.theme?.text_color || '#333333',
  backgroundColor: bot.value?.configuration?.theme?.background_color || '#ffffff'
}))

// Widget position options
const positionOptions = [
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-left', label: 'Top Left' }
]

const selectedPosition = ref('bottom-right')
const buttonText = ref('Chat with us')

// Fetch bot data if not already loaded
const fetchBot = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    if (!bot.value) {
      await botStore.fetchBots()
    }
  } catch (err) {
    console.error('Failed to fetch bot:', err)
    error.value = 'Failed to load bot details. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Generate embed code
const embedCode = computed(() => {
  if (!bot.value) return ''
  
  return `<!-- ChatSphere Widget -->
<script>
  (function() {
    // Create a script element
    var script = document.createElement('script');
    script.src = '${window.location.origin}/widget.js';
    script.async = true;
    script.setAttribute('data-bot-id', '${botId.value}');
    script.setAttribute('data-position', '${selectedPosition.value}');
    script.setAttribute('data-button-text', '${buttonText.value}');
    script.setAttribute('data-primary-color', '${widgetConfig.value.primaryColor}');
    script.setAttribute('data-text-color', '${widgetConfig.value.textColor}');
    script.setAttribute('data-background-color', '${widgetConfig.value.backgroundColor}');
    
    // Add the script to the page
    document.head.appendChild(script);
  })();
</script>
<!-- End ChatSphere Widget -->`
})

// Copy embed code to clipboard
const copyEmbedCode = () => {
  navigator.clipboard.writeText(embedCode.value)
    .then(() => {
      // Clear any existing timeout
      if (copyTimeout.value) {
        clearTimeout(copyTimeout.value)
      }
      
      // Show success message
      copySuccess.value = true
      
      // Hide after 2 seconds
      copyTimeout.value = setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    })
    .catch(err => {
      console.error('Failed to copy embed code:', err)
    })
}

// Load data when component mounts
onMounted(fetchBot)
</script>

<style scoped>
.bot-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading-state,
.error-state,
.not-found-state {
  text-align: center;
  margin: 2rem 0;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.error-state button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Bot Header */
.bot-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.bot-name {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.bot-description {
  color: #666;
  max-width: 600px;
}

.bot-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
}

.status-indicator.active {
  background-color: #4CAF50;
}

/* Tab Navigation */
.tab-navigation {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
}

.tab-button {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-button:hover {
  color: #4361ee;
}

.tab-button.active {
  color: #4361ee;
  border-bottom-color: #4361ee;
}

/* Tab Content */
.tab-pane {
  animation: fadeIn 0.3s ease-in-out;
}

.tab-description {
  color: #666;
  margin-bottom: 2rem;
}

/* Overview Tab */
.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 1rem;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

/* Widget Tab */
.widget-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group select,
.form-group input[type="text"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.color-input {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-input input[type="color"] {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 4px;
}

.color-input .color-text {
  flex: 1;
  font-family: monospace;
}

.widget-preview {
  position: relative;
  height: 500px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

/* Embed Code Section */
.embed-code-section {
  margin-top: 2rem;
}

.code-container {
  position: relative;
  margin-top: 1rem;
}

.embed-code {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  max-height: 300px;
}

.copy-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background-color: #3651d4;
}

.copy-button.success {
  background-color: #4CAF50;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .widget-section {
    grid-template-columns: 1fr;
  }
  
  .tab-navigation {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 0.5rem;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
  }
}
</style> 