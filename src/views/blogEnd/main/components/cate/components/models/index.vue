<template>
  <a-modal
    v-model:visible="visible"
    :title="modelType == 0 ? '添加分类' : '修改分类'"
    @ok="handleOk"
    okText="确认"
    cancelText="取消"
    class="modelClass"
  >
    <div>
      <span>分类名称：</span>
      <a-input v-model:value="inputValue" style="width: 144px"></a-input>
    </div>
  </a-modal>
</template>

<script>
import { computed, defineComponent, ref, toRefs } from 'vue'
import Api from '@/api/index.js'
import { message } from 'ant-design-vue'
export default defineComponent({
  emits: ['refresh', 'update:modelVisible'],
  props: {
    modelVisible: {
      type: Boolean,
      require: true
    },
    //0代表添加分类，1代表修改分类
    modelType: {
      type: Number,
      default: 0
    },
    defaultValue: {
      type: Object,
      default: () => null
    }
  },
  components: {},
  setup(props, context) {
    const { modelVisible, defaultValue, modelType } = toRefs(props)
    const visible = computed({
      get: function () {
        return modelVisible.value
      },
      set: function (val) {
        context.emit('update:modelVisible', val)
      }
    })

    const inputValue = ref(defaultValue.value?.name)

    const handleOk = async () => {
      if (!inputValue.value) {
        message.error('分类名称不可为空')
      }
      if (modelType.value == 0) {
        const res = await Api.addCate({
          name: inputValue.value
        })
        if (res.code == 200) {
          message.success('添加成功')
          context.emit('refresh')
        } else {
          message.error(res.msg)
        }
      } else {
        const res = await Api.updateCate({
          id: defaultValue.value.id,
          name: inputValue.value
        })
        if (res.code == 200) {
          message.success('修改成功')
          context.emit('refresh')
        } else {
          message.error(res.msg)
        }
      }
      visible.value = false
    }

    return {
      visible,
      inputValue,
      modelType,
      handleOk
    }
  }
})
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.modelClass {
  width: 400px !important;
  .ant-input {
    border-radius: 6px;
  }
}
</style>
