var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {


  // bundle個體&其來源
  entry: {
    index: "./assets/index.js",
  },

  //輸出位置
  output: {
    path: path.resolve(__dirname, 'build'), //webpack 建置專案的路徑
    publicPath: "http://localhost:8000/build/", //css引入url時參考的路徑
    filename: "[name].js"
  },

  //路徑與副檔名省略
  resolve: {
    root: [
      path.join(__dirname, 'assets')
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js']
  },

  // Assets處理加載器
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap') //'style-loader!css-loader?sourceMap'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap') //'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
    }, {
      test: /\.(jpe?g|JPE?G|png|PNG|gif|GIF|svg|SVG|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader?limit=1024&name=[sha512:hash:base64:7].[ext]'
    }]
  },

  devtool:'source-map',

  // 自動在檔案變更時進行bundle
  watch: true,

  // 插件功能
  plugins: [
    // bundle出實體CSS檔案
    new ExtractTextPlugin("[name].css"),

    // BrowserSync
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8000,
      proxy: 'localhost:9527',
      files: ['*.html'] //監聽html檔案
    }),

    //自動require指定模組
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    // Bundle錯誤時提示
    new WebpackNotifierPlugin(),

    //壓縮並混淆
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   mangle: false
    // }),
  ]
}
