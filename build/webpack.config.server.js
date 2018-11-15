// 打包server所需资源
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const webpack = require('webpack')

module.exports = webpackMerge(baseConfig, {
    entry: {
        app: path.join(__dirname, '../client/server-entry.js') // absolute path
    },
    output: {
        filename: 'server-entry.js',
        libraryTarget: 'commonjs2' // set module mode
    },
    externals: Object.keys(require('../package.json').dependencies), // server渲染时候，依赖库没必要打包进去，运行时直接取本地node_modules即可
    module: {

    },
    plugins: [
        new webpack.DefinePlugin({ // setting request api server host, when server render, if use directly /api,default host is 127.0.0.1:80
            'process.env.API_BASE': '"http://localhost:3333"'
        })
    ]
})
