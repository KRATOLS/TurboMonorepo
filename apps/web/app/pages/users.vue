<script setup lang="ts">
definePageMeta({
  layout: 'orange',
})

const store = useUsersStore()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold m-3 ml-0">
      Пользователи
    </h1>

    <ul>
      <li
        v-for="num in store.users"
        :key="num"
        class="list-disc ml-5"
      >
        <div class="flex gap-1 items-center">
          <nuxt-icon name="commons/user"  /> Пользователь {{ num }}
        </div>
      </li>
    </ul>

    <div class="flex gap-2 mt-3">
      <BaseButton
        v-if="store.users"
        @click="store.decrement"
      >
        Удалить пользователя
      </BaseButton>
      <BaseButton @click="store.increment">
        Добавить пользователя
      </BaseButton>
    </div>
  </div>
</template>

<style scoped>

</style>
