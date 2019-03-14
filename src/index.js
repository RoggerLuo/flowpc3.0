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
    baseUrl: 'http://rorrc.3322.org:32818/v1',
    // baseUrl: 'http://192.168.1.2:6664',
    // baseUrl: 'http://0.0.0.0:5556',
    headers: {
        "content-type":"application/json",
        "token": localStorage.getItem('flow_token') || ''
    },
    requestBody(body){
        return JSON.stringify(body)
        // const postdata = new FormData()
        // for (let k in body) {
        //     if (body.hasOwnProperty(k)) {
        //         postdata.append(k, body[k])
        //     }
        // }
        // return postdata
    },
    receiveData(res){
        // if(res.hasErrors) {
        //     // alert('接口错误')
        //     return res
        // }
        return res
    }
})
const config = { effects: { fetch } }
dvax.config(config)
const DvaxApp = dvax.start(<App/>)
render(DvaxApp,document.getElementById('root'))
