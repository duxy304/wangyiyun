<template>
  <img :src="user.data.profile.avatarUrl" alt="">
  <div>{{user.data.profile.nickname}}</div>
  <div>用户中心</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>