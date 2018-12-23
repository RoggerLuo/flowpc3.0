import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
const Wrapper = styled.div`
margin-bottom:1px;

padding:15px 10px 15px 10px;
    background-color:white;
`
/*     border-radius: 5px;

    border-radius: 5px;
    margin-bottom:10px;

*/
const WrapperBlue = styled.div`
    padding:15px 10px 15px 10px;
    background-color:#1890ff;
    color:white;
`
const Content = styled.div`
    user-select:none;
    font-size:16px;
    line-height:1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
const Text = styled.div`

`

function getFirstLine(string){
    if(string.indexOf('\n')!==-1) {
        if(string.indexOf('\n') === 0 ){
            return getFirstLine(string.slice(1))
        }
        if(string.indexOf('\n') === 1 ){
            return getFirstLine(string.slice(2))
        }
        return string.slice(0,string.indexOf('\n'))
    }
    return string
}
function Note({ onSelect, editingNoteIndex, index, selectedNoteIdx, note }){
    const isSelected = index === selectedNoteIdx
    const isEditing = index === editingNoteIndex
    const select = e => {
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
                    <Text style={{color:'white'}}>{getFirstLine(note.content)}</Text>
                </Content>
            </WrapperBlue>
        )    
    }
    if(isEditing) {
        return (
            <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={{backgroundColor:'#ececec'}}>
                <Content>
                    <Text>{getFirstLine(note.content)}</Text>
                </Content>
            </Wrapper>
        )    
    }
    return (
        <Wrapper onClick={select} onDoubleClick={onDoubleClick}>
            <Content>
                <Text>{getFirstLine(note.content)}</Text>
            </Content>
        </Wrapper>
    )
}
export default Note
//                 {note.content}
//                    {note.content}
//                    {note.content}
