import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import router from './router';
import store from '@/store';
// ElementPlus
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-notification.css';
import 'element-plus/theme-chalk/el-message-box.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router).use(store).mount('#app');
