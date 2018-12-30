import { Popconfirm, Input, InputNumber } from 'antd'
import React from 'react'
// import AppItemlist from './AppItemlist'
import {Model} from 'dvax'
import debounce from 'dvax/debounce' 
import { GithubPicker } from 'react-color'
class ColorComponent extends React.Component {
    handleChange = color => {
        Model.change('category',`list[${this.props.index}].color`,color.hex)
        const categoryId = Model.get('category').list[this.props.index].id
        Model.run('category',function*({fetch}){
            const res = yield fetch(`changeColor`,{method:'POST',body:{categoryId,color:color.hex}})
            if(!res.hasErrors) return
            message.success('颜色设置成功')
        })
    }
    render() {
        return (<div>
            <GithubPicker width={'213px'} onChange={ this.handleChange } triangle={'hide'}/>
        </div>)
    }
}

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
        title:'颜色',
        width: '20%',
        render(value,record,ind){
            return (<ColorComponent index={ind}/>)
        } 
    }, 
    {
        title:'',
        width: '20%',
        dataIndex: 'color',
        render(value){
            return <div style={{width:'100%',height:'58px',backgroundColor:value||'white'}}></div>
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
    },
    ]

export default columns
