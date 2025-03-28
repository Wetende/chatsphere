import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('token') || null)
  const refreshToken = ref(localStorage.getItem('refreshToken') || null)
  const user = ref(null)
  const loading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  
  // Actions
  async function login(credentials) {
    loading.value = true
    try {
      const response = await api.post('/api/token/', credentials)
      
      // Store tokens
      token.value = response.data.access
      refreshToken.value = response.data.refresh
      
      // Save to localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('refreshToken', refreshToken.value)
      
      // Configure API with token
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      // Fetch user data
      await fetchCurrentUser()
      
      // Redirect to home page or requested page
      const redirectPath = router.currentRoute.value.query.redirect || '/';
      router.push(redirectPath);
      
      return true
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function fetchCurrentUser() {
    if (!token.value) return null
    
    try {
      const response = await api.get('/api/users/me/')
      user.value = response.data
      return user.value
    } catch (error) {
      console.error('Error fetching user:', error)
      // If unauthorized, logout
      if (error.response?.status === 401) {
        await logout()
      }
      throw error
    }
  }
  
  async function refreshAccessToken() {
    if (!refreshToken.value) return false
    
    try {
      const response = await api.post('/api/token/refresh/', {
        refresh: refreshToken.value
      })
      
      token.value = response.data.access
      localStorage.setItem('token', token.value)
      
      // Update auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      
      return true
    } catch (error) {
      console.error('Token refresh error:', error)
      await logout()
      return false
    }
  }
  
  async function logout() {
    // Clear state
    token.value = null
    refreshToken.value = null
    user.value = null
    
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    
    // Clear auth header
    delete api.defaults.headers.common['Authorization']
    
    // Redirect to login page
    router.push('/login')
  }

  // Initialize auth state
  function init() {
    if (token.value) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      fetchCurrentUser().catch(() => {
        // Silent fail on init - user will be redirected by router guard if needed
      })
    }
  }
  
  // Call init to set up auth state on store creation
  init()
  
  return { 
    // State
    token,
    refreshToken,
    user,
    loading,
    
    // Computed
    isAuthenticated,
    
    // Actions
    login,
    logout,
    fetchCurrentUser,
    refreshAccessToken
  }
}) 