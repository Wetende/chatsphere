<script setup>
import { ref } from 'vue'
import axios from 'axios'

const result = ref(null)
const error = ref(null)

const testConnection = async () => {
  try {
    result.value = null
    error.value = null
    
    console.log('Testing API connection...')
    console.log('API URL:', process.env.VUE_APP_API_URL || '/api')
    
    // Log the axios default config
    console.log('Axios defaults:', JSON.stringify(axios.defaults, null, 2))
    
    const response = await axios.get('/api/test-connection/', {
      headers: {
        'X-Debug-Info': 'Testing from frontend'
      }
    })
    console.log('Response received:', response)
    result.value = response.data
  } catch (err) {
    console.error('API Error:', err)
    error.value = err.message
    if (err.response) {
      console.error('Response data:', err.response.data)
      console.error('Response status:', err.response.status)
      console.error('Response headers:', err.response.headers)
      error.value += ` - ${JSON.stringify(err.response.data)}`
    }
  }
}
</script>

<template>
  <div class="test-api">
    <h1>API Connection Test</h1>
    <button @click="testConnection" class="test-button">Test API Connection</button>
    <div class="result" v-if="result">
      <h2>Result:</h2>
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
    <div class="error" v-if="error">
      <h2>Error:</h2>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<style scoped>
.test-api {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.test-button {
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.result, .error {
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
}

.result {
  background-color: #e3f2fd;
}

.error {
  background-color: #ffebee;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px;
  border-radius: 4px;
}
</style> 