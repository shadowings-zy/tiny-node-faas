const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  },
  devServer: {
    proxy: 'http://localhost:12000'
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
}