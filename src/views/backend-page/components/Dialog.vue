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
    @opened="initElem(false)"
    @close="initElem(true)"
  >
    <div v-loading="loading">
      <el-form ref="form" :model="formInfo[dialog.routePath]" :rules="rules" label-width="150px">
        <!-- 景点管理 -->
        <div v-if="dialog.routePath === '/place-interest'" class="form-info">
          <el-form-item prop="name" label="景点名称">
            <el-input v-model="formInfo[dialog.routePath].name" />
          </el-form-item>
          <el-form-item prop="type" label="景点类型">
            <el-input v-model="formInfo[dialog.routePath].type" />
          </el-form-item>
          <el-form-item prop="level" label="景点等级">
            <el-input v-model="formInfo[dialog.routePath].level" />
          </el-form-item>
          <el-form-item prop="location" label="景点地址">
            <el-input v-model="formInfo[dialog.routePath].location" />
          </el-form-item>
          <el-form-item prop="price" label="门票价格">
            <el-input v-model="formInfo[dialog.routePath].price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="stock" label="门票库存">
            <el-input-number v-model="formInfo[dialog.routePath].stock" :min="0" :controls="false" />
          </el-form-item>
          <el-form-item prop="openTime" label="开放时间">
            <el-date-picker
              v-model="formInfo[dialog.routePath].openTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item prop="precautions" label="注意事项">
            <el-input v-model="formInfo[dialog.routePath].precautions" />
          </el-form-item>
          <el-form-item prop="trafficGuide" label="交通指南">
            <el-input v-model="formInfo[dialog.routePath].trafficGuide" />
          </el-form-item>
          <el-form-item prop="introduce" label="景点介绍">
            <el-input v-model="formInfo[dialog.routePath].introduce" />
          </el-form-item>
        </div>
        <!-- 路线管理 -->
        <div v-if="dialog.routePath === '/itinerary'" class="form-info">
          <el-form-item prop="name" label="旅游线路名称">
            <el-input v-model="formInfo[dialog.routePath].name" />
          </el-form-item>
          <el-form-item prop="scenicSpotName" label="旅游景点名称">
            <el-input v-model="formInfo[dialog.routePath].scenicSpotName" />
          </el-form-item>
          <el-form-item prop="beginSpot" label="旅游出发地">
            <el-input v-model="formInfo[dialog.routePath].beginSpot" />
          </el-form-item>
          <el-form-item prop="waySpot" label="旅游线路途径">
            <el-input v-model="formInfo[dialog.routePath].waySpot" />
          </el-form-item>
          <el-form-item prop="endSpot" label="旅游线路目的地">
            <el-input v-model="formInfo[dialog.routePath].endSpot" />
          </el-form-item>
          <el-form-item prop="traffic" label="旅游线路交通方式">
            <el-input v-model="formInfo[dialog.routePath].traffic" />
          </el-form-item>
          <el-form-item prop="introduce" label="旅游线路介绍">
            <el-input v-model="formInfo[dialog.routePath].introduce" />
          </el-form-item>
          <el-form-item prop="startTime" label="旅游线路出发时间">
            <el-date-picker
              v-model="formInfo[dialog.routePath].startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期时间"
            />
          </el-form-item>
          <el-form-item prop="price" label="门票价格">
            <el-input v-model="formInfo[dialog.routePath].price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="stock" label="门票库存">
            <el-input v-model="formInfo[dialog.routePath].stock" />
          </el-form-item>
          <el-form-item prop="type" label="旅游线路类型">
            <el-input v-model="formInfo[dialog.routePath].type" />
          </el-form-item>
          <el-form-item prop="introduce" label="酒店介绍">
            <el-input v-model="formInfo[dialog.routePath].introduce" />
          </el-form-item>
        </div>
        <!-- 酒店 -->
        <div v-if="dialog.routePath === '/hotelList'" class="form-info">
          <el-form-item prop="name" label="酒店名称">
            <el-input v-model="formInfo[dialog.routePath].name" />
          </el-form-item>
          <el-form-item prop="type" label="酒店类型">
            <el-input v-model="formInfo[dialog.routePath].type" />
          </el-form-item>
          <el-form-item prop="tel" label="联系电话">
            <el-input v-model="formInfo[dialog.routePath].tel" />
          </el-form-item>
          <el-form-item prop="url" label="酒店网址">
            <el-input v-model="formInfo[dialog.routePath].url" />
          </el-form-item>
          <el-form-item prop="location" label="酒店地址">
            <el-input v-model="formInfo[dialog.routePath].location" />
          </el-form-item>
        </div>
        <!-- 攻略 -->
        <div v-if="dialog.routePath === '/information'" class="form-info">
          <el-form-item prop="title" label="攻略标题">
            <el-input v-model="formInfo[dialog.routePath].title" />
          </el-form-item>
          <el-form-item prop="type" label="攻略类型">
            <el-input v-model="formInfo[dialog.routePath].type" />
          </el-form-item>
          <el-form-item prop="context" label="攻略内容">
            <el-input v-model="formInfo[dialog.routePath].context" />
          </el-form-item>
        </div>
        <el-form-item prop="image" label="图片">
          <UploadSingleImage
            v-model="formInfo[dialog.routePath].image"
            @updateImage="updateImage"
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button @click="initElem(true)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import service from '@/utils/request'
import { validInt, validInt2s, validPhone } from '@/utils/validate'
import UploadSingleImage from '@/components/Upload/UploadSingleImage.vue'

