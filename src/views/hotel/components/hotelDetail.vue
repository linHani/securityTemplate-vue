<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item prop="image" label="酒店图片">
        <UploadSingleImage
          v-model="data.image"
          :disabled="true"
        />
      </el-form-item>
      <el-form-item label="酒店名称">
        <el-input v-model="data.name" disabled />
      </el-form-item>
      <el-form-item label="酒店类型">
        <el-input v-model="data.type" disabled />
      </el-form-item>
      <el-form-item label="酒店地址">
        <el-input v-model="data.location" disabled />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="data.tel" disabled />
      </el-form-item>
      <el-form-item label="酒店网址">
        <el-input v-model="data.url" disabled />
      </el-form-item>
      <el-form-item label="酒店介绍">
        <el-input v-model="data.introduce" disabled />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    return {
      data: this.parentData,
      loading: false
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped lang="scss">

</style>
