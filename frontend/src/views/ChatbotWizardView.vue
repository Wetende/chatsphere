<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBotStore } from '@/stores/bots'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseCard from '@/components/base/BaseCard.vue'

const router = useRouter()
const botStore = useBotStore()

// Wizard state
const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)
const error = ref(null)

// Bot form data
const botData = reactive({
  name: '',
  description: '',
  welcome_message: 'Hi! How can I help you today?',
  model_type: 'gpt-3.5-turbo',
  configuration: {
    temperature: 0.7,
    max_tokens: 1000,
    is_active: true,
    theme: {
      primary_color: '#4361ee',
      text_color: '#333333',
      background_color: '#ffffff'
    }
  }
})

// Model options
const modelOptions = [
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Balanced speed and intelligence)' },
  { value: 'gpt-4', label: 'GPT-4 (More powerful, but slower)' },
  { value: 'claude-2', label: 'Claude 2 (Alternative to GPT-4)' },
  { value: 'mistral-7b', label: 'Mistral 7B (Open source alternative)' }
]

// Validation
const nameValid = computed(() => botData.name.length >= 2)
const descriptionValid = computed(() => botData.description.length >= 10)
const basicInfoValid = computed(() => nameValid.value && descriptionValid.value)

// Step navigation
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Create bot function
const createBot = async () => {
  if (!basicInfoValid.value) {
    error.value = 'Please complete all required fields'
    return
  }
  
  isSubmitting.value = true
  error.value = null
  
  try {
    const newBot = await botStore.createBot(botData)
    router.push(`/bots/${newBot.id}`)
  } catch (err) {
    error.value = err.response?.data?.detail || 'Failed to create chatbot. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

// Cancel and go back to dashboard
const cancelWizard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="chatbot-wizard-container">
    <h1>Create Your Chatbot</h1>
    
    <!-- Progress indicator -->
    <div class="wizard-progress">
      <div class="steps-container">
        <div 
          v-for="step in totalSteps" 
          :key="step"
          :class="['step', { active: step === currentStep, completed: step < currentStep }]"
        >
          <div class="step-number">{{ step }}</div>
          <div class="step-label">
            {{ 
              step === 1 ? 'Basic Info' : 
              step === 2 ? 'Customize' : 
              step === 3 ? 'Settings' : 
              'Review' 
            }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Error message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    <!-- Step 1: Basic Information -->
    <BaseCard v-if="currentStep === 1" class="wizard-step-card">
      <h2>Basic Information</h2>
      <p class="step-description">
        Let's start by giving your chatbot a name and description.
      </p>
      
      <div class="form-group">
        <label for="name">Chatbot Name*</label>
        <BaseInput 
          id="name"
          v-model="botData.name"
          placeholder="E.g., Sales Assistant, Support Bot"
          :error="botData.name && !nameValid ? 'Name must be at least 2 characters' : ''"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Description*</label>
        <textarea
          id="description"
          v-model="botData.description"
          rows="4"
          placeholder="Describe what your chatbot will help with..."
          :class="['form-textarea', { 'error': botData.description && !descriptionValid }]"
        ></textarea>
        <div v-if="botData.description && !descriptionValid" class="input-error">
          Description must be at least 10 characters
        </div>
      </div>
      
      <div class="form-group">
        <label for="welcome">Welcome Message</label>
        <BaseInput
          id="welcome"
          v-model="botData.welcome_message"
          placeholder="Hi! How can I help you today?"
        />
      </div>
      
      <div class="wizard-actions">
        <BaseButton @click="cancelWizard" variant="secondary">Cancel</BaseButton>
        <BaseButton 
          @click="nextStep" 
          :disabled="!basicInfoValid"
          variant="primary"
        >
          Next
        </BaseButton>
      </div>
    </BaseCard>
    
    <!-- Step 2: AI Model Selection -->
    <BaseCard v-if="currentStep === 2" class="wizard-step-card">
      <h2>AI Model Selection</h2>
      <p class="step-description">
        Choose the AI model that powers your chatbot. Different models offer various
        capabilities, response quality, and speeds.
      </p>
      
      <div class="form-group">
        <label for="model">AI Model</label>
        <div class="model-options">
          <div 
            v-for="model in modelOptions" 
            :key="model.value"
            :class="['model-option', { selected: botData.model_type === model.value }]"
            @click="botData.model_type = model.value"
          >
            <div class="option-header">
              <input 
                type="radio" 
                :id="model.value" 
                :value="model.value" 
                v-model="botData.model_type"
              >
              <label :for="model.value">{{ model.label }}</label>
            </div>
            <div class="option-description" v-if="botData.model_type === model.value">
              <p v-if="model.value === 'gpt-3.5-turbo'">
                Best for most use cases. Offers a good balance between performance and cost.
              </p>
              <p v-else-if="model.value === 'gpt-4'">
                OpenAI's most powerful model. Better at complex tasks, reasoning, and creativity.
              </p>
              <p v-else-if="model.value === 'claude-2'">
                Anthropic's model offering strong performance with longer context window.
              </p>
              <p v-else>
                Open source model that can be used for deployments requiring privacy or lower cost.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wizard-actions">
        <BaseButton @click="prevStep" variant="secondary">Back</BaseButton>
        <BaseButton @click="nextStep" variant="primary">Next</BaseButton>
      </div>
    </BaseCard>
    
    <!-- Step 3: Chat Widget Customization -->
    <BaseCard v-if="currentStep === 3" class="wizard-step-card">
      <h2>Widget Customization</h2>
      <p class="step-description">
        Customize how your chat widget will look on your website.
      </p>
      
      <div class="form-group">
        <label for="primary-color">Primary Color</label>
        <div class="color-picker-wrapper">
          <input 
            type="color" 
            id="primary-color" 
            v-model="botData.configuration.theme.primary_color"
          >
          <span class="color-value">{{ botData.configuration.theme.primary_color }}</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="text-color">Text Color</label>
        <div class="color-picker-wrapper">
          <input 
            type="color" 
            id="text-color" 
            v-model="botData.configuration.theme.text_color"
          >
          <span class="color-value">{{ botData.configuration.theme.text_color }}</span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="bg-color">Background Color</label>
        <div class="color-picker-wrapper">
          <input 
            type="color" 
            id="bg-color" 
            v-model="botData.configuration.theme.background_color"
          >
          <span class="color-value">{{ botData.configuration.theme.background_color }}</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>Widget Preview</label>
        <div class="widget-preview" :style="{
          '--primary-color': botData.configuration.theme.primary_color,
          '--text-color': botData.configuration.theme.text_color,
          '--bg-color': botData.configuration.theme.background_color
        }">
          <div class="preview-header">
            <div class="preview-title">Chat with {{ botData.name || 'Bot' }}</div>
          </div>
          <div class="preview-body">
            <div class="preview-message bot">
              {{ botData.welcome_message }}
            </div>
            <div class="preview-message user">
              How can you help me?
            </div>
            <div class="preview-input">
              <input type="text" placeholder="Type your message..." disabled>
              <button class="send-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="wizard-actions">
        <BaseButton @click="prevStep" variant="secondary">Back</BaseButton>
        <BaseButton @click="nextStep" variant="primary">Next</BaseButton>
      </div>
    </BaseCard>
    
    <!-- Step 4: Review and Create -->
    <BaseCard v-if="currentStep === 4" class="wizard-step-card">
      <h2>Review and Create</h2>
      <p class="step-description">
        Review your chatbot details below before creating it.
      </p>
      
      <div class="review-section">
        <h3>Basic Information</h3>
        <div class="review-item">
          <span class="review-label">Name:</span>
          <span class="review-value">{{ botData.name }}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Description:</span>
          <span class="review-value">{{ botData.description }}</span>
        </div>
        <div class="review-item">
          <span class="review-label">Welcome Message:</span>
          <span class="review-value">{{ botData.welcome_message }}</span>
        </div>
      </div>
      
      <div class="review-section">
        <h3>AI Model</h3>
        <div class="review-item">
          <span class="review-label">Selected Model:</span>
          <span class="review-value">
            {{ modelOptions.find(m => m.value === botData.model_type)?.label }}
          </span>
        </div>
      </div>
      
      <div class="review-section">
        <h3>Widget Customization</h3>
        <div class="review-item">
          <span class="review-label">Primary Color:</span>
          <span class="review-value color-preview" :style="{ backgroundColor: botData.configuration.theme.primary_color }">
            {{ botData.configuration.theme.primary_color }}
          </span>
        </div>
        <div class="review-item">
          <span class="review-label">Text Color:</span>
          <span class="review-value color-preview" :style="{ backgroundColor: botData.configuration.theme.text_color }">
            {{ botData.configuration.theme.text_color }}
          </span>
        </div>
        <div class="review-item">
          <span class="review-label">Background Color:</span>
          <span class="review-value color-preview" :style="{ backgroundColor: botData.configuration.theme.background_color }">
            {{ botData.configuration.theme.background_color }}
          </span>
        </div>
      </div>
      
      <div class="wizard-actions">
        <BaseButton @click="prevStep" variant="secondary" :disabled="isSubmitting">Back</BaseButton>
        <BaseButton 
          @click="createBot" 
          variant="primary" 
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Create Chatbot
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.chatbot-wizard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: var(--color-heading);
}

.wizard-progress {
  margin-bottom: 2rem;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 2rem;
}

.steps-container::before {
  content: '';
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #e0e0e0;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background-color: #4361ee;
  color: white;
}

.step.completed .step-number {
  background-color: #4CAF50;
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: #666;
}

.step.active .step-label {
  color: #4361ee;
  font-weight: 600;
}

.wizard-step-card {
  margin-bottom: 2rem;
  padding: 2rem;
}

.step-description {
  margin-bottom: 2rem;
  color: #666;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-textarea:focus {
  border-color: #4361ee;
  outline: none;
}

.form-textarea.error {
  border-color: #e53935;
}

.input-error {
  color: #e53935;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.wizard-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.error-message {
  background-color: #ffebee;
  color: #e53935;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* Model selection styles */
.model-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.model-option {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.model-option:hover {
  border-color: #bbdefb;
  background-color: #f8f9fa;
}

.model-option.selected {
  border-color: #4361ee;
  background-color: #f0f4ff;
}

.option-header {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.option-header input {
  margin-right: 0.5rem;
}

.option-description {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
  color: #666;
  font-size: 0.875rem;
}

/* Color picker styles */
.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-picker-wrapper input[type="color"] {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.color-value {
  font-family: monospace;
}

/* Widget preview styles */
.widget-preview {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  --primary-color: #4361ee;
  --text-color: #333333;
  --bg-color: #ffffff;
}

.preview-header {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1rem;
  font-weight: 500;
}

.preview-body {
  background-color: var(--bg-color);
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
}

.preview-message {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  max-width: 80%;
}

.preview-message.bot {
  background-color: #f1f3f4;
  color: var(--text-color);
  align-self: flex-start;
}

.preview-message.user {
  background-color: var(--primary-color);
  color: white;
  align-self: flex-end;
}

.preview-input {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  border-top: 1px solid #e0e0e0;
  padding-top: 1rem;
}

.preview-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.875rem;
}

.send-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-button svg {
  width: 20px;
  height: 20px;
}

/* Review section styles */
.review-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.review-section h3 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.review-item {
  display: flex;
  margin-bottom: 0.75rem;
}

.review-label {
  width: 140px;
  font-weight: 500;
  color: #666;
}

.review-value {
  flex: 1;
}

.color-preview {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 0.5rem;
}
</style> 