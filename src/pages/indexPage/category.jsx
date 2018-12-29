import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import {editorOperations} from 'components/editor'
const ItemWrap = styled.div``
const Item = styled.div`
    height: 62px;
    width: 100%;
    display: flex;
    text-align: center;
    background-color:white;
    cursor: pointer;
    color: black;
    font-size: 14px;
    color: #5d5d5d;
    margin-bottom:1px;
`
const ItemText  = styled.div`
    max-width: 150px;
    display: inline-block;
    margin:auto;
    word-break: break-all;
`
const Wrapper = styled.div`
    height:100%;
    overflow:auto;

    &::-webkit-scrollbar {
        width: 0px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: #d6d6d6;
    }

`
function Category({ list, selectedNoteIdx, selectedCategory }){
    const style = {} //padding:'5px 5px',
    if(selectedNoteIdx!==null) {
        style.backgroundColor = '#1990fe'
    }
    const onClick = category => {
        if(selectedNoteIdx!==null) { // 分类note到category
            Model.run('app',function*({fetch,get,change}){
                const note = get('list').notes[selectedNoteIdx]
                const res = yield fetch(`classify/${note.id}/${category.id}`)
                if(res.hasErrors) return
                const notes = get('list').notes.slice()
                notes.splice(selectedNoteIdx,1)
                yield change('selectedNoteIdx',null)
                message.success('分类成功')
                Model.change('list','notes',notes)
                Model.change('list','editingNoteIndex',null)
            })
        }else{ // 查看分类下的文章
            Model.change('category','selectedCategory',category)
            Model.change('list','query.categoryId',category.id)
            Model.dispatch({type:'list/getData'})
            Model.change('list','editingNoteIndex',null)
            editorOperations.new()
        }
    }
    const categoryList = [{name:'All',id:'all'},{name:'Uncategorized',id:0},...list]
    return (
        <Wrapper style={style}>
            {categoryList.map((el,ind)=>{
                if(selectedCategory.id === el.id && selectedNoteIdx===null) {
                    return (
                        <ItemWrap key={ind}>
                            <Item onClick={()=>onClick(el)} style={{backgroundColor:'#ececec'}}>
                                <ItemText>
                                    <div>{el.name}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                    )    
                }
                return (
                    <ItemWrap key={ind}>
                        <Item onClick={()=>onClick(el)}>
                            <ItemText>
                                <div>{el.name}</div>
                            </ItemText>
                        </Item>
                    </ItemWrap>
                )
            })}
        </Wrapper>
    )
}
export default Category