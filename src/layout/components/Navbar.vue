<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="handle-box">
      <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
      <div class="avatar-wrapper">
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
        <img
          :src="baseUrl + info.avatar"
          class="user-avatar"
        >
        <!-- <i class="el-icon-caret-bottom" /> -->
      </div>
      <!-- <el-dropdown class="avatar-container" trigger="click"> -->
      <el-dropdown>
        <el-button size="mini" class="avatar-container">
          <router-link to="/homePage">{{ loginName }}</router-link>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/homePage"> 首页 </router-link></el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import store from '@/store'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION,
      loginName: '',
      info: {}
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  async mounted() {
    const res = await store.dispatch('user/getInfo')
    this.info = res
    const { roles } = this.info
    this.loginName = roles[0]
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
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
      // await this.$store.dispatch('user/logout')
      // // 这里可以控制是否回到登出前的页面
      // this.$router.push(`/login`)
      // // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.handle-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  .user-avatar {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 50%;
  }
}
</style>
