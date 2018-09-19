import React from 'react'

import Routes from '../config/router'
import Navbar from '../layout/Navbar'

export default function App() {
    return [
        <Navbar key="navbar" />,
        <Routes key="routes" />,
    ]
}
