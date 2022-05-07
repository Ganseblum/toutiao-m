<template>
  <div class="search-history">
    <van-cell value="删除全部">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">全部历史记录</span>
      </template>
    </van-cell>

    <van-cell v-for="(item, index) in myhistory" :key="index">
      <div slot="title">{{ item }}</div>

      <template #right-icon>
        <van-icon name="close" class="search-icon" @click="del(index)" />
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  name: 'searchHistory',
  data() {
    return {
      myhistory: this.searchHistorys
    }
  },
  computed: {},
  watch: {},
  methods: {
    del(index) {
      this.myhistory.splice(index, 1)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less"></style>
