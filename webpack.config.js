var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var isProd = process.env.NODE_ENV === 'production'; // return true or false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
   fallback: 'style-loader',
   loader: ['css-loader','sass-loader'],
   publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['html-loader','pug-html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=[path][hash].[ext]&outputPath=./&publicPath=.',
          'image-webpack-loader'
          ]
      },
      { 
        test: /\.(woff2?|svg)$/, 
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
      },
      { 
        test: /\.(ttf|eot)$/, 
        loader: 'file-loader?name=fonts/[name].[ext]' 
      },
      { 
        test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, 
        loader: 'imports-loader?jQuery=jquery' 
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    stats: 'errors-only',
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      minify: {
        collapseWhitespace: false
      },
      hash: true,
      excludeChunks: ['contact'],
      filename: './../dist/index.html',
      template: './src/index.pug'
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      hash: true,
      chunks: ['contact'],
      filename: './../dist/contact.html',
      template: './src/contact.pug'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}