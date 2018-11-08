import {
    observable,
    // toJS,
    // computed,
    action,
    computed
} from 'mobx'

import { get, post } from '../utils/http'

class TopicStore {
    @observable topics

    @observable syncing

    @observable topicDetailList

    @observable createdTopics = []

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
                        resp.data.myReplys = []
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

    @action createTopic(title, tab, content) {
        return new Promise((resolve, reject) => {
            post('/topics', { needAccessToken: true }, {
                title, tab, content,
            })
                .then(data => {
                    if (data.success) {
                        const topic = {
                            title,
                            tab,
                            content,
                            id: data.topic_id,
                            create_at: new Date(),
                            reply_count: 0,
                            visit_count: 0
                        }
                        this.createdTopics.push(observable(topic))
                        resolve()
                    } else {
                        reject(new Error(data.error_msg || '未知错误'))
                    }
                })
                .catch((err) => {
                    if (err.response) {
                        reject(new Error(err.response.data.error_msg || '未知错误'))
                    } else {
                        reject(new Error('未知错误'))
                    }
                })
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

export const doReply = function (topic, content) {
    return new Promise((resolve, reject) => {
        post(`/topic/${topic.id}/replies`, { needAccessToken: true }, { content })
            .then(resp => {
                if (resp.success) {
                    topic.myReplys.push({
                        create_at: new Date(),
                        id: resp.reply_id,
                        content,
                    })
                    resolve()
                } else {
                    reject(resp)
                }
            })
    })
}

export default TopicStore
