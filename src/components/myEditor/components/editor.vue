<template>
  <div class="commandList">
    <a-button class="btnIcon" @click="applyBold"><BoldOutlined /></a-button>
    <a-button class="btnIcon" @click="applyItalic"><ItalicOutlined /></a-button>
    <a-button class="btnIcon" @click="applyUnderline"
      ><UnderlineOutlined
    /></a-button>
    <a-button class="btnIcon" @click="applyOl"
      ><OrderedListOutlined
    /></a-button>
    <a-button class="btnIcon" @click="applyUl"
      ><UnorderedListOutlined
    /></a-button>
    <a-button class="btnIcon" @click="applyCenter"
      ><AlignCenterOutlined
    /></a-button>
    <a-button class="btnIcon" @click="applyLeft"
      ><AlignLeftOutlined
    /></a-button>
    <a-button class="btnIcon" @click="applyRight"
      ><AlignRightOutlined
    /></a-button>
    <a-button class="btnIcon" @click="applyRedo"><RedoOutlined /></a-button>
    <a-button class="btnIcon" @click="applyUndo"><UndoOutlined /></a-button>
  </div>

  <!-- 使用v-html实现html字符串的插入 -->
  <div
    @input="onInput"
    v-html="innerValue"
    contenteditable="true"
    class="editor-container"
  ></div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, toRefs } from 'vue'
import Api from '@/api/index.js'
import {
  setBold,
  setItalic,
  setUnderline,
  setUl,
  setOl,
  undo,
  redo,
  setLeft,
  setCenter,
  setRight
} from '../utils/index.js'
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  RedoOutlined,
  UndoOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'editor',
  emits: ['input'],
  props: {
    value: {
      type: String,
      require: true
    }
  },
  components: {
    BoldOutlined,
    ItalicOutlined,
    UnderlineOutlined,
    UnorderedListOutlined,
    OrderedListOutlined,
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    RedoOutlined,
    UndoOutlined
  },
  setup(props, context) {
    const { value } = toRefs(props)
    const innerValue = ref(value.value)

    const onInput = event => {
      context.emit('input', event.target.innerHTML)
      onContentChange(event.target.innerHTML)
    }



    //data:base64图片格式字符串
    //filename：文件名称
    const base64toFile = (data, fileName) => {
      const dataArr = data.split(',')
      const byteString = atob(dataArr[1])
      const options = {
        type: 'image/jpeg',
        endings: 'native'
      }
      const u8Arr = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++) {
        u8Arr[i] = byteString.charCodeAt(i)
      }
      return new File([u8Arr], fileName + '.jpg', options) //返回文件流
    }

    //筛选出html字符串中的base64
    const onContentChange = async val => {
      let content = val
      let imgReg = /<img.*?(?:>|\/>)/gi // 匹配图片中的img标签
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
      let arr = content.match(imgReg) // 筛选出所有的img
      let srcArr = []

      if (arr != null) {
        for (let i = 0; i < arr.length; i++) {
          let src = arr[i].match(srcReg)
          // 获取图片地址判断是否是base64格式
          if (src[1].indexOf('base64') == -1) {
            return
          } else {
            srcArr.push(src[1])
          }
        }
      }

      //将base64转化成文件流
      let formData = new FormData()
      let fileList = []
      fileList = srcArr.map((item, index) => {
        return base64toFile(item, index)
      })
      console.log(fileList)
      formData.append('fileList', fileList[0])
      // console.log(formData.get('fileList')[0])
      const res = await Api.getImgUrl(formData)
    }

    onMounted(() => {
      document.execCommand('defaultParagraphSeparator', false, 'p')
    })

    const applyBold = setBold
    const applyItalic = setItalic
    const applyUnderline = setUnderline
    const applyUl = setUl
    const applyOl = setOl
    const applyLeft = setLeft
    const applyCenter = setCenter
    const applyRight = setRight
    const applyUndo = undo
    const applyRedo = redo

    return {
      innerValue,

      onInput,
      applyBold,
      applyItalic,
      applyUnderline,
      applyUl,
      applyOl,
      applyLeft,
      applyCenter,
      applyRight,
      applyUndo,
      applyRedo
    }
  }
})
</script>

<style lang="scss" scoped>
.commandList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 800px;
  width: 100%;
  .btnIcon {
    padding: 0px;
    width: 32px;
    height: 32px;
    font-size: 12px;
    &:nth-child(n + 2) {
      margin-left: 10px;
    }
  }
}

.editor-container {
  width: 100%;
  min-width: 800px;
  height: 500px;
  background-color: white;
  border: 1px solid #e9eaeb;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  overflow-y: scroll;
  &:focus-visible {
    outline: none;
  }
  ol {
    margin-left: 10px;
  }
}
</style>

<style lang="scss">
.editor-container {
  ol {
    margin-left: 15px;
  }
  ul {
    margin-left: 15px;
  }
  p {
    margin-bottom: 0.75em;
  }
}
</style>
