<script setup lang="ts">
const counter = useCookie<number>('counter')

counter.value ||= Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold m-3 ml-0">
      Поиск звонков
    </h1>

    <div>
      <h3>Counter: {{ counter || '-' }}</h3>
      <div class="flex gap-2 mt-2">
        <BaseButton @click="counter = 0">
          сброс
        </BaseButton>
        <BaseButton @click="counter--">
          -
        </BaseButton>
        <BaseButton @click="counter++">
          +
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
