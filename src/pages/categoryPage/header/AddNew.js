import { message } from 'antd'
import { Model } from 'dvax'
import React from 'react'
import Form from './Form'

const AddNewCategory = () => {
    const handleSubmit = form => {
        const name = form.getFieldsValue().name
        if(!name) {
            message.info('请输入类别名称')
            return
        }
        Model.dispatch({type: 'category/create',name})
        Model.dispatch({type:'category/loading'})
        form.resetFields()
    }
    return <Form handleSubmit={handleSubmit}/>
}

export default Model.connect('category')(AddNewCategory)
