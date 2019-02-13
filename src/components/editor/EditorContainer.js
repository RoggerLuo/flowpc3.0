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
    min-width:460px;
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
const LabelWrap = styled.div`
    width: 36%;
    min-width:450px;
    height: 20%;
    justify-content: space-evenly;
    position: absolute;
    bottom: 12px;
    padding: 10px 0px;
    overflow:auto;
    background-color:gold;
`
//

function goback(){
    const hisN =[...Model.get('app').historyNote]
    if(hisN.length>1) {
        hisN.pop()
        const note = hisN.pop()
        global.interfaces.replace(note)
        hisN.push(note)
        Model.change('app','historyNote',hisN)            
    }
}
function Container({ list,children, focus, unsaved, editingNote}) {
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
            <div style={{ padding: '15px 10px 10px 10px' }}>
                {children}
            </div>
            <LabelWrap>
                {list.map((el,ind)=>{
                    return (
                        <div key={ind} style={{margin:'3px 16px 3px 6px',whiteSpace: 'nowrap',display:'inline-block',cursor:'pointer'}}>
                            {el.name}
                        </div>
                    )
                })}
            </LabelWrap>
            <div style={{position:'absolute',bottom:0}}>
                {modify_time}
            </div>
        </OuterMost>
    )
}
export default Model.connect(['app','category','editor'])(Container)
/* 
    <IconWrap >
        <i className={icon.iconCreate+' '+icon.iconfont} style={{fontSize:'43px'}}></i>
        <i className={icon.iconSave+' '+icon.iconfont} style={{fontSize:'45px'}}></i>
    </IconWrap>
 */