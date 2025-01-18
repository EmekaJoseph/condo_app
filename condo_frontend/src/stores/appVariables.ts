import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useWindowScroll, useWindowSize } from '@vueuse/core'

export const useAppVariables = defineStore('appVariables', () => {

  const appName = ref<string>('Condonote')
  const appTheme = ref<'dark' | 'light'>('light')
  const searchModal: Ref<boolean> = ref(false)
  const condoModal: Ref<boolean> = ref(false)
  const imageModal: Ref<boolean> = ref(false)
  const copyLinkModal: Ref<boolean> = ref(false)
  const adminMenu: Ref<boolean> = ref(false)
  const currentDeceasedId = ref<any>('')
  const currentImageToShow = ref<any>('')
  const deceasedLinkUrl = ref<any>('')
  const { y: y_axis } = useWindowScroll()
  const { width: screen_width, height } = useWindowSize()

  const toggleSearchModal = () => searchModal.value = !searchModal.value
  const toggleCondoModal = () => condoModal.value = !condoModal.value
  const toggleCopyLinkModal = () => copyLinkModal.value = !copyLinkModal.value
  const toggleImageModal = () => imageModal.value = !imageModal.value
  const toggleAdminMenu = () => adminMenu.value = !adminMenu.value

  function toggleTheme() {
    appTheme.value = appTheme.value == 'dark' ? 'light' : 'dark';
  }

  function showDeceasedCopyModal(deceased: any) {
    deceasedLinkUrl.value = `https://${window.location.host}/condo/${deceased.id}/${deceased.deceased.replace(/\s+/g, '-')}`;
    toggleCopyLinkModal()
  }

  return {
    appName,
    searchModal,
    condoModal,
    imageModal,
    copyLinkModal,
    adminMenu,
    y_axis,
    screen_width,
    currentDeceasedId,
    currentImageToShow,
    appTheme,
    toggleTheme,
    toggleSearchModal,
    toggleCondoModal,
    toggleImageModal,
    toggleAdminMenu,
    toggleCopyLinkModal,
    deceasedLinkUrl,
    showDeceasedCopyModal
  }
})
