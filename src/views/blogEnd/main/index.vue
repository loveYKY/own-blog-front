<template>
    <Header></Header>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '@/api/index.js'
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue'
import Store from '@/store'
import Header from '@/components/header.vue'
export default defineComponent({
  components: {
      Header
  },
  setup() {
  }
})
</script>

<style lang="scss" scoped>

</style>
