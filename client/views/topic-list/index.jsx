import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('appState') @observer
export default class TopicList extends Component {
    componentDidMount() {
        // do something
    }

    render() {
        const { appState } = this.props

        return (
            <div>
                { [0, 0, 0].fill(2).map(item => <div>{ item }</div>) }
                <div>{appState.msg}</div>
            </div>
        )
    }
}
