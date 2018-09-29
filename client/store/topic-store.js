import {
    observable,
    // toJS,
    // computed,
    action
} from 'mobx'

import { get } from '../utils/http'

class TopicStore {
    @observable topics

    @observable syncing

    constructor({ syncing, topics } = { syncing: false, topics: [] }) {
        this.syncing = syncing
        this.topics = topics.map(topic => observable(topic))
    }

    @action fetchTopics() {
        return new Promise((resolve, reject) => { // 有异步处理时用promise
            this.syncing = true
            get('/topics', {
                mdrender: false
            }).then(resp => {
                if (resp.success) {
                    this.topics = resp.data.map(topic => (
                        observable(topic)
                    ))
                    resolve()
                } else {
                    reject(resp)
                }
                this.syncing = false
            }).catch((err) => {
                reject(err)
                this.syncing = false
            })
        })
    }

    toJson() {
        return {
            syncing: this.syncing,
            topics: this.topics,
        }
    }
}

export default TopicStore
