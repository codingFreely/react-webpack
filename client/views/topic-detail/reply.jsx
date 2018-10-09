import React from 'react'
import marked from 'marked'

import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles'

import { replyStyle } from './styles'

const Reply = ({ reply, classes }) => {
    return (
        <div className={classes.root}>
            <div className={classes.left}>
                <Avatar src={reply.author.avatar_url} />
            </div>
            <div className={classes.right}>
                <span>{`${reply.author.loginname}  ${reply.create_at}`}</span>
                <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
            </div>
        </div>
    )
}

export default withStyles(replyStyle)(Reply)
