const express = require('express')
const reactSSR = require('react-dom/server')
const path = require('path')
const fs = require('fs')
const serveFavicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const isDev = process.env.NODE_ENV === 'development'

const serverRender = require('./util/server-render')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    maxAge: 10 * 6 * 1000,
    name: 'tid', // cookie id name
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode class' // encrypt cookies data
}))

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

// server render
if (!isDev) {
    const bundle = require('../dist/server-entry.js')
    app.use('/public', express.static(path.join(__dirname, '../dist'))) // 配置静态资源public
    app.get('*', function (req, res, next) {
        let indexTemplete = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8')
        serverRender(bundle, indexTemplete, req, res).catch(next)
        // let appString = reactSSR.renderToString(serverEntry)
        // res.send(indexTemplete.replace('<!-- app -->', appString))
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}
// error handler
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(err)
})

app.listen('3333', function () {
    console.log('app listening on port 3333')
})
