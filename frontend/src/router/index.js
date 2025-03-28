import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GuestView from '../views/GuestView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { guest: true }
  },
  {
    path: '/try',
    name: 'guest-chat',
    component: GuestView,
    meta: { public: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { requiresAuth: true },
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/create-chatbot',
    name: 'create-chatbot',
    meta: { requiresAuth: true },
    component: () => import('../views/ChatbotWizardView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: { public: true },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/bots',
    name: 'bots',
    meta: { requiresAuth: true },
    component: () => import('../views/BotsView.vue')
  },
  {
    path: '/bots/:id',
    name: 'bot-detail',
    meta: { requiresAuth: true },
    component: () => import('../views/BotDetailView.vue')
  },
  {
    path: '/conversations',
    name: 'conversations',
    meta: { requiresAuth: true },
    component: () => import('../views/ConversationsView.vue')
  },
  {
    path: '/conversations/:id',
    name: 'conversation-detail',
    meta: { requiresAuth: true },
    component: () => import('../views/ConversationDetailView.vue')
  },
  {
    path: '/test-api',
    name: 'test-api',
    // No auth required for testing API connection
    component: () => import('../views/TestApiView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isGuestOnly = to.matched.some(record => record.meta.guest)
  const isPublic = to.matched.some(record => record.meta.public)
  
  // Check if user is authenticated
  const isAuthenticated = authStore.isAuthenticated
  
  // If the route requires authentication
  if (requiresAuth) {
    if (isAuthenticated) {
      // User is authenticated, proceed
      next()
    } else {
      // Try to refresh token or fetch user data if token exists
      if (authStore.token) {
        try {
          // Try to fetch the current user in case of page refresh
          await authStore.fetchCurrentUser()
          // If successful, continue to the requested route
          next()
        } catch (error) {
          // Failed to authenticate, redirect to login
          next({ name: 'login', query: { redirect: to.fullPath } })
        }
      } else {
        // No token, redirect to login
        next({ name: 'login', query: { redirect: to.fullPath } })
      }
    }
  } 
  // If the route is for guests only (login, register)
  else if (isGuestOnly) {
    if (isAuthenticated) {
      // If already authenticated, redirect to home
      next({ name: 'home' })
    } else {
      // Not authenticated, proceed to guest route
      next()
    }
  } 
  // Public route or home page, allow access to everyone
  else if (isPublic || to.path === '/') {
    next()
  }
  // If no meta tags and not home, check authentication
  else {
    if (isAuthenticated) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }
})

export default router