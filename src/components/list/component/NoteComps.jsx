import React from 'react'
import styled from 'styled-components'
//    border:0.5px solid #ccc;

const Content = styled.div`
    border-radius: 5px;
    font-size:16px;
    line-height:1.5;
    min-height:50px;
    padding:15px 10px 15px 10px;
    margin-bottom:10px;
    background-color:white;
`
export function NoteContent({ itemId, content, select }){
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
//          <div style={{widht:'100%',height:'1px',borderTop:'0.5px solid #ccc'}}></div>

    // return (
    //     <Card>
    //         <div>{content}</div>
    //     </Card>
    // )

