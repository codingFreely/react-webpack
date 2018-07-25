const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    mode: "development",
    entry: {
        app: path.join(__dirname, '../client/app.js') //absolute path
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public'
    },
    module: {
        rules: [
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
    config.devServer = {
        host: "0.0.0.0",
        port: 6363,
        // contentBase: path.join(__dirname, '../dist'), //如果设置了contentBase devServer将会从硬盘里读取文件而不是使用webpack编译得到的文件
        overlay: {
            errors: true
        },
        publicPath: '/public', //将所有 bundle 放入public文件夹
        historyApiFallback: {
            index: '/public/index.html' //复写index("host:port/")映射文件,默认是/index.html
        }
    }
}

module.exports = config