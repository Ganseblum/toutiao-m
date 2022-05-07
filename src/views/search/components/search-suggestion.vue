<template>
  <div class="search-suggestion">
    <van-cell-group>
      <van-cell v-for="(item, index) in list" :key="index">
        <div slot="title" v-html="highlight(item, searchText)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  name: 'searchSuggestion',
  data() {
    return {
      list: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        this.getSuggestList(value)
      }, 200),

      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    // 获取搜索建议
    async getSuggestList(q) {
      try {
        const { data } = await getSuggestions(q)

        this.list = data.data.options
        if (!this.list.length) {
          this.list = { suggest: '没有匹配的建议' }
        }
      } catch (err) {
        console.log('请求错误', err)
      }
    },
    // 参数 source: 原始字符串
    // 参数 keyword: 需要高亮的关键词
    // 返回值：替换之后的高亮字符串
    highlight(source, keyword) {
      // /searchContent/ 正则表达式中的一切内容都会当做字符串使用
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写

      if (this.list[0] == null) {
        return '没有匹配的结果'
      } else {
        const reg = new RegExp(keyword, 'gi')
        return source.replace(
          reg,
          `<span style="color: #3296fa">${keyword}</span>`
        )
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less"></style>
