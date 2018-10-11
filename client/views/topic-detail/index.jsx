import React from 'react'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
    inject,
    observer,
} from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import Container from '../../layout/container'

import { topicDetailStyle } from './styles'

import Reply from './reply'

@inject(stores => {
    return {
        topicStore: stores.topicStore,
    }
}) @observer
class TopicDetail extends React.Component {
    componentDidMount() {
        // do something
    }

    render() {
        const { classes } = this.props
        const topic = this.props.topicStore.topic[0]
        if (!topic) {
            return (
                <Container>
                    <section className={classes.loadingContainer}>
                        <CircularProgress color="accent" />
                    </section>
                </Container>
            )
        }

        return (
            <div>
                <Container>
                    <Helmet>
                        <title>{topic.title}</title>
                    </Helmet>
                    <header className={classes.header}>
                        <h3>{topic.title}</h3>
                    </header>
                    <section className={classes.body}>
                        <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
                    </section>
                </Container>

                <Paper elevation={4} className={classes.replies}>
                    <header className={classes.replyHeader}>
                        <span>{`${topic.reply_count} 回复`}</span>
                        <span>{`最新回复 ${topic.last_reply_at}`}</span>
                    </header>
                    <section>
                        {
                            topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
                        }
                    </section>
                </Paper>
            </div>
        )
    }
}

export default withStyles(topicDetailStyle)(TopicDetail)
