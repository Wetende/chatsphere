<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// State
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Hooks
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Computed
const redirectPath = route.query.redirect || '/dashboard'

// Methods
const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    await authStore.login({
      username: username.value,
      password: password.value
    })
    
    // On successful login, redirect
    router.push(redirectPath)
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.detail || 
                  'Failed to login. Please check your credentials and try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Login to ChatSphere</h1>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username" 
            v-model="username" 
            type="text" 
            required 
            placeholder="Enter your username"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            required 
            placeholder="Enter your password"
            :disabled="loading"
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
          <router-link to="/register" class="register-link">
            Don't have an account? Register
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 1rem;
  background-color: var(--color-background);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 10px;
  background-color: var(--color-background-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--color-heading);
}

.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-background);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: var(--color-primary);
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.btn-primary:disabled {
  background-color: var(--color-primary-light);
  cursor: not-allowed;
}

.error-message {
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.register-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.875rem;
}

.register-link:hover {
  text-decoration: underline;
}
</style> 