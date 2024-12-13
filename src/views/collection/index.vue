<!--
 * @Description: 我的收藏
 * @Author: zhaoqi
 * @Date: 2024-12-12 10:21:29
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-12 11:02:49
-->
<template>
  <div class="container">
    <div id="pie-char" class="char-wrap" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import service from '@/utils/request'
export default {
  name: '',
  components: {},
  data() {
    return {

    }
  },
  computed: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      service.get('/collect/pieChart').then(res => {
        if (res.data) {
          console.log('res.data: ', res.data)
          const list = [
            { value: res.data.scenicSpot, name: '景点门票' },
            { value: res.data.touristRoutes, name: '旅游路线' },
            { value: res.data.hotel, name: '酒店住宿' },
            { value: res.data.touristGuide, name: '旅游攻略' }
          ]
          this.initPieChar(list)
        }
        this.loading = false
      }).catch(error => {
        console.log('error: ', error)
        this.loading = false
      })
    },
    initPieChar(data) {
      const myChart = echarts.init(document.getElementById('pie-char'))
      const option = {
        title: {
          text: '收藏数量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  width: 100%;
  height: 90vh;
}
.char-wrap {
  width: 80%;
  height: 80vh;
  padding-top: 50px;
  margin: auto;
}
</style>
