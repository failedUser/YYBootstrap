// nodejs 中的path模块
var path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
      index:path.resolve(__dirname, '../web/index/main.js'),
      vendors:['vue','vue-router','jquery'],
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'Vue': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options:{
                  loaders:{
                    scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                  }
                }
                // options:{
                //   loaders:{
                //     css: ExtractTextPlugin.extract({
                //        use: 'sass-loader',
                //        fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                //     })
                //   }
                // }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                 ]
            },
            {
                test: /\.scss$/,
                use: [
                  'sass-loader'
                 ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                 'file-loader?name=images/[name].[ext]'
                ]
            },
            {
               test: /\.(woff|woff2|eot|ttf|otf)$/,
               use: [
                 'file-loader'
               ]
            }
        ]
    },
    // Favlist: {
    //     loaders: {
    //         js: 'babel'
    //     }
    // },
    plugins: [
      new CleanWebpackPlugin(['../output/static']),
      new HtmlWebpackPlugin({
            filename: '../static/index.html',
            template: path.resolve(__dirname, '../web/index/index.html'),
            inject: 'body',
            chunks: ['vendors','index']
        }),
        // 提取入口文件里面的公共模块
        // new webpack.optimize.CommonsChunkPlugin('public'),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name:"data",
        //   filename:"public.js",
        //   minChunks: Infinity
        // }),
        // new webpack.optimize.UglifyJsPlugin({//代码压缩
        //   compress: {
        //     warnings: false
        //   }
        // }),
    // new ExtractTextPlugin("style.css")//把所有css提取到同一个文件中
    ]
}
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })

  ])
}
