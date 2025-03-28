<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'

const props = defineProps({
  botId: {
    type: String,
    required: true
  },
  theme: {
    type: Object,
    default: () => ({
      primaryColor: '#4361ee',
      textColor: '#333333',
      backgroundColor: '#ffffff'
    })
  },
  position: {
    type: String,
    default: 'bottom-right',
    validator: (value) => ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(value)
  },
  widgetButtonText: {
    type: String,
    default: 'Chat with us'
  }
})

// State
const isOpen = ref(false)
const messages = ref([])
const newMessage = ref('')
const conversationId = ref(null)
const isLoading = ref(false)
const botInfo = ref(null)
const error = ref(null)

// Computed properties
const widgetPositionClass = computed(() => `widget-position-${props.position}`)

// Methods
const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && messages.value.length === 0) {
    loadBotInfo()
  }
}

const loadBotInfo = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await api.get(`/api/bots/${props.botId}/`)
    botInfo.value = response.data
    
    // Add welcome message
    messages.value.push({
      role: 'assistant',
      content: botInfo.value.welcome_message || 'Hi! How can I help you today?',
      timestamp: new Date().toISOString()
    })
    
    // Create a new conversation
    createConversation()
  } catch (err) {
    console.error('Failed to load bot info:', err)
    error.value = 'Failed to load chat. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const createConversation = async () => {
  isLoading.value = true
  
  try {
    const response = await api.post('/api/conversations/', {
      bot: props.botId,
      title: 'Website Chat',
      is_active: true
    })
    
    conversationId.value = response.data.id
  } catch (err) {
    console.error('Failed to create conversation:', err)
    error.value = 'Failed to start chat. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return
  
  // Add user message to chat
  const userMessage = {
    role: 'user',
    content: newMessage.value,
    timestamp: new Date().toISOString()
  }
  
  messages.value.push(userMessage)
  const messageToBeSent = newMessage.value
  newMessage.value = ''
  
  // Set loading state
  isLoading.value = true
  
  try {
    // Send message to API
    const messageResponse = await api.post('/api/messages/', {
      conversation: conversationId.value,
      content: messageToBeSent,
      role: 'user'
    })
    
    // Show typing indicator
    const typingTimeout = setTimeout(() => {
      // Request bot response
      api.post('/api/messages/', {
        conversation: conversationId.value,
        content: 'AI response would be generated here on the server',
        role: 'assistant'
      }).then(response => {
        // Add bot response to chat
        messages.value.push({
          role: 'assistant',
          content: response.data.content,
          timestamp: response.data.timestamp
        })
      }).catch(err => {
        console.error('Failed to get bot response:', err)
        error.value = 'Failed to receive response. Please try again.'
      }).finally(() => {
        isLoading.value = false
      })
    }, 1000) // Simulate typing delay
  } catch (err) {
    console.error('Failed to send message:', err)
    error.value = 'Failed to send message. Please try again.'
    isLoading.value = false
  }
}

// Handle Enter key press to send message
const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

// Watch for prop changes
watch(() => props.botId, () => {
  if (isOpen.value) {
    messages.value = []
    conversationId.value = null
    loadBotInfo()
  }
})

// Auto-scroll messages container when new messages arrive
const messagesContainer = ref(null)
watch(() => messages.value.length, () => {
  setTimeout(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }, 100)
})

// Initialize chat widget
onMounted(() => {
  // If opened in standalone mode (not embedded), open the chat automatically
  if (window.location.search.includes('standalone=true')) {
    isOpen.value = true
    loadBotInfo()
  }
})
</script>

