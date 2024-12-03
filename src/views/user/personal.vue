<template>
  <div class="container">
    <div v-loading="loading" class="pagination-box">
      <el-form ref="form" :model="data" :rules="rules" label-width="80px">
        <el-form-item prop="avatar" label="头像">
          <UploadSingleImage
            v-model="data.avatar"
            @updateImage="updateImage"
          />
        </el-form-item>
        <el-form-item prop="username" label="登录账号">
          <el-input v-model="data.username" />
        </el-form-item>
        <el-form-item prop="name" label="用户名">
          <el-input v-model="data.name" />
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-select v-model="data.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item prop="age" label="年龄">
          <el-input-number v-model="data.age" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="data.email" />
        </el-form-item>
        <el-form-item prop="tel" label="电话号">
          <el-input v-model="data.tel" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import service from '@/utils/request'
import UploadSingleImage from '@/components/Upload/UploadSingleImage.vue'

export default {
  components: { UploadSingleImage },
  props: {},
  data() {
    const validateImage = (rule, value, callback) => {
      if (this.data.avatar === null || this.data.avatar === undefined) {
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
      data: {}
    }
  },
  watch: {},
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      service.get('/user/userPersonal', this.data).then(res => {
        this.data = res.data
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
          service.post('/user/save', this.data).then(res => {
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
      this.$set(this.data, 'avatar', image)
      this.$refs.form.validateField('avatar')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
