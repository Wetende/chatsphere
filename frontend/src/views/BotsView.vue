<template>
  <div class="bots-container">
    <h1>Your Bots</h1>
    <div class="bots-grid">
      <div class="bot-card">
        <h2>Example Bot</h2>
        <p>This is an example chatbot.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Implement bot listing logic here
</script>

<style scoped>
.bots-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.bots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.bot-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 