<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="input-base"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      <div v-if="error" class="absolute right-2 top-1/2 transform -translate-y-1/2">
        <span class="text-red-500">⚠</span>
      </div>
    </div>
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
    <span v-if="hint" class="text-sm text-gray-500">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  error: '',
  hint: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const id = computed(() => `input-${Math.random().toString(36).substring(2, 9)}`)
</script>

<style scoped>
.base-input {
  margin-bottom: var(--spacing-3);
}

.base-input__label {
  display: block;
  margin-bottom: var(--spacing-2);
  color: var(--color-dark);
  font-size: var(--font-size-base);
}

.base-input__required {
  color: var(--color-danger);
  margin-left: var(--spacing-1);
}

.base-input__field {
  width: 100%;
  padding: var(--spacing-2);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-dark);
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  transition: var(--transition-base);
}

.base-input__field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.base-input__field--error {
  border-color: var(--color-danger);
}

.base-input__error {
  margin-top: var(--spacing-1);
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style> 