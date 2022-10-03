<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>

</template>

<script>
import { getBanner } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'

export default {
  setup() {
    const state = reactive({
      images: ['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg']
    })
    onMounted(async () => {
      // axios.get('/banner?type=2').then(res => {
      //   console.log(res.data)
      //   state.images = res.data.banners
      // })
      let res = await getBanner()
      state.images = res.data.banners
    })
    return { state }
  }
}
</script>

<style lang="less" scoped>
.van-swipe {
  width: 100%;
  padding: 0.2rem 0;
  .van-swipe__track {
    .van-swipe-item {
      img {
        width: 100%;
        height: 3rem;
      }
    }
  }
}
</style>