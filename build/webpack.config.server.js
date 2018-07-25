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
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules')
            },

        ]
    },
    plugins: [

    ]
}