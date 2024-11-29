<template>
  <el-upload
    list-type="picture-card"
    action=""
    :http-request="uploadFile"
    :limit="1"
    :file-list="imageList"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :class="{ hide: hideUpload }"
    :disabled="disabled"
  >
    <i class="el-icon-plus" />
  </el-upload>
</template>

<script>
import { Message } from 'element-ui'
import service from '@/utils/request'

export default {
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const baseUrl = process.env.VUE_APP_HTTP_LOCATION
    return {
      baseUrl: baseUrl,
      imageList: this.value ? [{ name: 'Uploaded Image', url: baseUrl + this.value }] : [], // 初始化imageList，只需要初始化一次用来回显
      hideUpload: !!this.value // 如果有值，则隐藏上传按钮
    }
  },
  watch: {
    value(newVal) {
      this.imageList = this.value ? [{ name: 'Uploaded Image', url: this.baseUrl + this.value }] : [] // 初始化imageList，只需要初始化一次用来回显(防止异步查询问题)
      console.log(this.imageList)
      this.hideUpload = !!newVal
    }
  },
  methods: {
    uploadFile({ file, onSuccess, onError }) {
      const formData = new FormData()
      formData.append('file', file)
      service.post('/file/upload', formData)
        .then(res => {
          this.handleSuccess(res)
          // onSuccess(res)
        })
        .catch(error => {
          this.handleError(error)
          // onError(error)
        })
    },
    handleSuccess(response, file, fileList) {
      if (response.data) {
        this.$emit('updateImage', response.data)
        Message.success('上传成功')
        this.hideUpload = true
      } else {
        Message.error('上传成功但未返回URL')
      }
    },
    handleError(err, file, fileList) {
      console.log(err)
      Message.error('上传失败，请重试')
    },
    handleRemove() {
      this.$emit('updateImage', null)
      this.hideUpload = false
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        Message.error('上传文件必须是图片')
      }
      this.uploadFile({ file })
      return false // 禁止el-upload默认上传行为，改为自定义行为
    }
  }
}
</script>

<style scoped>

::v-deep.hide .el-upload--picture-card {
  display: none;
}

</style>
