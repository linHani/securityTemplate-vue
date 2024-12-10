<template>
  <div class="detail">
    <HeaderRoute :path="routhPath" />
    <!-- 介绍 -->
    <div class="content">
      <el-image
        :src="info.url"
        :preview-src-list="[info.url]"
        class="image"
      />
      <div class="info">
        <div class="title">
          <span>{{ info.title }}</span>
          <div class="opreate">
            <el-button v-if="routhPath === '/refund'" size="mini" type="danger" style="width: 40px;height: 25px;display: flex;align-items: center;justify-content: center">删除</el-button>
            <el-button v-if="info.unsubscribe" size="mini" type="info" style="width: 40px;height: 25px;display: flex;align-items: center;justify-content: center">退订</el-button>
            <el-button v-if="info.isReserve" size="mini" type="primary" style="width: 40px;height: 25px;display: flex;align-items: center;justify-content: center">预定</el-button>
            <span v-show="info.isCollect" @click="handleCollect()"><i class="el-icon-star-on" style="margin-left: 3px;color: #e1a244;font-size: 22px;" /></span>
            <span v-show="!info.isCollect" @click="handleCollect()"><i class="el-icon-star-off" style="margin-left: 7px;" /></span>
          </div>
        </div>
        <div class="filds">
          <div
            v-for="(item, index) in fileds[routhPath]"
            :key="index"
            :title="`${ item.prop in info ? info[item.prop] : '' }`"
            class="label"
          >
            <P>{{ item.label }}：{{ item.prop in info ? info[item.prop] : '' }}</P>
          </div>
        </div>
        <div class="introduction">
          <p :title="info.text">简介：{{ info.text }}</p>
        </div>
      </div>
    </div>
    <!-- 介绍 -->
    <div class="description">介绍：{{ info.description }}</div>
    <!-- 评论 -->
    <div class="comment">
      <div class="publish">
        <el-input
          v-model="comment"
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
        >评论</el-button>
      </div>
      <!-- 评论列表 -->
      <ul
        v-infinite-scroll="load"
        class="infinite-list"
        infinite-scroll-disabled="false"
        infinite-scroll-immediate="true"
        infinite-scroll-distance="1"
        style="overflow:auto"
      >
        <li
          v-for="i in count"
          :key="i"
          class="infinite-list-item"
        >
          <div class="comment">
            <!-- <span>{{ author }}</span> -->
            <div class="comment-content flex">
              <span>海绵宝宝：</span>
              <span class="text">好好好</span>
            </div>
            <div class="date">2024-12-6 20:14</div>
          </div>
          <div class="reply">
            <!-- <span>{{ author }}</span> -->
            <div class="comment-content flex">
              <span>派大星：</span>
              <span class="text">真好</span>
            </div>
            <div class="date">2024-12-6 10:10</div>
          </div>
        </li>
        <li
          v-show="show"
          class="baseline"
        >已经到底了哦</li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
export default {
  name: 'Detail',
  components: { HeaderRoute },
  data() {
    return {
      routhPath: '',
      fileds: {
        '/scenic': [
          { label: '景点名称', prop: 'name' },
          { label: '景点类型', prop: 'type' },
          // { label: '景点图片', prop: 'image' },
          { label: '景点等级', prop: 'level' },
          { label: '景点地址', prop: 'location' },
          { label: '门票价格', prop: 'price' },
          { label: '门票库存', prop: 'stock' },
          { label: '开放时间', prop: 'openTime' },
          { label: '注意事项', prop: 'precautions' },
          { label: '交通指南', prop: 'trafficGuide' },
          { label: '景点介绍', prop: 'introduce' }
        ],
        '/tavern': [
          { label: '酒店名称', prop: 'name' },
          { label: '酒店类型', prop: 'type' },
          // { label: '酒店图片', prop: 'image' },
          { label: '酒店地址', prop: 'location' },
          { label: '联系电话', prop: 'tel' },
          { label: '酒店网址', prop: 'url' },
          { label: '酒店介绍', prop: 'introduce' }
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
          { label: '订单状态', prop: 'status' }
        ],
        '/consult': [
          // { label: '坐着用户id', prop: 'userId' },
          { label: '攻略标题', prop: 'title' },
          { label: '攻略内容', prop: 'context' },
          // { label: '攻略图片', prop: 'image' },
          { label: '攻略类型', prop: 'type' }
        ],
        '/travel': [
          { label: '旅游线路名称', prop: 'name' },
          { label: '旅游景点名称', prop: 'scenicSppotName' },
          { label: '旅游线路图片', prop: 'image' },
          { label: '旅游线路出发地', prop: 'beginSpot' },
          { label: '旅游线路途径', prop: 'waySpot' },
          { label: '旅游线路目的地', prop: 'endSpot' },
          { label: '旅游线路交通方式', prop: 'traffic' },
          { label: '旅游线路介绍', prop: 'introduce' },
          { label: '旅游线路出发时间', prop: 'startTime' },
          { label: '价格', prop: 'price' },
          { label: '库存', prop: 'stock' }
        ]
      }, // 字段列表
      info: {
        url: '',
        title: '',
        text: '',
        unsubscribe: false,
        isReserve: false,
        isCollect: false,
        description: '',

        name: '',
        type: '',
        image: '',
        level: '',
        location: '',
        price: '',
        stock: '',
        openTime: '',
        precautions: '',
        trafficGuide: '',
        introduce: ''
      },
      comment: '',
      count: 0,
      show: false
    }
  },
  created() {
    this.routhPath = this.$route.query.path
    console.log('this.routhPath: ', this.routhPath)
    this.initValue()
  },
  methods: {
    initValue() {
      const data = JSON.parse(this.$route.query.data) || {}
      this.info = {
        title: data.place,
        unsubscribe: true,
        isReserve: true,
        isCollect: true,
        url: data.url,
        text: '好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方好地方',
        description: '介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下介绍一下',

        name: data.name,
        type: '',
        image: '',
        level: '',
        location: '',
        price: '',
        stock: '',
        openTime: '',
        precautions: '',
        trafficGuide: '',
        introduce: ''

      }
      console.log('this.info', this.info)
    },
    load() {
      if (this.count >= 10) {
        this.show = true
        return
      }
      this.count += 2
    },
    handleCollect() {
      this.info.isCollect = !this.info.isCollect
      console.log('this.info.isCollect: ', this.info.isCollect)
      this.$message({
        type: 'success',
        message: '收藏成功'
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '~@/styles/reception/detail.scss';
</style>
