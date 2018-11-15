import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'
import { withRouter } from 'react-router'
import {
    inject,
    observer
} from 'mobx-react'

import TopicDetail from '../views/topic-detail/index'
import TopicList from '../views/topic-list/index'
import UserLogin from '../views/user/login'
import Userinfo from '../views/user/info'
import Create from '../views/topic-create/index'

let AuthRoute = ({ isLogin, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            (props) => {
                return isLogin ?
                    <Component {...props} /> :
                    (
                        <Redirect
                            to={{
                                pathname: '/user/login',
                                search: `?from=${rest.path}`
                            }}
                        />
                    )
            }
        }
    />
)
AuthRoute = withRouter(inject((store) => ({
    isLogin: store.appState.user.isLogin
}))(observer(AuthRoute)))

export default function Routes() {
    return (
        <div>
            <Route path="/" render={() => <Redirect to="/list" />} exact />
            <Route path="/list" component={TopicList} />
            <Route path="/detail/:id" component={TopicDetail} />
            <Route path="/user/login" exact component={UserLogin} />
            <AuthRoute path="/user/info" exact component={Userinfo} />
            <AuthRoute path="/topic/create" exact component={Create} />
        </div>
    )
}
