<template>
  <div>
    <Editor :value="text" @input="updateText"></Editor>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Editor from '../myEditor/components/editor.vue'

export default defineComponent({
  components: {
    Editor
  },
  setup() {
    const text = ref('')
    const updateText = val => {
      text.value = val
    }

    return {
      text,
      updateText
    }
  }
})
</script>

<style lang="scss" scoped></style>
