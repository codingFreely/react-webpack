import React from 'react'
import ReactDom from 'react-dom'

import App from './App.jsx'

ReactDom.hydrate(<App />, document.getElementById('root')) //hydrate会比较客户端渲染内容和服务端渲染内容，如果觉得服务端生成的内容是有问题的，将会在客户端生成的内容替换服务端生成的内容
