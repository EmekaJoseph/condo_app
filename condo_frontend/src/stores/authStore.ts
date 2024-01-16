import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('authStore', () => {
  const token: any = useStorage('condonote:$authTkn', '', localStorage)

  const isLoggedIn = computed(() => token.value ? true : false)

  function login(tokenStr: string) {
    token.value = tokenStr;
  }

  function logout() {
    token.value = '';
  }

  return { token, login, logout, isLoggedIn }
})
