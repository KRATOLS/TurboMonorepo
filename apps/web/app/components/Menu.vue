<template>
  <nav>
    <ul>
      <li v-for="page in pages" :key="page.path">
        <NuxtLink :to="page.path">{{ page.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const { availablePages } = usePageAccess()

const pages = ref(availablePages);
</script>