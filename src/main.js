import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'normalize.css'
import 'virtual:windi.css'
import 'nprogress/nprogress.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).mount('#app')
