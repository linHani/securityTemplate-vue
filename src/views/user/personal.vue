<template>
  <div class="container" :style="{paddingTop: this.$route.path === '/reception-personal'? 0 : '20px',paddingBottom: this.$route.path === '/reception-personal'? 0 : '20px'}">
    <HeaderRoute v-if="this.$route.path === '/reception-personal'" :path="this.$route.path" style="margin-bottom: 20px" />
    <div v-loading="loading" class="pagination-box">
      <el-form ref="form" :model="formInfo" :rules="rules" label-width="80px" class="form-info">
        <div class="info">
          <el-form-item prop="username" label="登录账号">
            <el-input v-model="formInfo.username" />
          </el-form-item>
          <el-form-item prop="name" label="用户名">
            <el-input v-model="formInfo.name" />
          </el-form-item>
          <el-form-item prop="sex" label="性别">
            <el-select v-model="formInfo.sex">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item prop="age" label="年龄">
            <el-input-number v-model="formInfo.age" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="formInfo.email" />
          </el-form-item>
          <el-form-item prop="tel" label="电话号">
            <el-input v-model="formInfo.tel" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </div>
        <div class="avatar">
          <el-form-item prop="avatar" label="头像">
            <UploadSingleImage
              v-model="formInfo.avatar"
              @updateImage="updateImage"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import service from '@/utils/request'
import HeaderRoute from '@/components/ReceptionTopRoute/index.vue'
import UploadSingleImage from '@/components/Upload/UploadSingleImage.vue'

export default {
  components: { UploadSingleImage, HeaderRoute },
  props: {},
  data() {
    const validateImage = (rule, value, callback) => {
      if (this.formInfo.avatar === null || this.formInfo.avatar === undefined) {
        callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      rules: {
        avatar: [{ required: true, validator: validateImage, trigger: 'blur' }],
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        sex: [{ required: true, message: '请输入性别', trigger: 'blur' }],
        age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话号', trigger: 'blur' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      formInfo: {
        username: '',
        name: '',
        password: '',
        sex: '',
        age: '',
        email: '',
        tel: '',
        role: '',
        status: '',
        avatar: ''
      }
    }
  },
  watch: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      service.get('/user/userPersonal', this.formInfo).then(res => {
        this.formInfo = res.data
        if (!this.formInfo.username) {
          this.formInfo.username = res.data.adminname
        }
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          service.post('/user/save', this.formInfo).then(res => {
            this.init()
            this.loading = false
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    },
    updateImage(image) {
      this.$set(this.formInfo, 'avatar', image)
      this.$refs.form.validateField('avatar')
    }
  }
}
</script>

<style scoped lang="scss">
.pagination-box {
  background: #fff;
  box-shadow: none;
  border: 1px solid #f3f3f5;
}
::v-deep .form-info {
  display: flex;
  .info {
    flex: 4;
  }
  .avatar {
    flex: 3;
    display: flex;
    justify-content: center;
    padding-top: 50px;
    .el-upload-list--picture-card .el-upload-list__item {
      width: 230px;
      height: 230px;
    }
  }
}
</style>
