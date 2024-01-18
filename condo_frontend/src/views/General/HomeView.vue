<template>
  <HeaderVue />
  <div class="mb-5">
    <div class="hero-main min-vh-100">
      <div class="everything-center overlay-light">
        <div class="container">
          <VueWriter class="title-condo text-center my-0 py-0" :array="title.condo" :iterations='1' />
          <VueWriter class="text-secondary text-center my-0 py-0 title-text" :array="title.text" :start="2000"
            :typeSpeed="50" />
        </div>
      </div>
    </div>
    <div class="other-section">
      <section class="fs-4">
        <div class="container py-5">
          <div class="row justify-content-center g-3">
            <div class="col-md-6 col-lg-4">
              <div class="card h-100">
                <div class="card-body">
                  <i class="bi bi-1-circle-fill fs-4"></i> <br>
                  Fill out the personal details of your lost one and add a short description with
                  preffered background music.
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card h-100">
                <div class="card-body">
                  <i class="bi bi-2-circle-fill fs-4"></i> <br>
                  Select a nice photo and generate a unique web address for your page.
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-4">
              <div class="card h-100">
                <div class="card-body">
                  <i class="bi bi-3-circle-fill fs-4"></i> <br>
                  Invite people to share memories and condolence messages.
                </div>
              </div>
            </div>
            <div class="col-12 small text-right mt-4">
              <router-link class=" float-end btn-link color-theme text-decoration-none fw-bolder" to="/login">
                Create a memorial page <i class="bi bi-chevron-right"></i>
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
                <div @click="gotToDeceasedPage(slide)" class="card mx-2 h-100 shadow-sm cursor-pointer hover-tiltY">
                  <img class="card-img-top" :src="useFxn.resolvePhotoSrc(slide.display_photo, 'deceased_dps')"
                    alt="image" />
                  <div class="card-body">
                    <div class="card-title color-theme  fw-bolder text-truncate">{{ slide.deceased }} </div>
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
          <div @click="appVar.toggleSearchModal()" class="text-center color-theme fs-4 cursor-pointer hover-tiltX">
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
    'Share memories, photos and videos and create a beautiful and lasting tribute to celebrate the life of your lost loved ones.'
  ]
}

function gotToDeceasedPage(slide: any) {
  const name = slide.deceased.split(' ').join('-')
  router.push({
    path: `/condo/${slide.id}/${name}`,
  })
}

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

.carousel__slide .card {
  width: 300px !important;
  margin-inline: 10px;
}
</style>