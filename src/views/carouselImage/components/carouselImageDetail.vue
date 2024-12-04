<template>
  <div v-loading="loading">
    <el-form ref="form" :model="data" label-width="80px">
      <el-form-item prop="url" label="轮播图">
        <el-image
          :src="baseUrl + data.url"
          fit="contain"
          style="width: 100%;"
          :preview-src-list="[baseUrl + data.url]"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {
    parentData: {
      type: Object,
      required: true
    }
  },
  data() {
    const baseUrl = process.env.VUE_APP_HTTP_LOCATION
    return {
      baseUrl: baseUrl,
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
