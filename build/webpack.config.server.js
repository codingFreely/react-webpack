const path = require('path')

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, '../client/server-entry.js') //absolute path
    },
    output: {
        filename: 'server-entry.js',
        path: path.join(__dirname, '../dist'),
        libraryTarget: 'commonjs2' //set module mode
    },
    module: {
        rules: [
            {
                enforce:'pre',//在真正编译之前执行
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

    ]
}