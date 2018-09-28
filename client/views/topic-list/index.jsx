import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '../../layout/container'

import ListItem from './list-item'

@inject(stores => {
    return {
        appState: stores.appState,
        topicStore: stores.topicStore
    }
}) @observer
export default class TopicList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabValue: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.itemOnClick = this.itemOnClick.bind(this)
    }

    componentDidMount() {
        // do something
        // axios.post('/api/user/login', {
        //     accessToken: '26dfbd94-7766-43e0-baf0-6c69468e5b00',
        // })
        const { topicStore } = this.props
        topicStore.fetchTopics()
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

    handleChange(e, v) {
        this.setState({
            tabValue: v
        })
    }
    /* eslint-disable */
    itemOnClick() {
        console.log(111111111233111111111)
    }
    /* eslint-enable */

    render() {
        // const { appState } = this.props
        const { tabValue } = this.state
        // const topic = {
        //     title: 'this is title',
        //     username: 'nike',
        //     reply_count: 20,
        //     visit_count: 30,
        //     create_at: 'asdff',
        //     tab: 'share'
        // }
        const { topicStore } = this.props
        const { syncing, topics } = topicStore
        return (
            <Container>
                <Helmet>
                    <title>this is topic list</title>
                    <meta name="description" content="this is description" />
                </Helmet>
                <Tabs value={tabValue} onChange={this.handleChange}>
                    <Tab label="分享" />
                    <Tab label="工作" />
                    <Tab label="全部" />
                    <Tab label="问答" />
                    <Tab label="精品" />
                    <Tab label="测试" />
                </Tabs>
                <List>
                    {
                        topics.map(topic => (
                            <ListItem key={topic.id} topic={topic} onClick={this.itemOnClick} />
                        ))
                    }
                </List>
                {
                    syncing
                        ? (
                            <div>
                                <CircularProgress color="secondary" size={100} />
                            </div>
                        ) : null
                }
            </Container>
        )
    }
}
