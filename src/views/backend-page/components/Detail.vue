<!--
 * @Description: 详情弹窗组件
 * @Author: zhaoqi
 * @Date: 2023-08-23 15:04:42
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-11 16:25:22
-->
<template>
  <el-dialog
    v-if="dialog.visible"
    :visible.sync="dialog.visible"
    :title="dialog.title"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    class="max-dialog"
    top="50px"
    center
    @open="initElem()"
    @close="close()"
  >
    <el-descriptions
      :column="2"
      border
    >
      <el-descriptions-item
        v-for="item in dialog.detailList"
        :key="item.prop"
        :label="item.label"
        label-align="center"
        align="center"
        label-class-name="label"
        content-class-name="content"
      >
        <div v-if="item.type === 'img'">
          <el-image :src="baseUrl + dialog.dataList[item.prop]" :preview-src-list="[baseUrl + dialog.dataList[item.prop]]" style="width: 30px; height: 30px" />
        </div>
        <span v-else-if="item.type === 'money'">{{ dialog.dataList[item.prop]/100 }}元</span>
        <div v-else class="value">{{ dialog.dataList[item.prop] || dialog.dataList[item.prop] === 0 ? dialog.dataList[item.prop] : '--' }}</div>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      default: null
    }
  },
  // 数据展示
  data() {
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION
    }
  },
  mounted() {
  },
  methods: {
    // 初始化
    initElem() {
      console.log(111)
    },
    // 关闭
    close() {
    }
  }

}
</script>

<style lang='scss' scoped>
::v-deep .el-descriptions__table {
  .label {
    width: 20%;
    .text {
      width: 100%;
    }
  }
  .content {
    width: 30%;
    .value {
      width: 100%;
      text-align: left;
    }
  }
}
</style>
