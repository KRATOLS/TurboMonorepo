<script setup lang="ts">
const counter = useCookie<number>('counter')

counter.value ||= Math.round(Math.random() * 1000)
</script>

<template>
  <div>
    <h1>Поиск звонков</h1>

    <div>
      <h3>Counter: {{ counter || '-' }}</h3>
      <button @click="counter = 0">
        сброс
      </button>
      <button @click="counter--">
        -
      </button>
      <button @click="counter++">
        +
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
