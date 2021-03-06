const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const mode = isDev ? 'development' : 'production'

module.exports = {
    mode: mode,
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/public/' //  public后加'/'对于编译没有影响，但是会影响到hmr
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                enforce: 'pre', //  在真正编译之前执行
                test: /\.(jsx|js)$/,
                loader: 'eslint-loader',
                exclude: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules')
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
}
