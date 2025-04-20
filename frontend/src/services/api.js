import axios from 'axios'

// Determine base URL based on environment
const isProduction = import.meta.env.PROD;
const baseURL = isProduction 
  ? '/api' 
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

console.log(`[api.js] Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`[api.js] Setting baseURL to: ${baseURL}`);

// Create axios instance
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token')
    // If token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    // If error is 401 and it's not a retry and refresh token exists
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refreshToken')
    ) {
      originalRequest._retry = true
      
      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${api.defaults.baseURL}/token/refresh/`,
          {
            refresh: localStorage.getItem('refreshToken')
          }
        )
        
        // If we got a new token, update storage and headers
        if (response.data.access) {
          localStorage.setItem('token', response.data.access)
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
          
          // Retry the original request
          return api(originalRequest)
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        
        // Only redirect to login if not already there to prevent redirect loops
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)

// Test API connection
export const testApiConnection = async () => {
  try {
    const response = await api.get('/test-connection/')
    return {
      success: true,
      data: response.data
    }
  } catch (error) {
    console.error('API connection test failed:', error)
    return {
      success: false,
      error: error.message,
      details: error.response?.data
    }
  }
}

export default api 