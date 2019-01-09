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
`
const SmallText = styled.div`
    color: #888888;
    font-size: 12px;
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
function Note({ onSelect, editingNoteIndex, index, selectedNoteIdx, note,selectedCategory }){
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
                    <SmallText style={{color:'white'}}>{moment(note.modify_time*1000).format('YYYY-MM-DD')} {secondLine}</SmallText>
                </Content>
            </WrapperBlue>
        )    
    }
    if(note.category === selectedCategory.id && selectedCategory.id!==0) {
        return (
            <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={wrapperStyle}>
                <Content>
                    <Text style={{fontWeight:'500',color:'black'}}>{fisrtLine}</Text>
                    <SmallText>{moment(note.modify_time*1000).format('YYYY-MM-DD')} {secondLine}</SmallText>
                </Content>
            </Wrapper>
        )    
    }
    return (
        <Wrapper onClick={select} onDoubleClick={onDoubleClick} style={wrapperStyle}>
            <Content>
                <Text>{fisrtLine}</Text>
                <SmallText>{moment(note.modify_time*1000).format('YYYY-MM-DD')} {secondLine}</SmallText>
            </Content>
        </Wrapper>
    )
}
export default Note
