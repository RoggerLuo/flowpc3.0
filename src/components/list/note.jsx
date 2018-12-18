import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
const Wrapper = styled.div`
    padding:15px 10px 15px 10px;
    background-color:white;
    border-radius: 5px;
    margin-bottom:10px;
`
const WrapperBlue = styled.div`
    padding:15px 10px 15px 10px;
    background-color:#1890ff;
    border-radius: 5px;
    margin-bottom:10px;
    color:white;
`
const Content = styled.div`
    user-select:none;
    font-size:16px;
    line-height:1.5;
    min-height:50px;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

function getFirstLine(string){
    if(string.indexOf('\n')!==-1) {
        return string.slice(0,string.indexOf('\n'))
    }
    return string
}
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
            <WrapperBlue onClick={select} onDoubleClick={onDoubleClick}>
                <Content>
                    <h3 style={{color:'white'}}>{getFirstLine(note.content)}</h3>
                    {note.content}
                </Content>
            </WrapperBlue>
        )    
    }
    if(isEditing) {
        return (
            <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={{backgroundColor:'lightgrey'}}>
                <Content>
                    <h3>{getFirstLine(note.content)}</h3>
                    {note.content}
                </Content>
            </Wrapper>
        )    
    }
    return (
        <Wrapper onClick={select} onDoubleClick={onDoubleClick}>
            <Content>
                <h3>{getFirstLine(note.content)}</h3>
                {note.content}
            </Content>
        </Wrapper>
    )    

}
export default Note
