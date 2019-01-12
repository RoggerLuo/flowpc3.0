import React from 'react'
import { connect } from 'dvax'
import img from './bg.png'
import styled from 'styled-components'
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
    border-right: 1px solid #cccccc
`
function Container({ children, focus, unsaved }) {
    let style = {}
    if(unsaved){
        style = { ...style, backgroundImage: `url(${img})` }            
    }
    return (
        <OuterMost style={style} onClick={focus}>
            <div style={{ padding: '10px' }}>
                {children}
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
