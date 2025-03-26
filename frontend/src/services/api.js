import axios from 'axios'

// Get the API base URL from environment variables or use a default
const API_BASE_URL = process.env.VUE_APP_API_URL || '/api'

// Create axios instance with base URL and default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Authentication endpoints
export const auth = {
  login(username, password) {
    return apiClient.post('/auth/login/', { username, password })
  },
  logout() {
    return apiClient.post('/auth/logout/')
  },
  getCurrentUser() {
    return apiClient.get('/users/me/')
  }
}

// Bots endpoints
export const bots = {
  getAll() {
    return apiClient.get('/bots/')
  },
  get(id) {
    return apiClient.get(`/bots/${id}/`)
  },
  create(bot) {
    return apiClient.post('/bots/', bot)
  },
  update(id, bot) {
    return apiClient.put(`/bots/${id}/`, bot)
  },
  delete(id) {
    return apiClient.delete(`/bots/${id}/`)
  },
  getConversations(id) {
    return apiClient.get(`/bots/${id}/conversations/`)
  }
}

// Conversations endpoints
export const conversations = {
  getAll() {
    return apiClient.get('/conversations/')
  },
  get(id) {
    return apiClient.get(`/conversations/${id}/`)
  },
  create(conversation) {
    return apiClient.post('/conversations/', conversation)
  },
  update(id, conversation) {
    return apiClient.put(`/conversations/${id}/`, conversation)
  },
  delete(id) {
    return apiClient.delete(`/conversations/${id}/`)
  },
  getMessages(id) {
    return apiClient.get(`/conversations/${id}/messages/`)
  }
}

// Messages endpoints
export const messages = {
  getAll(conversationId) {
    return apiClient.get('/messages/', {
      params: { conversation: conversationId }
    })
  },
  create(message) {
    return apiClient.post('/messages/', message)
  }
}

// Add a request interceptor to handle authentication
apiClient.interceptors.request.use(
  config => {
    // You can add token handling here if using JWT
    return config
  },
  error => Promise.reject(error)
)

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Handle authentication errors (e.g., redirect to login)
      console.error('Authentication error')
    }
    return Promise.reject(error)
  }
)

export default {
  auth,
  bots,
  conversations,
  messages
} 