<!--
 * @Description: 后台通用页面
 * @Author: zhaoqi
 * @Date: 2024-12-07 16:55:12
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-14 10:43:20
-->
<template>
  <div class="container">
    <div v-if="routePath !== '/carouselImageList' && routePath !== '/my-order' && routePath !== '/refund-order'" class="search-pageNum">
      <div
        v-for="item in typeList"
        :key="item.value"
        class="item"
        :style="{ background: params.type === item.value ? '#444a50' : '' }"
        @click="handleSelect(item)"
      >{{ item.label }}</div>
    </div>
    <div class="main" :style="{width: routePath === '/carouselImageList' || routePath === '/my-order' || routePath === '/refund-order' ? '100%' : '85%'}">
      <el-form
        ref="queryForm"
        :model="params"
        label-width="100px"
      >
        <el-row class="search">
          <el-col v-if="routePath === '/place-interest' || routePath === '/hotelList'" :span="8">
            <el-form-item label="酒店名称" prop="name">
              <el-input
                v-model="params.name"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="routePath === '/information'" :span="8">
            <el-form-item :label="`攻略标题`" prop="title">
              <el-input
                v-model="params.title"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col v-if="routePath === '/place-interest' || routePath === '/itinerary' || routePath === '/hotelList' || routePath === '/information'" :span="8">
            <el-form-item :label="`${titleObj[routePath]}类型`" prop="type">
              <el-input
                v-model="params.type"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col> -->
          <el-col v-if="routePath === '/place-interest'" :span="8">
            <el-form-item label="景点等级" prop="level">
              <el-input
                v-model="params.level"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="routePath === '/hotelList'" :span="8">
            <el-form-item label="联系电话" prop="tel">
              <el-input
                v-model="params.tel"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="routePath === '/my-order' || routePath === '/refund-order'" :span="8">
            <el-form-item label="订单编号" prop="orderCode">
              <el-input
                v-model="params.orderCode"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="routePath === '/my-order' || routePath === '/refund-order'" :span="8">
            <el-form-item label="订单状态" prop="status">
              <el-input
                v-model="params.status"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人">
              <el-input
                v-model="params.createBy"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="更新人">
              <el-input
                v-model="params.updateBy"
                size="small"
                clearable
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <div class="opreat-btn">
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                @click="getList(true)"
              >查询</el-button>
              <el-button
                size="small"
                @click="resetQuery"
              >重置</el-button>
            </el-form-item>
          </div>
        </el-row>
      </el-form>
      <div class="tableInfo">
        <div v-if="routePath !== '/my-order' && routePath !== '/refund-order' && routePath !== '/comment'" class="handle-button">
          <el-button
            type="primary"
            size="small"
            @click="handleClick({})"
          >新增</el-button>
        </div>
        <el-table
          :data="tableData"
          border
          stripe
          element-loading-text="表格数据加载中..."
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
            v-for="(item, index) in tableList[routePath]"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width ? item.width : '200'"
            align="center"
          >
            <template #default="scope">
              <div v-if="item.type === 'img'">
                <el-image
                  :src="baseUrl + scope.row[item.prop]"
                  :preview-src-list="[baseUrl + scope.row[item.prop]]"
                  style="width: 50px; height: 50px"
                />
              </div>
              <span v-else-if="item.type === 'money'">{{ scope.row[item.prop]/100 }}元</span>
              <span v-else-if="item.type === 'textarea'" :title="scope.row[item.prop]" class="ellipsis">{{ scope.row[item.prop] }}</span>
              <div v-else-if="item.type === 'arr'">
                <div v-for="x in scope.row[item.prop]" :key="x.index">{{ x.remark }}</div>
              </div>
              <span v-else>{{ scope.row[item.prop] ? scope.row[item.prop] : '--' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="routePath !== '/refund-order'"
            label="操作"
            fixed="right"
            align="center"
            width="200"
          >
            <template #default="scope">
              <div v-if="routePath === '/my-order'" class="opreat-button">
                <el-button v-if="scope.row.status === '已支付'" type="primary" size="mini" @click="hanldeOpreate('send', scope.row)">发货</el-button>
                <el-button v-if="scope.row.status === '退单审核中'" type="info" size="mini" @click="hanldeOpreate('inward', scope.row)">同意退货</el-button>
              </div>
              <div v-else-if="routePath === '/comment'" class="opreat-button">
                <el-button v-if="!scope.row.children" type="primary" size="mini" @click="handleComment(scope.row)">回复</el-button>
                <el-button type="danger" size="mini" @click="handleComment(scope.row)">删除</el-button>
              </div>
              <div v-else class="opreat-button">
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
                  @click="handleDelete(scope.row)"
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
            :current-page="params.pageNum"
            :page-size="params.pageSize"
            :page-sizes="[5, 20, 50, 100]"
            :total="totalCount"
            :pager-count="5"
            :background="true"
            layout="total, sizes, prev, pager, next"
            @size-change="handlePageSizeChange"
            @current-change="handlePageCurrentChange"
          />
        </div>
      </div>
    </div>
    <!--新增页组件-->
    <Dialog :dialog="dialogObj" />
    <!--详情页组件-->
    <Detail :dialog="detailObj" />
    <el-dialog
      title="评论回复"
      :visible.sync="commentDialogObj.visible"
      :destroy-on-close="true"
      :close-on-click-modal="false"
    >
      <el-form :model="commentForm" :rules="rules">
        <el-form-item label="回复" prop="remark" label-width="120">
          <el-input v-model="commentForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" maxlength="200" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="commentDialogObj.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleRelease()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import service from '@/utils/request'
import Dialog from './components/Dialog.vue'
import Detail from './components/Detail.vue'
import { Message } from 'element-ui'

export default {
  components: { Dialog, Detail },
  data() {
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION,
      routePath: '',
      loading: false,
      apiObj: {
        '/carouselImageList': '/carouselImage',
        '/place-interest': '/scenicSpot',
        '/itinerary': '/touristRoutes',
        '/hotelList': '/hotel',
        '/information': '/touristGuide',
        '/my-order': '/order',
        '/refund-order': '/order',
        '/comment': '/comment'
      },
      params: {
        pageNum: 1,
        pageSize: 10,
        createBy: '',
        updateBy: '',
        name: '',
        title: '',
        type: '',
        level: '',
        tel: '',
        orderCode: '',
        status: ''
      },
      typeList: [
        { label: '全部', value: 'all' }
      ], // 类型数据
      totalCount: 0,
      tableList: {
        '/carouselImageList': [
          { prop: 'url', label: '轮播图', type: 'img' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/place-interest': [
          { prop: 'name', label: '景点名称', width: '200' },
          { prop: 'type', label: '景点类型', width: '200' },
          { prop: 'image', label: '景点图片', type: 'img' },
          { prop: 'level', label: '景点等级' },
          { prop: 'location', label: '景点地址', width: '200' },
          { prop: 'price', label: '门票价格', type: 'money' },
          { prop: 'stock', label: '门票库存' },
          { prop: 'openTime', label: '开放时间', width: '200' },
          { prop: 'precautions', label: '注意事项', type: 'textarea', width: '200' },
          { prop: 'trafficGuide', label: '交通指南', type: 'textarea', width: '200' },
          { prop: 'introduce', label: '景点介绍', type: 'textarea' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/itinerary': [
          { prop: 'name', label: '景点名称', width: '200' },
          { prop: 'image', label: '图片', type: 'img' },
          { prop: 'type', label: '旅游线路类型', width: '200' },
          { prop: 'beginSpot', label: '旅游出发地', width: '200' },
          { prop: 'waySpot', label: '旅游路线途径', width: '200' },
          { prop: 'endSpot', label: '旅游路线目的地', width: '200' },
          { prop: 'traffic', label: '旅游交通方式', width: '200' },
          { prop: 'introduce', label: '旅游线路介绍', width: '300', type: 'textarea' },
          { prop: 'startTime', label: '旅游出发时间', width: '200' },
          { prop: 'price', label: '门票价格', type: 'money' },
          { prop: 'stock', label: '门票库存' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/hotelList': [
          { prop: 'name', label: '酒店名称', width: '200' },
          { prop: 'image', label: '行程图片', type: 'img' },
          { prop: 'type', label: '酒店类型' },
          { prop: 'tel', label: '联系电话', width: '200' },
          { prop: 'url', label: '酒店网址' },
          { prop: 'location', label: '酒店地址', width: '200' },
          { prop: 'introduce', label: '酒店介绍', type: 'textarea' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/information': [
          { prop: 'title', label: '攻略标题', width: '200' },
          { prop: 'image', label: '行程图片', type: 'img' },
          { prop: 'type', label: '攻略类型', type: 'money' },
          { prop: 'context', label: '攻略内容', width: '300', type: 'textarea' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/my-order': [
          { prop: 'realName', label: '联系人姓名', width: '200' },
          { prop: 'tel', label: '联系方式', width: '200' },
          { prop: 'type', label: '订单类型' },
          { prop: 'status', label: '订单状态' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/refund-order': [
          { prop: 'name', label: '名称', width: '200' },
          { prop: 'image', label: '图片', type: 'img' },
          { prop: 'type', label: '退单类型' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ],
        '/comment': [
          { prop: 'remark', label: '评论内容', width: '300' },
          { prop: 'type', label: '评论类型' },
          { prop: 'children', label: '评论回复', type: 'arr', width: '300' },
          { prop: 'createBy', label: '创建人', width: '200' },
          { prop: 'createTime', label: '创建时间', width: '200' },
          { prop: 'updateBy', label: '更新人', width: '200' },
          { prop: 'updateTime', label: '更新时间', width: '200' }
        ]
      }, // 表头
      commentDialogObj: {
        title: '评论回复',
        visible: false,
        dataList: {}
      }, // 回复弹窗
      commentForm: {
        id: '',
        businessId: '',
        remark: ''
      }, // 评论表单
      rules: {
        remark: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
      },
      tableData: [],
      detailObj: {
        title: '',
        visible: false,
        detailList: [],
        dataList: {}
      }, // 详情弹窗
      dialogObj: {
        title: '',
        handleType: '',
        visible: false,
        dataList: {}
      }, // 添加/修改弹窗
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
    this.routePath = this.$route.path
    console.log('this.routePath: ', this.routePath)
    this.getData()
    this.getList(true)
  },
  methods: {
    // 获取类型数据
    getData() {
      this.typeList = [
        { label: '全部', value: '' }
      ]
      if (this.routePath !== '/my-order' && this.routePath !== '/refund-order' && this.routePath !== '/comment' && this.routePath !== '/carouselImageList') {
        this.loading = true
        service.post(`${this.apiObj[this.routePath]}/selectTypeList`).then(res => {
          if (res.code === 200) {
            res.data.forEach(item => {
              this.typeList.push({
                label: item,
                value: item
              })
            })
          }
          this.loading = false
        }).catch(error => {
          console.log('error: ', error)
          this.loading = false
        })
      } else if (this.routePath === '/comment') {
        this.typeList = [
          { label: '景点门票', value: '景点门票' },
          { label: '旅游线路', value: '旅游线路' },
          { label: '酒店住宿', value: '酒店住宿' },
          { label: '旅游攻略', value: '旅游攻略' }
        ]
        this.params.type = '景点门票'
      }
    },
    // 查询
    getList(flag) {
      flag = flag || false
      if (flag) {
        this.params.pageNum = 1
        this.params.pageSize = 5
      }
      this.loading = true
      this.tableData = []
      let params = {}
      let api = ``
      if (this.routePath === '/my-order') {
        api = `${this.apiObj[this.routePath]}/selectRealByPage`
        params = { ...this.params, userSelect: false }
      } else if (this.routePath === '/refund-order') {
        api = `${this.apiObj[this.routePath]}/selectBackByPage`
        params = { ...this.params, userSelect: false }
      } else {
        api = `${this.apiObj[this.routePath]}/selectByPage`
        params = { ...this.params }
      }
      service.post(api, params).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.tableData = res.data.data || []
          this.totalCount = res.data.totalCount
          // this.totalCount = 30
        }
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    // 重置
    resetQuery() {
      this.params = {
        pageNum: 1,
        pageSize: 5,
        name: ''
      }
      this.totalCount = 0
      this.tableData = []
    },
    // 类型筛选
    handleSelect(data) {
      this.params.type = data.value
      this.getList(true)
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get(`${this.apiObj[this.routePath]}/delete?id=` + row.id).then(res => {
          if (res.status === 'ok') {
            Message.success('删除成功')
          }
          this.getList(true)
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    },
    // 发货/退货
    hanldeOpreate(type, row) {
      let api = ''
      let message = ''
      if (type === 'send') {
        message = '确定发货吗？'
        api = `/order/changeStatusComplete/?id=${row.id}`
      } else {
        message = '确定同意退货吗？'
        api = `/order/changeStatusBack/?id=${row.id}`
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get(api).then(res => {
          if (res.status === 'ok') {
            Message.success(res.message)
          }
          this.getList(true)
        }).catch(error => {
          console.log('error: ', error)
          this.loading = false
        })
      })
    },
    // 回复弹窗
    handleComment(row) {
      this.commentDialogObj.businessId = row.businessId
      this.commentDialogObj.id = row.id
      this.commentDialogObj.visible = true
    },
    // 发表评论
    handleRelease() {
      if (this.commentForm.remark.trim() === '') {
        this.$message({
          type: 'error',
          message: '评论内容不能为空'
        })
        return
      }
      const params = {
        businessId: this.commentDialogObj.businessId,
        parentId: this.commentDialogObj.id,
        type: this.typeList[this.routhPath],
        remark: this.commentForm.remark
      }
      this.loading = true
      service.post(`/comment/save`, params).then(res => {
        if (res.code === 200) {
          this.getList(true)
          this.commentDialogObj.visible = false
          this.$message({
            type: 'success',
            message: res.message
          })
          this.loading = false
        }
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    // 条数
    handlePageSizeChange(val) {
      this.params.pageSize = val
      this.getList()
    },
    // 分页
    handlePageCurrentChange(val) {
      this.params.pageNum = val
      this.getList()
    },
    // 新增/修改
    handleClick(row) {
      if (JSON.stringify(row) === '{}') {
        this.dialogObj.title = '添加'
        this.dialogObj.handleType = 'add'
      } else {
        this.dialogObj.title = '修改'
        this.dialogObj.handleType = 'edit'
        this.dialogObj.dataList = row
      }
      this.dialogObj.routePath = this.routePath
      this.dialogObj.visible = true
      console.log('this.dialogObj: ', this.dialogObj)
    },
    // 详情
    handleDetail(row) {
      this.detailObj.title = '详情'
      this.detailObj.dataList = row
      this.detailObj.detailList = this.tableList[this.routePath]
      this.detailObj.visible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/table.scss';
.container {
  width: 100%;
  height: calc(100% - 50px);
  display: flex;
  padding: 20px;
  .search-pageNum {
    flex: 1;
    height: 100%;
    padding-top: 10px;
    .item {
      width: 80%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-bottom: 10px;
      background: #654b3c;
      color: #fff;
      &:hover {
        cursor: pointer;
        background: #444a50;
      }
    }
  }
  .main {
    width: 85%;
  }
}
</style>
