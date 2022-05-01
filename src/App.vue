<template>
  <div id="app">
    <!-- 路由的出口 -->
    <router-view />
    <van-cell-group inset>
    <i class="toutiao toutiao-shipin"></i>
    <h1>黑马头条</h1>
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
