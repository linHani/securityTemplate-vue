<template>
  <div class="login-container">
    <div class="bg-image" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <img :src="logo" width="200px" style="margin-top: 80px;">
      <!-- 标题 -->
      <div class="title-container">
        <h3>欢迎使用旅游信息推荐系统</h3>
        <h5>珍藏每一刻的美好，旅行让生活变得更加有意义！</h5>
      </div>

      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <span slot="prefix" class="svg-icon">
            <svg-icon icon-class="user" />
          </span>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          show-password
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        >
          <span slot="prefix" class="svg-icon">
            <svg-icon icon-class="password" />
          </span>
        </el-input>
      </el-form-item>

      <el-radio v-model="loginForm.role" label="普通用户">普通用户</el-radio>
      <el-radio v-model="loginForm.role" label="管理员" style="margin-bottom: 20px">管理员</el-radio>

      <div>
        <el-button :loading="loading" type="primary" class="login-button" @click.native.prevent="handleLogin">登录</el-button>
      </div>

      <div class="options">
        <el-button v-show="loginForm.role === '普通用户'" type="text" @click="showRegisterDialogFunction()">注册账号</el-button>
        <el-button v-show="loginForm.role === '普通用户'" type="text" @click="showRecoverPasswordDialogFunction()">找回密码</el-button>
      </div>

    </el-form>
    <div>
      <el-dialog
        title="注册账号"
        :visible.sync="showRegisterDialog"
        destroy-on-close
      >
        <Register @close="closeRegisterDialogFunction()" />
      </el-dialog>
      <el-dialog
        title="找回密码"
        :visible.sync="showRecoverPasswordDialog"
        destroy-on-close
      >
        <RecoverPassword @close="closeRecoverPasswordDialogFunction()" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Register from '@/views/login/components/register.vue'
import RecoverPassword from '@/views/login/components/recoverPassword.vue'
import logo from '@/assets/common/travel_logo.png'

export default {
  name: 'Login',
  components: { Register, RecoverPassword },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        role: '普通用户'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      logo,
      passwordType: 'password',
      redirect: undefined,
      showRegisterDialog: false,
      showRecoverPasswordDialog: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    showRegisterDialogFunction() {
      this.showRegisterDialog = true
    },
    showRecoverPasswordDialogFunction() {
      this.showRecoverPasswordDialog = true
    },
    closeRegisterDialogFunction() {
      this.showRegisterDialog = false
    },
    closeRecoverPasswordDialogFunction() {
      this.showRecoverPasswordDialog = false
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
$dark_gray:#889aa4;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  // .login-container .el-input input {
  //   color: $cursor;
  // }
}

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  .bg-image {
    width: 65%;
    background-size: contain;
    background: url('/images/loginBackground1.png') no-repeat fixed center;
    background-size: 100% 100%;
  }
  .login-form {
    flex: 1;
    text-align: center;
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: #333;
        font-weight: bold;
      }
    }
    .el-form-item {
      width: 80%;
      margin: 10px auto;
    }
    .svg-icon {
      width: 1rem;
      height: 1rem;
      margin-left: 2px;
      color: $dark_gray;
    }
    .login-button {
      width: 60%;
    }
    .options {
      margin-top: 20px;
    }
  }
}
</style>

<style lang="scss" scoped>

</style>
