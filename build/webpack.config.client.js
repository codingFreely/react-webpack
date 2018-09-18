const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js') //  absolute path
    },
    output: {
        filename: '[name].[hash].js'
    },
    module: {

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/index.html')
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!' + path.join(__dirname, '../client/server.templete.ejs'),
            filename: 'server.ejs'
        })
    ]
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.entry = {
        app: [
            'react-hot-loader/patch', //
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: 6363,
        //  contentBase: path.join(__dirname, '../dist'), // contentBase devServer是优先硬盘里读取文件而不是使用webpack编译得到的文件
        overlay: {
            errors: true
        },
        hot: true,
        publicPath: '/public', // 将所有 bundle 放入public文件夹
        historyApiFallback: {
            index: '/public/index.html' // 复写index("host:port/")映射文件,默认是/index.html
        },
        proxy: {
            '/api': 'http://localhost:3333'
        }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = webpackMerge(baseConfig, config) // 第二个覆盖第一个参数
