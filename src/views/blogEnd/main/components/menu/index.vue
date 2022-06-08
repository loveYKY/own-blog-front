<template>
  <a-menu v-model:selectedKeys="selectedKeys" class="menuList">
    <a-menu-item key="1">
      <span>系统首页</span>
    </a-menu-item>
    <a-menu-item key="2">
      <span>分类管理</span>
    </a-menu-item>
    <a-menu-item key="3">
      <span>文章管理</span>
    </a-menu-item>
    <a-menu-item key="4">
      <span>博客信息管理</span>
    </a-menu-item>
    <a-menu-item key="5">
      <span>管理员管理</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Leftmenu',
  setup() {
    const route = useRoute()
    let selectedKeys = ref([])

    watch(
      route,
      () => {
        console.log(route.path)
        switch (route.path) {
          case '/welcome':
            selectedKeys.value[0] = "1"
            break;
        }
      },
      {
        immediate: true
      }
    )
    return {
      selectedKeys
    }
  }
})
</script>

<style lang="scss" scoped>
.menuList {
  border-right: none !important;
}
</style>
