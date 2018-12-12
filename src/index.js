import 'whatwg-fetch'
import "regenerator-runtime/runtime"
import 'es6-promise/auto'
import React from 'react'
import { render } from 'react-dom'
import dvax,{Model} from 'dvax'
import Fetch from 'dvax/fetch'
import App from './App'
import model from './model'
Model.create(model)
const fetch = Fetch({ 
    baseUrl: 'http://0.0.0.0:5556',
    headers: {
        "Content-Type": "application/json",
    },
    requestBody(body){
        return JSON.stringify(body)
    },
    receiveData(res){
        if(res.hasErrors) {
            alert('接口错误')
            return
        }
        return res
    }
})
const config = { effects: { fetch } }
const DvaxApp = dvax.start(<App/>,config)
render(DvaxApp,document.getElementById('root'))
