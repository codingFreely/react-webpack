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
    module: {

    },
    plugins: [

    ]
})
