import React from "react"
import { Model } from 'dvax'
// import moment  from "moment"
import './model'
Model.create({
    namespace:'login',
    state:{
        username:'',
        password:'',        
        visible: true,
    }
})
