<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        background="blue"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
      />
    </form>

    <!-- 搜索结果 -->

    <search-result
      v-if="isSearchResult"
      :searchText="searchText"
    ></search-result>

    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
    ></search-suggestion>

    <!-- 搜索历史 -->
    <search-history :searchHistorys="searchHistorys" v-else></search-history>
  </div>
</template>
<script>
import searchHistory from './components/search-history.vue'
import searchResult from './components/search-result.vue'
import searchSuggestion from './components/search-suggestion'
import { setItem, getItem } from '../../utils/storage.js'
export default {
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  props: {},
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      isSearchResult: false,
      searchHistorys: getItem('serach-histories') || []
    }
  },
  computed: {},
  watch: {
    searchHistorys(val) {
      // 同步到本地存储
      setItem('serach-histories', val)
    }
  },
  methods: {
    onSearch(val) {
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistorys.indexOf(val)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(val)
      this.isSearchResult = true
    },
    onCancel() {
      this.$router.back()
    },
    onInput() {
      if (this.searchText === '') {
        this.isSearchResult = false
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less">
.search-container {
  /deep/ .van-search__action {
    color: white;
  }
}
</style>
