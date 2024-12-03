<template>
  <div class="container">
    <div class="filter-box">
      <el-form ref="queryForm" :model="params" label-width="100px" class="clearfix">
        <el-row>
          <el-col :span="8">
            <el-form-item label="景点名称">
              <el-input v-model="params.name" placeholder="请输入景点名称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="景点类型">
              <el-input v-model="params.type" placeholder="请输入景点类型" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="景点等级">
              <el-input v-model="params.level" placeholder="请输入景点等级" />
            </el-form-item>
          </el-col>
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
              <label>用户列表</label>
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
          prop="image"
          label="景点图片"
          show-overflow-tooltip
          align="center"
        >
          <template #default="scope">
            <img :src="baseUrl + scope.row.image" alt="头像" style="width: 50px; height: 50px;">
          </template>
        </el-table-column>
        <el-table-column
          min-width="10%"
          prop="name"
          label="景点名称"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="type"
          label="景点类型"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="sex"
          label="性别"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="level"
          label="景点等级"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="location"
          label="景点地址"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="price"
          label="门票价格"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="stock"
          label="门票库存"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="openTime"
          label="开放时间"
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
          prop="precautions"
          label="注意事项"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="trafficGuide"
          label="交通指南"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          min-width="10%"
          prop="introduce"
          label="景点介绍"
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
      title="新增景点门票"
      destroy-on-close
    >
      <ScenicSpotAdd @onSubmit="closeAddDialogFunction()" />
    </el-dialog>
    <!--详情页组件-->
    <el-dialog
      v-if="showDetailDialog"
      :visible.sync="showDetailDialog"
      title="景点门票详情"
      destroy-on-close
    >
      <ScenicSpotDetail :parent-data="data" @onSubmit="closeDetailDialogFunction()" />
    </el-dialog>
    <!--编辑页组件-->
    <el-dialog
      v-if="showEditDialog"
      :visible.sync="showEditDialog"
      title="编辑景点门票"
      destroy-on-close
    >
      <ScenicSpotEdit :parent-data="data" @onSubmit="closeEditDialogFunction()" />
    </el-dialog>
  </div>
</template>

<script>
import service from '@/utils/request'
import ScenicSpotAdd from '@/views/scenicSpot/components/scenicSpotAdd.vue'
import ScenicSpotDetail from '@/views/scenicSpot/components/scenicSpotDetail.vue'
import ScenicSpotEdit from '@/views/scenicSpot/components/scenicSpotEdit.vue'

import { Message } from 'element-ui'

export default {
  components: { ScenicSpotAdd, ScenicSpotDetail, ScenicSpotEdit },
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
      service.post('/scenicSpot/selectByPage', this.params).then(res => {
        this.dataList = res.data.content
        this.page.pages = res.data.page.totalPages
        this.page.totalCount = res.data.page.totalElements
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onDelete(row) {
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get('/scenicSpot/delete?id=' + row.id).then(res => {
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
      this.query()
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
