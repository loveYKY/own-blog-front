<template>
  <Header></Header>
  <div class="main-container">
    <div class="left">
      <Menu></Menu>
    </div>
    <div class="right">
      <div class="right-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Api from '@/api/index.js'
import Cookies from 'js-cookie'
import { message } from 'ant-design-vue'
import Store from '@/store'
import Header from '@/components/header.vue'
import Menu from './components/menu/index.vue'
export default defineComponent({
  components: {
    Header,
    Menu
  },
  setup() {}
})
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;
  width: 100%;
  .left {
    width: 200px;
    height: 100%;
    background-color: white;
  }
  .right {
    flex: 1;
    background-color: #eff0f2;
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .right-container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 6px;
  }
}
</style>
