const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/prod-api': {
        target: 'https://zk.xsnewmedia.com',
        changeOrigin: true,
      }
    }
  }
})
