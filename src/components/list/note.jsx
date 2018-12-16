import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'

const Content = styled.div`
    user-select:none;
    border-radius: 5px;
    font-size:16px;
    line-height:1.5;
    min-height:50px;
    padding:15px 10px 15px 10px;
    margin-bottom:10px;
    background-color:white;
`
const ContentBlue = styled.div`
    user-select:none;
    border-radius: 5px;
    font-size:16px;
    line-height:1.5;
    min-height:50px;
    padding:15px 10px 15px 10px;
    margin-bottom:10px;
    background-color:#1890ff;
    color:white;
`
function Note({ onSelect, editingNoteIndex, index, selectedNoteIdx, note }){

    const isSelected = index === selectedNoteIdx
    const isEditing = index === editingNoteIndex
    const select = e => {
        //if(isSelected) return // #1890ff
        Model.dispatch({ type: 'list/select', editingNoteIndex:index })
        Model.change('app','selectedNoteIdx',null)
        onSelect(note)
    }
    function onDoubleClick(){
        Model.change('app','selectedNoteIdx',index)
    }
    if(isSelected) {
        return (
            <div onClick={select} onDoubleClick={onDoubleClick}>
                <ContentBlue>{note.content}</ContentBlue>
            </div>
        )    
    }
    if(isEditing) {
        return (
            <div onClick={select} onDoubleClick={onDoubleClick}>
                <Content style={{backgroundColor:'lightgrey'}}>{note.content}</Content>
            </div>
        )    
    }
    return (
        <div onClick={select} onDoubleClick={onDoubleClick}>
            <Content>{note.content}</Content>
        </div>
    )    

}
export default Note
