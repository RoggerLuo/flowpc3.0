import React from 'react'
import { connect } from 'dvax'
import img from './bg.png'
import styled from 'styled-components'
import xinjian from './images/xinzeng.png'
import xinjian2 from './images/xinzeng-2.png'
import baocun from './images/baocun.png'
import baocun2 from './images/baocun-2.png'

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
            <div style={{position:'absolute',bottom:0}}>
                <img src={xinjian} height="37" width="37" style={{marginRight:'20px'}} onMouseEnter={()=>{}}/>
                <img src={baocun} height="40"/>
            </div>

        </OuterMost>
    )
}
function mapStateToProps(state) {
    return { 
        unsaved: state.editor.unsaved
    }
}
export default connect(mapStateToProps)(Container)
