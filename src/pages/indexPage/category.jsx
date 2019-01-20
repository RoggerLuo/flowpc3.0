import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import {editorOperations} from 'components/editor'
import updateList from './updateList'
const ItemWrap = styled.div``
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
//    margin:auto;
//    display: inline-block;


const ItemText  = styled.div`
    position:relative;
    max-width: 150px;
    word-break: break-all;
    color:white;
    font-size:18px;
    white-space: nowrap;
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
    width:70%;
    margin-right:-70%;
    height:80%;
`
function hexToRgba(hex, opacity) { 
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"
}
function Category({ list, selectedNote, selectedCategory }){
    const style = {} //padding:'5px 5px',
    if(selectedNote.id) {
        style.borderBottom = '1px solid #1990fe'
    }
    else{
        // style.borderBottom = '1px solid #ececec'
    }
    const onClick = category => {
        if(selectedNote.id) { // 分类note到category
            Model.run('app',function*({fetch,get,change}){
                let note = get('list').notes.find(el=>el.id===selectedNote.id)
                if(!note) {
                    note = get('listSimilar').notes.find(el=>el.id===selectedNote.id)
                }
                if(!note) { message.error('遇到错误') }
                const res = yield fetch(`classify/${note.id}/${category.id}`)
                if(res.hasErrors) return
                if(get('app').selectedListIdx === 0) {
                    if(get('category').selectedCategory.id !== 'all') {
                        updateList('list')
                    }
                }
                Model.change('app','editingNote',{})
                Model.change('app','selectedNote',{})
                message.success('分类成功')
                editorOperations.new()
            })
        }else{ // 查看分类下的文章
            Model.change('list','query.categoryId',category.id)
            Model.change('app','editingNote',{})

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
                if(selectedCategory.id === el.id && selectedNote.id===undefined) {
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
                            <div >
                                <ItemText style={{top:'17px',color:el.color}}>
                                    <div>{el.name}</div>
                                </ItemText>
                                <ItemText  style={{bottom:'10px',height:'27px',overflow:'hidden'}}>
                                    <div>{el.name}</div>
                                </ItemText>

                            </div>
                        </Item>
                    </ItemWrap>
                )
            })}
        </Wrapper>
    )
}
export default Category