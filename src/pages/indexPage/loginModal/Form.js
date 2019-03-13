import React from 'react'
import {Model} from 'dvax'
import { Row,Col, Form, Icon, Input, Button, Checkbox,Message} from 'antd'
import {Staff,StaffSpan} from './FormComponents'
import TreeComp from './TreeComp'
const { TextArea } = Input;
const FormItem = Form.Item

const FormComp = ({ form, submit,...props }) => {
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields } = form
    const onSubmit = () => {
        validateFields((error,value)=>{ // 规则检查
            if(error===null) {
                value = {...value}
                submit(value)    
            }
        })
    }
    return(
        <Form>
            <FormItem label={'账号'} wrapperCol={{span:20}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'courseLabel',
                        {initialValue:props['courseLabel']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
            <FormItem label={'密码'} wrapperCol={{span:20}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'orderNumber',
                        {initialValue:props['orderNumber']||'',rules:[
                            {required:true,message:'必填'},
                            {pattern:/^[0-9]+$/,message:'只能输入数字'},
                            {max:4,message:'排序号不能超过9999'}
                        ]}
                    )(
                        <Input type="password"/>
                    )
                }
            </FormItem>
        </Form>
    )
}
const antdComp = Form.create()(FormComp)
export default Model.connect(['app'])(antdComp)
