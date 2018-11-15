import {
    observable,
    toJS,
    action,
} from 'mobx'
import axios from 'axios'

export default class AppState {
    @observable user = {
        isLogin: false,
        info: {},
        detail: {
            syncing: false,
            recent_topics: [],
            recent_replies: [],
        },
        collections: {
            syncing: false,
            list: [],
        },
    }

    @action init({ user } = {}) {
        if (user) {
            this.user = user
        }
        return this
    }

    @action login(accessToken) {
        if (accessToken === 'admin') {
            accessToken = '26dfbd94-7766-43e0-baf0-6c69468e5b00'
        }

        return new Promise((resolve, reject) => {
            axios.post('/api/user/login', {
                accessToken,
            }).then(resp => {
                if (resp.status === 200 && resp.data.success) {
                    this.user.info = resp.data.data
                    this.user.isLogin = true
                    resolve()
                    // this.notify({ message: '登录成功' })
                } else {
                    reject(resp.data.msg)
                }
            }).catch(err => {
                if (err.response) {
                    reject(err.response.data.msg)
                    // this.notify({ message: err.response.data.msg })
                } else {
                    reject(err.message)
                    // this.notify({ message: err.message })
                }
            })
        })
    }

    @action getUserDetail() {
        this.user.detail.syncing = true
        return new Promise((resolve, reject) => {
            axios.get(`/api/user/${this.user.info.loginname}`)
                .then(resp => {
                    if (resp.status === 200 && resp.data.success) {
                        this.user.detail.recent_replies = resp.data.data.recent_replies
                        this.user.detail.recent_topics = resp.data.data.recent_topics
                        resolve()
                    } else {
                        reject(resp.data.msg)
                        // this.notify({ message: resp.data.msg })
                    }
                    this.user.detail.syncing = false
                }).catch(err => {
                    reject(err.message)
                    // this.notify({ message: err.msg })
                    this.user.detail.syncing = false
                })
        })
    }

    @action getUserCollection() {
        this.user.collections.syncing = true
        return new Promise((resolve, reject) => {
            axios.get(`/api/topic_collect/${this.user.info.loginname}`)
                .then(resp => {
                    if (resp.status === 200 && resp.data.success) {
                        this.user.collections.list = resp.data.data
                        resolve()
                    } else {
                        reject(resp.data.msg)
                        // this.notify({ message: resp.data.msg })
                    }
                    this.user.collections.syncing = false
                }).catch(err => {
                    reject(err.message)
                    // this.notify({ message: err.msg })
                    this.user.collections.syncing = false
                })
        })
    }

    toJson() {
        return {
            user: toJS(this.user),
        }
    }
}
