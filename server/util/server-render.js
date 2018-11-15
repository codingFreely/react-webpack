const ReactDomServer = require('react-dom/server')
const reactAsyncBootstrapper = require('react-async-bootstrapper')
const serialize = require('serialize-javascript')
const ejs = require('ejs')
const Helmet = require('react-helmet').default
const SheetsRegistry = require('react-jss/lib/jss').SheetsRegistry

const getInitalState = function (stores) {
    return Object.keys(stores).reduce((result, storeName) => {
        result[storeName] = stores[storeName].toJson()
        return result
    }, {})
}

module.exports = function (bundle, templete, req, res) {
    return new Promise((resolve, reject) => {
        const routerContext = {}
        const createStoreMap = bundle.createStoreMap
        const serverBundle = bundle.default
        const store = createStoreMap()
        const sheetsRegistry = new SheetsRegistry()

        const userInfo = req.session.user
        if (req.session.user) {
            store.appState.user.isLogin = true
            store.appState.user.info = userInfo
        }
        const app = serverBundle(store, routerContext, req.url, sheetsRegistry)
        // 使用reactAsyncBootstrapper在react render之前先预加载初始化数据
        reactAsyncBootstrapper(app).then(() => {
            let content = ReactDomServer.renderToString(app)
            // if routerContext.url is not undefiend, Indicates that the current request routing will be redirected at the front end
            // 在服务器端重定向对seo有好处，如果在前端重定向，爬虫获取到的是未跳转前的内容，而不是跳转后的
            if (routerContext.url) {
                res.status(302).setHeader('Location', routerContext.url) // response 302 to redirect at server
                res.end()
                return
            }

            const helmet = Helmet.rewind() // 获取组件中helmet的配置
            const indexHtml = ejs.render(templete, {
                appString: content,
                initalState: serialize(getInitalState(store)),
                meta: helmet.meta.toString(), // seo
                title: helmet.title.toString(), // seo
                style: helmet.style.toString(),
                link: helmet.link.toString(),
                css: sheetsRegistry.toString()
            })

            res.send(indexHtml)
            resolve()
            // res.send(tempelte.replace('<!-- app -->', content))
        }).catch(reject)
    })
}
