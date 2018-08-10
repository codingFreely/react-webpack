const path = require('path')

module.exports = {
    mode: 'development',
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
            }
        ]
    }
}
