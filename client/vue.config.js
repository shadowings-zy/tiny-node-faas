const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  devServer: {
    proxy: 'http://localhost:12000'
  }
}