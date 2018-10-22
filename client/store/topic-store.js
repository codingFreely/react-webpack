import {
    observable,
    // toJS,
    // computed,
    action,
    computed
} from 'mobx'

import { get } from '../utils/http'

class TopicStore {
    @observable topics

    @observable syncing

    @observable topicDetailList

    constructor({ syncing, topics, topicDetailList } = { syncing: false, topics: [], topicDetailList: [] }) {
        this.syncing = syncing
        this.topics = topics.map(topic => observable(topic))
        this.topicDetailList = topicDetailList
    }

    @computed get topicDetailMap() {
        return this.topicDetailList.reduce((result, topicDetail) => {
            result[topicDetail.id] = topicDetail
            return result
        }, {})
    }

    @action fetchTopics(tab) {
        return new Promise((resolve, reject) => { // 有异步处理时用promise并return promise，使外部有处理的能力
            this.syncing = true
            get('/topics', {
                mdrender: false,
                tab
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

    @action fetchTopicDetail(topicId) {
        return new Promise((resolve, reject) => {
            if (!this.topicDetailMap[topicId]) {
                this.syncing = true
                get(`/topic/${topicId}`).then((resp) => {
                    if (resp.success) {
                        this.topicDetailList.push(observable(resp.data))
                        resolve()
                    } else {
                        reject(resp)
                    }
                    this.syncing = false
                }).catch((err) => {
                    reject(err)
                    this.syncing = false
                })
            } else {
                resolve()
            }
        })
    }

    toJson() {
        return {
            syncing: this.syncing,
            topics: this.topics,
            topicDetail: this.topicDetail
        }
    }
}

export default TopicStore
