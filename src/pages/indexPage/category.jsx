import React from 'react'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
const ItemWrap = styled.div`
    padding:5px 5px;
    width:50%;
    float:left;
`
const Item = styled.div`
    height: 100px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    text-align: center;
    background-color: white;
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

function Category({ list, selectedNoteIdx }){
    const style = { padding:'5px 5px', height:'100%' }
    if(selectedNoteIdx!==null) {
        style.backgroundColor = '#1990fe'
    }
    const onClick = category => {
        if(selectedNoteIdx!==null) {
            Model.run('app',function*({fetch,get,change}){
                const note = get('list').notes[selectedNoteIdx]
                const res = yield fetch(`classify/${note.id}/${category.id}`)
                if(res.hasErrors) return
                yield change('selectedNoteIdx',null)
                message.success('分类成功')
            })
        }else{
            Model.change('category','selectedCategory',category)
            Model.change('list','query.categoryId',category.id)
            Model.dispatch({type:'list/getData'})
        }
    }
    const categoryList = [...list,{name:'Uncategorized',id:0}]
    return (
        <div style={style}>
            {categoryList.map((el,ind)=>{
                return (
                    <ItemWrap key={ind}>
                        <Item onClick={()=>onClick(el)}>
                            <ItemText>
                                <div>{el.name}</div>
                            </ItemText>
                        </Item>
                    </ItemWrap>
                )
            }
        )}
    </div>)
}

export default Category