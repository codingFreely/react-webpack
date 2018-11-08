/* eslint-disable */
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import IconHome from '@material-ui/icons/Home'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import {
    inject,
    observer
} from 'mobx-react'
import { withRouter } from 'react-router-dom'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

@withRouter
@inject((stores) => {
    return {
        user: stores.appState.user,
    }
}) @observer
class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.onHomeIconClick = this.onHomeIconClick.bind(this)
        this.onCreateButtonClick = this.onCreateButtonClick.bind(this)
        this.onLoginClick = this.onLoginClick.bind(this)
    }

    onHomeIconClick() {
        this.props.history.push('/list?tab=all')
    }

    onCreateButtonClick() {
        this.props.history.push('/topic/create')
    }

    onLoginClick() {
        const { location } = this.props
        if (location.pathname !== '/user/login') {
            if (this.props.user.isLogin) {
                this.props.history.push('/user/info')
            } else {
                this.props.history.push({
                    pathname: '/user/login',
                    search: `?from=${location.pathname}`,
                })
            }
        }
    }

    render() {
        const { classes } = this.props
        const user = this.props.user

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.onHomeIconClick}>
                            <IconHome />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            JNode
                        </Typography>
                        <Button variant="raised" color="primary" onClick={this.onCreateButtonClick}>
                            新建话题
                        </Button>
                        <Button color="inherit" onClick={this.onLoginClick}>
                            {user.isLogin ? user.info.loginname : '登录'}
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Navbar)
