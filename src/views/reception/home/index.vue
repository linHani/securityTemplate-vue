<!--
 * @Description: 首页
 * @Author: zhaoqi
 * @Date: 2024-12-04 20:27:12
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-06 15:12:45
-->
<template>
  <div class="reception-container">
    <HeaderRoute :path="this.$route.path" />
    <div class="carousel-container">
      <el-carousel
        :interval="3000"
        autoplay
        type="card"
      >
        <el-carousel-item
          v-for="item in rotateList"
          :key="item.url"
        >
          <el-image fit="cover" :src="item.url" class="rotate-img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list">
      <h3 class="title">推荐景点</h3>
      <SceneryList :card-list="cardList" :is-show-page="false" />
    </div>
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
import SceneryList from '@/components/SceneryList/index.vue'
export default {
  name: 'ReceptionHome',
  components: { HeaderRoute, SceneryList },
  data() {
    return {
      rotateList: [
        {
          url: 'https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF',
          title: '图片1'
        },
        {
          url: 'https://t7.baidu.com/it/u=1785207335,3397162108&fm=193&f=GIF',
          title: '图片2'
        },
        {
          url: 'https://t7.baidu.com/it/u=3423293041,3900166648&fm=193&f=GIF',
          title: '图片3'
        },
        {
          url: 'https://t7.baidu.com/it/u=3728410568,989468460&fm=193&f=GIF',
          title: '图片4'
        },
        {
          url: 'https://t7.baidu.com/it/u=4265852580,160349292&fm=193&f=GIF',
          title: '图片5'
        }
      ],
      cardList: [
        {
          place: '红石崖',
          url: 'https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF',
          description: '这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1'
        },
        {
          place: '延安',
          url: 'https://t7.baidu.com/it/u=1785207335,3397162108&fm=193&f=GIF',
          description: '这是图片2这是图片2这是图片2这是图片2这是图片2这是图片2'
        },
        {
          place: '伊犁',
          url: 'https://t7.baidu.com/it/u=3423293041,3900166648&fm=193&f=GIF',
          description: '这是图片3这是图片3这是图片3这是图片3这是图片3这是图片3'
        }
      ]
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
  }
}
</script>
<style lang='scss' scoped>
.carousel-container {
  height: 43vh;
}
.el-carousel__item {
  height: 100%;
  text-align: center;
}
::v-deep .el-carousel__container {
  height: 43vh;
}
.rotate-img {
  width: 100%;
  height: 100%;
  margin: auto;
}
.list {
  height: 51vh;
  .title {
    padding-top: 25px;
    margin: 0;
    text-align: center;
  }
}
</style>
