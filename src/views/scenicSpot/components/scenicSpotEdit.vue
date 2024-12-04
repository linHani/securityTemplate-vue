<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item prop="image" label="景点图片">
        <UploadSingleImage
          v-model="data.image"
          @updateImage="updateImage"
        />
      </el-form-item>
      <el-form-item prop="name" label="景点名称">
        <el-input v-model="data.name" />
      </el-form-item>
      <el-form-item prop="type" label="景点类型">
        <el-input v-model="data.type" />
      </el-form-item>
      <el-form-item prop="level" label="景点等级">
        <el-input v-model="data.level" />
      </el-form-item>
      <el-form-item prop="location" label="景点地址">
        <el-input v-model="data.location" />
      </el-form-item>
      <el-form-item prop="price" label="门票价格(元)">
        <el-input v-model="data.price" type="number" />
      </el-form-item>
      <el-form-item prop="stock" label="门票库存">
        <el-input v-model="data.stock" type="number" />
      </el-form-item>
      <el-form-item prop="openTime" label="开放时间">
        <el-input v-model="data.openTime" />
      </el-form-item>
      <el-form-item prop="precautions" label="注意事项">
        <el-input v-model="data.precautions" />
      </el-form-item>
      <el-form-item prop="trafficGuide" label="交通指南">
        <el-input v-model="data.trafficGuide" />
      </el-form-item>
      <el-form-item prop="introduce" label="景点介绍">
        <el-input v-model="data.introduce" />
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
  props: {
    parentData: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateImage = (rule, value, callback) => {
      if (this.data.image === null || this.data.image === undefined) {
        callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    const validatePositiveNumber = (rule, value, callback) => {
      if (value <= 0) {
        callback(new Error('值必须大于0'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      rules: {
        image: [{ required: true, validator: validateImage, trigger: 'blur' }],
        name: [{ required: true, message: '请输入景点名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入景点类型', trigger: 'blur' }],
        level: [{ required: true, message: '请输入景点等级', trigger: 'blur' }],
        location: [{ required: true, message: '请输入景点地址', trigger: 'blur' }],
        price: [
          { required: true, message: '请输入门票价格', trigger: 'blur' },
          { validator: validatePositiveNumber, trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入门票库存', trigger: 'blur' },
          { validator: validatePositiveNumber, trigger: 'blur' }
        ],
        openTime: [{ required: true, message: '请输入开放时间', trigger: 'blur' }],
        precautions: [{ required: true, message: '请输入注意事项', trigger: 'change' }],
        trafficGuide: [{ required: true, message: '请输入交通指南', trigger: 'change' }],
        introduce: [{ required: true, message: '请输入景点介绍', trigger: 'change' }]
      },
      data: this.parentData
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
          service.post('/scenicSpot/save', this.data).then(res => {
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
