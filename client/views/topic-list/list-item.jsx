// pure display component
import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import { topicPrimaryStyle, topicScondaryStyle } from './styles'
import { tabs } from '../../constants/topic-tab-const'
import dateFormat from '../../utils/date-format'

const Primary = ({ classes, topic }) => {
    const tabClass = classNames({
        [classes.tab]: true, // es6取变量作为属性名
        [classes.top]: topic.top
    })

    return (
        <span className={classes.root}>
            <span className={tabClass}>{topic.top ? '置顶' : tabs[topic.tab]}</span>
            <span className={classes.title}>{topic.title}</span>
        </span>
    )
}

const Secondary = ({ classes, topic }) => (
    <span className={classes.root}>
        <span className={classes.userName}>{topic.author.loginname}</span>
        <span className={classes.count}>
            <span className={classes.reply}>{topic.reply_count}</span>
            <span>/</span>
            <span>{topic.visit_count}</span>
        </span>
        <span>创建时间：{dateFormat(topic.create_at)}</span>
    </span>
)

const StyledPrimary = withStyles(topicPrimaryStyle)(Primary)
const StyledScondary = withStyles(topicScondaryStyle)(Secondary)

export default ({ onClick, topic }) => (
    <ListItem button onClick={onClick}>
        <ListItemAvatar>
            <Avatar src={topic.author.avatar_url} />
        </ListItemAvatar>
        <ListItemText
            primary={<StyledPrimary topic={topic} />}
            secondary={<StyledScondary topic={topic} />}
        />
    </ListItem>
)
