import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import { scrollReveal } from './directives/scrollReveal'
import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)
app.directive('reveal', scrollReveal)

// Wait for router to be ready before mounting to prevent hydration mismatches
// and blank screen on initial load
router.isReady().then(() => {
  app.mount('#app')
})
