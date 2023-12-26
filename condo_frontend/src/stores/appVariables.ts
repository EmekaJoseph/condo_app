import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useWindowScroll } from '@vueuse/core'

export const useAppVariables = defineStore('appVariables', () => {

  const searchModal = ref(false)
  const condoModal = ref(false)
  const { y: y_axis } = useWindowScroll()

  const toggleSearchModal = () => searchModal.value = !searchModal.value
  const toggleCondoModal = () => condoModal.value = !condoModal.value

  return {
    searchModal,
    condoModal,
    y_axis,
    toggleSearchModal,
    toggleCondoModal,
  }
})
