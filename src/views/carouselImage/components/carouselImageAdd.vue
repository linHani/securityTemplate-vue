<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="url" label="轮播图">
        <UploadSingleImage
          v-model="data.url"
          @updateImage="updateImage"
        />
      </el-form-item>
      <el-form-item>
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
      if (this.data.url === null || this.data.url === undefined) {
        callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      rules: {
        url: [{ required: true, validator: validateImage, trigger: 'blur' }]
      },
      data: {}
    }
  },
  watch: {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.data.price = this.data.price * 100
          console.log(this.data)
          service.post('/carouselImage/save', this.data).then(res => {
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
      this.$set(this.data, 'url', image)
      this.$refs.form.validateField('url')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
