const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  pages: {
    index: {
      // 入口
      entry: 'src/main.js'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://toutiao.itheima.net/', // 需要代理的域名
        pathRewrite: { '^/api': '' }, // 重写匹配的字段，如果不需要在请求路径上，重写为""
        // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'https://houduan.downline.cn/user/add'，直接写‘/api/user/add’即可
        // pathRewrite 的作用是把实际Request Url中的'/api'用""代替

        ws: true, // 是否启用websockets
        changeOrigin: true // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
      }
    }
  }
}

// 你发送的请求路径会被拼接为target+baseURL+url
