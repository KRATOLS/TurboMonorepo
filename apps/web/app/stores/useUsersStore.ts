export const useUsersStore = defineStore('users', () => {
  const users = ref(5)

  function reset() {
    users.value = 0
  }

  function increment() {
    users.value += 1
  }

  function decrement() {
    users.value -= 1
  }

  return {
    users,
    reset,
    increment,
    decrement,
  }
})
