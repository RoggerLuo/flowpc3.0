import React from 'react'
import styled from 'styled-components'
import {editorOperations} from 'components/editor'
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
function Header ({handleClick,current,selectedCategory,unsaved}) {
    return (
        <Wrapper>
            <div style={{flex:1,display:'flex',justifyContent:'space-between'}}>
                {
                        current==='index'?
                        <div style={{padding:'0px 13px',color:'#ccc',cursor:'pointer'}} onClick={()=>handleClick({key:'category'})}>
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
            
            <div style={{flex:2}}>
                <Item>

                </Item>
            </div>
            <div style={{flex:3}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Item onClick={()=>editorOperations.new()} style={{cursor:'pointer'}}>
                        新建
                    </Item>
                    <Item>
                        {
                            unsaved?
                                <div style={{color:'orange'}}>未保存</div>:
                                <div style={{color:'#ccc'}}>已保存</div>
                        }
                    </Item>
                </div>
            </div>
        </Wrapper>
    )
}
export default Header
