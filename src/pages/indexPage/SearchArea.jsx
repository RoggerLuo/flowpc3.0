import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import { Input } from 'antd'
const Search = Input.Search
const Wrap = styled.div`
    height:58px;
    padding-top:10px;
    padding-left: 6%;
`
Model.create({namespace:'search',
    state:{data:false,visible:false},
    effects:{
        *search({fetch,put},{content}){
            const wordArray = content.split(" ")
            let notes = []
            if(wordArray.length>=1){
                const dbSearchContent = wordArray[0]
                const res = yield fetch(`search`,{method:'post',body:{content:dbSearchContent}})
                notes = res.data
                notes.sort((a,b)=>b.modify_time - a.modify_time)    
            }
            if(wordArray.length>=2){
                for (let index = 1; index < wordArray.length; index++) {
                    const word = wordArray[index]
                    notes = notes.filter(el=>el.content.indexOf(word)!==-1)
                }
            }
            Model.dispatch({type:'list/replaceNotes',notes})
            // Model.change('search','data',res.data)
        }
    }
})
function SearchArea(){
    return (
        <Wrap>
            <Search
                placeholder="用空格分隔多个搜索关键词"
                onChange={value=>{
                    if(value.target.value === ''){
                        Model.dispatch({type:'list/replaceNotesBack'})
                    }
                }}
                onSearch={value => {
                    if(value==='') return
                    Model.dispatch({type:'search/search',content:value})
                    // Model.change('search','visible',true)
                }}
                style={{ width: "93%" }}
            />
        </Wrap>
    )
}
export default SearchArea