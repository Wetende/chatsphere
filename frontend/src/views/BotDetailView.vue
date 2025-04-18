<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading bot details...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
      <p>{{ error }}</p>
    </div>
    
    <!-- Not Found State -->
    <div v-else-if="!bot" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
      <p>Bot not found. The bot may have been deleted or you don't have access to it.</p>
    </div>
    
    <!-- Main Content -->
    <div v-else>
      <!-- Bot Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold mb-2">{{ bot.name }}</h1>
          <p class="text-gray-600">{{ bot.description || 'No description provided' }}</p>
        </div>
        <div class="mt-4 md:mt-0">
          <button class="btn btn-primary">Edit Bot</button>
        </div>
      </div>
      
      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="flex space-x-8">
        <button 
          @click="selectedTab = 'overview'"
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="selectedTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
          Overview
        </button>
        <button 
          @click="selectedTab = 'training'"
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="selectedTab === 'training' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
            Training Data
        </button>
        <button 
            @click="selectedTab = 'embed'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="selectedTab === 'embed' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
            Embed Widget
        </button>
        <button 
            @click="selectedTab = 'settings'" 
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="selectedTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
        >
            Settings
        </button>
        </nav>
      </div>
      
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Overview Tab -->
        <div v-if="selectedTab === 'overview'" class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Bot Information</h2>
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Name</h3>
                <p>{{ bot.name }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Description</h3>
                <p>{{ bot.description || 'No description provided' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Created</h3>
                <p>{{ new Date(bot.created_at).toLocaleString() }}</p>
            </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Last Updated</h3>
                <p>{{ new Date(bot.updated_at).toLocaleString() }}</p>
            </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Chat Preview</h2>
            <div class="border rounded-lg overflow-hidden h-96">
              <ChatWidget 
                :bot-id="botId" 
                :primary-color="widgetConfig.primaryColor"
                :text-color="widgetConfig.textColor"
                :background-color="widgetConfig.backgroundColor"
                embedded
              />
            </div>
          </div>
        </div>
        
        <!-- Training Data Tab -->
        <div v-if="selectedTab === 'training'" class="space-y-6">
          <!-- Upload Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Upload Training Data</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Text Upload -->
              <div class="upload-section">
                <h3 class="text-md font-medium mb-2">Text Input</h3>
                <p class="text-sm text-gray-600 mb-4">Paste text directly to train your bot</p>
                <textarea 
                  v-model="textInput" 
                  class="w-full border rounded-md p-3 h-32"
                  placeholder="Paste or type text content here..."
                ></textarea>
                <div class="mt-4">
                  <button 
                    class="btn btn-primary"
                    @click="uploadText"
                    :disabled="!textInput.trim() || isTextUploading"
                  >
                    <span v-if="isTextUploading">Processing...</span>
                    <span v-else>Upload Text</span>
                  </button>
                </div>
              </div>
              
              <!-- File Upload -->
              <div class="upload-section">
                <h3 class="text-md font-medium mb-2">File Upload</h3>
                <p class="text-sm text-gray-600 mb-4">Upload documents to train your bot</p>
                
                <input 
                  id="file-upload"
                  type="file" 
                  @change="handleFileChange" 
                  accept=".txt,.pdf,.docx,.md"
                  class="hidden"
                />
                
                <div 
                  v-if="!selectedFile"
                  class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary"
                  :class="{ 'border-primary bg-primary bg-opacity-5': isDragging }"
                  @click="triggerFileInput"
                  @dragover.prevent="fileDragover"
                  @dragleave.prevent="fileDragleave"
                  @drop.prevent="handleFileDrop"
                >
                  <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="mt-2"><span class="text-primary">Browse files</span> or drag and drop</p>
                  <p class="mt-1 text-sm text-gray-500">Supported formats: TXT, PDF, DOCX, MD</p>
                </div>
                
                <div v-else class="mt-4">
                  <div class="flex items-center justify-between p-4 border rounded-lg">
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{ selectedFile.name }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ formatFileSize(selectedFile.size) }}
                      </p>
                    </div>
                    <div class="flex space-x-2">
                      <button 
                        class="btn btn-primary"
                        @click="uploadFile"
                        :disabled="isFileUploading"
                      >
                        <span v-if="isFileUploading">Uploading...</span>
                        <span v-else>Upload</span>
                      </button>
                      <button 
                        class="btn btn-outline"
                        @click="removeSelectedFile"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Training History -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Training Documents</h2>
            
            <div v-if="loading.documents" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p class="mt-4 text-gray-600">Loading documents...</p>
            </div>
            
            <div v-else-if="documents.length === 0" class="text-center py-8">
              <p class="text-gray-600">No documents have been uploaded yet.</p>
              <p class="mt-2 text-sm text-gray-500">Upload text or files to train your bot.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="doc in documents" 
                :key="doc.id" 
                class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div class="flex items-center space-x-4">
                  <div class="text-gray-400">
                    <svg v-if="doc.content_type === 'text/plain'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <svg v-else-if="doc.content_type === 'application/pdf'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ doc.name }}</p>
                    <div class="flex space-x-4 text-sm text-gray-500">
                      <p>{{ new Date(doc.created_at).toLocaleDateString() }}</p>
                      <p>{{ doc.content_type }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-yellow-100 text-yellow-800': doc.status === 'PROCESSING',
                      'bg-green-100 text-green-800': doc.status === 'READY',
                      'bg-red-100 text-red-800': doc.status === 'ERROR'
                    }"
                  >
                    {{ doc.status }}
                  </span>
                  
                  <button 
                    class="text-gray-400 hover:text-red-500"
                    @click="deleteDocument(doc.id)"
                    title="Delete document"
                  >
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Embed Widget Tab -->
        <div v-if="selectedTab === 'embed'" class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Customize Widget</h2>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <select 
                  v-model="selectedPosition" 
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option v-for="option in positionOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input 
                  type="text" 
                  v-model="buttonText"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Chat with us"
                />
              </div>
                </div>
              </div>
              
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Preview</h2>
            <div class="border rounded-lg overflow-hidden h-96 relative">
                <ChatWidget 
                :bot-id="botId" 
                :primary-color="widgetConfig.primaryColor"
                :text-color="widgetConfig.textColor"
                :background-color="widgetConfig.backgroundColor"
                embedded
              />
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Embed Code</h2>
            <div class="relative">
              <pre class="bg-gray-50 rounded p-4 overflow-x-auto text-sm">{{ embedCode }}</pre>
              <button 
                @click="copyEmbedCode"
                class="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded p-2"
                title="Copy to clipboard"
              >
                <span v-if="copySuccess" class="text-green-600 text-xs font-semibold px-2">Copied!</span>
                <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                  <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Settings Tab -->
        <div v-if="selectedTab === 'settings'" class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold mb-4">Bot Settings</h2>
            <!-- Settings form would go here -->
            <p class="text-gray-600">Settings interface coming soon.</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChatWidget from '@/components/ChatWidget.vue'

