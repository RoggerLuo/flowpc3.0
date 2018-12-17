import React from 'react'
import List from 'components/list'
import Editor from 'components/editor'
import styled from 'styled-components'
import {Model} from 'dvax'
import {message} from 'antd'
import Category from './category'
const Body = styled.div`
    width:100%;
    background-color:#f5f5f5;
    position:absolute;
    top:41px;
    bottom:0px;
    overflow-y:auto;
    display:flex;
`
const DeleteWrapper = styled.div`
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 33%;
    height: 75px;
    display:flex;
`
const Delete = styled.div`
    color:white;
    background-color:red;
    border-radius:15px;
    width:90%;
    height:55px;
    margin:0 auto auto auto; 
    line-height:55px;
    text-align:center;
    font-size:16px;
`
function deleteAction(){
    Model.run('list',function*({fetch,get,change}){
        const note = get().notes[get('app').selectedNoteIdx]
        const res = yield fetch(`note/${note.id}`,{method:'delete'})
        if(res.hasErrors) return
        message.success('删除成功')
        const notes = get().notes.slice()
        notes.splice(get('app').selectedNoteIdx,1)
        yield change('notes',notes)
        Model.change('app','selectedNoteIdx',null)
    })
}
function DeleteButton({selectedNoteIdx}){
    if(selectedNoteIdx!==null) {
        return (
            <DeleteWrapper onClick={deleteAction}>
                <Delete>删 除</Delete>
            </DeleteWrapper>
        )    
    }
    return null    
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.interfaces = {}
        this.onSelect = selectedNote => this.interfaces.replace(selectedNote)
    }
    componentDidMount(){
        Model.run('category',function*({fetch,change}){
            const res = yield fetch(`categories`)
            yield change('list',res.data)
        })
        Model.dispatch({type:'list/getData',callback:(notes)=>{
            if (notes[0]) {
                this.interfaces.replace(notes[0])
            }
        }})
    }
    render(){
        const Deliver = (obj) => {
            return (subObj)=>{
                Object.keys(subObj).map(key=>{
                    obj[key] = subObj[key]    
                })
            }
        }
        return (
            <Body>
                <div style={{flex:1,borderRight:'1px solid #ccc'}}>
                    <Category {...this.props}/>
                </div>
                
                <div style={{flex:1,borderRight:'1px solid #ccc'}}>
                    <List onSelect={this.onSelect}/>
                </div>
                
                <div style={{flex:1}}>
                    <Editor deliver={Deliver(this.interfaces)}/>
                    <DeleteButton {...this.props}/>
                </div>
            </Body>
        )
    }
}
export default Model.connect(['category','app'])(App)