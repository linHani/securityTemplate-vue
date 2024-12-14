<template>
  <div class="detail">
    <HeaderRoute :path="routePath" />
    <!-- 介绍 -->
    <div class="content">
      <el-image
        :src="baseUrl + info.image"
        :preview-src-list="[baseUrl + info.image]"
        class="image"
      />
      <div class="info">
        <div class="title">
          <span>{{ routePath === '/consult' ? info.title : info.name }}</span>
          <div class="opreate">
            <el-button v-if="isShow.pay" size="mini" type="primary" @click="handleOpreate('pay')">支付订单</el-button>
            <el-button v-if="isShow.unsubscribe" size="mini" type="info" @click="handleOpreate('back')">申请退单</el-button>
            <el-button v-if="isShow.isReserve" size="mini" type="primary" @click="handleClick()">预约</el-button>
            <span v-show="isShow.isCollect" @click="handleCollect()"><i class="el-icon-star-on" style="margin-left: 3px;color: #e1a244;font-size: 22px;" /></span>
            <span v-show="!isShow.isCollect" @click="handleCollect()"><i class="el-icon-star-off" style="margin-left: 7px;" /></span>
          </div>
        </div>
        <div class="filds">
          <div
            v-for="(item, idx) in fileds[routePath]"
            :key="idx"
            :title="`${ item.prop in info ? info[item.prop] : '' }`"
            class="label"
          >
            <a v-if="item.type === 'url'" :href="item.url" target="blank">
              <span>{{ item.label }}：</span>
              <span style="color: #409EFF;">查看</span>
            </a>
            <P v-else-if="item.type === 'money'">{{ item.label }}：{{ item.prop in info ? info[item.prop]/100 : '' }}元</P>
            <P v-else>{{ item.label }}：{{ item.prop in info ? info[item.prop] : '' }}</P>
          </div>
        </div>
        <!-- <div class="introduction">
          <p :title="info.text">简介：{{ info.text }}</p>
        </div> -->
      </div>
    </div>
    <!-- 介绍 -->
    <div class="description">介绍：{{ routePath === '/reserve' ? info.remark : info.introduce }}</div>
    <!-- 评论 -->
    <div class="comment">
      <div class="publish">
        <el-input
          v-model="remark"
          type="textarea"
          maxlength="500"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 8}"
          placeholder="请输入评论内容"
        />
        <el-button
          type="primary"
          plain
          size="mini"
          style="margin: 10px 0;"
          @click="handleRelease()"
        >评论</el-button>
      </div>
      <!-- 评论列表 -->
      <ul
        :key="commentKey"
        v-infinite-scroll="load"
        class="infinite-list"
        :infinite-scroll-immediate="false"
        :infinite-scroll-delay="1000"
        infinite-scroll-distance="2"
        style="overflow: auto"
      >
        <li
          v-for="(item, idx) in commentList"
          :key="idx"
          class="infinite-list-item"
        >
          <div class="comment">
            <!-- <span>{{ author }}</span> -->
            <div class="comment-content flex">
              <span>{{ item.createBy }}：</span>
              <span class="text">{{ item.remark }}</span>
            </div>
            <div class="date">
              <span>{{ item.createTime }}</span>
              <!-- <el-link type="primary" size="mini" style="margin-left: 10px" @click="handleInput(idx)">{{ item.isShowInput ? '取消' : '回复' }}</el-link>
              <el-link type="danger" size="mini" style="margin-left: 10px" @click="handleDelete(item.id)">删除</el-link> -->
            </div>
            <!-- <div v-if="item.isShowInput && index === idx" class="flex">
              <el-input v-model="item.reply" size="mini" />
              <el-link type="primary" size="mini" style="margin-left: 10px" @click="handleRelease(item, idx)">评论</el-link>
            </div> -->
          </div>
          <div v-for="x in item.children" :key="x.index" class="reply">
            <!-- <span>{{ author }}</span> -->
            <div class="comment-content flex">
              <span>{{ x.createBy }}：</span>
              <span class="text">{{ x.remark }}</span>
            </div>
            <div class="date">{{ x.createTime }}</div>
          </div>
        </li>
        <li
          v-show="disabledFlag"
          class="baseline"
        >已经到底了哦</li>
      </ul>
    </div>
    <Dialog :dialog="dialogObj" />
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
import service from '@/utils/request'
import Dialog from '@/views/reception/components/index.vue'
export default {
  name: 'Detail',
  components: { HeaderRoute, Dialog },
  data() {
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION,
      routePath: '',
      commentKey: 0,
      index: 0,
      params: {
        pageNum: 1,
        pageSize: 3
      },
      fileds: {
        '/home': [
          { label: '景点名称', prop: 'name' },
          { label: '景点类型', prop: 'type' },
          // { label: '景点图片', prop: 'image' },
          { label: '景点等级', prop: 'level' },
          { label: '景点地址', prop: 'location' },
          { label: '门票价格', prop: 'price', type: 'money' },
          { label: '门票库存', prop: 'stock' },
          { label: '开放时间', prop: 'openTime' },
          { label: '注意事项', prop: 'precautions' },
          { label: '交通指南', prop: 'trafficGuide' },
          // { label: '景点介绍', prop: 'introduce' },
          { label: '收藏数量', prop: 'collectCount' }
        ],
        '/scenic': [
          { label: '景点名称', prop: 'name' },
          { label: '景点类型', prop: 'type' },
          // { label: '景点图片', prop: 'image' },
          { label: '景点等级', prop: 'level' },
          { label: '景点地址', prop: 'location' },
          { label: '门票价格', prop: 'price', type: 'money' },
          { label: '门票库存', prop: 'stock' },
          { label: '开放时间', prop: 'openTime' },
          { label: '注意事项', prop: 'precautions' },
          { label: '交通指南', prop: 'trafficGuide' },
          // { label: '景点介绍', prop: 'introduce' },
          { label: '收藏数量', prop: 'collectCount' }
        ],
        '/tavern': [
          { label: '酒店名称', prop: 'name' },
          { label: '酒店类型', prop: 'type' },
          // { label: '酒店图片', prop: 'image' },
          { label: '酒店地址', prop: 'location' },
          { label: '联系电话', prop: 'tel' },
          { label: '酒店网址', prop: 'url', type: 'url' },
          // { label: '酒店介绍', prop: 'introduce' },
          { label: '收藏数量', prop: 'collectCount' }
        ],
        '/reserve': [
          // { label: '商品id', prop: 'businessId' },
          // { label: '下单用户id', prop: 'userId' },
          { label: '联系电话', prop: 'tel' },
          { label: '联系人姓名', prop: 'realName' },
          { label: '订单编号', prop: 'orderCode' },
          { label: '单价', prop: 'unitPrice' },
          { label: '总价', prop: 'totalPrice' },
          { label: '数量', prop: 'num' },
          { label: '订单类型', prop: 'type' },
          { label: '订单状态', prop: 'status' },
          { label: '收藏数量', prop: 'collectCount' }
        ],
        '/consult': [
          // { label: '用户id', prop: 'userId' },
          { label: '攻略标题', prop: 'title' },
          { label: '攻略内容', prop: 'context' },
          // { label: '攻略图片', prop: 'image' },
          { label: '攻略类型', prop: 'type' },
          { label: '收藏数量', prop: 'collectCount' }
        ],
        '/travel': [
          { label: '旅游线路名称', prop: 'name' },
          { label: '旅游景点名称', prop: 'scenicSppotName' },
          // { label: '旅游线路图片', prop: 'image' },
          { label: '旅游线路出发地', prop: 'beginSpot' },
          { label: '旅游线路途径', prop: 'waySpot' },
          { label: '旅游线路目的地', prop: 'endSpot' },
          { label: '旅游线路交通方式', prop: 'traffic' },
          // { label: '旅游线路介绍', prop: 'introduce' },
          { label: '旅游线路出发时间', prop: 'startTime' },
          { label: '价格', prop: 'price', type: 'money' },
          { label: '库存', prop: 'stock' },
          { label: '收藏数量', prop: 'collectCount' }
        ]
      }, // 字段列表
      isShow: {
        pay: false,
        unsubscribe: false,
        isReserve: false,
        isCollect: false
      },
      dialogObj: {
        title: '',
        visible: false,
        dataList: {}
      },
      info: {},
      remark: '',
      count: 0,
      disabledFlag: false,
      selectType: {
        '/home': '景点门票',
        '/scenic': '景点门票',
        '/tavern': '酒店住宿',
        '/travel': '旅游线路',
        '/consult': '旅游攻略'
      },
      commentList: [] // 评论列表
    }
  },
  created() {
    this.routePath = this.$route.query.path
    this.initValue()
  },
  methods: {
    initValue() {
      const data = JSON.parse(this.$route.query.data) || {}
      this.info = { ...data }
      console.log('this.info: ', this.info)

      if (this.routePath === '/home' || this.routePath === '/scenic' || this.routePath === '/travel') {
        this.isShow.isReserve = true
      }

      if (this.info.status === '未支付') {
        this.isShow.pay = true
        this.isShow.unsubscribe = true
      } else if (this.info.status === '已支付') {
        this.isShow.unsubscribe = true
      }

      this.getStatus()
    },
    // 获取收藏状态
    getStatus() {
      const params = {
        businessId: this.info.id,
        type: this.routePath === '/reserve' ? this.info.type : this.selectType[this.routePath]
      }
      this.loading = true
      service.get(`/collect/getState?businessId=${params.businessId}&type=${params.type}`).then(res => {
        this.isShow.isCollect = res.data || false
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    // 点击预约
    handleClick() {
      this.dialogObj.title = '下单'
      this.dialogObj.routePath = this.routePath
      this.dialogObj.dataList = this.info
      this.dialogObj.visible = true
    },
    // 订单操作
    handleOpreate(type) {
      let api = ''
      let message = ''
      if (type === 'pay') {
        api = `/order/changeStatusPaid?id=${this.info.id}`
        message = '确定支付吗？'
      } else {
        api = `/order/changeStatusBackProcess?id=${this.info.id}`
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
            this.$router.push(`/reserve`)
          }
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    },
    // 点击收藏
    handleCollect() {
      const params = {
        businessId: this.info.id,
        type: this.selectType[this.routePath]
      }
      this.loading = true
      service.post(`/collect/save`, params).then(res => {
        this.isShow.isCollect = !this.isShow.isCollect
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    // 发表评论
    handleRelease(row, index) {
      let remarkStr = ''
      if (row) {
        if (row.reply.trim() === '') {
          this.$message({
            type: 'error',
            message: '评论内容不能为空'
          })
          return
        }
        remarkStr = row.reply
      } else {
        if (this.remark.trim() === '') {
          this.$message({
            type: 'error',
            message: '评论内容不能为空'
          })
          return
        }
        remarkStr = this.remark
        this.remark = ''
      }
      const params = {
        businessId: this.info.id,
        parentId: row ? row.id : '',
        type: this.selectType[this.routePath],
        remark: remarkStr
      }
      this.loading = true
      service.post(`/comment/save`, params).then(res => {
        if (row) this.handleInput(index)
        this.getCommentList(true)
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    async load() {
      if (this.disabledFlag) {
        return
      }
      await this.getCommentList()
      this.params.pageNum += 1
    },
    // 获取评论列表
    async getCommentList(flag) {
      if (flag) {
        this.params.pageNum = 1
        this.params.pageSize = 3
        this.commentList = []
      }
      const params = {
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize,
        businessId: this.info.id,
        type: this.selectType[this.routePath]
      }
      this.loading = true
      await service.post('/comment/selectByPage', params).then(res => {
        if (res.data.data.length === 0) {
          this.disabledFlag = true
          this.remark = ''
        }
        this.commentList = this.commentList.concat(res.data.data) || []
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    // 删除
    handleDelete(id) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        service.get(`comment/delete?id=` + id).then(res => {
          if (res.status === 'ok') {
            this.getCommentList(true)
            this.$message.success('删除成功')
          }
        }).catch(error => {
          console.log(error)
          this.loading = false
        })
      })
    },
    handleInput(index) {
      this.index = index
      this.remark = ''
      this.$set(this.commentList[index], 'isShowInput', !this.commentList[index].isShowInput)
      if (!this.commentList[index].isShowInput) this.commentList[index].reply = ''
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/styles/reception/detail.scss';
</style>
