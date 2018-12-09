import 'whatwg-fetch'
import "regenerator-runtime/runtime"
import 'es6-promise/auto'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import dvax from 'dvax'
import fetch from 'utils/fetch'
import App from './App'

const config = { effects: { fetch } }
const DvaxApp = dvax.start(<App/>,config)
render(DvaxApp,document.getElementById('root'))

