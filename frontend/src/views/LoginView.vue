<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleSubmit() {
  if (!username.value || !password.value) {
    errorMessage.value = 'Please enter both username and password'
    return
  }
  
  isLoading.value = true
  
  try {
    await authStore.login(username.value, password.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response?.data?.detail || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          id="username"
          v-model="username"
          type="text"
          placeholder="Enter your username"
          autocomplete="username"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          required
        />
      </div>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <button 
        type="submit" 
        class="login-button"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #3a56d4;
}

.error-message {
  color: #e53e3e;
  font-size: 14px;
  text-align: center;
}
</style> 