<!--
 * @Description: 头部菜单组件
 * @Author: zhaoqi
 * @Date: 2024-12-04 21:46:25
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-13 10:45:24
-->
<template>
  <div class="header">
    <div class="menu">
      <img
        src="@/assets/common/travel_logo.png"
        alt=""
        class="logo"
      >
      <div
        v-for="item in menuList"
        :key="item.path"
        class="item"
        :style="{'color': path === item.path ? '#dd285f' : ''}"
        @click="handleSelect(item)"
      >{{ item.name }}</div>
    </div>
    <div style="margin-right: 10px;cursor: pointer;" @click="handleSelect({ path: '/personal' })">
      <el-avatar size="medium" :src="circleUrl" />
    </div>
    <el-button
      type="primary"
      plain
      size="mini"
      style="margin-right: 20px;"
      @click="logout()"
    >退出</el-button>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'ReceptionTopRoute',
  props: ['path'],
  data() {
    return {
      routePath: '',
      menuList: [
        { name: '系统主页', path: '/home' },
        { name: '景点门票', path: '/scenic' },
        { name: '旅游线路', path: '/travel' },
        { name: '景区酒店', path: '/tavern' },
        { name: '旅游攻略', path: '/consult' },
        { name: '我的收藏', path: '/collection' },
        { name: '我的订单', path: '/reserve' },
        { name: '我的退单', path: '/refund' }
      ],
      circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  mounted() {
    // this.getLoginInfo()
  },
  methods: {
    async getLoginInfo() {
      const { roles } = await store.dispatch('user/getInfo')
      if (roles.includes('管理员')) {
        this.menuList = [
          { name: '系统主页', path: '/home' },
          { name: '景点门票', path: '/scenic' },
          { name: '旅游线路', path: '/travel' },
          { name: '酒店住宿', path: '/tavern' },
          { name: '旅游攻略', path: '/consult' },
          { name: '我的收藏', path: '/collection' },
          { name: '我的订单', path: '/reserve' },
          { name: '我的退单', path: '/refund' },
          { name: '后台管理', path: '/homePage' }
        ]
      } else {
        this.menuList = [
          { name: '系统主页', path: '/home' },
          { name: '景点门票', path: '/scenic' },
          { name: '旅游线路', path: '/travel' },
          { name: '景区酒店', path: '/tavern' },
          { name: '旅游攻略', path: '/consult' },
          { name: '我的收藏', path: '/collection' },
          { name: '我的订单', path: '/reserve' },
          { name: '我的退单', path: '/refund' }
        ]
      }
    },
    handleSelect(val) {
      this.$router.push(val.path)
    },
    async logout() {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        // 这里可以控制是否回到登出前的页面
        this.$router.push(`/login`)
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)

        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.header {
  height: 40px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dddddd;
  .menu {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      height: 30px;
    }
    .item {
      width: 90px;
      text-align: center;
      &:hover {
        color: #dd285f;
        cursor: pointer;
      }
    }
  }
}
</style>
