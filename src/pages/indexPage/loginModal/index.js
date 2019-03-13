import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import { message } from 'antd'
import './model'
let callback = () => {}
export function showModal(cb=()=>{}){
    Model.run('addCategoryModal',function*({fetch,get,change}){
        yield change('visible',true)
        callback = cb
    })
}
function Footer(){
    return (
        <Button onClick={()=>{}} loading={false} type="primary" style={{width:'100px'}}> 确定 </Button>             
    )
}
function Allocation(props){
    function handleOk(){
        console.log(Model.get('addCategoryModal').inputText)

        callback(Model.get('addCategoryModal').inputText)
        handleCancel()
    }
    function handleCancel(){
        Model.reduce('addCategoryModal',state=>({
            treeData:[],
            employees:[],        
            data:[],
            selected_employees:[]
        }))
    }
    function onSubmit(){

    }
    const visible = !props.authStatus
    return (
        <Modal
	        title="登录"
            visible={visible}
            footer={<Footer/>}
	        onOk={handleOk}
            onCancel={handleCancel}
            width={'30%'}
            bodyStyle={{minHeight:'200px'}}
        >
	        <div>
	        	{visible?<Form_ />:null} {/* 写成这样，防止留下脏数据 */}
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}
export default Model.connect('app')(Allocation)

