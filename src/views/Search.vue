<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="王俊凯" v-model="searchKey" @keyup.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">历史</span>
    <span v-for="item in keyWordList" :key="item" class="spanKey" @click="searchHistory(item)">
      {{ item }}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu1"></use>
    </svg>
  </div>
  <div class="itemContent" v-for="(item, i) in searchList" :key="i">
    <div class="contentLeft" @click="updateIndex(item)">
      <span>{{ i + 1}}</span>
      <div class="song">
        <p class="songName">{{item.name}}</p>
        <span class="singer" v-for="(item, index) in item.artists" :key="index">{{item.name + ' '}}</span>
      </div>
    </div>
    <div class="contentRight">
      <svg class="icon mv" aria-hidden="true" v-if="item.mvid != 0">
        <use xlink:href="#icon-bofangMV"></use>
      </svg>
      <svg class="icon list" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from '@/request/api/home.js'

export default {
  data() {
    return {
      keyWordList: [],
      searchKey: '',
      searchList: []
    }
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) ? JSON.parse(localStorage.getItem('keyWordList')) : []
  },
  methods: {
    async enterKey() {
      if (this.searchKey !== '') {
        this.keyWordList.unshift(this.searchKey)
        // 去重
        this.keyWordList = [...new Set(this.keyWordList)]
        // 固定长度
        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1)
        }
        localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
        let res = await getSearchMusic(this.searchKey)
        this.searchList = res.data.result.songs
        this.searchKey = ''
      }
    },
    delHistory() {
      localStorage.removeItem('keyWordList')
      this.keyWordList = []
    },
    async searchHistory(item) {
      let res = await getSearchMusic(item)
      this.searchList = res.data.result.songs
    },
    updateIndex(item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('pushPlayList', item)
      this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
    }
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(143, 131, 131);
    border-radius: 0.4rem;
    margin: 0.1rem 0.1rem;
    display: inline-block;
  }
  .icon {
    width: 0.35rem;
    height: 0.35rem;
    position: absolute;
    right: 0.3rem;
  }
}
.itemContent {
  width: 100%;
  height: 1rem;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .contentLeft {
    display: flex;
    align-items: center;
    .song {
      margin-left: 0.2rem;
      font-size: 0.28rem;
      font-weight: 700;
      .singer {
        color: #aaa;
        font-size: 0.24rem;
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
      font-size: 0.36rem;
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
</style>