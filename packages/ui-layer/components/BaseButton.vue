<!-- packages/ui-layer/components/BaseButton.vue -->
<template>
  <button
      :class="['base-button', `base-button--${variant}`]"
      :disabled="disabled"
      @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

const {
  variant = 'primary',
  disabled = false
} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.base-button--primary {
  background-color: #3b82f6;
  color: white;
}

.base-button--secondary {
  background-color: #64748b;
  color: white;
}

.base-button--danger {
  background-color: #ef4444;
  color: white;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>