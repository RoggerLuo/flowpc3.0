import React from 'react'
import {Model} from 'dvax'
import { Avatar,Checkbox, Message } from 'antd'
function warning(data) {
    if(data.length>=5){
        Message.warning(`不能超过5个人`)
        return true
    }
    return false
}
export function Staff({avatar,name,user_id,selected_employees}){
    let checked = false
    const obj = selected_employees.find(el=>el.user_id===user_id)
    if(obj){
        checked = true
    }
    function onChange(e) {
        if(e.target.checked){
            const data = [...Model.get('addStaffModal').selected_employees]
            const obj = data.find(el=>el.user_id===user_id)
            if(data.indexOf(obj)===-1){
                if(warning(data)) return 
                data.push({name,avatar,user_id})
            }
            Model.change('addStaffModal','selected_employees',data)
        }else{
            const data = [...Model.get('addStaffModal').selected_employees]
            const obj = data.find(el=>el.user_id===user_id)
            data.splice(data.indexOf(obj),1)
            Model.change('addStaffModal','selected_employees',data)
        }
    }
    return (
        <div style={{padding:'6px 0'}}>
            <Checkbox onChange={onChange} checked={checked}>
                <Avatar size="small" src={`/v1/medias/${avatar}`} /> &nbsp;
                {name}
            </Checkbox>
        </div>
    )
}
export function StaffSpan({user_id,avatar,name}){
    return (
        <span style={{padding:'0px 10px 0 0px', display: 'inline-block'}}>
            <Avatar size="small" src={`/v1/medias/${avatar}`} /> &nbsp;
            {name}
        </span>
    )
}

