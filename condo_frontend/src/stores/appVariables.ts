import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

export const useAppVariables = defineStore('appVariables', () => {

  const appName = ref<string>('Condonote')
  const searchModal: Ref<boolean> = ref(false)
  const condoModal: Ref<boolean> = ref(false)
  const imageModal: Ref<boolean> = ref(false)
  const currentDeceasedId = ref<any>('')
  const currentImageToShow = ref<any>('')
  const { y: y_axis } = useWindowScroll()
  const { width: screen_width, height } = useWindowSize()

  const toggleSearchModal = () => searchModal.value = !searchModal.value
  const toggleCondoModal = () => condoModal.value = !condoModal.value
  const toggleImageModal = () => imageModal.value = !imageModal.value

  return {
    appName,
    searchModal,
    condoModal,
    imageModal,
    y_axis,
    screen_width,
    currentDeceasedId,
    currentImageToShow,
    toggleSearchModal,
    toggleCondoModal,
    toggleImageModal,
  }
})
