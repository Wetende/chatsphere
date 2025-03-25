<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiResponse = ref(null)
const loading = ref(false)
const error = ref(null)

async function testApiConnection() {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('/api/test-connection/')
    apiResponse.value = response.data
    console.log('API Response:', response.data)
  } catch (err) {
    error.value = err.message || 'Failed to connect to API'
    console.error('API Error:', err)
  } finally {
    loading.value = false
  }
}

// Test the connection when the component is mounted
onMounted(() => {
  testApiConnection()
})
</script>

<template>
  <div class="test-api-container">
    <h1>API Connection Test</h1>
    
    <div v-if="loading" class="loading">
      Testing connection to Django backend...
    </div>
    
    <div v-else-if="error" class="error">
      <h3>Connection Error</h3>
      <p>{{ error }}</p>
      <button @click="testApiConnection" class="retry-button">
        Retry Connection
      </button>
    </div>
    
    <div v-else-if="apiResponse" class="success">
      <h3>Connection Successful!</h3>
      <div class="response-data">
        <p><strong>Status:</strong> {{ apiResponse.status }}</p>
        <p><strong>Message:</strong> {{ apiResponse.message }}</p>
        <p v-if="apiResponse.data">
          <strong>Timestamp:</strong> {{ apiResponse.data.timestamp }}
        </p>
        <p v-if="apiResponse.data">
          <strong>Server:</strong> {{ apiResponse.data.server }}
        </p>
      </div>
    </div>
    
    <div class="actions">
      <button @click="testApiConnection" class="test-button">
        Test Connection Again
      </button>
    </div>
  </div>
</template>

<style scoped>
.test-api-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.loading, .error, .success {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
}

.loading {
  background-color: #f0f4f8;
  color: #4a5568;
}

.error {
  background-color: #fff5f5;
  color: #e53e3e;
  border: 1px solid #fed7d7;
}

.success {
  background-color: #f0fff4;
  color: #2f855a;
  border: 1px solid #c6f6d5;
}

.response-data {
  text-align: left;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 4px;
}

.response-data p {
  margin: 0.5rem 0;
}

.actions {
  margin-top: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

button:active {
  transform: translateY(1px);
}

.test-button {
  background-color: #4361ee;
  color: white;
  border: none;
}

.test-button:hover {
  background-color: #3a56d4;
}

.retry-button {
  background-color: #e53e3e;
  color: white;
  border: none;
  margin-top: 1rem;
}

.retry-button:hover {
  background-color: #c53030;
}
</style> 