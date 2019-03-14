import React from 'react'
import {Model} from 'dvax'
import { Row,Col, Form, Icon, Input, Button, Checkbox,Message} from 'antd'
import {Staff,StaffSpan} from './FormComponents'
import TreeComp from './TreeComp'
const { TextArea } = Input;
const FormItem = Form.Item

const FormComp = ({ form, onSubmit,...props }) => {
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields } = form
    // const onSubmit = (submit) => {
    //     validateFields((error,value)=>{ // 规则检查
    //         if(error===null) {
    //             value = {...value}
    //             submit(value)
    //         }
    //     })
    // }
    return(
        <Form>
            <FormItem label={'账号'} wrapperCol={{span:20}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'courseLabel',
                        {initialValue:props['courseLabel']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input onChange={(e)=>Model.change('login','username',e.target.value)} onPressEnter={props.handleOk}/>
                    )
                }
            </FormItem>
            <FormItem label={'密码'} wrapperCol={{span:20}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'orderNumber',
                        {initialValue:props['orderNumber']||'',rules:[
                            {required:true,message:'必填'},
                        ]}
                    )(
                        <Input type="password" onChange={(e)=>Model.change('login','password',e.target.value)} onPressEnter={props.handleOk}/>
                    )
                }
            </FormItem>
        </Form>
    )
}
const antdComp = Form.create()(FormComp)
export default Model.connect(['app'])(antdComp)
