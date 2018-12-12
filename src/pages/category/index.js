import { Model } from 'dvax'
import { message, Row, Col, } from 'antd'
import  EditableTable from './AppCategory'
import AddNewCategory from './AddNewCategory'
import styled from 'styled-components'
const Body = styled.div`
    width:100%;
    background-color:#f5f5f5;
    position:absolute;
    top:41px;
    bottom:0px;
    overflow-y:auto;
    display:flex;
`
function AppAdmin({ list }) {
    createAdmin = () => {
        Model.dispatch({type:'category/loadCategory'})
    }
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