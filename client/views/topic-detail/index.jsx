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
import Simplemde from 'react-simplemde-editor'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'

import Container from '../../layout/container'
import { doReply } from '../../store/topic-store'
import { topicDetailStyle } from './styles'

import Reply from './reply'

@inject(stores => {
    return {
        topicStore: stores.topicStore,
        user: stores.appState.user
    }
}) @observer
class TopicDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newReply: ''
        }
        this.handleNewReplyChange = this.handleNewReplyChange.bind(this)
        this.handleReply = this.handleReply.bind(this)
        this.goToLogin = this.goToLogin.bind(this)
    }

    componentDidMount() {
        // do something
        const topicId = this.getTopicId()
        this.props.topicStore.fetchTopicDetail(topicId)
    }

    getTopicId() {
        return this.props.match.params.id
    }

    getTopic() {
        return this.props.topicStore.topicDetailMap[this.getTopicId()]
    }

    handleNewReplyChange(value) {
        this.setState({
            newReply: value
        })
    }

    handleReply() {
        doReply(this.getTopic(), this.state.newReply)
            .then(() => {
                this.setState({
                    newReply: ''
                })
            })
    }

    goToLogin() {
        this.props.history.push('/user/login')
    }

    render() {
        const { classes } = this.props
        const topic = this.getTopic()
        if (!topic) {
            return (
                <Container>
                    <section className={classes.loadingContainer}>
                        <CircularProgress color="secondary" />
                    </section>
                </Container>
            )
        }

        const myReplys = topic.myReplys

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

                {
                    myReplys && myReplys.length > 0 ?
                        (
                            <Paper elevation={4} className={classes.replies}>
                                <header className={classes.replyHeader}>
                                    <span>我的最新回复</span>
                                    <span>{`${myReplys.length}条`}</span>
                                </header>
                                {
                                    myReplys.map(reply => {
                                        return (
                                            <Reply
                                                reply={Object.assign({}, reply, {
                                                    author: {
                                                        avatar_url: this.props.user.info.avatar_url,
                                                        loginname: this.props.user.info.loginname,
                                                    },
                                                })}
                                                key={reply.id}
                                            />
                                        )
                                    })
                                }
                            </Paper>
                        ) :
                        null
                }

                <Paper elevation={4} className={classes.replies}>
                    <header className={classes.replyHeader}>
                        <span>{`${topic.reply_count} 回复`}</span>
                        <span>{`最新回复 ${topic.last_reply_at}`}</span>
                    </header>
                    {
                        this.props.user.isLogin &&
                        (
                            <section className={classes.replyEditor}>
                                <Simplemde
                                    onChange={this.handleNewReplyChange}
                                    value={this.state.newReply}
                                    options={{
                                        toolbar: false,
                                        autoFocus: true,
                                        spellChecker: false,
                                        placeholder: '添加你的精彩回复',
                                    }}
                                />
                                <Button variant="contained" color="secondary" onClick={this.handleReply} className={classes.replyButton}>
                                    <IconReply />
                                </Button>
                            </section>
                        )
                    }
                    {
                        !this.props.user.isLogin &&
                        (
                            <section className={classes.notLoginButton}>
                                <Button raised="true" color="secondary" onClick={this.goToLogin}>登录进行回复</Button>
                            </section>
                        )
                    }
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
