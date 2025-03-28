import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useBotStore = defineStore('bots', () => {
  // State
  const bots = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const activeBots = computed(() => {
    return bots.value.filter(bot => bot.active === true)
  })

  const inactiveBots = computed(() => {
    return bots.value.filter(bot => bot.active === false)
  })

  const getBotById = (id) => {
    return bots.value.find(bot => bot.id === id)
  }

  // Actions
  async function fetchBots() {
    loading.value = true
    error.value = null

    try {
      const response = await api.get('/api/bots/')
      bots.value = response.data
      return bots.value
    } catch (err) {
      console.error('Error fetching bots:', err)
      error.value = 'Failed to load bots. Please try again.'
      return []
    } finally {
      loading.value = false
    }
  }

  async function createBot(botData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/api/bots/', botData)
      bots.value.push(response.data)
      return response.data
    } catch (err) {
      console.error('Error creating bot:', err)
      error.value = 'Failed to create bot. Please check your input and try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateBot(id, botData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.put(`/api/bots/${id}/`, botData)
      
      // Update the bot in the local state
      const index = bots.value.findIndex(bot => bot.id === id)
      if (index !== -1) {
        bots.value[index] = response.data
      }
      
      return response.data
    } catch (err) {
      console.error('Error updating bot:', err)
      error.value = 'Failed to update bot. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteBot(id) {
    loading.value = true
    error.value = null

    try {
      await api.delete(`/api/bots/${id}/`)
      
      // Remove the bot from the local state
      bots.value = bots.value.filter(bot => bot.id !== id)
      
      return true
    } catch (err) {
      console.error('Error deleting bot:', err)
      error.value = 'Failed to delete bot. Please try again.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function toggleBotStatus(id) {
    const bot = getBotById(id)
    if (!bot) {
      error.value = 'Bot not found'
      return null
    }

    const updatedStatus = !bot.active
    return updateBot(id, { ...bot, active: updatedStatus })
  }

  return {
    // State
    bots,
    loading,
    error,
    
    // Getters
    activeBots,
    inactiveBots,
    getBotById,
    
    // Actions
    fetchBots,
    createBot,
    updateBot,
    deleteBot,
    toggleBotStatus
  }
}) 