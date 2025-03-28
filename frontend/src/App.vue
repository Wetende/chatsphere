<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import './styles/main.css'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentUser = computed(() => authStore.user)

onMounted(async () => {
  // Try to load user information if token exists
  if (authStore.token && !authStore.user) {
    await authStore.fetchCurrentUser()
  }
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const currentYear = computed(() => new Date().getFullYear())
const userName = computed(() => {
  const user = authStore.user
  if (!user) return ''
  
  return user.first_name 
    ? `${user.first_name}` 
    : user.username
})
</script>

<template>
  <div id="app">
    <header>
      <nav class="navbar">
        <div class="logo">
          <RouterLink to="/">ChatSphere</RouterLink>
        </div>
        
        <div class="nav-links">
          <!-- Authenticated-only navigation -->
          <template v-if="authStore.isAuthenticated">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            <RouterLink to="/bots">Bots</RouterLink>
            <RouterLink to="/conversations">Conversations</RouterLink>
          </template>
          
          <!-- Public navigation available to all users -->
          <RouterLink to="/about">About</RouterLink>
          <RouterLink v-if="!authStore.isAuthenticated" to="/try">Try Demo</RouterLink>
        </div>
        
        <div class="auth-section">
          <template v-if="authStore.isAuthenticated">
            <span class="user-greeting">Hello, {{ userName }}</span>
            <button @click="handleLogout" class="logout-btn">Logout</button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="login-btn">Login</RouterLink>
            <RouterLink to="/register" class="register-btn">Register</RouterLink>
          </template>
        </div>
      </nav>
    </header>
    <main>
      <Suspense>
        <RouterView />
        <template #fallback>
          <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </template>
      </Suspense>
    </main>
    <footer>
      <p>&copy; {{ currentYear }} ChatSphere. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 2rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-active {
  color: #007bff;
}

.auth-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  font-size: 0.9rem;
  color: #6c757d;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  margin-left: 0.5rem;
}

.logout-btn:hover {
  background-color: #dc3545;
  color: white;
}

.auth-link {
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.9rem;
}

.auth-link.register {
  background-color: #007bff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
}

main {
  flex-grow: 1;
  padding: 2rem;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 1rem;
  }
  
  nav {
    flex-direction: column;
    margin-left: 0;
    width: 100%;
    margin-top: 1rem;
    gap: 1rem;
  }
  
  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .auth-controls {
    width: 100%;
    justify-content: center;
  }
}

.navbar {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.try-demo-btn,
.login-btn,
.register-btn {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-left: 0.5rem;
  transition: all 0.2s;
}

.try-demo-btn {
  color: #6c757d;
  border: 1px solid #6c757d;
}

.try-demo-btn:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.login-btn {
  color: #007bff;
  border: 1px solid #007bff;
}

.login-btn:hover {
  background-color: #007bff;
  color: white;
}

.register-btn {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.register-btn:hover {
  background-color: #0056b3;
}

footer {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  text-align: center;
  color: var(--color-text-light);
  margin-top: auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(79, 70, 229, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style> 