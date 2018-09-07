const axios = require('axios')
const ReactDomServer = require('react-dom/server')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const reactAsyncBootstrapper = require('react-async-bootstrapper')
const serialize = require('serialize-javascript')
const ejs = require('ejs')

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
        axios.get('http://localhost:6363/public/server.ejs') // 请求client:devServer的编译的server.ejs
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const getInitalState = function (stores) {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson()
        return result
    }, {})
}

module.exports = function (app) {
    app.use('/public', proxy({ // 静态资源文件从devServer代理获取(:3333 热更新同样有效)
        target: 'http://localhost:6363'
    }))

    app.get('*', function (req, res) {
        getTempelte().then((tempelte) => {
            const routerContext = {}
            const store= createStoreMap()
            const app = serverBundle(store, routerContext, req.url)
            // 使用reactAsyncBootstrapper在react render之前先预加载初始化数据
            reactAsyncBootstrapper(app).then(() => {
                let content = ReactDomServer.renderToString(app)
                // if routerContext.url is not undefiend, Indicates that the current request routing will be redirected at the front end
                if (routerContext.url) {
                    res.status(302).setHeader('Location', routerContext.url) // response 302 to redirect at server
                    res.end()
                    return
                }

                const indexHtml = ejs.render(tempelte, {
                    appString: content,
                    initalState: serialize(getInitalState(store)),
                })

                res.send(indexHtml)
                // res.send(tempelte.replace('<!-- app -->', content))
            })
        })
    })
}
