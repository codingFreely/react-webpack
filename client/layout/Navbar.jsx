/* eslint-disable */
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/home'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const styles = {
    root: {
        flexGrow: 1,
        color: 'white',
    },
    grow: {
        flexGrow: 1,
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.onHomeIconClick = this.onHomeIconClick.bind(this)
        this.onCreateButtonClick = this.onCreateButtonClick.bind(this)
        this.onLoginClick = this.onLoginClick.bind(this)
    }

    onHomeIconClick() {

    }

    onCreateButtonClick() {

    }

    onLoginClick() {

    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.onHomeIconClick}>
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            JNode
                        </Typography>
                        <Button variant="raised" color="secondary" onClick={this.onCreateButtonClick}>
                            新建话题
                        </Button>
                        <Button color="inherit" onClick={this.onLoginClick}>
                            登陆
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Navbar)
