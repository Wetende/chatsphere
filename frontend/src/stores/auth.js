import { defineStore } from 'pinia'
import { auth } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),
  
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },
  
  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null
      
      try {
        const response = await auth.login(username, password)
        this.user = response.data
        this.isAuthenticated = true
        return Promise.resolve(response)
      } catch (error) {
        this.error = error.response?.data?.detail || 'Login failed'
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      this.loading = true
      
      try {
        await auth.logout()
        this.user = null
        this.isAuthenticated = false
      } catch (error) {
        this.error = error.response?.data?.detail || 'Logout failed'
      } finally {
        this.loading = false
      }
    },
    
    async fetchCurrentUser() {
      this.loading = true
      
      try {
        const response = await auth.getCurrentUser()
        this.user = response.data
        this.isAuthenticated = true
        return this.user
      } catch (error) {
        this.user = null
        this.isAuthenticated = false
        this.error = error.response?.data?.detail || 'Failed to fetch user'
      } finally {
        this.loading = false
      }
    },
    
    clearError() {
      this.error = null
    }
  }
}) 