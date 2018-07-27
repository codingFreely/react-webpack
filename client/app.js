import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import App from './App.jsx'

const root = document.getElementById('root')

const render = Component => {
    ReactDom.hydrate(
        <AppContainer>
            <Component />
        </AppContainer>, 
        root
    ) //hydrate会比较客户端渲染内容和服务端渲染内容，如果觉得服务端生成的内容是有问题的，将会在客户端生成的内容替换服务端生成的内容
}

render(App)

if (module.hot) {
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default;
        render(NextApp)
    })
}

