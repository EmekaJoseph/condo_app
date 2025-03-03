<template>
  <HeaderVue />
  <div class="mb-5">
    <div class="hero-main min-vh-100">
      <div class="everything-center overlay-light">
        <div class="container">
          <VueWriter class="title-condo text-center my-0 py-0" :array="title.condo" :iterations='1' />
          <VueWriter class="text-secondary text-center text-danger-emphasis my-0 py-0 title-text" :array="title.text"
            :start="2000" :typeSpeed="50" />
        </div>
      </div>
    </div>
    <div class="other-section">
      <section class="fs-4">
        <div class="container py-5">
          <div class="row justify-content-center g-3">
            <div class="fw-bold small">Simple Steps:</div>
            <div v-for="(card, index) in steps" :key="index" class="col-md-6 col-lg-4">
              <div class="card h-100 hover-tiltY">
                <div class="card-body">
                  <i :class="card.icon" class="fs-4"></i> <br>
                  {{ card.description }}
                </div>
              </div>
            </div>
            <div class="col-12 small text-right mt-4">
              <router-link class=" float-end btn-link theme-color text-decoration-none fw-bolder hover-tiltX"
                to="/login">
                Create a memorial page now <i class="bi bi-chevron-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </section>
      <section v-if="recents.length" class="bg-white py-5">
        <div class="container">
          <div class="row g-3">
            <div class="col-12 text-center mb-3">
              <h3 class="fw-bold">Recent Memorials 🕯️</h3>
            </div>

            <!-- carousel -->
            <carousel class="px-4 px-lg-0" snapAlign="center" :items-to-show="appVar.screen_width > 767 ? 5 : 2"
              :autoplay="2000" :wrapAround="false">
              <slide class="pt-3" v-for="slide in recents" :key="slide">
                <div @click="gotToDeceasedPage(slide)"
                  class="card mx-2 h-100 shadow-sm cursor-pointer hover-tiltY recent-card">
                  <!-- <img class="card-img-top" :src="useFxn.resolvePhotoSrc(slide.display_photo, 'deceased_dps')"
                    alt="image" /> -->
                  <div class="card-img-top"
                    :style="{ backgroundImage: `url(${useFxn.resolvePhotoSrc(slide.display_photo, 'deceased_dps')})` }"
                    alt="image"> </div>
                  <!-- :style="{ backgroundImage: `url(${form.photo_path})` }" -->
                  <div class="card-body">
                    <div class="card-title theme-color  fw-bolder text-truncate">{{ slide.deceased }} </div>
                    <p class="card-text">
                      ({{ new Date(slide.birth_date).getFullYear() }} -
                      {{ new Date(slide.death_date).getFullYear() }})
                    </p>
                  </div>
                </div>
              </slide>

              <template #addons>
                <!-- <navigation /> -->
                <pagination />
              </template>
            </carousel>

          </div>
        </div>
      </section>

      <section class="pt-5 d-md-none">
        <div class="container">
          <div @click="appVar.toggleSearchModal()" class="text-center theme-color fs-4 cursor-pointer hover-tiltX">
            Click here to search <i class="bi bi-search"></i>
          </div>
        </div>
      </section>
    </div>
  </div>
  <PageFooter />
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import api from '@/stores/Helpers/axios'
import useFxn from '@/stores/Helpers/useFunctions';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { useAppVariables } from '@/stores/appVariables';
import { useRouter } from 'vue-router';

const appVar = useAppVariables()
const router = useRouter()

onMounted(() => {
  getRecents()
})

const recents: Ref<any> = ref([])

async function getRecents() {
  try {
    let resp = await api.recents()
    recents.value = resp.data
  } catch (error) {
    // 
  }
}

const title = {
  condo: ['condonote.'],
  text: [
    'Online Condolence Register for those we miss.',
    'Share cherished memories and create a beautiful, lasting tribute to celebrate the life of your loved ones who have passed.'
  ]
}

function gotToDeceasedPage(slide: any) {
  const name = slide.deceased.split(' ').join('-')
  router.push({
    path: `/condo/${slide.id}/${name}`,
  })
}


const steps = [
  {
    icon: 'bi bi-1-circle-fill',
    description: 'Fill out the personal details of your lost one and add a short description with preferred background music.',
  },
  {
    icon: 'bi bi-2-circle-fill',
    description: 'Select a nice photo and generate a unique web address for your page.',
  },
  {
    icon: 'bi bi-3-circle-fill',
    description: 'Invite people to share memories and condolence messages.',
  },
];

</script>

<style scoped>
.title-condo {
  line-height: 1 !important;
  color: var(--theme-color);
}

.hero-main {
  background: url('@/assets/images/hero.jpg');
  background-size: cover;
  background-position: center center;
}

.overlay-light {
  background-color: rgba(226, 227, 229, 0.845);
}

.recent-card:hover {
  border: 1px solid var(--theme-color) !important;
}

.card-img-top {
  height: 180px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
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
    font-size: 4rem;
  }

  /* .title-text span.typed {
    font-size: small;
  } */

}

.carousel__slide .card {
  width: 300px !important;
  margin-inline: 10px;
}
</style>