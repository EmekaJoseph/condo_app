import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('authStore', () => {
  const token = ref('')

  // const isLoggedIn = computed(() => token.value || Cookies.get('_tokn'));
  const isLoggedIn = computed(() => {
    let xx = false;
    if (token.value) {
      xx = true;
    }
    else {
      if (Cookies.get('_tokn')) {
        xx = true;
      }
    }
    return xx;
  });

  const login = (tokenStr: string) => {
    Cookies.set('_tokn', tokenStr, { expires: 7 });
    token.value = tokenStr;
  }

  const logout = () => {
    Cookies.remove('_tokn');
    token.value = '';
  }

  return { login, logout, isLoggedIn }
})
