<template>
  <button
    :class="[
      variant === 'primary' ? 'btn-primary' : 
      variant === 'secondary' ? 'btn-secondary' : 
      'btn-outline',
      { 'opacity-70 cursor-not-allowed': disabled || loading }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span 
      v-if="loading" 
      class="w-4 h-4 border-2 border-white border-b-transparent rounded-full animate-spin"
    />
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false
})
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;
  transition: var(--transition-base);
  min-width: 100px;
}

.base-button--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
}

.base-button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-dark);
}

.base-button--outline {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.base-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.base-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-white);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style> 