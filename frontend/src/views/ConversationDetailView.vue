<template>
  <div class="conversation-detail">
    <h1>Conversation Detail</h1>
    <div class="conversation-messages">
      <div class="message user-message">
        <p>This is a user message</p>
      </div>
      <div class="message bot-message">
        <p>This is a bot response</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const conversationId = route.params.id;
console.log('Conversation ID:', conversationId);
// Implement conversation detail fetching logic here
</script>

<style scoped>
.conversation-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.conversation-messages {
  margin-top: 20px;
}

.message {
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  max-width: 70%;
}

.user-message {
  background-color: #e3f2fd;
  margin-left: auto;
}

.bot-message {
  background-color: #f1f1f1;
  margin-right: auto;
}
</style> 