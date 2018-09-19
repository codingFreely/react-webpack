import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Button from '@material-ui/core/Button';

import Container from '../../layout/container'

@inject('appState') @observer
export default class TopicList extends Component {
    componentDidMount() {
        // do something
        axios.post('/api/user/login', {
            accessToken: '26dfbd94-7766-43e0-baf0-6c69468e5b00',
        })
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

    render() {
        const { appState } = this.props

        return (
            <Container>
                <Helmet>
                    <title>this is topic list</title>
                    <meta name="description" content="this is description" />
                </Helmet>
                <div>{appState.msg}</div>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
            </Container>
        )
    }
}
