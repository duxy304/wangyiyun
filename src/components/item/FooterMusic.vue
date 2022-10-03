<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <p>{{playList[playListIndex].name}}</p>
        <span>横滑可以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isBtnShow" @click="play">
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
      <MusicDetail :musicList="playList[playListIndex]" :play="play" :isBtnShow="isBtnShow" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'

export default {
  data() {
    return {
      interVal: 0
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isBtnShow', 'detailShow', 'currentTime', 'duration'])
  },
  components: {
    MusicDetail
  },
  mounted() {
    console.log(this.$refs)
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    ...mapMutations(['updateIsBtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration']),
    play() {
      // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsBtnShow(false)
        this.updateTime()  // 播放调用函数进行传值
      } else {
        this.$refs.audio.pause()
        this.updateIsBtnShow(true)
        clearInterval(this.interVal) // 暂停清除定时器
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
     },
    updateTime() {
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    }
  },
  watch: {
    playListIndex() {
      // 监听如果下标发生改变，就自动播放音乐
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.updateIsBtnShow(false)
      }
    },
    playList() {
      if (this.isBtnShow) {
        this.$refs.audio.autoplay = true
        this.updateIsBtnShow(false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 48%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    span {
      font-size: 0.24rem;
      color: #999;
    }
  }
  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>