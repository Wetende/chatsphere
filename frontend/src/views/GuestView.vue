<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const messages = ref([
  {
    id: 1,
    text: "Hello! I'm ChatSphere's demo bot. Ask me anything about ChatSphere's features!",
    isBot: true,
    timestamp: new Date()
  }
])
const newMessage = ref('')
const isTyping = ref(false)
const sessionId = ref(`guest-${Date.now()}`)
const chatContainer = ref(null)

// Sample responses for the demo bot
const sampleResponses = [
  {
    keywords: ['feature', 'capabilities', 'do', 'can'],
    response: "ChatSphere bots can understand natural language, provide customer support, answer questions about your business, and integrate with your existing systems. They can be trained on your documents and websites."
  },
  {
    keywords: ['price', 'cost', 'pricing', 'subscription'],
    response: "ChatSphere offers flexible pricing plans starting with a free tier. Premium features like advanced training and analytics are available in paid plans. Check out our pricing page for more details!"
  },
  {
    keywords: ['train', 'training', 'teach', 'learn'],
    response: "You can train your ChatSphere bot using various sources: documents (PDF, Word, etc.), websites, custom text, and APIs. The more content you provide, the smarter your bot becomes!"
  },
  {
    keywords: ['integrate', 'website', 'embed'],
    response: "Integrating your bot is simple! We provide an embed code that works on any website. Just copy the widget code from your dashboard and paste it into your site's HTML."
  },
  {
    keywords: ['account', 'sign up', 'register', 'login'],
    response: "You can create a free account by clicking the 'Create Account' button in the top menu. Registration takes less than a minute, and you'll be building your own bots right away!"
  }
]

// Function to simulate bot typing and response
const getBotResponse = (userMessage) => {
  isTyping.value = true
  
  // Simple 1-2 second delay to simulate thinking
  const thinkingTime = Math.floor(Math.random() * 1000) + 1000
  
  setTimeout(() => {
    // Find matching response from sample responses
    let responseText = "I'm sorry, I don't have specific information about that yet. You can sign up for an account to create your own custom bot!"
    
    // Simple matching algorithm
    for (const item of sampleResponses) {
      if (item.keywords.some(keyword => 
        userMessage.toLowerCase().includes(keyword.toLowerCase()))) {
        responseText = item.response
        break
      }
    }
    
    // Add bot message
    messages.value.push({
      id: messages.value.length + 1,
      text: responseText,
      isBot: true,
      timestamp: new Date()
    })
    
    isTyping.value = false
    scrollToBottom()
  }, thinkingTime)
}

// Send a message
const sendMessage = () => {
  if (newMessage.value.trim() === '') return
  
  // Add user message
  messages.value.push({
    id: messages.value.length + 1, 
    text: newMessage.value,
    isBot: false,
    timestamp: new Date()
  })
  
  // Get response for the sent message
  const userMessageText = newMessage.value
  newMessage.value = ''
  
  // Simulate bot response
  getBotResponse(userMessageText)
  scrollToBottom()
}

// Handle Enter key press
const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

// Auto-scroll to the bottom of the chat
const scrollToBottom = () => {
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }, 50)
}

// Format timestamp
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Create a session for this guest
onMounted(() => {
  scrollToBottom()
  
  // Add listener for page changes
  window.addEventListener('beforeunload', handleUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleUnload)
})

// Handle page exit
const handleUnload = () => {
  // We could save the session data here if needed
  console.log('Guest session ended:', sessionId.value)
}

// Navigate to registration page
const navigateToSignUp = () => {
  router.push('/register')
}
</script>

<template>
  <div class="guest-container">
    <div class="chat-header">
      <h1>ChatSphere Demo</h1>
      <p>Try our AI chatbot without creating an account</p>
    </div>
    
    <div class="chat-container" ref="chatContainer">
      <div 
        v-for="message in messages" 
        :key="message.id" 
        class="message" 
        :class="{ 'bot': message.isBot, 'user': !message.isBot }"
      >
        <div class="avatar">
          <span v-if="message.isBot">🤖</span>
          <span v-else>👤</span>
        </div>
        <div class="message-content">
          <div class="message-text">{{ message.text }}</div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
      
      <div v-if="isTyping" class="typing-indicator">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    
    <div class="input-container">
      <textarea 
        v-model="newMessage" 
        @keydown="handleKeyDown"
        placeholder="Type a message..." 
        class="message-input"
      ></textarea>
      <button @click="sendMessage" class="send-button" :disabled="newMessage.trim() === ''">
        <span class="send-icon">➤</span>
      </button>
    </div>
    
    <div class="signup-prompt">
      <p>Want to create your own custom bot?</p>
      <button @click="navigateToSignUp" class="btn-primary">Create Account</button>
    </div>
  </div>
</template>

<style scoped>
.guest-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);
  margin: 0 auto;
  max-width: 900px;
  background-color: var(--color-background-soft);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.chat-header {
  padding: 1.5rem;
  background-color: var(--color-primary);
  color: white;
}

.chat-header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.chat-header p {
  margin: 0.5rem 0 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

.chat-container {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f8f9fa;
}

.message {
  display: flex;
  max-width: 80%;
  animation: fadeIn 0.3s ease;
}

.message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin: 0 0.5rem;
}

.message-content {
  background-color: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.message.bot .message-content {
  border-top-left-radius: 4px;
  background-color: var(--color-primary);
  color: white;
}

.message.user .message-content {
  border-top-right-radius: 4px;
  background-color: #e5e7eb;
  color: #374151;
  text-align: right;
}

.message-time {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 0.25rem;
}

.typing-indicator {
  display: flex;
  align-items: center;
  max-width: 80%;
  background-color: var(--color-primary);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  border-top-left-radius: 4px;
  margin-left: 3rem;
  gap: 5px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
  opacity: 0.7;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.input-container {
  display: flex;
  padding: 1rem;
  background-color: white;
  border-top: 1px solid #e5e7eb;
}

.message-input {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  outline: none;
}

.message-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}

.send-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  border: none;
  margin-left: 0.75rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.send-button:disabled {
  background-color: #e5e7eb;
  cursor: not-allowed;
}

.send-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.send-icon {
  font-size: 0.9rem;
  margin-left: 2px;
}

.signup-prompt {
  padding: 1rem;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.signup-prompt p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.btn-primary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}

@media (max-width: 768px) {
  .guest-container {
    height: calc(100vh - 130px);
    border-radius: 0;
  }
  
  .message {
    max-width: 90%;
  }
}
</style> 