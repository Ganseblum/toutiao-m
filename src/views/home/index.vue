<template>
  <div class="home-container">
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Channel
        :channel="ChannerlList"
        :active="active"
        @updataChannel="changeChannel"
      ></Channel>
    </van-popup>

    <!-- 搜索栏 -->
    <van-nav-bar class="nav-bar" fixed>
      <div slot="title">
        <van-button type="info" round class="search-btn" to="/search">
          <i slot="icon" class="toutiao toutiao-sousuo"></i>
          搜索</van-button
        >
      </div>
    </van-nav-bar>

    <!-- 标签栏 -->
    <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
    <van-tabs v-model="active" swipeable animated class="nav-tabs">
      <van-tab v-for="item in ChannerlList" :key="item.id" :title="item.name"
        ><article-list :channels="item"></article-list>
      </van-tab>

      <div slot="nav-right" class="blank"></div>
      <div slot="nav-right" class="hamburger-btn" @click="showPopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>
<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article.vue'
import Channel from './components/channel.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  components: {
    ArticleList,
    Channel
  },
  props: {},
  name: 'homeIndex',
  data() {
    return {
      active: 0,
      show: false,
      ChannerlList: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  methods: {
    async getChannerlsList() {
      try {
        if (this.user) {
          console.log(1)
          const { data } = await getUserChannels()
          this.ChannerlList = data.data.channels
        } else {
          const localChannel = getItem('TOKEN_Channel')
          if (localChannel) {
            this.ChannerlList = localChannel
          } else {
            const { data } = await getUserChannels()
            this.ChannerlList = data.data.channels
          }
        }
      } catch (err) {
        this.$toast('删除频道失败，请稍后重试')
      }
    },
    // 控制弹出层
    showPopup() {
      this.show = true
    },
    changeChannel(index, statue) {
      this.show = statue

      this.active = index
    }
  },
  created() {
    this.getChannerlsList()
  },
  mounted() {}
}
</script>
<style scoped lang="less">
.home-container {
  position: relative;
  padding: 210px 0 100px 0;
  /deep/ .nav-bar {
    background-color: blue;
    .search-btn {
      color: white;
      width: 300px;
      height: 60px;
      .toutiao {
        font-size: 30px;
      }
    }
  }
  /deep/.van-tabs__wrap {
    position: fixed;
    z-index: 100;
    top: 90px;
    left: 0;
    right: 0;
    padding-bottom: 100px;
  }

  /deep/.nav-tabs {
    .van-tab {
      min-width: 180px;
    }
    .blank {
      flex-shrink: 0;
      width: 66px;
      height: 88px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 88px;
      background-color: white;
      opacity: 0.8;
    }
  }

  /deep/ .van-tab--active {
    color: red !important;
  }
  /deep/.van-tab {
    color: gray;
  }
}
</style>
