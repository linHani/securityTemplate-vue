<!--
 * @Description: 线路管理
 * @Author: zhaoqi
 * @Date: 2024-12-07 16:55:12
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-08 16:31:56
-->
<template>
  <div class="container">
    <el-form
      ref="queryForm"
      :model="search"
      label-width="100px"
    >
      <el-row class="search">
        <el-col :span="6">
          <el-form-item label="景点名称">
            <el-input
              v-model="search.name"
              size="small"
              clearable
              placeholder="请输入景点名称"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="酒店类型">
            <el-input
              v-model="search.type"
              size="small"
              placeholder="请输入酒店类型"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话">
            <el-input
              v-model="search.tel"
              size="small"
              placeholder="请输入联系电话"
            />
          </el-form-item>
        </el-col> -->
        <el-col :span="18" class="opreat-btn">
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="query()"
            >查询</el-button>
            <el-button
              size="small"
              @click="resetQuery"
            >重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tableInfo">
      <div class="handle-button">
        <el-button
          type="primary"
          size="small"
          @click="showAddDialogFunction()"
        >新增</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        stripe
        :header-cell-style="{ background: 'rgb(240, 244, 250)' }"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="60"
          align="center"
        />
        <el-table-column
          v-for="(item, index) in tableList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <template #default="scope">
            <!-- <span v-if="item.type === 'date'">{{ formatTimestamp('yyyy-MM-dd hh:mm', scope.row[item.prop]) }}</span>
            <span v-else-if="item.type === 'status' && scope.row[item.prop]">
              <el-tag class="ml-2" :type="scope.row[item.prop] === 'enable' ? 'success' : 'danger'">{{ formatStatus(scope.row[item.prop]) }}</el-tag>
            </span> -->
            <span>{{ scope.row[item.prop] ? scope.row[item.prop] : '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200"
          align="center"
        >
          <template #default="scope">
            <div class="opreat-button">
              <el-link
                type="success"
                :underline="false"
                @click="handleDetail(scope.row)"
              >
                <el-icon>
                  <View />
                </el-icon>详情</el-link>
              <el-link
                type="primary"
                :underline="false"
                @click="handleClick(scope.row)"
              >
                <el-icon>
                  <Edit />
                </el-icon>修改</el-link>
              <el-link
                type="danger"
                :underline="false"
                @click="handleDelete(scope.row.id)"
              >
                <el-icon>
                  <DeleteFilled />
                </el-icon>删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging">
        <el-pagination
          :current-page="search.currentPage"
          :page-size="search.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :pager-count="5"
          :background="true"
          layout="total, sizes, prev, pager, next"
          :total="search.total"
          @size-change="handlePageSizeChange"
          @current-change="handlePageCurrentChange"
        />
      </div>
    </div>
    <!--新增页组件-->
    <el-dialog
      v-if="showAddDialog"
      :visible.sync="showAddDialog"
      title="新增景点"
      top="50px"
      center
      class="max-dialog"
    >
      <HotelAdd @onSubmit="closeAddDialogFunction()" />
    </el-dialog>
    <!--详情页组件-->
    <el-dialog
      v-if="showDetailDialog"
      :visible.sync="showDetailDialog"
      title="酒店住宿详情"
      destroy-on-close
    >
      <HotelDetail
        :parent-data="dialogObj"
        @onSubmit="closeDetailDialogFunction()"
      />
    </el-dialog>
    <!--编辑页组件-->
    <el-dialog
      v-if="showEditDialog"
      :visible.sync="showEditDialog"
      title="编辑酒店住宿"
      destroy-on-close
    >
      <HotelEdit
        :parent-data="dialogObj"
        @onSubmit="closeEditDialogFunction()"
      />
    </el-dialog>
  </div>
</template>

<script>
import service from '@/utils/request'
import HotelAdd from './components/hotelAdd.vue'
import HotelDetail from './components/hotelDetail.vue'
import HotelEdit from './components/hotelEdit.vue'
import { Message } from 'element-ui'

export default {
  components: { HotelAdd, HotelDetail, HotelEdit },
  data() {
    const baseUrl = process.env.VUE_APP_HTTP_LOCATION
    return {
      baseUrl: baseUrl,
      loading: false,
      search: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        name: '',
        sex: '',
        date: ''
      },
      tableList: [
        { prop: 'user', label: '名称' },
        { prop: 'userName', label: '价格' },
        { prop: 'sex', label: '简介', width: '100' },
        { prop: 'departmentDesc', label: '库存' },
        { prop: 'status', label: '状态', type: 'status', width: '100' },
        { prop: 'date', label: '创建时间', type: 'date' }
      ],
      tableData: [],
      dialogObj: { // 添加/修改弹窗
        title: '',
        handleType: '',
        dialogVisible: false,
        dataList: {}
      },
      showAddDialog: false,
      showDetailDialog: false,
      showEditDialog: false
    }
  },
  computed: {
    handleValue(value) {
      let val = value || ''
      val = val.replace(/[^\d]/g, '')
      return val
    }
  },
  created() {
    this.query()
  },
  methods: {
    query(flag) {
      if (flag) {
        this.search.currentPage = 1
        this.search.pageSize = 10
      }
      this.selectByPage()
    },
    formatTimestamp(format, timestamp) {
      // 边界条件处理：验证 timestamp 是否合法
      if (timestamp != null && (isNaN(timestamp) || timestamp < 0)) {
        throw new Error('时间戳格式错误！')
      }

      // 获取时间戳
      const date = new Date(timestamp || Date.now())

      // 获取年月日时分秒，优化 padZero 函数调用
      const year = date.getFullYear().toString().padStart(4, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hour = date.getHours().toString().padStart(2, '0')
      const minute = date.getMinutes().toString().padStart(2, '0')
      const second = date.getSeconds().toString().padStart(2, '0')

      // 整理格式，优化可维护性
      const formDate = {
        'yyyy': `${year}`,
        'yyyy-MM': `${year}-${month}`,
        'yyyy-MM-dd': `${year}-${month}-${day}`,
        'yyyy-MM-dd hh': `${year}-${month}-${day} ${hour}`,
        'yyyy-MM-dd hh:mm': `${year}-${month}-${day} ${hour}:${minute}`,
        'yyyy-MM-dd hh:mm:ss': `${year}-${month}-${day} ${hour}:${minute}:${second}`,
        'MM-dd hh:mm': `${month}-${day} ${hour}:${minute}`,
        'MM-dd hh:mm:ss': `${month}-${day} ${hour}:${minute}:${second}`
      }

      // 异常处理：确保 format 是有效的
      if (!Object.prototype.hasOwnProperty.call(formDate, format)) {
        throw new Error(`时间格式错误！: ${format}`)
      }

      return formDate[format]
    },
    resetQuery() {
      this.search = {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        name: '',
        sex: '',
        date: ''
      }
      this.tableData = []
    },
    selectByPage() {
      this.loading = true
      this.tableData = []
      this.search.total = 0
      service.post('/hotel/selectByPage', this.search.currentPage).then(res => {
        this.loading = false
        if (res.data) {
          this.tableData = res.data.data || []
          this.search.currentPage = res.data.pages
          this.search.total = res.data.totalCount
        }
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
        service.get('/hotel/delete?id=' + row.id).then(res => {
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
      this.search.size = val
      this.query()
    },
    handlePageCurrentChange(val) {
      this.search.current = val
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
      // this.dialogObj = { ...row }
      this.showDetailDialog = true
    },
    closeDetailDialogFunction() {
      this.showDetailDialog = false
    },
    showEditDialogFunction(row) {
      // this.dialogObj = { ...row }
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
@import '~@/styles/table.scss';
.container {
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
}
</style>
