<template>
  <a-menu v-model:selectedKeys="selectedKeys" class="menuList">
    <a-menu-item
      v-for="item in routeMenu"
      :key="item.path"
      @click.stop="jump(item.path)"
    >
      <span>{{ item.name }}</span>
    </a-menu-item>
  </a-menu>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'Leftmenu',
  setup() {
    const route = useRoute()
    const router = useRouter()

    let selectedKeys = ref([])

    const routeMenu = ref([
      {
        name: '系统首页',
        path: '/welcome'
      },
      {
        name: '分类管理',
        path: '/cate'
      },
      {
        name: '文章管理',
        path: '/article'
      },
      {
        name: '博客信息管理',
        path: '/info'
      },
      {
        name: '管理员管理',
        path: '/admin'
      }
    ])

    const jump = path => {
      router.push({
        path: path
      })
    }

    watch(
      route,
      () => {
        switch (route.path) {
          case '/welcome':
            selectedKeys.value[0] = '/welcome'
            break
          case '/cate':
            selectedKeys.value[0] = '/cate'
            break
          case '/article':
            selectedKeys.value[0] = '/article'
            break
          case '/info':
            selectedKeys.value[0] = '/info'
            break
          case '/admin':
            selectedKeys.value[0] = '/admin'
            break
        }
      },
      {
        immediate: true
      }
    )
    return {
      selectedKeys,
      routeMenu,

      jump
    }
  }
})
</script>

<style lang="scss" scoped>
.menuList {
  border-right: none !important;
  width: 200px;
}
</style>
