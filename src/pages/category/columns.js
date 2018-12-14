import { Popconfirm,Input} from 'antd'
import React from 'react'
import AppItemlist from './AppItemlist'
import {Model} from 'dvax'
const columns = [
    {
        title: '类别名称',
        dataIndex: 'name',
        width: '20%',     
        render: (text, record) => {
            const onBlur = (name,id) => {
                Model.run('',function*({fetch}){
                    const res = fetch(`category/${id}`,{method:'post',body:{name}})
                })
            }
            return(<Input defaultValue={record.name} onBlur={e=>onBlur(e.target.value,record.id)}/>)
        }
    }, 
    {
        title: '添加超类',
        width: '20%',
        render: (text, record) => {
            return(
                <AppItemlist getCateid={record._id}/>   //appDmin.list
            )
        }
    }, 
    {
        title: '操作',
        dataIndex: 'operation',
            render: (text,record) => {    //record为当前s行的目录         
                return (
                    <Popconfirm title="是否确定删除?" onConfirm={() => Model.dispatch({type:'category/delete',id:record.id})}>
                        <a href="#">删除</a>
                    </Popconfirm>    
                )
            }
    }]

export default columns
