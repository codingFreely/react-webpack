import axios from 'axios'
import { resolve } from 'dns';

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
    const str = Object.keys(params).reduce((result, key) => {
        result += `${key}=${params[key]}`
        return result
    }, '')

    return `${baseUrl}/${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(parseUrl(url, params))
            .then(res => {
                const data = res.data
                if (data && data.sucess === true) {
                    resolve(data)
                } else {
                    reject(data)
                }
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data)
                } else {
                    reject({
                        sucess: false,
                        err_msg: err.message
                    })
                }
            })
    })
}

export const post = (url, params, data) => {
    return new Promise((resolve, reject) => {
        axios.post(parseUrl(url, params, data))
            .then(res => {
                const data = res.data
                if (data && data.sucess === true) {
                    resolve(data)
                } else {
                    reject(data)
                }
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data)
                } else {
                    reject({
                        sucess: false,
                        err_msg: err.message
                    })
                }
            })
    })
}

export default post
