<template>
  <div class="layout-container">
    <router-view></router-view>

    <!-- 底部标签栏 -->
    <van-tabbar class="bottom-navbar" v-model="active" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span>{{ user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  name: 'layoutIndex',
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less"></style>
