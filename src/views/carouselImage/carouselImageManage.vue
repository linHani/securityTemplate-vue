<template>
  <div class="container">
    <div class="filter-box">
      <el-form ref="queryForm" :model="params" label-width="100px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input v-model="params.createBy" placeholder="请输入创建人" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新人">
              <el-input v-model="params.updateBy" placeholder="请输入更新人" />
            </el-form-item>
          </el-col>
          <el-col :span="8" />
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="flex-right">
              <el-button type="primary" @click="query()">查询</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="pagination-box">
      <div>
        <el-row type="flex" justify="space-between" align="middle">
          <el-col>
            <div>
              <label>轮播图列表</label>
              <p>共有<span>{{ page.totalCount }}</span>条查询结果</p>
            </div>
          </el-col>
          <el-col>
            <div class="button-group">
              <el-button @click="showAddDialogFunction()">新增</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--表格数据-->
      <el-table
        v-loading="loading"
        element-loading-text="表格数据加载中..."
        :data="dataList"
        border="border"
        row-key="id"
        default-expand-all
      >
        <el-table-column
          min-width="10%"
          prop="url"
          label="轮播图"
          show-overflow-tooltip
          align="center"
        >
          <template #default="scope">
            <img :src="baseUrl + scope.row.url" alt="轮播图" style="width: 50px; height: 50px;">
          </template>
        </el-table-column>
        <el-table-column
          min-width="10%"
          prop="createBy"
          label="创建人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="updateBy"
          label="更新人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="updateTime"
          label="更新时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="15%"
          show-overflow-tooltip
          align="center"
          label="操作"
        >
          <template v-slot="scope">
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="showDetailDialogFunction(scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="showEditDialogFunction(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              style=" margin-left: 8px"
              @click="onDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页条-->
      <el-pagination
        popper-class="mod-pagination-select"
        layout="slot, total, sizes, prev, pager, next, jumper"
        :current-page="page.current"
        :page-sizes="[5, 10, 20, 50, 100, 200]"
        :page-size="page.size"
        :total="page.totalCount"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
      >
        <span key="1">
          当前第 {{ page.current }}/{{ page.pages }} 页
        </span>
      </el-pagination>
    </div>
    <!--新增页组件-->
    <el-dialog
      v-if="showAddDialog"
      :visible.sync="showAddDialog"
      title="新增轮播图"
      destroy-on-close
    >
      <CarouselImageAdd @onSubmit="closeAddDialogFunction()" />
    </el-dialog>
    <!--详情页组件-->
    <el-dialog
      v-if="showDetailDialog"
      :visible.sync="showDetailDialog"
      title="轮播图详情"
      destroy-on-close
    >
      <CarouselImageDetail :parent-data="data" @onSubmit="closeDetailDialogFunction()" />
    </el-dialog>
    <!--编辑页组件-->
    <el-dialog
      v-if="showEditDialog"
      :visible.sync="showEditDialog"
      title="编辑轮播图"
      destroy-on-close
    >
      <CarouselImageEdit :parent-data="data" @onSubmit="closeEditDialogFunction()" />
    </el-dialog>
  </div>
</template>

<script>
import service from '@/utils/request'
import CarouselImageAdd from '@/views/carouselImage/components/carouselImageAdd.vue'
import CarouselImageDetail from '@/views/carouselImage/components/carouselImageDetail.vue'
import CarouselImageEdit from '@/views/carouselImage/components/carouselImageEdit.vue'
import { Message } from 'element-ui'

export default {
  components: { CarouselImageAdd, CarouselImageDetail, CarouselImageEdit },
  data() {
    const baseUrl = process.env.VUE_APP_HTTP_LOCATION
    return {
      baseUrl: baseUrl,
      params: {},
      loading: false,
      dataList: [],
      page: {
        current: 1,
        size: 5,
        totalCount: 1,
        pages: 0
      },
      data: {},
      showAddDialog: false,
      showDetailDialog: false,
      showEditDialog: false
    }
  },
  computed: {},
  created() {
    this.query()
  },
  methods: {
    query() {
      this.page.current = 1
      this.selectByPage()
    },
    resetQuery() {
      this.params = {}
    },
    selectByPage() {
      this.loading = true
      this.params.pageNum = this.page.current
      this.params.pageSize = this.page.size
      service.post('/carouselImage/selectByPage', this.params).then(res => {
        this.dataList = res.data.data
        this.page.pages = res.data.pages
        this.page.totalCount = res.data.totalCount
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onDelete(row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get('/carouselImage/delete?id=' + row.id).then(res => {
          if (res.status === 'ok') {
            Message.success('删除成功')
          }
          this.query()
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    },
    handlePageSizeChange(val) {
      this.page.size = val
      this.query()
    },
    handlePageCurrentChange(val) {
      this.page.current = val
      this.selectByPage()
    },
    showAddDialogFunction() {
      this.showAddDialog = true
    },
    closeAddDialogFunction() {
      this.showAddDialog = false
      this.query()
    },
    showDetailDialogFunction(row) {
      this.data = { ...row }
      this.showDetailDialog = true
    },
    closeDetailDialogFunction() {
      this.showDetailDialog = false
    },
    showEditDialogFunction(row) {
      this.data = { ...row }
      this.showEditDialog = true
    },
    closeEditDialogFunction() {
      this.showEditDialog = false
      this.query()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
