import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
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
    padding:8px 10px;
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
    text-overflow: ellipsis;
    white-space:nowrap;
`
const SmallText = styled.div`
    color: #888888;
    font-size: 12px;
    text-align: right;
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
    const isSelected = note.id === selectedNote.id && selectedListIdx === 0
    const isEditing = note.id === editingNote.id && editingListIdx === 0
    const select = e => {
        Model.change('app','editingListIdx',0)
        Model.change('app','editingNote',note)
        Model.change('app','selectedNote',{})
        Model.dispatch({type:'listSimilar/getData',noteId:note.id,callback(){}})
        onSelect(note)
        Model.change('listSimilar','selectedKeywords',[]) 
    }
    function onDoubleClick(){
        Model.change('app','selectedListIdx',0)
        Model.change('app','selectedNote',note)
    }
    const backColorSelected = {}
    if(isEditing) { // 选中的背景
        backColorSelected.backgroundColor = '#f7f7f7'
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
    if(note.category === selectedCategory.id && selectedCategory.id!==0) {
        return (
            <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={backColorSelected}>
                <Content>
                    <Text style={{fontWeight:'500',}}>{fisrtLine}</Text>
                </Content>
            </Wrapper>
        )    
    }
    return (
        <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={backColorSelected}>
            <Content>
                <Text>{fisrtLine}</Text>
            </Content>
        </Wrapper>
    )
}
export default Note
