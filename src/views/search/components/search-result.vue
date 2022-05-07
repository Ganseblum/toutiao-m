<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>
<script>
import { getSeatchResult } from '@/api/search.js'
export default {
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'searchResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad() {
      const { data } = await getSeatchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      const results = data.data.results
      console.log(results)
      this.list.push(...results)
      console.log(this.list)

      // 加载结束
      this.loading = false

      // 判断是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.$toast('没有该内容')
        this.finished = true
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less"></style>
