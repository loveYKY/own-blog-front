<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import Api from '../src/api/index'
export default defineComponent({
  setup() {}
})
</script>

<style lang="scss">
html {
  overflow: hidden;
}
#app {
  height: 100%;
}
</style>
