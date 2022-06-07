import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/scss/global.scss'

import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.less'

createApp(App).use(store).use(router).use(Antd).mount('#app')
