import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref('')
  const profileData = ref<any>('')

  const isLoggedIn = computed(() => token.value || Cookies.get('condonote_tokn'));

  const emailVerified = computed(() => {
    return profileData.value?.email_verified_at
  })

  const login = (tokenStr: string) => {
    Cookies.set('condonote_tokn', tokenStr, { expires: 7 });
    token.value = tokenStr;
  }

  const logout = () => {
    Cookies.remove('condonote_tokn');
    token.value = '';
    window.location.reload()
  }

  return { login, logout, isLoggedIn, profileData, emailVerified }
})
