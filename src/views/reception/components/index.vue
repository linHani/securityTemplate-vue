<!--
 * @Description: 预约弹窗
 * @Author: zhaoqi
 * @Date: 2024-12-13 15:47:48
 * @LastEditors: zhaoqi
 * @LastEditTime: 2024-12-14 10:44:05
-->
<template>
  <el-dialog
    v-if="dialog.visible"
    :visible.sync="dialog.visible"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :title="dialog.title"
    top="50px"
    center
    class="max-dialog"
    @close="resetForm()"
  >
    <div v-loading="loading">
      <el-form ref="form" :model="formInfo" :rules="rules" label-width="150px">
        <div class="form-info">
          <el-form-item prop="realName" label="联系人姓名">
            <el-input v-model="formInfo.realName" />
          </el-form-item>
          <el-form-item prop="tel" label="联系方式">
            <el-input v-model="formInfo.tel" />
          </el-form-item>
          <el-form-item prop="num" label="下单数量">
            <el-input v-model="formInfo.num" />
          </el-form-item>
        </div>
        <el-form-item class="submit">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button @click="resetForm(true)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import service from '@/utils/request'
import { validInt, validPhone } from '@/utils/validate'

export default {
  props: {
    dialog: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION,
      loading: false,
      formInfo: {
        businessId: '',
        realName: '',
        tel: '',
        num: '',
        type: ''
      },
      rules: {
        realName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        tel: [
          { required: true, message: '必填项不能为空', trigger: 'blur' },
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        num: [{ required: true, message: '必填项不能为空', trigger: 'blur' },
          { required: true, validator: validInt, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const typeObj = {
            '/home': '景点门票',
            '/scenic': '景点门票',
            '/travel': '旅游线路'
          }
          const params = {
            businessId: this.dialog.dataList.id,
            realName: this.formInfo.realName,
            tel: this.formInfo.tel,
            num: this.formInfo.num * 1,
            type: typeObj[this.dialog.routePath]
          }
          console.log('params: ', params)

          service.post(`/order/saveReal`, params).then(res => {
            if (res.code === 200) {
              this.$parent.initvalue()
              this.loading = false
              this.$message.success('提交成功')
              this.resetForm()
            }
          }).catch(error => {
            console.log(error)
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm(flag) {
      flag = flag || false
      this.formInfo = {
        businessId: '',
        realName: '',
        tel: '',
        num: '',
        type: ''
      }
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
      if (!flag) {
        this.dialog.visible = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
