import React, { Component } from 'react'

export default class TopicList extends Component {
    componentDidMount() {
        // do something
    }

    render() {
        return (
            <div>
                { [0, 0, 0].fill(2).map(item => <div>{ item }</div>) }
            </div>
        )
    }
}
