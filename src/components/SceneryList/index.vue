<!--
 * @Description: 卡片列表组件
 * @Author: zhaoqi
 * @Date: 2024-12-04 22:29:59
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-07 09:48:42
-->
<template>
  <div class="card-container">
    <div
      v-for="item in cardList"
      :key="item.index"
      class="card-item"
    >
      <el-image :src="item.url" :preview-src-list="[item.url]" class="card-img" />
      <p class="place">{{ item.place }}</p>
      <div class="description">
        <span>{{ item.description }}</span>
      </div>
      <div class="opreate">
        <div>
          <el-button v-if="isReserve" type="danger" size="mini">预约</el-button>
          <el-button type="text" size="mini" @click="hanldeDetail(item)">查看详情</el-button>
        </div>
      </div>
    </div>
    <el-pagination
      v-if="isShowPage"
      background
      layout="prev, pager, next"
      :total="1000"
    />
  </div>
</template>

<script>
export default {
  name: 'SceneryList',
  props: ['cardList', 'isShowPage'],
  data() {
    return {
      routePath: '',
      isReserve: false
    }
  },
  mounted() {
    this.initvalue()
  },
  methods: {
    initvalue() {
      this.routePath = this.$route.path
      const showRoute = ['/home', '/scenic', '/travel']
      if (showRoute.includes(this.routePath)) {
        this.isReserve = true
      } else {
        this.isReserve = false
      }
    },
    handleReserve() {

    },
    hanldeDetail(item) {
      this.$router.push({
        path: '/detail',
        query: {
          data: JSON.stringify(item),
          path: this.routePath
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.title {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0 0 10px 0;
}
.card-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-bottom: 10px;
  overflow-y: auto;
  .card-item {
    position: relative;
    width: calc(33% - 7px);
    height: 41.5vh;
    margin-top: 10px;
    margin-right: 10px;
    border: 1px solid #e6e6e6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
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
      width: 100%;
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 5px;

      padding: 0 10px;
      margin-top: 5px;
    }
  }
  .el-pagination {
    width: 100%;
    padding: 10px 10px 10px 0;
    text-align: right;
  }
}
</style>
