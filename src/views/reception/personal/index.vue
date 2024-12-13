<template>
  <div>
    <HeaderRoute v-if="this.$route.path !== '/persona-center'" :path="this.$route.path" />
    <div class="main">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="ruleForm">
        <el-form-item label="登录账号" prop="loginName">
          <el-input v-model="ruleForm.loginName" size="medium" disabled clearable />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" size="medium" clearable />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" size="medium" clearable />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone" size="medium" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男" value="man" />
            <el-radio label="女" value="woman" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上次修改密码时间" prop="changeTime">
          <el-input v-model="ruleForm.changeTime" disabled size="medium" clearable />
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button size="medium" type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button size="medium" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="avatar">
        <div class="flex">
          <el-image fit="cover" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="image" />
        </div>
        <!-- <div class="flex"><el-button size="medium" icon="el-icon-picture-outline-round">修改头像</el-button></div>
        <div class="flex"><el-button size="medium" icon="el-icon-key">修改密码</el-button></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
import { validEmail, validPhone } from '@/utils/validate'
export default {
  name: '',
  components: { HeaderRoute },
  data() {
    return {
      ruleForm: {
        loginName: '',
        userName: '',
        email: '',
        phone: '',
        gender: '',
        changeTime: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { required: true, validator: validEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  mounted() {

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang='scss' scoped>
.main {
  width: 80%;
  height: 85vh;
  display: flex;
  padding: 20px 0;
  margin: 30px auto;
  margin-bottom: 30px;
  border: 1px solid #e6e6e6;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}
.ruleForm {
  flex: 1;
}
.avatar {
  width: 40%;
  margin-left: 20px;
  border-left: 1px solid #e6e6e6;
  .flex {
    display: flex;
    justify-content: center;
    .image {
      width: 280px;
      height: 280px;
      margin: 50px 0;
      border-radius: 50%;
    }
    .el-button {
      margin-top: 10px;
    }
  }
}
</style>
