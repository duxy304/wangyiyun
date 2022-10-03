<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" :show-indicators="false" class="mySwiper">
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{path:'/itemmusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="">
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              {{changeCount(item.playCount)}}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home'
import { reactive, onMounted } from 'vue'

export default {
  // vue2
  // data() {
  //   return {
  //     musicList: []
  //   }
  // },
  // methods: {
  //   async getGedan() {
  //     let res = await getMusicList()
  //     console.log(res)
  //     this.musicList = res.data.result
  //   },
  //   changeCount(num) {
  //     if (num >= 100000000) {
  //       return (num / 100000000).toFixed(1) + '亿'
  //     } else if (num >= 10000) {
  //       return (num / 10000).toFixed(1) + '万'
  //     }
  //   }
  // },
  // mounted() {
  //   this.getGedan()
  // }

  // vue3
  setup() {
    const state = reactive({
      musicList: []
    })
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    onMounted(async () => {
      let res = await getMusicList()
      state.musicList = res.data.result
    })
    return { state, changeCount }
  }
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  margin-bottom: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    .mySwiper {
      position: relative;
      height: 100%;
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.3rem;
        padding: 0 0.1rem;
      }
      .playCount {
        position: absolute;
        top: 0.04rem;
        right: 0.2rem;
        color: #fff;
        .icon {
          width: 0.4rem;
          height: 0.4rem;
          fill: #fff;
          vertical-align: middle;
        }
      }
      .name {
        display: block;
        width: 100%;
        padding-left: 0.2rem;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box; //必须结合的属性 ，将对象作为弹性伸缩盒子模型显示
        -webkit-line-clamp: 2; //用来限制在一个块元素显示的文本的行数
        -webkit-box-orient: vertical; // 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式
      }
    }
  }
}
</style>