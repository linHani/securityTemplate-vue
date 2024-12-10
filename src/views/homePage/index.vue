<!--
 * @Description: 首页
 * @Author: zhaoqi
 * @Date: 2024-12-04 16:31:56
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-07 16:51:27
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
          <p>100</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>客房预订总数</h3>
          <p>100</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>有关订单总数</h3>
          <p>100</p>
        </div>
      </div>
      <div class="item">
        <i class="el-icon-s-data" />
        <div>
          <h3>线路订单总数</h3>
          <p>100</p>
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
export default {
  name: 'HomePage',
  data() {
    return {}
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const o1 = {
        title: '近七日景点预约',
        xData: ['2018-01', '2018-02', '2018-03', '2018-04'],
        value: [100, 200, 300, 400]
      }
      const o2 = {
        title: '近七日酒店预约',
        xData: ['2018-01', '2018-02', '2018-03', '2018-04'],
        value: [300, 200, 600, 100]
      }
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
