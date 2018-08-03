const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: "development",
    entry: {
        app: path.join(__dirname, '../client/app.js') //absolute path
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/' // public后加'/'对于编译没有影响，但是会影响到hmr
    },
    module: {
        rules: [
            {
                enforce:'pre', // 在真正编译之前执行
                test: /\.(jsx|js)$/,
                loader: 'eslint-loader',
                exclude: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules')
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../client/index.html')
        })
    ]
}

if (isDev) {
    config.entry = {
        app: [
            'react-hot-loader/patch', //
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: "0.0.0.0",
        port: 6363,
        // contentBase: path.join(__dirname, '../dist'), //contentBase devServer是优先硬盘里读取文件而不是使用webpack编译得到的文件
        overlay: {
            errors: true
        },
        hot: true,
        publicPath: '/public', //将所有 bundle 放入public文件夹
        historyApiFallback: {
            index: '/public/index.html' //复写index("host:port/")映射文件,默认是/index.html
        }
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config