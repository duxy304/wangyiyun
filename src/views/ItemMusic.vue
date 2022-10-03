<template>
  <ItemMusicTop :playlist="state.playList"></ItemMusicTop>
  <ItemMusicList :itemlist="state.itemList" :subscribedCount="state.playList.subscribedCount"></ItemMusicList>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicItemList, getItemList } from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'

export default {
  setup() {
    const state = reactive({
      playList: [], // 歌单的详情页的数据
      itemList: [] // 歌单的歌曲
    })
    onMounted(async () => {
      let id = useRoute().query.id
      // 获取歌单详情
      let res = await getMusicItemList(id)
      state.playList = res.data.playlist
      // 获取歌单的歌曲
      let result = await getItemList(id)
      state.itemList = result.data.songs
      // 防止页面刷新，数据丢失，将数据保存到 sessionStorage 中
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    })
    return { state }
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  }
}
</script>

<style>
</style>