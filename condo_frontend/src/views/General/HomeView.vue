<template>
  <HeaderVue />
  <div class="hero-main min-vh-100">
    <div class="everything-center overlay-light">
      <div class="container">
        <VueWriter class="theme-color title-condo text-center my-0 py-0" :array="title.condo" :iterations='1' />
        <VueWriter class="text-secondary text-center my-0 py-0 title-text" :array="title.text" :start="2000"
          :typeSpeed="50" :iterations='1' />
      </div>
    </div>
  </div>
  <div class="container">

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderVue from '@/components/Header.vue';
import api from '@/stores/Helpers/axios'

onMounted(() => {
  getRecents()
})

async function getRecents() {
  let resp = await api.recents()
  // console.log(resp);
}

const title = {
  condo: ['condonote.'],
  text: ['Online Condolence Register for those we miss.']
}

</script>

<style scoped>
.title-condo {
  line-height: 1 !important;
}

.hero-main {
  background: url('@/assets/images/hero.jpg');
  background-size: cover;
  background-position: center center;
}

.overlay-light {
  background-color: rgba(226, 227, 229, 0.845);
}
</style>

<style>
.title-condo span.typed {
  font-size: 5rem;
  font-weight: 700 !important;
}

.title-text span.typed {
  font-size: 1.25rem;
}

@media (max-width: 767px) {
  .title-condo span.typed {
    font-size: 3rem;
  }

  .title-text span.typed {
    font-size: small;
  }
}
</style>