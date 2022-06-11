<template>
  <div class="article-container">
    <div style="margin-bottom: 20px">
      <a-input-search
        placeholder="请输入文章标题进行搜索"
        style="width: 300px"
        v-model:value="modelRef.searchName"
        @search="search"
      />
      <a-button style="margin-left: 20px" type="primary" @click="addArticle"
        >添加</a-button
      >
    </div>

    <a-table :columns="columns" :dataSource="tableData" :pagination="false">
      <template #index="{ index }">
        {{ ++index }}
      </template>
      <template #action="{ record, index }">
        <div class="action">
          <div class="update" @click="updateArticle(record)"
            ><EditOutlined class="editIcon" /> 修改</div
          >
          <div class="delete" @click="delAtricle(record, index)"
            ><DeleteOutlined class="delIcon" /> 删除</div
          >
        </div>
      </template>
      <template #title="{ record }">
        <div>
          {{
            record?.title.length > 10
              ? record?.title.slice(0, 10) + '...'
              : record?.title
          }}
        </div>
      </template>
      <template #desc="{ record }">
        <div>
          {{
            record?.desc.length > 12
              ? record?.desc.slice(0, 12) + '...'
              : record?.desc
          }}
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

  <MyEditor
    v-model:visible="visible"
    v-if="visible"
    @refresh="refresh"
    :defaultValue="articleValue"
    :modalType="modalType"
  ></MyEditor>
</template>

<script>
import { computed, defineComponent, ref, h } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import MyEditor from '@/components/myEditor/index.vue'
import Api from '@/api/index.js'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import Store from '@/store'
export default defineComponent({
  name: 'blog-article',
  components: {
    Pagination,
    MyEditor,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
  },
  setup() {
    const columns = [
      {
        title: '文章id',
        dataIndex: 'id',
        width: '10%',
        slots: { customRender: 'index' }
      },
      {
        title: '标题',
        dataIndex: 'title',
        ellipsis: true,
        slots: { customRender: 'title' }
      },
      {
        title: '摘要',
        dataIndex: 'desc',
        width: '20%',
        slots: { customRender: 'desc' }
      },
      {
        title: '所属分类',
        dataIndex: 'cateName',
        width: '15%'
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: '20%'
      },
      {
        title: '操作',
        slots: { customRender: 'action' },
        width: '15%'
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
    const getArticleList = async () => {
      const res = await Api.getArticleList({
        page: modelRef.value.page,
        pageSize: modelRef.value.pageSize,
        title: modelRef.value.searchName
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
    getArticleList()

    const pageChange = page => {
      modelRef.value.page = page
      getArticleList()
    }

    const showSizeChange = (current, pageSize) => {
      modelRef.value.page = 1
      modelRef.value.pageSize = pageSize
      getArticleList()
    }

    const search = () => {
      modelRef.value.page = 1
      getArticleList()
    }

    const visible = ref(false)
    const articleValue = ref({})
    const modalType = ref(0)

    const addArticle = () => {
      modalType.value = 0
      articleValue.value = null
      visible.value = true
    }

    const updateArticle = record => {
      modalType.value = 1
      articleValue.value = record
      visible.value = true
    }

    const delAtricle = (record, index) => {
      Modal.confirm({
        title: () => '确定删除该分类吗?',
        icon: () => h(ExclamationCircleOutlined),
        content: () => h('div', { style: 'color:red;' }, '删除后不可恢复'),
        async onOk() {
          const res = await Api.deleteArticle({
            id: record.id
          })
          if (res.code == 200) {
            message.success('删除成功')
            if (modelRef.value.page > 1) {
              let temp = index % modelRef.value.pageSize
              if (temp == 0) modelRef.value.page -= 1
            }
            getArticleList()
          } else {
            message.error(res.msg)
          }
        },
        okText: () => '确定',
        cancelText: () => '取消',
        onCancel() {}
      })
    }

    const refresh = () => {
      getArticleList()
    }
    return {
      columns,
      tableData,
      modelRef,
      visible,
      articleValue,
      modalType,

      //action
      pageChange,
      showSizeChange,
      search,
      addArticle,
      refresh,
      delAtricle,
      updateArticle
    }
  }
})
</script>

<style lang="scss" scoped>
.article-container {
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
