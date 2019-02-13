import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
const SearchBackground = styled.div`
    background-color:white;
    position:fixed;
    top:41px;
    bottom:0;
    left:0;
    right:0;
    z-index:5;
    overflow:auto;
`
const NoteText = styled.div`
    width: 35%;
    margin: auto;
    line-height: 1.5;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    padding: 20px 35px;
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

const SearchPanel__ = ({visible,data}) => {
    if(!visible) return null
    return  (
        <SearchBackground>
            {
                data && data.map((el,ind)=>{
                    const [firstLine,secondLine] = getFirstLine(el.content)
                    return (
                        <NoteText key={ind}> 
                            <h3>{firstLine}</h3>
                            {secondLine}
                        </NoteText>
                    )
                })
            }
            {data && data.length===0?
                <div style={{textAlign:'center'}}>{'没有搜到'}</div>
                :null}
        </SearchBackground>
    )
}
export default Model.connect('search')(SearchPanel__)
