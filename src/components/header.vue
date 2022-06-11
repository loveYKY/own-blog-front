<template>
  <div class="header">
    <div class="title">后台管理系统</div>
    <div class="user">
      <div class="name">{{ userInfo.name }}</div>
      <ExportOutlined class="export" @click="logout" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Api from '@/api/index.js'
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue'
import { ExportOutlined } from '@ant-design/icons-vue'
import Store from '@/store'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    ExportOutlined
  },
  setup() {
    const router = useRouter()

    const getUserInfo = async () => {
      const res = await Api.getUserInfo()
      if (res.code == 200) {
        Store.commit('SET_USER_INFO', res.data)
      } else {
        message.error(res.msg)
      }
    }
    getUserInfo()
    const userInfo = computed({
      get: function () {
        return Store.state.userInfo
      }
    })
    const logout = () => {
      Store.commit('SET_USER_INFO', {})
      Store.commit('SET_ACCESS_TOKEN', null)
      Cookies.remove('service_access_token')
      router.push({
        path: '/login'
      })
    }
    return {
      userInfo,

      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  width: 100%;
  background-color: #091f49;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    color: white;
    width: 200px;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    text-align: center;
  }
  .user {
    flex: 1;
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: flex-end;
    margin-right: 24px;
    .name {
      color: white;
      font-size: 14px;
      margin-right: 15px;
    }
    .export {
      color: white;
      cursor: pointer;
      &:hover {
        color: #4d88ff;
      }
    }
  }
}
</style>
