import React from 'react'
import { Model } from 'dvax'
import { Form, Input, Row, Col, Button } from 'antd'

const FormItem = Form.Item;
const FormComp = ({handleSubmit,form,isLoading})=>{
    const { getFieldDecorator } = form
    const click = () => {
        handleSubmit(form)
    }
    return(
        <Row>
            <Col offset={2} >
                <Form onSubmit={handleSubmit}>
                    <FormItem label="新增类别名称">
                        <Col  span={4}>
                            {getFieldDecorator('name', {
                            })(
                                <Input />
                            )}                                                   
                        </Col>
                        <Col span={2} offset={1}>
                                <Button onClick={click} loading={isLoading} type="primary" size="large">创建目录</Button>
                        </Col>                                                                                                   
                    </FormItem>   
                </Form>                        
            </Col>
        </Row>
        )
}
const FormCompCreated = Form.create()(FormComp)
export default Model.connect('category')(FormCompCreated);

