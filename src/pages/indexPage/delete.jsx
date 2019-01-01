import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import {editorOperations} from 'components/editor'
const DeleteWrapper = styled.div`
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 50%;
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
    Model.run('list',function*({fetch,get,change}){
        const note = get().notes[get('app').selectedNoteIdx]
        const res = yield fetch(`note/${note.id}`,{method:'delete'})
        if(res.hasErrors) return
        message.success('删除成功')
        const notes = get().notes.slice()
        notes.splice(get('app').selectedNoteIdx,1)
        yield change('notes',notes)
        Model.change('app','selectedNoteIdx',null)
        Model.dispatch({type:'list/loadMore'})
        editorOperations.new()
    })
}
function DeleteButton({selectedNoteIdx}){
    if(selectedNoteIdx!==null) {
        return (
            <DeleteWrapper onClick={deleteAction}>
                <Delete>删 除</Delete>
            </DeleteWrapper>
        )    
    }
    return null    
}

export default DeleteButton