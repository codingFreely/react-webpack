const express = require('express')
const reactSSR = require('react-dom/server')
const path = require('path')
const fs = require('fs')

const app = express()
const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
    const serverEntry = require('../dist/server-entry.js').default

    app.use('/public', express.static(path.join(__dirname, '../dist')))

    app.get('/', function(req,res){
        let indexTemplete = fs.readFileSync(path.join(__dirname,'../dist/index.html'), 'utf8') 
        let appString = reactSSR.renderToString(serverEntry)
        res.send(indexTemplete.replace('<!-- app -->', appString))
    })
}else{
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen('3333', function(){
    console.log('app listening on port 3333')
})