const route = useRoute()
const botId = route.params.id

const isLoading = ref(true)
const error = ref(null)
const bot = ref(null)
const selectedTab = ref('overview')
const documents = ref([])
const loading = ref({
  documents: false
})

// Text upload
const textInput = ref('')
const isTextUploading = ref(false)

// File upload
const selectedFile = ref(null)
const isDragging = ref(false)
const isFileUploading = ref(false)

// Widget configuration
const selectedPosition = ref('bottom-right')
const buttonText = ref('Chat with us')
const widgetConfig = ref({
  primaryColor: '#4361ee',
  textColor: '#ffffff',
  backgroundColor: '#ffffff'
})
const copySuccess = ref(false)

const positionOptions = [
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'top-left', label: 'Top Left' }
]

// Computed embed code
const embedCode = computed(() => {
  return `<script src="https://chatsphere.ai/widget.js"><\/script>
<div id="chatsphere-widget" 
  data-bot-id="${botId}"
  data-position="${selectedPosition.value}"
  data-button-text="${buttonText.value}"
></div>`
})

// Methods
const fetchBot = async () => {
  try {
    isLoading.value = true
    const response = await fetch(`/api/bots/${botId}`)
    if (!response.ok) throw new Error('Failed to fetch bot details')
    bot.value = await response.json()
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

const fetchDocuments = async () => {
  try {
    loading.value.documents = true
    const response = await fetch(`/api/bots/${botId}/documents`)
    if (!response.ok) throw new Error('Failed to fetch documents')
    documents.value = await response.json()
  } catch (err) {
    console.error('Error fetching documents:', err)
  } finally {
    loading.value.documents = false
  }
}

const uploadText = async () => {
  if (!textInput.value.trim()) return
  
  try {
    isTextUploading.value = true
    const response = await fetch(`/api/bots/${botId}/train`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: textInput.value,
        name: 'Text Input'
      })
    })
    
    if (!response.ok) throw new Error('Failed to upload text')
    
    textInput.value = ''
    await fetchDocuments()
  } catch (err) {
    console.error('Error uploading text:', err)
  } finally {
    isTextUploading.value = false
  }
}

