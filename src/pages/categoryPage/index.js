import React from 'react'
import { Model } from 'dvax'
import { Row, Col, message } from 'antd'
import  EditableTable from './EditableTable'
import AddNew from './header/AddNew'
import styled from 'styled-components'
const Body = styled.div`
    width:100%;
    background-color:#f5f5f5;
    position:absolute;
    top:41px;
    bottom:0px;
    overflow-y:auto;
`
Model.create({
    namespace:'category',
    state:{
        list:[],
        selectedCategory:{id:'all'},
    },
    effects:{
        *create({fetch,get,change},{name}){
            const res = yield fetch(`category`,{method:'post',body:{name}})
            const list = get().list.slice()
            list.push({id:res.data.insert_id,name})
            yield change('list',list)
        },
        *delete({fetch,get,change},{id}){
            const res = yield fetch(`category/${id}`,{method:'delete'})
            const list = get().list.slice()
            const el = list.find(el=>el.id===id)
            list.splice(list.indexOf(el),1)
            yield change('list',list)
        }
    }
})
function AppAdmin({ list }) {
    return (
        <Body>
            <div style={{height:'15px',width:'1px'}}></div>
            <Row>
                <AddNew />
            </Row>
            <Row>
                <Col offset={2} span={20}>
                    <EditableTable dataSource={list} />   
                </Col>             
            </Row>
        </Body>
    )
}
export default Model.connect('category')(AppAdmin)
