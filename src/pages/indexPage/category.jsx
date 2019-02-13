import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import {editorOperations} from 'components/editor'
import updateList from './updateList'
const categoryBackgroundColor = `transparent` //#4a4a4a
const ItemWrap = styled.div``
const ItemText  = styled.div`
    left: 5px;
    color:white;
    font-size:14px;
    font-weight:300;
    position:relative;
    max-width: 150px;
    word-break: break-all;
    white-space: nowrap;
    line-height:35px;
    overflow:hidden;
`
const Wrapper = styled.div`
    background: -webkit-linear-gradient(45deg,#505050,black);
    height:100%;
    overflow:auto;
    &::-webkit-scrollbar {
        width: 0px;
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: black;
    }
`
const getTag = color => styled.div`
    background-color:${color};
    width:7px;
    height: 7px;
    margin: auto 0;
`
function hexToRgba(hex, opacity) { 
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"
}
function Category({ list, selectedNote, selectedCategory, ...props }){
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
    const categoryList = [{name:'All',id:'all',color:'#7d7d7d'},{name:'Uncategorized',id:0,color:'#7d7d7d'},...list]
    return (
        <Wrapper >
            <div style={{color:'white',height:'45px',background:categoryBackgroundColor}} onClick={()=>props.handleClick({key:'category'})}>
                设置
            </div>
            {categoryList.map((el,ind)=>{
                const selectedColor = el.color?hexToRgba(el.color,0.5):'#ececec'
                const Tag = getTag(el.color) //el.color
                //background-color:
                //border-bottom:2px solid ${categoryBackgroundColor};
                const Item = styled.div`
                    padding:0 10px;
                    height: 35px;
                    background-color:${categoryBackgroundColor};
                    margin-bottom:2px;
                    width: 100%;
                    display: flex;
                    text-align: center;
                    cursor: pointer;
                    color: black;
                    font-size: 14px;
                    &:hover{
                        background-color:${selectedColor};
                    }
                `
                if(selectedCategory.id === el.id && selectedNote.id===undefined) {
                    return (
                        <ItemWrap key={ind} style={style}>
                            <Item style={{backgroundColor:selectedColor}}>
                                {/* <Tag/> */}
                                <ItemText >
                                    <div>{el.name}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                    )    
                }
                return (
                    <ItemWrap key={ind} style={style}>
                        <Item onClick={()=>onClick(el)} >
                            {/* <Tag/> */}
                            <ItemText >
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