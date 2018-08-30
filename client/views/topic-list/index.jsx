import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@inject('appState') @observer
export default class TopicList extends Component {
    componentDidMount() {
        // do something
        axios.get('/api/v1/topics')
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
