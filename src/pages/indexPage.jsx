import React from 'react'
import List,{ initListData, listAdd, listModify, listRemove } from 'components/list'
import Editor from 'components/editor'
import styled from 'styled-components'
import {Model} from 'dvax'
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
const Body = styled.div`
    width:100%;
    background-color:#f5f5f5;
    position:absolute;
    top:41px;
    bottom:0px;
    overflow-y:auto;
    display:flex;
`
class App extends React.Component {
    constructor(props) {
        super(props)
        this.interfaces = {}
        this.onSelect = (selectedNote) => {
            this.interfaces.replace(selectedNote)
        }
    }
    componentDidMount(){
        Model.run('category',function*({fetch,change}){
            const res = yield fetch(`categories`)
            yield change('list',res.data)
        })
        initListData((notes)=>{
            if (notes[0]) {
                this.interfaces.replace(notes[0])
            }
        })
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
                <div style={{flex:1,padding:'5px 5px',borderRight:'1px solid #ccc'}}>
                    {this.props.list.map((el,ind)=>{
                        return (
                            <ItemWrap key={ind}>
                                <Item onClick={()=>{}}>
                                    <ItemText>
                                        <div>{el.name}</div>
                                    </ItemText>
                                </Item>
                            </ItemWrap>
                        )
                    })}
                </div>
                
                <div style={{flex:1,borderRight:'1px solid #ccc'}}>
                    <List onSelect={this.onSelect}/>
                </div>
                
                <div style={{flex:1}}>
                    <Editor deliver={Deliver(this.interfaces)}/>
                </div>

            </Body>
        )
    }
}
export default Model.connect('category')(App)


// this.replaceHandler = (replacer) => {
//     bridge.replacer = replacer
// }
// this.bridge = bridge
// this.onNewNote = listAdd
// this.onSaveNote = listModify
// this.onDelete = listRemove
// replaceHandler={this.replaceHandler} 
// onNewNote={this.onNewNote} 
// onSaveNote={this.onSaveNote}
// onDelete={this.onDelete}
