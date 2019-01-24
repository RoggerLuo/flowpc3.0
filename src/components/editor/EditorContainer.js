import React from 'react'
import { Model } from 'dvax'
import img from './bg.png'
import styled from 'styled-components'
import icon from 'assets/icon/iconfont.css'
import 'dvax/dateFormat'
const OuterMost = styled.div`
    font-size:17px;
    cursor:text;
    height:100%;
    background-color:white;
    overflow-y:scroll;
    &::-webkit-scrollbar {
        width: 2px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: black;
    }
    border-right: 1px solid #cccccc;
    padding-top:8px;
    padding-left:12px;
`
const IconWrap = styled.div`
    width: 37%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 12px;
`
function Container({ children, focus, unsaved, editingNote}) {
    let style = {}
    if(unsaved){
        style = { ...style, backgroundImage: `url(${img})` }            
    }
    let modify_time = ''
    if(editingNote.modify_time) {
        const date = new Date(editingNote.modify_time*1000)
        modify_time = date.format('yyyy年M月d日 hh:mm')
    }

    return (
        <OuterMost style={style} onClick={focus}>
            <div style={{ padding: '5px 10px 10px 10px' }}>
                {children}
            </div>
            <IconWrap >
                <i className={icon.iconCreate+' '+icon.iconfont} style={{fontSize:'43px'}}></i>
                <i className={icon.iconSave+' '+icon.iconfont} style={{fontSize:'45px'}}></i>
            </IconWrap>
            <div>
            {modify_time}

            </div>
        </OuterMost>
    )
}
export default Model.connect(['app','editor'])(Container)
