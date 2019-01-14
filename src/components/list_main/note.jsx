import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import moment  from 'moment'
const Wrapper = styled.div`
    margin-bottom:1px;
    padding:15px 10px 15px 10px;
    background-color:white;
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
function Note({ onSelect, editingNoteIdx, index, selectedNoteIdx, note,editingListIdx,selectedListIdx,selectedCategory }){
    const isSelected = index === selectedNoteIdx && selectedListIdx === 0
    const isEditing = index === editingNoteIdx && editingListIdx === 0
    const select = e => {
        Model.change('app','editingListIdx',0)
        // Model.change('app','editingNoteIdx',index)
        Model.change('app','editingNote',note)
        Model.change('app','selectedNoteIdx',null)

        Model.dispatch({type:'listSimilar/getData',noteId:note.id,callback(){}})
        onSelect(note)
        Model.change('listSimilar','keywordsList',[]) 
    }
    function onDoubleClick(){
        Model.change('app','selectedListIdx',0)
        Model.change('app','selectedNoteIdx',index)
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
    if(note.category === selectedCategory.id && selectedCategory.id!==0) {
        return (
            <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={wrapperStyle}>
                <Content>
                    <Text style={{fontWeight:'500',color:'black'}}>{fisrtLine}</Text>
                </Content>
            </Wrapper>
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


/* 
<SmallText style={{color:'white'}}>{moment(note.modify_time*1000).format('YYYY-MM-DD')} </SmallText>
<SmallText>{moment(note.modify_time*1000).format('YYYY-MM-DD')} </SmallText>

{secondLine}
{secondLine}
{secondLine} */