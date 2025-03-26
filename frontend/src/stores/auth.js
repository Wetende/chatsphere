import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  
  actions: {
    async login(username, password) {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.auth.login(username, password)
        this.user = response.data
        return true
      } catch (error) {
        this.error = error.response?.data?.detail || 'Login failed'
        return false
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      this.loading = true
      
      try {
        await api.auth.logout()
        this.user = null
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async fetchCurrentUser() {
      this.loading = true
      this.error = null
      
      try {
        const response = await api.auth.getCurrentUser()
        this.user = response.data
        return true
      } catch (error) {
        this.error = 'Failed to fetch user'
        this.user = null
        return false
      } finally {
        this.loading = false
      }
    }
  }
}) 