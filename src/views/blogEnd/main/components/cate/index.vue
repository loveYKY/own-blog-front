<template>
  <div class="cate-container">
    <div style="margin-bottom: 20px">
      <a-input-search
        placeholder="请输入分类名字进行搜索"
        style="width: 300px"
        v-model:value="modelRef.searchName"
        @search="search"
      />
      <a-button style="margin-left: 20px" type="primary" @click="addCate"
        >添加</a-button
      >
    </div>

    <a-table :columns="columns" :dataSource="tableData" :pagination="false">
      <template #index="{ index }">
        {{ ++index }}
      </template>
      <template #action="{ record, index }">
        <div class="action">
          <div class="update" @click="editCate(record)"
            ><EditOutlined class="editIcon" /> 修改</div
          >
          <div class="delete" @click="delCate(record, index)"
            ><DeleteOutlined class="delIcon" /> 删除</div
          >
        </div>
      </template>
    </a-table>
    <Pagination
      style="margin-top: 24px; float: right"
      :pageSize="modelRef.pageSize"
      :current="modelRef.page"
      :total="modelRef.totalCount"
      @change="pageChange"
      @showSizeChange="showSizeChange"
    ></Pagination>
  </div>

  <Models
    v-model:modelVisible="modelVisible"
    v-if="modelVisible"
    :modelType="modelType"
    :defaultValue="modelValue"
    @refresh="refresh"
  ></Models>
</template>

<script>
import { computed, defineComponent, ref, h } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import Api from '@/api/index.js'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import Models from './components/models/index.vue'
import { message, Modal } from 'ant-design-vue'
export default defineComponent({
  name: 'cate',
  components: {
    Pagination,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    Models
  },
  setup() {
    const columns = [
      {
        title: '分类id',
        dataIndex: 'id',
        width: '20%',
        slots: { customRender: 'index' }
      },
      {
        title: '分类名称',
        dataIndex: 'name',
        ellipsis: true
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: '25%'
      },
      {
        title: '操作',
        slots: { customRender: 'action' },
        width: '25%'
      }
    ]

    const tableData = ref([])
    const modelRef = ref({
      page: 1,
      pageSize: 4,
      totalCount: null,
      searchName: null
    })

    //获取分类列表
    const getCateList = async () => {
      const res = await Api.getCateList({
        page: modelRef.value.page,
        pageSize: modelRef.value.pageSize,
        name: modelRef.value.searchName
      })
      if (res.code == 200) {
        tableData.value = res.data.list.map((item, index) => {
          return {
            ...item,
            key: index
          }
        })
        modelRef.value.totalCount = res.data.totalCount
      }
    }
    getCateList()

    const pageChange = page => {
      modelRef.value.page = page
      getCateList()
    }

    const showSizeChange = (current, pageSize) => {
      modelRef.value.page = 1
      modelRef.value.pageSize = pageSize
      getCateList()
    }

    const search = () => {
      modelRef.value.page = 1
      getCateList()
    }

    const modelVisible = ref(false)
    const modelType = ref(0)
    const modelValue = ref(null)

    const addCate = () => {
      modelType.value = 0
      modelValue.value = null
      modelVisible.value = true
    }

    const editCate = record => {
      modelType.value = 1
      modelValue.value = record
      modelVisible.value = true
    }

    const delCate = (record, index) => {
      Modal.confirm({
        title: () => '确定删除该分类吗?',
        icon: () => h(ExclamationCircleOutlined),
        content: () => h('div', { style: 'color:red;' }, '删除后不可恢复'),
        async onOk() {
          const res = await Api.deleteCate({
            id: record.id
          })
          if (res.code == 200) {
            message.success('删除成功')
            if (modelRef.value.page > 1) {
              let temp = index % modelRef.value.pageSize
              if (temp == 0) modelRef.value.page -= 1
            }
            getCateList()
          } else {
            message.error(res.msg)
          }
        },
        okText: () => '确定',
        cancelText: () => '取消',
        onCancel() {},
        class: 'test'
      })
    }

    const refresh = () => {
      getCateList()
    }

    return {
      columns,
      tableData,
      modelRef,
      modelVisible,
      modelType,
      modelValue,

      //action
      pageChange,
      showSizeChange,
      search,
      editCate,
      delCate,
      addCate,
      refresh
    }
  }
})
</script>

<style lang="scss" scoped>
.cate-container {
  padding: 16px;

  .action {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .update {
      cursor: pointer;
      margin-right: 16px;
      &:hover {
        color: #4d88ff;
        .editIcon {
          color: #4d88ff;
        }
      }
    }
    .delete {
      cursor: pointer;
      &:hover {
        color: #f72121;
        .delIcon {
          color: #f72121;
        }
      }
    }
  }
}
</style>
