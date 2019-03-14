import React from "react"
import { Model } from 'dvax'
import {Modal,Button} from 'antd'
import Form_ from './Form'
import Gap from 'dvax/Gap'
import { message } from 'antd'
import './model'
let callback = () => {}
export function showModal(cb=()=>{}){
    Model.run('login',function*({fetch,get,change}){
        yield change('visible',true)
        callback = cb
    })
}
function Allocation(props){
    function Footer(){
        return (
            <Button onClick={handleOk} loading={false} type="primary" style={{width:'100px'}}> 确定 </Button>             
        )
    }
    function handleOk(){
        const {username,password} = Model.get('login')
        Model.run('app',function*({fetch,change}){
            const res = yield fetch(`auth/login`,{method:'post',body:{password,username}})
            yield change('token',res.results)
            localStorage.setItem('flow_token',res.results)
            global.location.reload()
            handleCancel()
        })
        callback(Model.get('login').inputText)
    }
    function handleCancel(){
        Model.reduce('login',state=>({
            username:'',
            password:'',        
        }))
    }
    const visible = props.visible
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
	        	{visible?<Form_  handleOk={handleOk}/>:null} {/* 写成这样，防止留下脏数据 */}
                {Gap(10)}
	        </div>
        </Modal>
    ) 
}
export default Model.connect('login')(Allocation)

