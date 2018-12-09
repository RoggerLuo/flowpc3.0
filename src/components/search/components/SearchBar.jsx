import React from 'react'
import { connect } from 'dvax'
import { Input } from 'antd'
const { TextArea } = Input

function Search({ text, visibility, dispatch }) {
    if(!visibility) return null
    return (
        <div style={{backgroundColor:'#a0a0a07d',position:'fixed', top:'0',bottom:'0',left:'0',right:'0'}}>
            <div id="search-wrapper" style={{width:'50%',marginLeft:'25%',marginTop:'15%'}}>
                <TextArea 
                    placeholder="Search..." 
                    style={{fontSize:'16px'}}
                    onChange={global.flow.search.onSearchInput}
                    value={text}
                    autosize 
                />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return { 
        visibility: state.search.visibility,
        text: state.search.text
    }
}

export default connect(mapStateToProps)(Search)
