<template>
  <div class="article-container">
    <van-pull-refresh
      v-model="isloading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getUserArticles } from '@/api/user.js'
import ArticleItem from '@/components/article-item'

export default {
  components: {
    ArticleItem
  },
  props: {
    channels: {
      type: Object,
      required: true
    }
  },
  name: 'MyArticle',
  data() {
    return {
      list: [],
      loading: false,
      isloading: false,
      finished: false,
      timestamp: null,
      error: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getUserArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now()
        })

        // 添加错误 测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('aaa')
        // }
        const results = data.data.results
        this.list.push(...results)
        this.loading = false

        // 断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },

    async onRefresh() {
      try {
        const { data } = await getUserArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now()
        })

        // 添加错误 测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('aaa')
        // }

        const results = data.data.results
        this.list.unshift(...results)
        this.timestamp = data.data.pre_timestamp
        this.isloading = false

        // if (this.list.length >= 40) {
        //   this.finished = true
        // }
      } catch (err) {
        this.error = true
        this.isloading = false
        this.$toast('刷新失败')
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less">
.article-container {
  // 记住列表的滚动
  // 产生自己的滚动容器
  height: 79vh;
  overflow-y: auto;
}
</style>
