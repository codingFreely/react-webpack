import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

import 'babel-polyfill'

import theme from './customization/theme'
import App from './views/App.jsx' // eslint-disable-line
import { AppState, TopicStore } from './store/stores'

const env = process.env.NODE_ENV

const initalState = window.__INITAL__STATE__ || {} // eslint-disable-line
const initStore = {
    appState: new AppState().init(initalState.appState),
    topicStore: new TopicStore(initalState.topicStore)
}

// Create a new class name generator.
const generateClassName = createGenerateClassName();

const root = document.getElementById('root')
const render = (Component) => {
    const renderFn = env === 'development' ? ReactDom.render : ReactDom.hydrate

    renderFn(
        <AppContainer>
            <Provider {...initStore}>
                <BrowserRouter>
                    <JssProvider generateClassName={generateClassName}>
                        <MuiThemeProvider theme={theme}>
                            <Component />
                        </MuiThemeProvider>
                    </JssProvider>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    ) // hydrate会比较客户端渲染内容和服务端渲染内容，如果觉得服务端生成的内容是有问题的，将会在客户端生成的内容替换服务端生成的内容
}

const wrapApp = function (Component) {
    return class Main extends React.Component {
        // Remove the server-side injected CSS.
        componentDidMount() {
            const jssStyles = document.getElementById('jss-server-side')
            if (jssStyles && jssStyles.parentNode) {
                jssStyles.parentNode.removeChild(jssStyles)
            }
        }

        render() {
            return <Component />
        }
    }
}
render(wrapApp(App))

if (module.hot) {
    module.hot.accept('./views/App.jsx', () => {
        const NextApp = require('./views/App.jsx').default;// eslint-disable-line
        render(wrapApp(NextApp))
    })
}
