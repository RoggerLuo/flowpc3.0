import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import {editorOperations} from 'components/editor'
const ItemWrap = styled.div`
`
//    border-bottom:1px solid #ececec;
//#ececec
const Item = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    text-align: center;
    background-color:white;
    cursor: pointer;
    color: black;
    font-size: 14px;
    color: #5d5d5d;
`
const ItemText  = styled.div`
    max-width: 150px;
    display: inline-block;
    margin:auto;
    word-break: break-all;
`
const Wrapper = styled.div`
    background-color:white;
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
const getTag = color => styled.div`
    background-color:${color};
    width:10px;
    margin-right:-10px;
    height:100%;
`
function hexToRgba(hex, opacity) { 
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"
}
function Category({ list, selectedNoteIdx, selectedCategory }){
    const style = {} //padding:'5px 5px',
    if(selectedNoteIdx!==null) {
        style.borderBottom = '1px solid #1990fe'
    }
    else{
        style.borderBottom = '1px solid #ececec'
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
                editorOperations.new()
            })
        }else{ // 查看分类下的文章
            Model.change('list','query.categoryId',category.id)
            Model.change('list','editingNoteIndex',null)
            editorOperations.new()
            Model.change('list','hasMore',true)
            Model.dispatch({type:'list/getData',callback(){
                Model.change('category','selectedCategory',category)
            }})
        }
    }
    const categoryList = [{name:'All',id:'all'},{name:'Uncategorized',id:0},...list]
    return (
        <Wrapper >
            {categoryList.map((el,ind)=>{
                const Tag = getTag(el.color)
                const selectedColor = el.color?hexToRgba(el.color,0.3):'#ececec'
                
                if(selectedCategory.id === el.id && selectedNoteIdx===null) {
                    //onClick={()=>onClick(el)}
                    return (
                        <ItemWrap key={ind} style={style}>
                            <Item style={{backgroundColor:selectedColor}}>
                                <Tag/>
                                <ItemText>
                                    <div>{el.name}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                    )    
                }
                return (
                    <ItemWrap key={ind} style={style}>
                        <Item onClick={()=>onClick(el)} >
                            <Tag/>

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