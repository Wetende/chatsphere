<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="about-container">
    <h1>About ChatSphere</h1>
    
    <section class="about-section">
      <h2>Our Mission</h2>
      <p>
        ChatSphere is on a mission to make AI-powered conversations accessible to everyone. 
        We believe that intelligent chatbots can transform how businesses interact with their customers, 
        and how people access information online.
      </p>
    </section>

    <section class="about-section">
      <h2>The Platform</h2>
      <p>
        Our platform enables you to create, customize, and deploy intelligent chatbots in minutes. 
        With advanced natural language processing capabilities, your bots can understand user intent, 
        provide relevant information, and learn from interactions over time.
      </p>
      
      <div class="features-grid">
        <div class="feature">
          <h3>Easy to Use</h3>
          <p>No coding required - create and customize your bots with our intuitive interface.</p>
        </div>
        <div class="feature">
          <h3>Highly Trainable</h3>
          <p>Train your bot on your documents, website content, or custom knowledge base.</p>
        </div>
        <div class="feature">
          <h3>Analytics</h3>
          <p>Track performance, user satisfaction, and conversation trends with detailed analytics.</p>
        </div>
        <div class="feature">
          <h3>Integrations</h3>
          <p>Easily integrate with your website, mobile app, or third-party platforms.</p>
        </div>
      </div>
    </section>

    <section class="about-section">
      <h2>Our Technology</h2>
      <p>
        ChatSphere leverages state-of-the-art large language models and vector databases to provide 
        context-aware, accurate responses. Our technology enables bots to:
      </p>
      <ul>
        <li>Understand natural language and conversational context</li>
        <li>Retrieve relevant information from your knowledge base</li>
        <li>Generate human-like responses tailored to your brand voice</li>
        <li>Learn from interactions to improve over time</li>
      </ul>
    </section>

    <section v-if="!authStore.isAuthenticated" class="cta-section">
      <h2>Ready to Try ChatSphere?</h2>
      <div class="cta-buttons">
        <router-link to="/try" class="btn-primary">Try the Demo</router-link>
        <router-link to="/register" class="btn-secondary">Create an Account</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
  text-align: center;
}

.about-section {
  margin-bottom: 3rem;
}

h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.feature h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-heading);
}

.feature p {
  font-size: 0.95rem;
  margin-bottom: 0;
}

.cta-section {
  background-color: var(--color-background-soft);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 3rem;
}

.cta-section h2 {
  margin-bottom: 1.5rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: white;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn-secondary:hover {
  background-color: rgba(79, 70, 229, 0.05);
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style> 