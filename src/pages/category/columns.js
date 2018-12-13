import { Popconfirm,InputNumber} from 'antd'
import React from 'react'
import AppItemlist from './AppItemlist'

const columns = [{
    title: '类别名称',
    dataIndex: 'name',
    width: '20%',     
  }, {
    title: '排序号',
    width: '20%',
    render: (text, record) => {
      return(
       <InputNumber defaultValue={record.orderIndex} onBlur={()=>this.onBlur(record._id)}/>
       );
    }
  },
  {
    title: '添加项目',
    width: '20%',
    render: (text, record) => {
      return(
        <AppItemlist getCateid={record._id}/>   //appDmin.list
        );
    }
  }, 
  {
    title: '操作',
    dataIndex: 'operation',
      render: (text,record) => {    //record为当前s行的目录         
       return (
         <Popconfirm title="是否确定删除?" onConfirm={() => this.onDelete(record._id)}>
         <a href="#">删除</a>
         </Popconfirm>    
         ); 
     },
   }]; 

export default columns
