<template>
  <div class="welcome-container">
    <h1>{{ username }}</h1>
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

    return {
      username
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
