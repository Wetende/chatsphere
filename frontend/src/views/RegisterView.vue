<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Create an Account</h1>
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            id="username" 
            v-model="formData.username" 
            type="text" 
            required
            placeholder="Choose a username"
            :disabled="loading"
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input 
              id="firstName" 
              v-model="formData.first_name" 
              type="text" 
              placeholder="First name"
              :disabled="loading"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input 
              id="lastName" 
              v-model="formData.last_name" 
              type="text" 
              placeholder="Last name"
              :disabled="loading"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email" 
            v-model="formData.email" 
            type="email" 
            required
            placeholder="Your email address"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            id="password" 
            v-model="formData.password" 
            type="password" 
            required
            placeholder="Create a password"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label for="password2">Confirm Password</label>
          <input 
            id="password2" 
            v-model="formData.password2" 
            type="password" 
            required
            placeholder="Confirm your password"
            :disabled="loading"
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Creating Account...' : 'Register' }}
          </button>
          <router-link to="/login" class="login-link">
            Already have an account? Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import api from '../services/api'

// State
const formData = reactive({
  username: '',
  email: '',
  password: '',
  password2: '',
  first_name: '',
  last_name: ''
})
const error = ref('')
const loading = ref(false)

// Hooks
const router = useRouter()
const authStore = useAuthStore()

// Methods
const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''
    
    // Validate passwords match
    if (formData.password !== formData.password2) {
      error.value = 'Passwords do not match'
      return
    }
    
    // Call registration API
    await api.post('/api/register/', formData)
    
    // After registration, log in the user
    await authStore.login({
      username: formData.username,
      password: formData.password
    })
    
    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    console.error('Registration error:', err)
    
    if (err.response?.data) {
      // Handle validation errors
      const responseData = err.response.data
      if (typeof responseData === 'object') {
        const errorMessages = []
        for (const key in responseData) {
          errorMessages.push(`${key}: ${responseData[key].join(', ')}`)
        }
        error.value = errorMessages.join('\n')
      } else {
        error.value = responseData
      }
    } else {
      error.value = 'Failed to register. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 1rem;
  background-color: var(--color-background);
}

.register-card {
  width: 100%;
  max-width: 500px;
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
  width: 100%;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 0;
}

.form-row .form-group {
  flex: 1;
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
  white-space: pre-line;
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
  margin-top: 1rem;
}

.login-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.875rem;
}

.login-link:hover {
  text-decoration: underline;
}

@media (max-width: 576px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
</style> 