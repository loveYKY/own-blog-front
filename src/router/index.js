import { createRouter, createWebHashHistory } from 'vue-router'
import Store from '@/store'
import Cookies from 'js-cookie'
import { redirectToLogin } from '@/configs'
import { message } from 'ant-design-vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/blogEnd/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/blogEnd/main/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('service_access_token')

  if (to.path == '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      message.error('没有登陆授权')
      redirectToLogin()
    }
  }
})

export default router
