import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
    border-radius: 5px;
    font-size:16px;
    line-height:1.5;
    min-height:50px;
    padding:15px 10px 15px 10px;
    margin-bottom:10px;
    background-color:white;
`
export function NoteContent({ id, content, select }){
    return (
        <div onClick={select}>
            <Content>{content}</Content>
        </div>
    )
}
export function NoteWrapper({ isSelected, children }){
    let style = { cursor:'pointer' }
    let _class = ""
    if(isSelected){
        style = { backgroundColor: '#ececec' } 
        _class = "selectedNote"
    }
    return (
      <div style={style} className={_class}>
          {children}
      </div>
    )
}
