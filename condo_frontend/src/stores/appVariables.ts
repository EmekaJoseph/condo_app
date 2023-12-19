import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppVariables = defineStore('appVariables', () => {

  const searchModal = ref(false)

  function toggleSearchModal() {
    searchModal.value = !searchModal.value
  }

  return {
    searchModal,
    toggleSearchModal,

  }
})
