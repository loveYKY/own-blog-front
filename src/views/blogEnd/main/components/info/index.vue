<template>
  <div class="info-container">
    <h1> 敬请期待 </h1>
    <hr style="border: 1px dashed black; height: 0px" />
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import Store from '@/store'
export default defineComponent({
  name: 'info',
  components: {},
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.info-container {
  padding: 16px;
  h1 {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
