const axios = require('axios')
const router = require('express').Router()

const baseUrl = 'https://cnodejs.org/api/v1'

router.post('/login', function(req, res, next) {
    axios.post(`${baseUrl}/accesstoken`, {
        accessToken: req.body.accessToken
    })
    .then(resp => {
        if (resp.status === 200 && resp.data.success) {
            req.session.user = {
                accesstoken: req.body.accessToken,
                loginame: resp.data.loginname,
                id: resp.data.id,
                avatar_url: resp.data.avatar_url
            }
            res.json({
                success: true,
                data: resp.data
            })
        } else {

        }
    })
    .catch(err => {
        if (err.response) {
            res.json({
                success: false,
                data: err.response
            })
        } else {
            next(err)
        }
    })
})

module.exports = router
