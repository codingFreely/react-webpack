import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Helmet from 'react-helmet'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress';
import qs from 'query-string'

import Container from '../../layout/container'
import { tabs } from '../../constants/topic-tab-const'

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
        topicStore.fetchTopics(this.getTab())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.props.location.search) {
            this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search))
        }
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

    getTab(search) {
        const { location } = this.props
        const query = qs.parse(search || location.search)
        return query.tab || 'all'
    }

    handleChange(e, v) {
        const { history } = this.props
        history.push({
            pathname: './list',
            search: `?tab=${v}`
        })
    }
    /* eslint-disable */
    itemOnClick() {
        console.log(111111111233111111111)
    }
    /* eslint-enable */

    render() {
        // const { appState } = this.props
        const tabValue = this.getTab()
        const { topicStore } = this.props
        const { syncing, topics } = topicStore

        return (
            <Container>
                <Helmet>
                    <title>this is topic list</title>
                    <meta name="description" content="this is description" />
                </Helmet>
                <Tabs value={tabValue} onChange={this.handleChange}>
                    {
                        Object.keys(tabs).map(tab => {
                            return <Tab label={tabs[tab]} value={tab} key={tab} />
                        })
                    }
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
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                padding: '40px 0'
                            }}
                            >
                                <CircularProgress color="secondary" size={100} />
                            </div>
                        ) : null
                }
            </Container>
        )
    }
}
