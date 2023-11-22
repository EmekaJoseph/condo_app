// @ts-nocheck

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//bootstrap@5.3.2
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// custom css
import './assets/main.css'

// https://vue3-infinite-loading.netlify.app/
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

// https://vue3datepicker.com/installation/
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// https://github.com/marcoschulte/vue3-progress
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress';
import '@marcoschulte/vue3-progress/dist/index.css';

// https://www.npmjs.com/package/vue-writer
import VueWriter from "vue-writer";

// https://animate.style/
import 'animate.css';

// https://ismail9k.github.io/vue3-carousel/
import 'vue3-carousel/dist/carousel.css'

// https://www.npmjs.com/package/vue3-dropzone

// https://vue3-google-signin.vercel.app/guide/
import GoogleSignInPlugin from "vue3-google-signin"

// https://www.npmjs.com/package/vue-sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.component("infinite-loading", InfiniteLoading);
app.component('VueDatePicker', VueDatePicker);

app.use(createPinia())
app.use(Vue3ProgressPlugin);
app.use(VueSweetalert2);
app.use(VueWriter);
app.use(GoogleSignInPlugin, { clientId: ' GOOGLE API CONSOLE ID', });
app.use(router)

app.mount('#app')
