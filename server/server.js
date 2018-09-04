const express = require('express')
const reactSSR = require('react-dom/server')
const path = require('path')
const fs = require('fs')
const serveFavicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const isDev = process.env.NODE_ENV === 'development'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
    maxAge: 10 * 6 *1000,
    name: 'tid', // cookie id name
    resave: false,
    saveUninitialized: false,
    secret: 'react cnode class' // encrypt cookies data
}))

app.use(serveFavicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

// use renderToString method get render Templete
if (!isDev) {
    const serverEntry = require('../dist/server-entry.js').default
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('/', function (req, res) {
        let indexTemplete = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
        let appString = reactSSR.renderToString(serverEntry)
        res.send(indexTemplete.replace('<!-- app -->', appString))
    })
} else {
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen('3333', function () {
    console.log('app listening on port 3333')
})
