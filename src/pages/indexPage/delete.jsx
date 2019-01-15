import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import {editorOperations} from 'components/editor'
import updateList from './updateList'
const DeleteWrapper = styled.div`
    position: fixed;
    bottom: 0px;
    left: 39%;
    width: 36.58%;
    height: 75px;
    display:flex;
`
const Delete = styled.div`
    color:white;
    background-color:red;
    width:90%;
    height:55px;
    margin:0 auto auto auto; 
    line-height:55px;
    text-align:center;
    font-size:16px;
`
function deleteAction(){
    Model.run('',function*({fetch,get,change}){
        const note = get('app').selectedNote
        const res = yield fetch(`note/${note.id}`,{method:'delete'})
        if(res.hasErrors) return
        message.success('删除成功')
        editorOperations.new()
        updateList('list')
        updateList('listSimilar')
    })
}
function DeleteButton({selectedNote}){
    if(selectedNote.id) {
        return (
            <DeleteWrapper onClick={deleteAction}>
                <Delete>删 除</Delete>
            </DeleteWrapper>
        )    
    }
    return null    
}

export default DeleteButton