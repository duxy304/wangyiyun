<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span class="all">播放全部</span>
        <span class="total">(共{{itemlist.length}}首)</span>
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao"></use>
        </svg>
        <span>收藏({{changeCount(subscribedCount)}})</span>
      </div>
    </div>
    <div class="itemContent" v-for="(item, i) in itemlist" :key="i">
      <div class="contentLeft" @click="playMusic(i)">
        <span>{{ i + 1}}</span>
        <div class="song">
          <p class="songName">{{item.name}}</p>
          <span class="singer" v-for="(item, index) in item.ar" :key="index">{{item.name + ' '}}</span>
        </div>
      </div>
      <div class="contentRight">
        <svg class="icon mv" aria-hidden="true" v-if="item.mv != 0">
          <use xlink:href="#icon-bofangMV"></use>
        </svg>
        <svg class="icon list" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  setup(props) {
    console.log(props)
    // 对收藏量的处理
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    return {changeCount}
  },
  props: ['itemlist', 'subscribedCount'],
  methods: {
    ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
    playMusic(i) {
      this.updatePlayList(this.itemlist)
      this.updatePlayListIndex(i)
    }
  }
}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  // height: 10rem;
  background-color: #fff;
  padding: 0.2rem;
  margin-top: .2rem;
  margin-bottom: 1.4rem;
  border-top-left-radius: .4rem;
  border-top-right-radius: .4rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 3rem;
      height: 100%;
      line-height: 1rem;
      .icon {
        vertical-align: middle;
        margin-right: 0.35rem;
        stroke: #333333;
        stroke-width: 20;
      }
      .all {
        font-size: 0.3rem;
        font-weight: 700;
      }
      .total {
        font-size: 0.24rem;
        color: #999;
      }
    }
    .listRight {
      width: 2.2rem;
      height: 0.8rem;
      border-radius: 1.2rem;
      background-color: red;
      text-align: center;
      line-height: 0.8rem;
      color: #fff;
      font-size: 0.28rem;
      .icon {
        width: 0.32rem;
        height: 0.32rem;
        vertical-align: middle;
        margin-right: 0.1rem;
        fill: #fff;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }
  .itemContent {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .contentLeft {
      display: flex;
      align-items: center;
      .song {
        margin-left: 0.2rem;
        font-size: .28rem;
        font-weight: 700;
        .singer {
          color: #aaa;
          font-size: .24rem;
        }
      }
    }
    .contentRight {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .icon {
        font-size: .36rem;
        fill: #999;
      }
      .mv {
        position: absolute;
        left: 0;
      }
      .list {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>