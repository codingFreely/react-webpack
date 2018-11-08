import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

import TopicDetail from '../views/topic-detail/index'
import TopicList from '../views/topic-list/index'
import UserLogin from '../views/user/login'
import Userinfo from '../views/user/info'
import create from '../views/topic-create/index'

export default function Routes() {
    return (
        <div>
            <Route path="/" render={() => <Redirect to="/list" />} exact />
            <Route path="/list" component={TopicList} />
            <Route path="/detail/:id" component={TopicDetail} />
            <Route path="/user/login" exact component={UserLogin} />
            <Route path="/user/info" exact component={Userinfo} />
            <Route path="/topic/create" exact component={create} />
        </div>
    )
}
