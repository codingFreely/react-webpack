const axios = require('axios')
const queryString = require('querystring')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
    const path = req.path
    const user = req.session.user || {}
    const needAccessToken = req.query.needAccessToken

    if (needAccessToken && !user.accesstoken) {
        res.status(401).send({
            success: false,
            msg: 'need login'
        })
    }

    const query = Object.assign({}, req.query, {
        accesstoken: (needAccessToken && req.method === 'GET') ? user.accesstoken : ''
    })
    if (query.needAccessToken) delete query.needAccessToken

    axios(`${baseUrl}${path}`, {
        method: req.method,
        params: req.query,
        data: queryString.stringify(Object.assign({}, req.body, {
            accesstoken: (needAccessToken && req.method === 'POST') ? user.accesstoken : ''
        })),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
    .then(resp => {
        if (resp.status === 200) {
            res.send(resp.data)
        } else {
            res.status(resp.status).send(resp.data)
        }
    })
    .catch(err => {
        if (err.response) {
            res.status(500).send(err.response.data)
        } else {
            res.status(500).send({
                success: false,
                msg: 'unkown error'
            })
        }
    })
}
