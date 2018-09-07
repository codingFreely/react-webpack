import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@inject('appState') @observer
export default class TopicList extends Component {
    componentDidMount() {
        // do something
        axios.post('/api/user/login', {
            accessToken: '6b60b457-a9bc-4b90-be06-be63e9399caa',
        })
    }

    bootstrap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const { appState } = this.props
                appState.count = 6
                resolve(true)
            }, 0)
        })
    }

    render() {
        const { appState } = this.props

        return (
            <div>
                <div>{appState.msg}</div>
            </div>
        )
    }
}
