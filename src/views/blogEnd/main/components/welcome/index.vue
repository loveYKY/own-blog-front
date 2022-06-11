<template>
  <div class="welcome-container">
    <h1>{{ username }}</h1>
    <hr style="border: 1px dashed black; height: 0px" />
    <div style="margin-top: 10px">
      <span style="color: grey">上次登陆时间：</span>
      <span style="margin-left: 30px; color: grey">{{ loginTime }}</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Store from '@/store'
export default defineComponent({
  name: 'welcome',
  components: {},
  setup() {
    const username = computed({
      get: function () {
        return Store.state.userInfo.name
      }
    })
    const loginTime = computed({
      get: function () {
        return Store.state.userInfo.lastLoginAt
      }
    })

    return {
      username,
      loginTime
    }
  }
})
</script>

<style lang="scss" scoped>
.welcome-container {
  padding: 16px;
  h1 {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
