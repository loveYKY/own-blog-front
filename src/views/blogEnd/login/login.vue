<template>
  <div class="login-container">
    <div class="login-model">
      <div class="title">个人博客管理系统</div>
      <div class="input" v-if="Object.keys(userInfo).length == 0">
        <a-input
          class="user"
          placeholder="请输入用户名"
          v-model:value="username"
        ></a-input>
        <a-input-password 
          class="user"
          style="margin-top: 40px"
          placeholder="请输入密码"
          v-model:value="password"
        ></a-input-password>
        <a-button class="btn" @click="login">登陆</a-button>
      </div>

      <div v-else>
        <div>
          <a-button class="btn" @click="jumbToMain">已登录，直接跳转</a-button>
        </div>
        <div>
          <a-button class="btn" @click="clearUser">更换账号</a-button>
        </div>
      </div>
    </div>
    <BackGround></BackGround>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Api from '@/api/index.js'
import Cookies from 'js-cookie'
import BackGround from './components/background.vue'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import Store from '@/store'

export default defineComponent({
  components: {
    BackGround
  },
  setup() {
    const router = useRouter()
    let username = ref('')
    let password = ref('')

    const getUserInfo = async () => {
      let token = Cookies.get('service_access_token')

      if (token) {
        const res = await Api.getUserInfo()
        if (res.code == 200) {
          Store.commit('SET_USER_INFO', res.data)
        } else {
          message.error(res.msg)
        }
      }
    }
    getUserInfo()

    const userInfo = computed({
      get: () => {
        return Store.state.userInfo
      }
    })

    const jumbToMain = () => {
      router.push({
        path: '/main'
      })
    }

    const clearUser = () => {
      Store.commit('SET_USER_INFO', {})
      Store.commit('SET_ACCESS_TOKEN', null)
      Cookies.remove('service_access_token')
    }

    const login = async () => {
      const res = await Api.login({
        username: username.value,
        password: password.value
      })
      if (res.code == 200) {
        Cookies.set('service_access_token', res.data.token)
        Store.commit('SET_USER_INFO', res.data)
        message.success('登录成功')
        router.push({
          path: '/main'
        })
      } else {
        message.error(res.msg)
      }
    }

    return {
      username,
      password,
      userInfo,

      //action
      login,
      jumbToMain,
      clearUser
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  position: relative;
  .login-model {
    position: absolute;
    height: 400px;
    width: 400px;
    background-color: rgba(21, 33, 50, 0.3);
    box-shadow: 15px 15px 15px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title {
      margin: 40px auto;
      width: 200px;
      text-align: center;
      color: white;
      font-weight: bolder;
      font-size: 24px;
    }
    .input {
      margin: 50px auto;
      width: 70%;
      .user {
        width: 100%;
        height: 40px;
        border-radius: 15px !important;
        font-size: 16px;
        padding-left: 10px;
        &:focus {
          outline: 1px solid #4ea2e7;
        }
      }
    }
    .btn {
      height: 48px;
      width: 144px;
      border-radius: 48px !important;
      display: block;
      margin: 30px auto;
    }
  }
}
</style>
