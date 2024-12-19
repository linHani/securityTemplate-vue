<template>
  <div
    class="container"
    :style="{paddingTop: this.$route.path === '/change-password'? 0 : '20px',paddingBottom: this.$route.path === '/change-password'? 0 : '20px'}"
  >
    <HeaderRoute v-if="this.$route.path === '/change-password'" :path="this.$route.path" style="margin-bottom: 20px" />
    <el-row class="main">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="rightPassword">
          <el-input v-model="ruleForm.rightPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
import { validPassword } from '@/utils/validate.js'
import service from '@/utils/request'
export default {
  name: '',
  components: { HeaderRoute },
  data() {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        rightPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { required: true, validator: validPassword, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { required: true, validator: validPassword, trigger: 'blur' }
        ],
        rightPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { required: true, validator: validPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (JSON.stringify(this.ruleForm.newPassword) !== JSON.stringify(this.ruleForm.rightPassword)) {
            this.$message.error('两次密码不一致!')
            return
          }
          const params = {
            userSelect: this.$route.path === '/change-password',
            oldPassword: this.ruleForm.oldPassword,
            newPassword: this.ruleForm.newPassword
          }
          this.loading = true
          service.post('/user/changePassword', params).then(res => {
            this.loading = false
            this.$message.error(res.message)
            this.logout()
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.ruleForm = {
        oldPassword: '',
        newPassword: '',
        rightPassword: ''
      }
      this.$refs[formName].resetFields()
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // 这里可以控制是否回到登出前的页面
      this.$router.push(`/login`)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)

      this.$message({
        type: 'success',
        message: '退出成功!'
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.main {
  width: 50%;
  padding: 40px 40px 20px 20px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #f3f3f5;
}
</style>
