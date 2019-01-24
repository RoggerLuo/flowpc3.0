import React from 'react'
import styled from 'styled-components'
import {editorOperations} from 'components/editor'
import {Model} from 'dvax'
import 'dvax/dateFormat'
const Wrapper = styled.div`
    width:100%;
    height:41px;
    line-height:40px;
    text-align:left;
    border-bottom:1px solid #ccc;
    position:absolute;
    top:0;
    display:flex;
`
const Item = styled.div`
    padding: 0px 10px;
    font-weight:500;
`
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
Model.create({namespace:'search',
    state:{data:false,visible:false},
    effects:{
        *search({fetch},{content}){
            const res = yield fetch(`search`,{method:'post',body:{content}})
            Model.change('search','data',res.data)
        }
    }
})
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
const SearchPanel = Model.connect('search')(SearchPanel__)

function Header ({handleClick,current,selectedCategory,unsaved,...props}) {
    function enterCategoryEditing(){
        Model.change('app','editingNoteIdx',null)
        editorOperations.new()
        handleClick({key:'category'})
    }
    return (
        <Wrapper>
            <SearchPanel/>
            <div style={{flex:3.2,display:'flex',justifyContent:'space-between'}}>
                {
                    current==='index'?
                    <div style={{padding:'0px 13px',color:'#ccc',cursor:'pointer'}} onClick={enterCategoryEditing}>
                        {current==='index'? '编辑分类':null}
                    </div>:
                    <div onClick={()=>handleClick({key:'index'})} style={{padding:'0px 13px',cursor:'pointer'}}>返回</div>
                }
                <Item>
                    {null
                        // current==='index'?
                        // <div>{selectedCategory.name||'Uncategorized'}</div>:
                        // <div onClick={()=>handleClick({key:'index'})} style={{cursor:'pointer'}}>返回</div>
                    }
                </Item>
            </div>
            {/* <div style={{flex:2}}>
                <Item>
                </Item>
            </div> */}
            <div style={{flex:3}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Item onClick={()=>editorOperations.new()} style={{cursor:'pointer'}}>
                        新建
                    </Item>
                    <Item>
                        {
                            // unsaved?
                            //     <div style={{color:'orange'}}>未保存</div>:
                            //     <div style={{color:'#ccc'}}>已保存</div>
                        }
                    </Item>
                    <Item style={{color:'#ccc'}}>
                    </Item>
                </div>
            </div>
            <div style={{flex:2}}>
                <Item>
                </Item>
            </div>
        </Wrapper>
    )
}
export default Model.connect(['app'])(Header)

