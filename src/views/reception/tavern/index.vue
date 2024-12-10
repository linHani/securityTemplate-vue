<template>
  <div>
    <HeaderRoute :path="this.$route.path" />
    <SceneryList :card-list="cardList" :is-show-page="true" />
  </div>
</template>

<script>
import HeaderRoute from '@/components/ReceptionTopRoute'
import SceneryList from '@/components/SceneryList/index.vue'
export default {
  name: '',
  components: { HeaderRoute, SceneryList },
  data() {
    return {
      cardList: [
        {
          place: '红石崖',
          url: 'https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF',
          description: '这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1'
        },
        {
          place: '延安',
          url: 'https://t7.baidu.com/it/u=1785207335,3397162108&fm=193&f=GIF',
          description: '这是图片2这是图片2这是图片2这是图片2这是图片2这是图片2'
        },
        {
          place: '伊犁',
          url: 'https://t7.baidu.com/it/u=3423293041,3900166648&fm=193&f=GIF',
          description: '这是图片3这是图片3这是图片3这是图片3这是图片3这是图片3'
        },
        {
          place: '内蒙',
          url: 'https://t7.baidu.com/it/u=1732966997,2981886582&fm=193&f=GIF',
          description: '这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1这是图片1'
        },
        {
          place: '河北',
          url: 'https://t7.baidu.com/it/u=1785207335,3397162108&fm=193&f=GIF',
          description: '这是图片2这是图片2这是图片2这是图片2这是图片2这是图片2'
        },
        {
          place: '湖南',
          url: 'https://t7.baidu.com/it/u=3423293041,3900166648&fm=193&f=GIF',
          description: '这是图片3这是图片3这是图片3这是图片3这是图片3这是图片3'
        }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang='' scoped>

</style>
