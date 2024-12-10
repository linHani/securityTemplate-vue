<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" :rules="rules" label-width="150px">
      <el-form-item prop="image" label="酒店图片">
        <UploadSingleImage
          v-model="data.image"
          @updateImage="updateImage"
        />
      </el-form-item>
      <el-form-item prop="name" label="景点名称">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item prop="type" label="酒店类型">
        <el-input v-model="data.type" />
      </el-form-item>
      <el-form-item prop="location" label="酒店地址">
        <el-input v-model="data.location" />
      </el-form-item>
      <el-form-item prop="tel" label="联系电话">
        <el-input v-model="data.tel" />
      </el-form-item>
      <el-form-item prop="url" label="酒店网址">
        <el-input v-model="data.url" />
      </el-form-item>
      <el-form-item prop="introduce" label="酒店介绍">
        <el-input v-model="data.introduce" />
      </el-form-item>
      <el-form-item class="submit">
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
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
      if (this.data.image === null || this.data.image === undefined) {
        callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      rules: {
        image: [{ required: true, validator: validateImage, trigger: 'blur' }],
        name: [{ required: true, message: '请输入酒店名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入酒店类型', trigger: 'blur' }],
        location: [{ required: true, message: '请输入酒店地址', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        url: [{ required: true, message: '请输入酒店网址', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入酒店介绍', trigger: 'blur' }]
      },
      data: {
        image: null,
        name: '',
        type: '',
        location: '',
        tel: '',
        url: '',
        introduce: ''
      }
    }
  },
  watch: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.data.price = this.data.price * 100
          service.post('/hotel/save', this.data).then(res => {
            this.loading = false
            this.$emit('onSubmit')
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
      this.$set(this.data, 'image', image)
      this.$refs.form.validateField('image')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
