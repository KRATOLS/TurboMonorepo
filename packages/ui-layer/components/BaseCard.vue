<!-- packages/ui-layer/components/BaseCard.vue -->
<template>
  <div class="card">
    <div
      v-if="$slots.header"
      class="card__header"
    >
      <slot name="header" />
    </div>
    <div class="card__content">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.card__header {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
  font-weight: bold;
}

.card__content {
  padding: 16px;
}

.card__footer {
  padding: 16px;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
}
</style>
