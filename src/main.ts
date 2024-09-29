import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";

import '@/style.css'
import "tailwindcss/tailwind.css"
import '@/mock'


createApp(App)
    .use(router)
    .mount('#app')
