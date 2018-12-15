import React from 'react'
import { connect } from 'dvax'
import img from './bg.png'

function Container({ children, focus, unsaved }) {
    let style = { fontSize:'17px', cursor:'text', height:'100%', backgroundColor:'white' }
    if(unsaved){
        style = { ...style, backgroundImage: `url(${img})` }            
    }
    return (
        <div style={style} onClick={focus}>
            <div style={{ padding: '10px' }}>
                {children}
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return { 
        unsaved: state.editor.unsaved
    }
}
export default connect(mapStateToProps)(Container)
