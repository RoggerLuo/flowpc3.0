import { Table, Popconfirm, Form ,Icon,InputNumber,Pagination} from 'antd';
import { Model } from 'dvax'
import React from 'react'
import AppItemlist from '../routes/category/AppItemlist'

class EditableTable extends React.Component {
  constructor(props) {
    super(props);   
    this.onDelete=this.onDelete.bind(this)
    this.onBlur=this.onBlur.bind(this)
    this.columns = [{
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
   }  
   onBlur(categoryId){
     const order=event.target.defaultValue
     Model.dispatch({type:'category/cateorder',_id:categoryId,orderIndex:order})
     Model.dispatch({type:'category/editorderIndex',_id:categoryId,orderIndex:order})
   }
   onDelete(_id){
    Model.dispatch({type:'category/deletecates',_id:_id})
  }
  render() {
    const { dataSource } = this.props;
    const columns = this.columns;
    return (    
      <div>   
        <Table bordered  pagination={{defaultCurrent:1,defaultPageSize:6}} dataSource={dataSource} columns={columns} rowKey={record=>record._id} />   
      </div> 
      );
  }
}
export default EditableTable





