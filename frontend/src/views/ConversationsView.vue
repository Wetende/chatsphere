<template>
  <div class="conversations-container">
    <h1>Conversations</h1>
    <div class="conversations-list">
      <div class="conversation-card">
        <h2>Example Conversation</h2>
        <p>This is an example conversation.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Implement conversations listing logic here
</script>

<style scoped>
.conversations-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.conversations-list {
  margin-top: 20px;
}

.conversation-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
</style> 