const triggerFileInput = () => {
  document.getElementById('file-upload').click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) selectedFile.value = file
}

const fileDragover = (e) => {
  isDragging.value = true
}

const fileDragleave = (e) => {
  isDragging.value = false
}

const handleFileDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) selectedFile.value = file
}

const uploadFile = async () => {
  if (!selectedFile.value) return
  
  const formData = new FormData()
  formData.append('file', selectedFile.value)
  
  try {
    isFileUploading.value = true
    const response = await fetch(`/api/bots/${botId}/documents`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) throw new Error('Failed to upload file')
    
    selectedFile.value = null
    await fetchDocuments()
  } catch (err) {
    console.error('Error uploading file:', err)
  } finally {
    isFileUploading.value = false
  }
}

const removeSelectedFile = () => {
  selectedFile.value = null
}

const deleteDocument = async (documentId) => {
  if (!confirm('Are you sure you want to delete this document?')) return
  
  try {
    const response = await fetch(`/api/bots/${botId}/documents/${documentId}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) throw new Error('Failed to delete document')
    
    await fetchDocuments()
  } catch (err) {
    console.error('Error deleting document:', err)
  }
}

const copyEmbedCode = () => {
  navigator.clipboard.writeText(embedCode.value)
    .then(() => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    })
    .catch(err => {
      console.error('Failed to copy embed code:', err)
    })
}

// When tab changes to training, fetch documents
watch(selectedTab, (newTab) => {
  if (newTab === 'training') {
    fetchDocuments()
  }
})

// Load data when component mounts
onMounted(() => {
  fetchBot()
  if (selectedTab.value === 'training') {
    fetchDocuments()
  }
})
</script>

<style scoped>
.upload-section {
  @apply bg-white rounded-lg p-6;
}

.text-input {
  @apply w-full border rounded-md p-3 h-32;
}

.file-upload-area {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary;
}

.file-upload-area.active-dropzone {
  @apply border-primary bg-primary bg-opacity-5;
}

.document-item {
  @apply flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50;
}

.document-icon {
  @apply text-gray-400;
}

.document-info {
  @apply flex-1 min-w-0 ml-4;
}

.document-name {
  @apply text-sm font-medium text-gray-900 truncate;
}

.document-meta {
  @apply flex space-x-4 text-sm text-gray-500;
}

.status-badge {
  @apply px-2 py-1 text-xs font-medium rounded-full;
}

.status-badge.processing {
  @apply bg-yellow-100 text-yellow-800;
}

.status-badge.ready {
  @apply bg-green-100 text-green-800;
}

.status-badge.error {
  @apply bg-red-100 text-red-800;
}

.action-icon {
  @apply text-gray-400 hover:text-red-500;
}
</style> 