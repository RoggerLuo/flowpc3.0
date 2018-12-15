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
function Note({ onSelect, index, selectedNoteIdx, note }){
    const isSelected = index === selectedNoteIdx
    const select = e => {
        if(isSelected) return // #1890ff
        Model.dispatch({ type: 'list/select', index })
        onSelect(note)
    }
    function onDoubleClick(){
        Model.change('app','selectedNoteIdx',index)
    }
    return (
        <div onClick={select} onDoubleClick={onDoubleClick}>
            {isSelected?
                <ContentBlue>{note.content}</ContentBlue>:
                <Content>{note.content}</Content>
            }            
        </div>
    )
}
export default Note
