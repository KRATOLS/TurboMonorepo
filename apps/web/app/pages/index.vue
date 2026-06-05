<!-- apps/web/pages/index.vue -->
<template>
  <div class="container">
    <BaseCard>
      <template #header>
        <h1>Веб-приложение</h1>
      </template>

      <p>Привет, {{ userName }}!</p>
      <p>Сегодня: {{ todayFormatted }}</p>

      <div style="margin-top: 16px">
        <BaseButton
          variant="primary"
          @click="handleClick"
        >
          Нажми меня
        </BaseButton>
      </div>
    </BaseCard>

    <MainMenu style="margin-top: 16px; margin-left: 16px" />

    <div style="margin-top: 8px">
      <NuxtTime
        :datetime="Date.now()"
        year="numeric"
        month="long"
        day="numeric"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@repo/shared/utils'
import { onMounted } from 'vue'

// Пример импорта типов
// import type { User } from '@repo/shared/types'

const userName = ref('Гость')
const today = ref(new Date())
const todayFormatted = computed(() => formatDate(today.value))

const handleClick = () => {
  alert('Кнопка нажата!')
}

onMounted(async () => {
  const getPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return await $fetch('https://jsonplaceholder.typicode.com/posts')
  }

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  console.log('test fetch on tanstack query', {
    isPending: isPending.value,
    isFetching: isFetching.value,
    isError: isError.value,
    data,
    error: error.value,
  })
})

// Пример использования типа User
// const currentUser: User = {
//   id: 1,
//   name: 'Иван',
//   email: 'ivan@example.com',
//   role: 'user',
// }
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 48px auto;
  padding: 0 16px;
}
</style>