export default {
  components: { UploadSingleImage },
  props: {
    dialog: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateImage = (rule, value, callback) => {
      if (this.formInfo[this.dialog.routePath].image === null || this.formInfo[this.dialog.routePath].image === undefined) {
        callback(new Error('图片不能为空'))
      } else {
        callback()
      }
    }
    return {
      baseUrl: process.env.VUE_APP_HTTP_LOCATION,
      loading: false,
      formInfo: {
        // 轮播图
        '/carouselImageList': {
          image: null
        },
        // 景点
        '/place-interest': {
          image: null,
          name: '',
          type: '',
          level: '',
          location: '',
          price: '',
          stock: '',
          openTime: '',
          precautions: '',
          trafficGuide: '',
          introduce: ''
        },
        // 路线
        '/itinerary': {
          image: null,
          name: '',
          type: '',
          scenicSpotName: '',
          beginSpot: '',
          waySpot: '',
          endSpot: '',
          traffic: '',
          price: '',
          stock: '',
          introduce: '',
          startTime: ''
        },
        // 酒店
        '/hotelList': {
          image: null,
          name: '',
          type: '',
          tel: '',
          url: '',
          location: '',
          introduce: ''
        },
        // 攻略
        '/information': {
          image: null,
          title: '',
          type: '',
          context: ''
        }
      },
      rules: {
        // 景点
        image: [{ required: true, validator: validateImage, trigger: 'blur' }],
        name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        level: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        location: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        price: [{ required: true, message: '必填项不能为空', trigger: 'blur' },
          { required: true, validator: validInt2s, trigger: 'blur' }
        ],
        stock: [{ required: true, message: '必填项不能为空', trigger: 'blur' },
          { required: true, validator: validInt, trigger: 'blur' }
        ],
        openTime: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        precautions: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        trafficGuide: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        // 路线
        scenicSpotName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        beginSpot: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        waySpot: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        endSpot: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        traffic: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        startTime: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        // 酒店
        url: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        tel: [{ required: true, message: '必填项不能为空', trigger: 'blur' },
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        // 攻略
        title: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
        context: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    initElem(flag) {
      this.$nextTick(() => {
        this.resetForm(flag)
      })
    },
    onSubmit(formName) {
      const api = {
        '/carouselImageList': '/carouselImage/save',
        '/place-interest': '/scenicSpot/save',
        '/itinerary': '/touristRoutes/save',
        '/hotelList': '/hotel/save',
        '/information': '/touristGuide/save'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.dialog.handleType === 'edit') {
            this.formInfo[this.dialog.routePath].id = this.dialog.dataList.id
          }
          this.loading = true
          const params = { ...this.formInfo[this.dialog.routePath] }

          if ('price' in params) params.price = params.price * 100
          if ('stock' in params) params.stock = params.stock * 1
          if ('startTime' in params) params.startTime = `${params.startTime}:00`
          service.post(api[this.dialog.routePath], params).then(res => {
            if (res.code === 200) {
              this.$parent.getList(true)
              this.loading = false
              this.$message.success('提交成功')
              this.dialog.visible = false
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
    resetForm(isReset) {
      this.formInfo = {
        // 轮播图
        '/carouselImageList': {
          image: null
        },
        // 景点
        '/place-interest': {
          image: null,
          name: '',
          type: '',
          level: '',
          location: '',
          price: '',
          stock: '',
          openTime: '',
          precautions: '',
          trafficGuide: '',
          introduce: ''
        },
        // 路线
        '/itinerary': {
          image: null,
          name: '',
          type: '',
          scenicSpotName: '',
          beginSpot: '',
          waySpot: '',
          endSpot: '',
          traffic: '',
          price: '',
          stock: '',
          introduce: '',
          startTime: ''
        },
        // 酒店
        '/hotelList': {
          image: null,
          name: '',
          type: '',
          tel: '',
          url: '',
          location: '',
          introduce: ''
        },
        // 攻略
        '/information': {
          image: null,
          title: '',
          type: '',
          context: ''
        }
      }
      if (isReset) {
        this.$nextTick(() => {
          this.$refs.form.resetFields()
        })
        return
      }
      if (this.dialog.handleType === 'edit') {
        const dataList = JSON.parse(JSON.stringify(this.dialog.dataList))
        console.log('dataList: ', dataList)
        for (const key in dataList) {
          if (key in this.formInfo[this.dialog.routePath]) {
            if (key === 'price' && dataList[key]) {
              this.formInfo[this.dialog.routePath][key] = dataList[key] / 100
            } else if (key === 'startTime' && dataList[key]) {
              this.formInfo[this.dialog.routePath][key] = dataList[key].slice(0, -3)
            } else {
              this.formInfo[this.dialog.routePath][key] = dataList[key]
            }
          }
          if (key === 'url' && dataList[key]) {
            this.formInfo[this.dialog.routePath]['image'] = this.baseUrl + dataList[key]
          }
        }
      }
    },
    updateImage(image) {
      this.$set(this.formInfo[this.dialog.routePath], 'image', image)
      this.$refs.form.validateField('image')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
