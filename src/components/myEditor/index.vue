<template>
  <div>
    <a-modal
      v-model:visible="modelVisible"
      :title="modalType == 0 ? '添加文章' : '修改文章'"
      :maskClosable="false"
      okText="确认"
      cancelText="取消"
      @ok="handleOk"
      class="editor-modal"
    >
      <div class="title">
        <div style="width: 80px; text-align: right">标题：</div>
        <a-input v-model:value="modelRef.title"></a-input>
      </div>
      <div class="cate">
        <div style="width: 80px; text-align: right">所属分类：</div>
        <a-select v-model:value="modelRef.cate" :options="cateList"></a-select>
      </div>
      <div class="desc">
        <div style="width: 80px; text-align: right">描述：</div>
        <a-textarea v-model:value="modelRef.desc" />
      </div>
      <div class="editor">
        <div style="width: 80px; text-align: right">内容：</div>
        <Editor :value="modelRef.content" @input="updateText"></Editor>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, computed } from 'vue'
import Editor from '../myEditor/components/editor.vue'
import { onContentChange } from './utils/index.js'
import Api from '@/api/index.js'
import { baseURL } from '@/configs'
import { message } from 'ant-design-vue'
export default defineComponent({
  name: 'myEditor',
  emits: ['update:visible', 'refresh'],
  components: {
    Editor
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    //0代表添加文章，1代表修改文章
    modalType: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Object,
      default: () => null
    }
  },
  setup(props, context) {
    const serverUrl = baseURL
    const changeContent = onContentChange
    const { visible, modalType, defaultValue } = toRefs(props)
    const modelVisible = computed({
      get: function () {
        return visible.value
      },
      set: function (val) {
        context.emit('update:visible', val)
      }
    })

    const modelRef = ref({
      id: defaultValue.value?.id,
      title: defaultValue.value?.title,
      cate: defaultValue.value?.cate,
      desc: defaultValue.value?.desc,
      content: defaultValue.value?.content
    })

    const imgInfo = ref(null)

    const updateText = val => {
      modelRef.value.content = val
    }

    const getImgUrl = async () => {
      imgInfo.value = changeContent(modelRef.value.content)
      //判断imgInfo.value是否为空对象
      if (Object.keys(imgInfo.value).length != 0) {
        const res = await Api.getImgUrl(imgInfo.value.formData)
        let urlList = []
        if (res.code == 200) {
          urlList = res.data.map(item => {
            return serverUrl + item.path
          })
        }
        imgInfo.value.base64Arr.forEach((item, index) => {
          modelRef.value.content = modelRef.value.content.replace(
            item,
            urlList[index]
          )
        })
      }
    }

    //请求分类列表
    const cateList = ref([])
    const getCateList = async () => {
      const res = await Api.getCateList({
        dropList: true
      })
      if (res.code == 200) {
        cateList.value = res.data.list.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      } else {
        message.error(res.msg)
      }
    }

    getCateList()

    const handleOk = async () => {
      //判断是否有空参数
      let keys = Object.keys(modelRef.value)
      let isNull = {
        judege: false,
        key: null
      }
      keys.forEach(item => {
        if (!modelRef.value[item]) {
          isNull.judege = true
          isNull.key = item
        }
      })
      if (isNull.judege && isNull.key != 'id') {
        message.error(isNull.key + '不可为空')
        return
      }

      //等待图片格式处理
      await getImgUrl()

      //判断接口调用
      if (modalType.value == 0) {
        const res = await Api.addArticle({
          ...modelRef.value
        })
        if (res.code == 200) {
          message.success('添加成功')
          context.emit('refresh')
        } else {
          message.error(res.msg)
        }
      } else {
        const res = await Api.updateArticle({
          ...modelRef.value
        })
        if (res.code == 200) {
          message.success('修改成功')
          context.emit('refresh')
        } else {
          message.error(res.msg)
        }
      }
      modelVisible.value = false
    }

    return {
      modelRef,
      modelVisible,
      updateText,
      cateList,

      //action
      handleOk
    }
  }
})
</script>

<style lang="scss">
.editor-modal {
  width: 800px !important;
  top: 40px !important;
  .ant-modal-content {
    width: 800px;
  }
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .ant-input {
      height: 32px;
      border-radius: 6px;
      flex: 1;
    }
  }
  .cate {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .ant-select {
      height: 32px;
      border-radius: 6px;
      width: 144px;
    }
  }
  .desc {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    .ant-input {
      border-radius: 6px;
      flex: 1;
    }
  }
  .editor {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
