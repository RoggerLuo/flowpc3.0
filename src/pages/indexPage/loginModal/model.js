import React from "react"
import { Model } from 'dvax'
// import moment  from "moment"
import './model'
Model.create({
    namespace:'add2CategoryModal',
    state:{
        treeData:[],
        employees:[],        
        data:[],
        selected_employees:[],

        // times:[],
    	// visible:false,
        // getTimeid:[],
        // currentClassInfo:{},
        // startTime:moment(),
        // endTime:moment(),
    }
})
