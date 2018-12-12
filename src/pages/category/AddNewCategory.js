import { message } from 'antd'
import { Model } from 'dvax'
import React from 'react'
import FormCompCreated from './AddForm'

const AddNewCategory = () => {
    const handleSubmit = (form) => {
        const name = form.getFieldsValue().name
        if(!name) {
            message.info('请输入类别名称')
            return
        }
        Model.dispatch({
            type: 'category/NewAppCategory',
            payload: Object.assign({}, {name}, {message})
        })
        Model.dispatch({type:'category/loading'})
    }
    return <FormCompCreated handleSubmit={handleSubmit}/>
}

export default Model.connect('category')(AddNewCategory)
