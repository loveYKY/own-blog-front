<template>
  <div>
    <Editor :value="text" @input="updateText"></Editor>
    <a-button @click="save">保存</a-button>
  </div>

  <div v-html="test"></div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import Editor from '../myEditor/components/editor.vue'
import { onContentChange } from './utils/index.js'
import Api from '@/api/index.js'
import { baseURL } from '@/configs'
export default defineComponent({
  name:'myEditor',
  components: {
    Editor
  },
  setup() {
    const text = ref('')
    const imgInfo = ref(null)
    const serverUrl = baseURL

    const updateText = val => {
      text.value = val
    }
    const changeContent = onContentChange

    const getImgUrl = async () => {
      imgInfo.value = changeContent(text.value)
      const res = await Api.getImgUrl(imgInfo.value.formData)
      let urlList = []
      if (res.code == 200) {
        urlList = res.data.map(item => {
          return serverUrl + item.path
        })
      }
      imgInfo.value.base64Arr.forEach((item, index) => {
        text.value = text.value.replace(item, urlList[index])
      })
    }

    const save = () => {
      getImgUrl()
    }

    return {
      text,
      updateText,
      save
    }
  }
})
</script>

<style lang="scss" scoped></style>
