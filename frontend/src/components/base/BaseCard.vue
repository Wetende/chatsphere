<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div v-if="$slots.header" class="mb-4">
      <slot name="header" />
    </div>
    <div class="space-y-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
// No props needed for basic card functionality
</script> 