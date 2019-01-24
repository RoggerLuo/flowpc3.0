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
    baseUrl: 'http://rorrc.3322.org:5556',
    // baseUrl: 'http://192.168.1.4:5556',
    // baseUrl: 'http://0.0.0.0:5556',
    headers: {},// "Content-Type": "application/x-www-form-urlencoded", // 经常不用写,直接用FormData
    requestBody(body){
        const postdata = new FormData()
        for (let k in body) {
            if (body.hasOwnProperty(k)) {
                postdata.append(k, body[k])
            }
        }
        return postdata
    },
    receiveData(res){
        if(res.hasErrors) {
            // alert('接口错误')
            return res
        }
        return res
    }
})
const config = { effects: { fetch } }
const DvaxApp = dvax.start(<App/>,config)
render(DvaxApp,document.getElementById('root'))
