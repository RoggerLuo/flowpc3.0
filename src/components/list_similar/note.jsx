import React from 'react'
import styled from 'styled-components'
import { Model } from 'dvax'
import {message} from 'antd'
const Wrapper = styled.div`
    margin-bottom:1px;
    padding:8px 10px;
    background-color:white;
    &:hover {
        background-color:#f7f7f7;
    }
`
const WrapperBlue = styled.div`
    margin-bottom:1px;
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
    overflow: hidden;
`
function getFirstLine(string){
    if(string.indexOf('\n')!==-1) {
        if(string.indexOf('\n') === 0 ){
            return getFirstLine(string.slice(1))
        }
        if(string.indexOf('\n') === 1 ){
            return getFirstLine(string.slice(2))
        }
        return [string.slice(0,string.indexOf('\n')),string.slice(string.indexOf('\n'))]
    }
    return [string,'']
}
function Note({ onSelect, editingNote, selectedNote, note,editingListIdx,selectedListIdx,selectedCategory }){
    const isSelected = note.id === selectedNote.id && selectedListIdx === 1
    const isEditing = note.id === editingNote.id && editingListIdx === 1
    const select = e => {
        Model.change('app','editingListIdx',1) // similar
        Model.change('app','editingNote',note)
        Model.change('app','selectedNote',{})
        onSelect(note)
        // onSelect(note)
        Model.dispatch({type:'listSimilar/getData',noteId:note.id,callback(){}})
        Model.change('listSimilar','selectedKeywords',[]) 
    }
    function onDoubleClick(){
        Model.change('app','selectedListIdx',1)
        Model.change('app','selectedNote',note)
    }
    const wrapperStyle = {}
    if(isEditing) {
        wrapperStyle.backgroundColor = '#f7f7f7'
    }
    const [fisrtLine,rest] = getFirstLine(note.content)
    const [secondLine,_]= getFirstLine(rest)
    if(isSelected) {
        return (
            <WrapperBlue onClick={select} onDoubleClick={onDoubleClick}>
                <Content>
                    <Text style={{color:'white'}}>{fisrtLine}</Text>
                </Content>
            </WrapperBlue>
        )    
    }
    return (
        <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={wrapperStyle}>
            <Content>
                <Text>{fisrtLine}</Text>
            </Content>
        </Wrapper>
    )
}
export default Note
