<template>
    <div>
        <MyEditor></MyEditor>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MyEditor from '@/components/myEditor/index.vue'

export default defineComponent({
  components: {
      MyEditor
  },
  setup() {}
})
</script>

<style lang="scss" scoped></style>
