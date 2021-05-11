import { createApp } from 'vue'
import App from './App.vue'
import "tailwindcss/tailwind.css"
import "@/assets/css/styles.css";
import 'boxicons'
import router from './router'

createApp(App).use(router).mount('#app')
    