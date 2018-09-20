// pure display component
import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const main = ({ topic }) => (
    <ListItemIcon>
        {topic}
    </ListItemIcon>
)

const secondary = ({ topic }) => (
    <ListItemText>
        {topic}
    </ListItemText>
)

export default ({ topic }) => (
    <ListItem>
        <main topic={topic} />
        <secondary topic={topic} />
    </ListItem>
)
