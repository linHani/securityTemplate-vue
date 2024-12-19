<!--
 * @Description: 卡片列表通用页面
 * @Author: zhaoqi
 * @Date: 2024-12-04 22:29:59
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-19 17:18:39
-->
<template>
  <div>
    <HeaderRoute :path="routePath" />
    <div class="list">
      <div
        v-if="routePath !== '/home' && routePath !== '/reserve' && routePath !== '/refund'"
        class="search-pageNum"
      >
        <div
          v-for="item in typeList"
          :key="item.value"
          class="item"
          :style="{ background: params.type === item.value ? '#444a50' : '' }"
          @click="handleSelect(item)"
        >{{ item.label }}</div>
      </div>
      <div class="card-container">
        <div v-if="routePath === '/reserve' || routePath === '/refund'" class="line-list">
          <el-descriptions v-for="(item, idx) in cardList" :key="idx" :column="3" :colon="false">
            <div slot="title" class="title">
              <span>{{ item.type }}</span>
              <div>
                <el-button v-if="item.status === '未支付'" size="mini" type="primary" @click="handleOpreate('pay', item)">支付订单</el-button>
                <el-button v-if="item.status === '未支付' || item.status === '已支付'" size="mini" type="info" @click="handleOpreate('back', item)">申请退单</el-button>
              </div>
            </div>
            <el-descriptions-item label="联系人姓名：">{{ item.realName }}</el-descriptions-item>
            <el-descriptions-item label="联系电话：">{{ item.tel }}</el-descriptions-item>
            <el-descriptions-item label="数量：">{{ item.num }}</el-descriptions-item>
            <el-descriptions-item label="单价：">{{ item.unitPrice / 100 }}元</el-descriptions-item>
            <el-descriptions-item label="总价：">{{ item.totalPrice / 100 }}元</el-descriptions-item>
            <el-descriptions-item label="订单状态：">
              <el-link type="primary" :underline="false">{{ item.status }}</el-link>
            </el-descriptions-item>
            <el-descriptions-item :span="3" label="订单编号：">{{ item.orderCode }}</el-descriptions-item>
            <el-descriptions-item v-if="item.status === '已完成'" :span="3" class="test111">
              <div class="publish">
                <el-input
                  v-model="item.comment"
                  type="textarea"
                  maxlength="200"
                  show-word-limit
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入评论内容"
                  style="width: 94vw;margin-left: -10px"
                />
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  style="margin: 10px 0;float: right;"
                  @click="handleRelease('comment', item, idx)"
                >评论</el-button>
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div v-else-if="routePath === '/remark'" class="line-list">
          <el-collapse v-if="cardList.length" v-model="activeNames" class="infinite-list" @change="handleChange">
            <el-collapse-item v-for="(item, idx) in cardList" :key="idx" :name="idx + 1">
              <template slot="title">
                <div class="comment">
                  <h3>{{ item.type }}</h3>
                  <div class="comment-content">
                    <span>{{ item.createBy }}：</span>
                    <span class="text">{{ item.remark }}</span>
                  </div>
                  <div class="date">
                    <span>{{ item.createTime }}</span>
                    <el-link type="primary" size="mini" style="margin-left: 10px" @click.stop.prevent="handleInput(idx)">{{ item.isShowInput ? '取消' : '回复' }}</el-link>
                  </div>
                  <div v-if="item.isShowInput" class="comment-input">
                    <el-input v-model="item.reply" size="mini" @click.stop.prevent.native @keyup.enter.stop.prevent.native @keyup.space.stop.prevent.native />
                    <el-link type="primary" size="mini" style="margin-left: 10px;white-space: nowrap;" @click.stop.prevent="handleRelease('reply', item, idx)">评论</el-link>
                  </div>
                </div>
              </template>
              <div v-for="x in item.children" :key="x.index" class="reply-text">
                <div class="comment-content">
                  <span>{{ x.createBy }}：</span>
                  <span class="text">{{ x.remark }}</span>
                </div>
                <div class="date">{{ x.createTime }}</div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div v-else class="card-list">
          <div
            v-for="item in cardList"
            :key="item.index"
            class="card-item"
          >
            <el-image
              :src="baseUrl + item.image"
              :preview-src-list="[baseUrl + item.image]"
              class="card-img"
            />
            <p class="place">{{ routePath === '/consult' || params.type === '/consult' ? item.title : item.name }}</p>
            <div class="description">
              <span>{{ routePath === '/reserve' ? item.remark : item.introduce }}</span>
            </div>
            <div class="opreate">
              <div class="btn">
                <el-button
                  v-if="isReserve"
                  type="danger"
                  size="mini"
                  @click="handleClick(item)"
                >预约</el-button>
                <el-link
                  type="primary"
                  size="mini"
                  @click="hanldeDetail(item)"
                >查看详情</el-link>
              </div>
              <div class="collection">
                <i class="el-icon-star-off icon">{{ item.collectCount }}</i>
                <i class="el-icon-time icon">{{ item.createTime }}</i>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="cardList.length === 0"
          class="empty"
        >
          <svg
            viewBox="0 0 79 86"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <linearGradient
                id="linearGradient-1-1"
                x1="38.8503086%"
                y1="0%"
                x2="61.1496914%"
                y2="100%"
              >
                <stop
                  stop-color="#FCFCFD"
                  offset="0%"
                />
                <stop
                  stop-color="#EEEFF3"
                  offset="100%"
                />
              </linearGradient>
              <linearGradient
                id="linearGradient-2-1"
                x1="0%"
                y1="9.5%"
                x2="100%"
                y2="90.5%"
              >
                <stop
                  stop-color="#FCFCFD"
                  offset="0%"
                />
                <stop
                  stop-color="#E9EBEF"
                  offset="100%"
                />
              </linearGradient>
              <rect
                id="path-3-1"
                x="0"
                y="0"
                width="17"
                height="36"
              />
            </defs>
            <g
              id="Illustrations"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="B-pageNum"
                transform="translate(-1268.000000, -535.000000)"
              >
                <g
                  id="Group-2"
                  transform="translate(1268.000000, 535.000000)"
                >
                  <path
                    id="Oval-Copy-2"
                    d="M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z"
                    fill="#F7F8FC"
                  />
                  <polygon
                    id="Rectangle-Copy-14"
                    fill="#E5E7E9"
                    transform="translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) "
                    points="13 58 53 58 42 45 2 45"
                  />
                  <g
                    id="Group-Copy"
                    transform="translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)"
                  >
                    <polygon
                      id="Rectangle-Copy-10"
                      fill="#E5E7E9"
                      transform="translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) "
                      points="2.84078316e-14 3 18 3 23 7 5 7"
                    />
                    <polygon
                      id="Rectangle-Copy-11"
                      fill="#EDEEF2"
                      points="-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43"
                    />
                    <rect
                      id="Rectangle-Copy-12"
                      fill="url(#linearGradient-1-1)"
                      transform="translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) "
                      x="38"
                      y="7"
                      width="17"
                      height="36"
                    />
                    <polygon
                      id="Rectangle-Copy-13"
                      fill="#F8F9FB"
                      transform="translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) "
                      points="24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12"
                    />
                  </g>
                  <rect
                    id="Rectangle-Copy-15"
                    fill="url(#linearGradient-2-1)"
                    x="13"
                    y="45"
                    width="40"
                    height="36"
                  />
                  <g
                    id="Rectangle-Copy-17"
                    transform="translate(53.000000, 45.000000)"
                  >
                    <mask
                      id="mask-4-1"
                      fill="white"
                    >
                      <use xlink:href="#path-3-1" />
                    </mask>
                    <use
                      id="Mask"
                      fill="#E0E3E9"
                      transform="translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) "
                      xlink:href="#path-3-1"
                    />
                    <polygon
                      id="Rectangle-Copy"
                      fill="#D5D7DE"
                      mask="url(#mask-4-1)"
                      transform="translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) "
                      points="7 0 24 0 20 18 -1.70530257e-13 16"
                    />
                  </g>
                  <polygon
                    id="Rectangle-Copy-18"
                    fill="#F8F9FB"
                    transform="translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) "
                    points="62 45 79 45 70 58 53 58"
                  />
                </g>
              </g>
            </g>
          </svg>
          <p class="text">暂无数据</p>
        </div>
        <div class="paging">
          <el-pagination
            :current-page="params.pageNum"
            :page-size="params.pageSize"
            :page-sizes="[6, 18, 54, 96]"
            :background="true"
            layout="total, sizes, prev, pager, next"
            :total="totalCount"
            @size-change="handlePageSizeChange"
            @current-change="handlePageCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-image">
        <img src="@/assets/common/trophy1.png" alt="">
        <img src="@/assets/common/trophy2.png" alt="">
        <img src="@/assets/common/trophy3.png" alt="">
      </div>
      <div class="footer-info">
        <div class="description">
          <div class="subTitle">简介：</div>
          <p>{{ info.description }}</p>
        </div>
        <div class="contact">
          <div class="subTitle">联系我们：</div>
          <p v-for="item in info.contact" :key="item.index">
            <span>{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </p>
        </div>
      </div>
    </div>
    <Dialog :dialog="dialogObj" />
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
import service from '@/utils/request'
import Dialog from './components/index.vue'
export default {
  name: 'SceneryList',
  components: { HeaderRoute, Dialog },
  data() {
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION,
      routePath: '',
      isReserve: false,
      loading: false,
      type: '',
      totalCount: 0,
      params: {
        pageNum: 1,
        pageSize: 10,
        type: ''
      },
      typeList: [
        { label: '全部', value: 'all' }
      ],
      activeNames: [],
      cardList: [],
      info: {
        description: `系统角色上分为管理员以及普通用户进行实现，管理员主要负责整个网站后台的维护管理，例如包括用户管理，最点以及分类管理、旅游路线管理、酒店管理、资讯管理，轮播图管理，个人中心等功能;前台包括用户登陆注册、忘记密码，旅游景点查询和预定、旅游路线查询和收藏、酒店查询和预订、资讯、我的收藏、我的预定、个人中心等功能`,
        contact: [
          { label: '邮箱', value: 'example@mail.com' },
          { label: 'QQ', value: '1760272627' },
          { label: '微信', value: '1760272627' },
          { label: '微博', value: 'example@mail.com' },
          { label: '电话', value: '12345678998' }
        ]
      },
      dialogObj: {
        title: '',
        visible: false,
        dataList: {}
      }
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        this.initvalue()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 初始化值
    initvalue() {
      this.routePath = this.$route.path
      const showRoute = ['/home', '/scenic', '/travel']
      if (showRoute.includes(this.routePath)) {
        this.isReserve = true
      } else {
        this.isReserve = false
      }
      if (this.routePath !== '/collection' && this.routePath !== '/remark') {
        this.params.type = ''
        this.getData()
        this.getList(true)
      } else if (this.routePath === '/remark') {
        this.params.type = '景点门票'
        this.typeList = [
          { label: '景点门票', value: '景点门票' },
          { label: '旅游线路', value: '旅游线路' },
          { label: '酒店住宿', value: '酒店住宿' },
          { label: '旅游攻略', value: '旅游攻略' }
        ]
        this.getList(true)
      } else {
        this.params.type = '/scenic'
        this.typeList = [
          { label: '景点门票', value: '/scenic' },
          { label: '旅游线路', value: '/travel' },
          { label: '酒店住宿', value: '/tavern' },
          { label: '旅游攻略', value: '/consult' }
        ]
        this.getCollectionList('/scenic')
      }
    },
    // 获取类型数据
    getData() {
      const requestData = {
        '/scenic': '/scenicSpot/selectTypeList',
        '/tavern': '/hotel/selectTypeList',
        '/consult': '/touristGuide/selectTypeList',
        '/travel': '/touristRoutes/selectTypeList'
      }
      this.typeList = [
        { label: '全部', value: '' }
      ]
      if (requestData[this.routePath]) {
        this.loading = true
        service.post(requestData[this.routePath]).then(res => {
          if (res.data) {
            console.log('res.data: ', res.data)
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
      }
    },
    // 获取列表数据
    getList(flag) {
      if (flag) {
        this.params.pageNum = 1
        this.params.pageSize = 6
        this.totalCount = 0
      }
      this.cardList = []
      this.totalCount = 0

      const listApi = {
        '/home': '/scenicSpot/recommend',
        '/scenic': '/scenicSpot/selectByPage',
        '/travel': '/touristRoutes/selectByPage',
        '/tavern': '/hotel/selectByPage',
        '/consult': '/touristGuide/selectByPage',
        '/reserve': '/order/selectRealByPage',
        '/refund': '/order/selectBackByPage',
        '/remark': '/comment/selectByPage'
      }
      let params = {}
      if (this.routePath === '/reserve' || this.routePath === '/refund') {
        params = { ...this.params, userSelect: true }
        delete params.type
      } else {
        params = { ...this.params }
      }
      this.loading = true
      service.post(listApi[this.routePath], params).then(res => {
        this.cardList = res.data.data || []
        this.totalCount = res.data.totalCount || 0
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    // 获取收藏列表
    getCollectionList(type) {
      this.params.pageNum = 1
      this.params.pageSize = 6
      this.totalCount = 0
      const params = {
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize
      }
      const listApi = {
        '/scenic': '/scenicSpot/selectByPageCollect',
        '/travel': '/touristRoutes/selectByPageCollect',
        '/tavern': '/hotel/selectByPageCollect',
        '/consult': '/touristGuide/selectByPageCollect'
      }
      this.loading = true
      service.post(listApi[type], params).then(res => {
        this.cardList = res.data.data || []
        this.totalCount = res.data.totalCount || 0
        this.loading = false
        // this.$message({
        //   type: 'success',
        //   duration: 1000,
        //   message: res.message
        // })
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    // 选择类型
    handleSelect(data) {
      this.params.type = data.value
      if (this.routePath !== '/collection') {
        this.getList(true)
      } else {
        this.getCollectionList(data.value)
      }
    },
    // 点击预约
    handleClick(row) {
      this.dialogObj.title = '下单'
      this.dialogObj.routePath = this.$route.path
      this.dialogObj.dataList = row
      this.dialogObj.visible = true
    },
    // 查看详情
    hanldeDetail(item) {
      let path = ''
      const routeList = ['/scenic', '/travel', '/tavern', '/consult']
      if (routeList.includes(this.params.type)) {
        path = this.params.type
      } else {
        path = this.routePath
      }
      this.$router.push({
        path: '/detail',
        query: {
          data: JSON.stringify(item),
          path
        }
      })
    },
    // 分页
    handlePageSizeChange(val) {
      this.params.pageSize = val
      this.getList(true)
    },
    // 条数
    handlePageCurrentChange(val) {
      this.params.pageNum = val
      this.getList()
    },
    // 订单操作
    handleOpreate(type, row) {
      let api = ''
      let message = ''
      if (type === 'pay') {
        api = `/order/changeStatusPaid?id=${row.id}`
        message = '确定支付吗？'
      } else {
        api = `/order/changeStatusBackProcess?id=${row.id}`
        message = '确定申请退单吗？'
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get(api).then(res => {
          if (res.status === 'ok') {
            this.$message.success(res.message)
            this.getList(true)
          }
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    },
    // 发表评论
    handleRelease(type, row, index) {
      console.log('row: ', row)
      let remarkStr = ''
      if (type === 'reply') {
        if (row.reply.trim() === '') {
          this.$message({
            type: 'error',
            message: '回复内容不能为空'
          })
          return
        }
        remarkStr = row.reply
      }
      if (type === 'comment') {
        if (row.comment.trim() === '') {
          this.$message({
            type: 'error',
            message: '评论内容不能为空'
          })
          return
        }
        remarkStr = row.comment
      }
      if (remarkStr) {
        const params = {
          businessId: row.businessId,
          parentId: row.reply ? row.id : '',
          type: row.type,
          remark: remarkStr
        }
        this.loading = true
        service.post(`/comment/save`, params).then(res => {
          if (row.replay) this.handleInput(index)
          this.getList()
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.loading = false
        }).catch(error => {
          console.log('error: ', error)
          this.loading = false
        })
      }
    },
    // 回复
    handleInput(index) {
      this.index = index
      this.$set(this.cardList[index], 'isShowInput', !this.cardList[index].isShowInput)
      if (!this.cardList[index].isShowInput) this.cardList[index].reply = ''
    },
    handleChange() {}
  }
}
</script>
<style lang='scss' scoped>
@import '~@/styles/reception/index.scss';
</style>