<template>
  <div 
    class="chat-widget-container" 
    :class="[widgetPositionClass, { 'widget-open': isOpen }]"
    :style="{
      '--primary-color': theme.primaryColor,
      '--text-color': theme.textColor,
      '--bg-color': theme.backgroundColor
    }"
  >
    <!-- Chat Button -->
    <button 
      v-if="!isOpen" 
      class="chat-button"
      @click="toggleChat"
      aria-label="Open chat"
    >
      <span class="button-text">{{ widgetButtonText }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
    
    <!-- Chat Window -->
    <div v-if="isOpen" class="chat-window">
      <!-- Chat Header -->
      <div class="chat-header">
        <div v-if="botInfo" class="bot-info">
          <div class="bot-avatar" v-if="botInfo.avatar">
            <img :src="botInfo.avatar" alt="Bot Avatar" />
          </div>
          <div v-else class="bot-avatar default-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41-1.41L13.69 13H2.05A10 10 0 1 0 12 2z"/>
            </svg>
          </div>
          <div class="bot-name">{{ botInfo.name }}</div>
        </div>
        <div v-else class="bot-info">
          <div class="bot-name">Chat</div>
        </div>
        <button 
          class="close-button"
          @click="toggleChat"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <!-- Chat Messages -->
      <div class="chat-messages" ref="messagesContainer">
        <div v-if="error" class="error-message">
          {{ error }}
          <button @click="loadBotInfo">Retry</button>
        </div>
        
        <template v-for="(message, index) in messages" :key="index">
          <div :class="['message', message.role === 'assistant' ? 'bot' : 'user']">
            <div class="message-content">{{ message.content }}</div>
            <div class="message-time">
              {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </div>
          </div>
        </template>
        
        <div v-if="isLoading" class="message bot typing">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      
      <!-- Chat Input -->
      <div class="chat-input">
        <textarea 
          v-model="newMessage" 
          placeholder="Type your message..."
          @keydown="handleKeyDown"
          :disabled="isLoading || !!error"
        ></textarea>
        <button 
          class="send-button" 
          @click="sendMessage"
          :disabled="!newMessage.trim() || isLoading || !!error"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      
      <!-- Powered By -->
      <div class="powered-by">
        Powered by <a href="/" target="_blank" rel="noopener noreferrer">ChatSphere</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-widget-container {
  --primary-color: #4361ee;
  --text-color: #333333;
  --bg-color: #ffffff;
  position: fixed;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Widget positioning */
.widget-position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.widget-position-bottom-left {
  bottom: 20px;
  left: 20px;
}

.widget-position-top-right {
  top: 20px;
  right: 20px;
}

.widget-position-top-left {
  top: 20px;
  left: 20px;
}

/* Chat button */
.chat-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chat-button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.button-text {
  font-weight: 500;
}

/* Chat window */
.chat-window {
  background-color: var(--bg-color);
  width: 350px;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Chat header */
.chat-header {
  background-color: var(--primary-color);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bot-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bot-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.bot-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-avatar svg {
  stroke: white;
}

.bot-name {
  font-weight: 500;
  font-size: 16px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.close-button svg {
  width: 20px;
  height: 20px;
}

/* Chat messages area */
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 18px;
  position: relative;
  margin-bottom: 5px;
}

.message.user {
  background-color: var(--primary-color);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.message.bot {
  background-color: #f1f3f4;
  color: var(--text-color);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  text-align: right;
  margin-top: 4px;
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #aaa;
  border-radius: 50%;
  display: inline-block;
  animation: typing 1.5s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.3s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}

/* Chat input area */
.chat-input {
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #eee;
}

.chat-input textarea {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 18px;
  padding: 10px 15px;
  max-height: 100px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
  outline: none;
}

.chat-input textarea:focus {
  border-color: var(--primary-color);
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.send-button:hover {
  transform: scale(1.05);
}

.send-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.send-button svg {
  width: 20px;
  height: 20px;
}

/* Error message */
.error-message {
  background-color: #fff3f3;
  color: #e53935;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.error-message button {
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
}

/* Powered by */
.powered-by {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding: 8px;
  border-top: 1px solid #eee;
}

.powered-by a {
  color: var(--primary-color);
  text-decoration: none;
}

.powered-by a:hover {
  text-decoration: underline;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .chat-window {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .widget-position-bottom-right,
  .widget-position-bottom-left,
  .widget-position-top-right,
  .widget-position-top-left {
    top: auto;
    left: auto;
    right: 20px;
    bottom: 20px;
  }
  
  .widget-open.widget-position-bottom-right,
  .widget-open.widget-position-bottom-left,
  .widget-open.widget-position-top-right,
  .widget-open.widget-position-top-left {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style> 