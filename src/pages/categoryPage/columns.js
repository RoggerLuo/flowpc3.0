import { Popconfirm, Input, InputNumber } from 'antd'
import React from 'react'
// import AppItemlist from './AppItemlist'
import {Model} from 'dvax'
import debounce from 'dvax/debounce' 
const save = (name,id) => {
    Model.run('',function*({fetch}){
        const res = fetch(`category/${id}`,{method:'post',body:{name}})
    })
}
const orderChange = (order,id) => {
    Model.run('',function*({fetch}){
        const res = fetch(`order/${id}/${order}`)
    })
}
const onChange = debounce(save,500)
const onChangeOrder = debounce(orderChange,500)
const columns = [
    {
        title: '类别名称',
        dataIndex: 'name',
        width: '20%',     
        render: (text, record) => {
            return(<Input defaultValue={record.name} onChange={e=>onChange(e.target.value,record.id)}/>)
        }
    }, 
    {
        title: '排序号',
        width: '20%',
        render: (text, record) => {
            return (<InputNumber defaultValue={record.order_number} onChange={value=>onChangeOrder(value,record.id)}/>)
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
