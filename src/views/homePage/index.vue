<!--
 * @Description: 首页
 * @Author: zhaoqi
 * @Date: 2024-12-04 16:31:56
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-14 09:56:07
-->
<template>
  <div class="container">
    <div class="greet">欢迎使用旅游管理系统</div>
    <!-- 统计数量 -->
    <div class="statistic">
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>门票预订总数</h3>
          <p>{{ info.scenicSpotNum }}</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>路线预订总数</h3>
          <p>{{ info.touristRoutesNum }}</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>有关订单总数</h3>
          <p>{{ info.totalNum }}</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>退单总数</h3>
          <p>{{ info.backNum }}</p>
        </div>
      </div>
    </div>
    <div class="statistical-chart">
      <div id="travel" class="char-wrap" />
      <div id="hotel" class="char-wrap" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import service from '@/utils/request'
import moment from 'moment'
export default {
  name: 'HomePage',
  data() {
    return {
      info: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const o1 = {
        title: '近七日景点预约',
        xData: [],
        value: []
      }
      const o2 = {
        title: '近七日酒店预约',
        xData: [],
        value: []
      }
      await service.get('/order/mainPage').then(res => {
        if (res.data) {
          console.log('res.data: ', res.data)
          this.info = { ...res.data }
          for (const key in res.data.scenicSpotWeek) {
            o1.xData.push(moment(key).format('YYYY-MM-DD'))
            o1.value.push(res.data.scenicSpotWeek[key])
          }
          for (const key in res.data.touristRoutesWeek) {
            o2.xData.push(moment(key).format('YYYY-MM-DD'))
            o2.value.push(res.data.touristRoutesWeek[key])
          }
        }
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
      this.initChart('travel', o1)
      this.initChart('hotel', o2)
    },
    initChart(id, o) {
      const chart = echarts.init(document.getElementById(id))
      const option = {
        title: {
          text: o.title,
          left: 10,
          top: 10
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '4%',
          top: '50px',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: o.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: o.value,
            type: 'line',
            areaStyle: {}
          }
        ]
      }
      chart.setOption(option)
      window.onresize = () => {
        chart.resize()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/homePage/index.scss';

</style>
