import React from 'react'
import { Model } from 'dvax'
import img from './bg.png'
import styled from 'styled-components'
import icon from 'assets/icon/iconfont.css'
const OuterMost = styled.div`
    font-size:17px;
    cursor:text;
    height:100%;
    background-color:white;
    overflow-y:scroll;
    &::-webkit-scrollbar {
        width: 8px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: #d6d6d6;
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
function Container({ children, focus, unsaved }) {
    let style = {}
    if(unsaved){
        style = { ...style, backgroundImage: `url(${img})` }            
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
        </OuterMost>
    )
}
export default Model.connect('editor')(Container)
