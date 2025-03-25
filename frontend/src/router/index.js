import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    meta: { requiresAuth: true },
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  // If the route requires authentication
  if (requiresAuth) {
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      try {
        // Try to fetch the current user in case of page refresh
        await authStore.fetchCurrentUser()
        // If successful, continue to the requested route
        next()
      } catch (error) {
        // If not authenticated, redirect to login
        next({ name: 'login', query: { redirect: to.fullPath } })
      }
    } else {
      // Already authenticated, proceed
      next()
    }
  } else {
    // Route doesn't require auth, proceed
    next()
  }
})

export default router