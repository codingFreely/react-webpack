const axios = require('axios')
const ReactDomServer = require('react-dom/server')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')

// 获取server 渲染bundle文本
let serverBundle, createStoreMap

const ModuleClass = module.constructor
const config = require('../../build/webpack.config.server')
const mfs = new MemoryFs()
const bundleCompiler = webpack(config) // nodejs执行webpack
bundleCompiler.outputFileSystem = mfs // 指定webpack编译结果保存到内存，而不写入硬盘
bundleCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson() // webapck编译信息
    stats.errors.forEach((err) => { console.error(err) })
    stats.warnings.forEach((warn) => { console.warn(warn) })

    const bundlePath = path.join(config.output.path, config.output.filename)
    const bundleStream = mfs.readFileSync(bundlePath, 'utf-8') // 从内存中读取bundle stream
    // hack方式将stream转化为nodejs模块
    const m = new ModuleClass()
    m._compile(bundleStream, 'server-srr-content.js') // 必须命名文件名称(模块名)
    serverBundle = m.exports.default
    createStoreMap = m.exports.createStoreMap
})

const getTempelte = function () {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:6363/public/index.html') // 请求client:devServer的index
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

module.exports = function (app) {
    app.use('/public', proxy({ // 静态资源文件从devServer代理获取(:3333 热更新同样有效)
        target: 'http://localhost:6363'
    }))

    app.get('*', function (req, res) {
        getTempelte().then((tempelte) => {
            let content = ReactDomServer.renderToString(serverBundle)
            res.send(tempelte.replace('<!-- app -->', content))
        })
    })
}
