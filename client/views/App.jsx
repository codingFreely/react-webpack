import React from 'react'
import {
    Link,
} from 'react-router-dom'

import Routes from '../config/router'

export default function App() {
    return [
        <div key="link">
            <Link to="/">首页</Link>
            <Link to="/list">列表页</Link>
            <Link to="/detail">详情页</Link>
        </div>,
        <Routes key="routes" />,
    ]
}
