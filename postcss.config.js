// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // lib-flexible的REM适配方案，把一行分为10份，每份就是十分之一
      // 所有rootValue应该设置为你的设计稿宽度的十分之一
      // 我们的设计稿是750，所以应该设置750 / 10 = 75
      // vant建议设置为37.5，位移的缺点是使用我们设计稿的尺寸都必须 / 2
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },

      // 配置要转换的css属性，*表示所有
      propList: ['*'],

      // 配置不要转换的样式资源
      // 直接写文件名
      exclude: 'github-markdown'
    }
  }
}
