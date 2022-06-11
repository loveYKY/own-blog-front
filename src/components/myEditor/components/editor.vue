<template>
  <div class="container">
    <div class="commandList">
      <a-button class="btnIcon" @click="applyBold"><BoldOutlined /></a-button>
      <a-button class="btnIcon" @click="applyItalic"
        ><ItalicOutlined
      /></a-button>
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

      <select class="select" v-model="font" @change="applyFont">
        <option
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select class="select" v-model="fontWeight" @change="applyFontWeight">
        <option
          v-for="(item, index) in fontWeightOptions"
          :key="index"
          :value="item.value"
          >{{ item.label }}</option
        >
      </select>
      <select class="select" v-model="fontColor" @change="applyFontColor">
        <option
          v-for="(item, index) in ColorOptions"
          :key="index"
          :value="item.value"
          >{{ item.label }}</option
        >
      </select>
    </div>

    <!-- 使用v-html实现html字符串的插入 -->
    <div
      @input="onInput"
      v-html="innerValue"
      contenteditable="true"
      class="editor-container"
    ></div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, toRefs } from 'vue'
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
  setRight,
  setFont,
  setFontWeight,
  setFontColor
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

    const options = [
      { label: '微软雅黑', value: 'Microsoft YaHei' },
      { label: '新罗马', value: 'Times New Roman' },
      { label: '宋体', value: 'SimSun' },
      { label: '平方', value: 'PingFang SC' },
      { label: '仿宋', value: 'fangsong' },
      { label: '华文楷体', value: 'STKaiti' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Calibri', value: 'Calibri' },
      { label: 'Comic Sans MS', value: 'Comic Sans MS' },
      { label: 'Verdana', value: 'Verdana' }
    ]

    const fontWeightOptions = [
      { label: '特小', value: '1' },
      { label: '小', value: '2' },
      { label: '正常', value: '3' },
      { label: '略大', value: '4' },
      { label: '大', value: '5' },
      { label: '很大', value: '6' },
      { label: '极大', value: '7' }
    ]

    const ColorOptions = [
      { label: '黑', value: 'black' },
      { label: '红', value: 'red' },
      { label: '橙', value: 'orange' },
      { label: '蓝', value: 'blue' },
      { label: '绿', value: 'green' },
      { label: '白', value: 'white' },
      { label: '灰', value: '#999' },
      { label: '浅灰', value: '#ddd' }
    ]

    const font = ref('SimSun')
    const fontWeight = ref('2')
    const fontColor = ref('black')

    const onInput = event => {
      context.emit('input', event.target.innerHTML)
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
    const applyFont = () => {
      setFont(font.value)
    }
    const applyFontWeight = () => {
      setFontWeight(fontWeight.value)
    }
    const applyFontColor = () => {
      setFontColor(fontColor.value)
    }

    return {
      innerValue,
      options,
      fontWeightOptions,
      font,
      ColorOptions,
      fontColor,
      fontWeight,

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
      applyRedo,
      applyFont,
      applyFontWeight,
      applyFontColor
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  width: 100%;
  border: 1px solid #e9eaeb;
  .commandList {
    border-bottom: 1px solid #e9eaeb;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    padding: 0px 4px 4px 0px;
    .btnIcon {
      margin-top: 4px;
      margin-left: 4px;
      padding: 0px;
      width: 32px;
      height: 32px;
      font-size: 12px;
    }
    .select {
      margin-top: 4px;
      margin-left: 4px;
      padding: 0px;
      height: 32px;
      width: 108px;
      border-color: #e9eaeb;
      border-radius: 6px;
      cursor: pointer;
    }
  }

  .editor-container {
    width: 100%;
    height: 400px;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    overflow-y: scroll;
    &:focus-visible {
      outline: none;
    }
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
    margin: 0px;
  }
  img {
    max-width: 100%;
  }
}
</style>
