// 本文件 export 服务器渲染的内容
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'

import App from './views/App.jsx' // eslint-disable-line
import { createStoreMap } from './store/store'

// 让mobx在服务器渲染的时候不会重复数据变换, not understand
useStaticRendering(true)

// {appStore: xxx}
export default (store, routerContext, url) => (
    <Provider {...store}>
        <StaticRouter context={routerContext} location={url}>
            <App />
        </StaticRouter>
    </Provider>
)

export { createStoreMap }
