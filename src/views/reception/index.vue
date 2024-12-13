<!--
 * @Description: 卡片列表通用页面
 * @Author: zhaoqi
 * @Date: 2024-12-04 22:29:59
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-13 21:06:34
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
            <div>
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
            <div
              v-if="routePath === '/collection'"
              class="collection"
            >
              <i class="el-icon-star-off icon">100</i>
              <i class="el-icon-time icon">2024-12-10 15:52:47</i>
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
        <div
          v-if="routePath !== '/home'"
          class="paging"
        >
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
      params: {
        pageNum: 1,
        pageSize: 10,
        type: ''
      },
      typeList: [
        { label: '全部', value: 'all' }
      ],
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
      if (this.routePath !== '/collection') {
        this.params.type = ''
        this.getData()
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

      const listApi = {
        '/home': '/scenicSpot/recommend',
        '/scenic': '/scenicSpot/selectByPage',
        '/travel': '/touristRoutes/selectByPage',
        '/tavern': '/hotel/selectByPage',
        '/consult': '/touristGuide/selectByPage',
        '/reserve': '/order/selectRealByPage',
        '/refund': '/order/selectBackByPage'
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
        this.params.pageNum = res.data.pages || 1
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
        this.params.pageNum = res.data.pages || 1
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
    handlePageSizeChange(val) {
      this.params.pageSize = val
      this.getList(true)
    },
    handlePageCurrentChange(val) {
      this.params.pageNum = val
      this.getList()
    }
  }
}
</script>
<style lang='scss' scoped>
.list {
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: space-between;
}
.title {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0 0 10px 0;
}
.search-pageNum {
  flex: 1;
  height: 100%;
  padding-top: 10px;
  border-right: 1px solid rgba(51, 51, 51, 0.08);
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
.card-container {
  flex: 6;
  height: 94vh;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  overflow-y: auto;
  .card-item {
    position: relative;
    width: calc(33% - 7px);
    height: 41vh;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 10px;
    border: 1px solid #e6e6e6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .place {
      padding: 0 10px;
      margin: 5px 0;
      font-size: 12px;
      color: #6d8b4c;
    }
    .card-img {
      width: 100%;
      height: 60%;
    }
    .description {
      padding: 0 10px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /*限制显示的行数为3行*/
      -webkit-box-orient: vertical;
    }
    .opreate {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 10px;
      margin-top: 5px;
      font-size: 12px;
      .el-button {
        margin-right: 10px;
      }
      .collection {
        display: flex;
        justify-content: flex-end;
        color: #666;
        .icon {
          margin-left: 10px;
        }
      }
    }
  }
  .empty {
    width: 200px;
    height: 200px;
    margin: auto;
    .text {
      color: #ccc;
      text-align: center;
    }
  }
  .paging {
    width: 100%;
    .el-pagination {
      width: 100%;
      padding: 10px 10px 10px 0;
      text-align: right;
    }
  }
}
.footer {
  width: 100%;
  height: 25vh;
  display: flex;
  background: #89a5c2;
  .footer-image {
    width: 45%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10vw;
    img {
      width: 90px;
      height: 65%;
    }
  }
  .footer-info {
    width: 55%;
    height: 100%;
    display: flex;
    margin: 0;
    font-size: 12px;
    .subTitle {
      font-size: 14px;
      font-weight: 600;
      text-align: left;
    }
    p {
      padding: 0;
      margin: 10px 0;
    }
    .description {
      flex: 7;
      padding: 20px 50px 0 50px;
    }
    .contact {
      flex: 3;
      padding-top: 20px;
    }
  }
}
</style>
