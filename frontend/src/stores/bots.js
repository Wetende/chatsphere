import { defineStore } from 'pinia'
import { bots } from '@/services/api'

export const useBotStore = defineStore('bots', {
  state: () => ({
    bots: [],
    currentBot: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getAllBots: (state) => state.bots,
    getBotById: (state) => (id) => state.bots.find(bot => bot.id === id),
    isLoading: (state) => state.loading
  },
  
  actions: {
    async fetchBots() {
      this.loading = true
      this.error = null
      
      try {
        const response = await bots.getAll()
        this.bots = response.data
        return this.bots
      } catch (error) {
        this.error = error.response?.data?.detail || 'Failed to fetch bots'
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    
    async fetchBot(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await bots.get(id)
        this.currentBot = response.data
        
        // Update the bot in the list if it exists
        const index = this.bots.findIndex(b => b.id === id)
        if (index !== -1) {
          this.bots[index] = this.currentBot
        } else {
          this.bots.push(this.currentBot)
        }
        
        return this.currentBot
      } catch (error) {
        this.error = error.response?.data?.detail || `Failed to fetch bot with ID ${id}`
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    
    async createBot(botData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await bots.create(botData)
        const newBot = response.data
        this.bots.push(newBot)
        return newBot
      } catch (error) {
        this.error = error.response?.data?.detail || 'Failed to create bot'
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    
    async updateBot(id, botData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await bots.update(id, botData)
        const updatedBot = response.data
        
        // Update the bot in the list
        const index = this.bots.findIndex(b => b.id === id)
        if (index !== -1) {
          this.bots[index] = updatedBot
        }
        
        if (this.currentBot && this.currentBot.id === id) {
          this.currentBot = updatedBot
        }
        
        return updatedBot
      } catch (error) {
        this.error = error.response?.data?.detail || `Failed to update bot with ID ${id}`
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    
    async deleteBot(id) {
      this.loading = true
      this.error = null
      
      try {
        await bots.delete(id)
        
        // Remove the bot from the list
        this.bots = this.bots.filter(b => b.id !== id)
        
        if (this.currentBot && this.currentBot.id === id) {
          this.currentBot = null
        }
        
        return true
      } catch (error) {
        this.error = error.response?.data?.detail || `Failed to delete bot with ID ${id}`
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    
    clearError() {
      this.error = null
    }
  }
}) 