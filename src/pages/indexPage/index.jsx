import React from 'react'
import List from 'components/list_main'
import ListSimilar from 'components/list_similar'
import Editor from 'components/editor'
import styled from 'styled-components'
import {Model} from 'dvax'
import Category from './category'
import DeleteButton from './delete'
const Body = styled.div`
    width:100%;
    background-color:#e8e8e8;
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
        this.onSelect = selectedNote => this.interfaces.replace(selectedNote)
    }
    componentDidMount(){
        Model.run('category',function*({fetch,change}){
            const res = yield fetch(`categories`)
            yield change('list',res.data)
        })

        // Model.dispatch({type:'listSimilar/getData',noteId:6500,callback(){}})
        // 初始化拉去文章信息
        Model.dispatch({type:'list/getData',callback:(notes)=>{
            // 不用选择第一篇
            // if (notes[0]) {
            //     this.interfaces.replace(notes[0])
            // }
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
                
                <div style={{flex:2,borderRight:'1px solid #ccc'}}>
                    <List onSelect={this.onSelect}/>
                </div>
                <div style={{flex:2,borderRight:'1px solid #ccc'}}>
                    <ListSimilar onSelect={this.onSelect}/>
                </div>
                <div style={{flex:4}}>
                    <Editor deliver={Deliver(this.interfaces)}/>
                    <DeleteButton {...this.props}/>
                </div>


            </Body>
        )
    }
}
export default Model.connect(['category','app'])(App)
