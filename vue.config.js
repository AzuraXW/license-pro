const autoprefixer = require('autoprefixer')
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://v.juhe.cn',
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  }
}
