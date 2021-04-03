import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './service/api'
console.log(http)

const app = createApp(App)
// 配置全局属性
app.config.globalProperties.$http = http
app.use(store).use(router).mount('#app')
