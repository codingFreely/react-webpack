const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

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

    ]
})
