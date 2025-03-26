<template>
  <div class="bot-detail">
    <h1>Bot Details</h1>
    <div class="bot-info">
      <h2>Example Bot</h2>
      <p>This is an example chatbot detail page.</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const botId = route.params.id;
console.log('Bot ID:', botId);
// Implement bot detail fetching logic here
</script>

<style scoped>
.bot-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.bot-info {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
</style> 