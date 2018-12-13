import React from 'react'
import { Model } from 'dvax'
import { Row, Col, } from 'antd'
import  EditableTable from './EditableTable'
import AddNewCategory from './AddNewCategory'
import styled from 'styled-components'
const Body = styled.div`
    width:100%;
    background-color:#f5f5f5;
    position:absolute;
    top:41px;
    bottom:0px;
    overflow-y:auto;
`
Model.create({namespace:'category',state:{list:[]} })
function AppAdmin({ list }) {
    return (
        <Body>
            <div style={{height:'15px',width:'1px'}}></div>
            <Row>
                <AddNewCategory />
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
