import React from 'react'
import {
    Route,
    Redirect,
} from 'react-router-dom'

import TopicDetail from '../views/topic-detail/index'
import TopicList from '../views/topic-list/index'

export default function Routes() {
    return (
        <div>
            <Route path="/" render={() => <Redirect to="/list" />} exact />
            <Route path="/list" component={TopicList} />
            <Route path="/detail/:id" component={TopicDetail} />
        </div>
    )
}
