import { createApp } from 'vue'
import App from './App.vue'
import instalVantUI from './vant-ui'
import router from './router'
import store from './store'
import http from './service/api'
import 'lib-flexible/flexible'
import 'normalize.css'
import '@/assets/css/public.css'

const app = createApp(App)
instalVantUI(app)
// 配置全局属性
app.config.globalProperties.$http = http
app.use(store).use(router).mount('#app')
