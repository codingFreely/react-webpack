import React from 'react'
import {
    inject,
    observer,
} from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import Snackbar from '@material-ui/core/Snackbar'

import SimpleMDE from 'react-simplemde-editor'

import Container from '../../layout/container'
import createStyles from './styles'
import { tabs } from '../../constants/topic-tab-const'


@inject((stores) => {
    return {
        topicStore: stores.topicStore,
        appState: stores.appState,
    }
}) @observer
class TopicCreate extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: '',
            tab: 'dev',
            snackbarShow: false,
            errMsg: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleChangeTab = this.handleChangeTab.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value,
        })
    }

    handleContentChange(value) {
        this.setState({
            content: value,
        })
    }

    handleChangeTab(e) {
        this.setState({
            tab: e.currentTarget.value,
        })
    }

    handleClose() {
        this.setState({ snackbarShow: false })
    }

    showWarning(errMsg) {
        this.setState({
            snackbarShow: true,
            errMsg
        })
    }

    handleCreate() {
        const {
            tab, title, content,
        } = this.state

        if (!title) {
            return this.showWarning('标题必须填写')
        }
        if (!content) {
            return this.showWarning('内容不能为空')
        }

        return this.props.topicStore.createTopic(title, tab, content)
            .then(() => {
                this.props.history.push('/list')
            })
            .catch((err) => {
                this.showWarning(err.message)
            })
    }

    render() {
        const classes = this.props.classes
        return (
            <Container>
                <div className={classes.root}>
                    <TextField
                        className={classes.title}
                        label="标题"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        fullWidth
                    />
                    <SimpleMDE
                        onChange={this.handleContentChange}
                        value={this.state.newReply}
                        options={{
                            toolbar: false,
                            spellChecker: false,
                            placeholder: '发表你的精彩意见',
                        }}
                    />
                    <div>
                        {
                            Object.keys(tabs).map(tab => {
                                if (tab !== 'all' && tab !== 'good') {
                                    return (
                                        <span className={classes.selectItem} key={tab}>
                                            <Radio
                                                value={tab}
                                                checked={tab === this.state.tab}
                                                onChange={this.handleChangeTab}
                                            />
                                            {tabs[tab]}
                                        </span>
                                    )
                                }
                                return null
                            })
                        }
                    </div>
                    <Button fab="true" color="primary" onClick={this.handleCreate} className={classes.replyButton}>
                        <IconReply />
                    </Button>
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbarShow}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={this.state.errMsg}
                />
            </Container>
        )
    }
}

export default withStyles(createStyles)(TopicCreate)
