// 本文件 export 服务器渲染的内容
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import JssProvider from 'react-jss/lib/JssProvider'
import {
    MuiThemeProvider,
    createGenerateClassName,
} from '@material-ui/core/styles'

import theme from './customization/theme'

import App from './views/App.jsx' // eslint-disable-line
import { createStoreMap } from './store/stores'

// 让mobx在服务器渲染的时候不会重复数据变换, not understand
useStaticRendering(true)

// {appStore: xxx}
export default (store, routerContext, url, sheetsRegistry) => {
    // Create a sheetsManager instance.
    const sheetsManager = new Map();

    // Create a new class name generator.
    const generateClassName = createGenerateClassName()

    return (
        <Provider {...store}>
            <StaticRouter context={routerContext} location={url}>
                <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                    <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
                        <App />
                    </MuiThemeProvider>
                </JssProvider>
            </StaticRouter>
        </Provider>
    )
}

export { createStoreMap }
