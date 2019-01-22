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
    background-color:white;
    position:absolute;
    top:0px;
    bottom:0px;
    overflow-y:auto;
    display:flex;
`
//#e8e8e8;
const EWindow = styled.div`
    position: absolute;
    min-width: 400px;
    min-height: 100px;
    background: white;
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
        // 初始化拉去文章信息
        Model.dispatch({type:'list/getData',callback(){}})
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
                <div style={{width: '160px',borderRight:'1px solid #ccc'}}>
                    <Category {...this.props}/>
                </div>
                
                <div style={{flex:2,borderRight:'1px solid #ccc'}}>
                    <List onSelect={this.onSelect}/>
                </div>
                <div style={{flex:3}}>
                    <Editor deliver={Deliver(this.interfaces)}/>
                </div>

                <div style={{flex:2,borderRight:'1px solid #ccc'}}>
                    <ListSimilar onSelect={this.onSelect}/>
                </div>
                <DeleteButton {...this.props}/>
            </Body>
        )
    }
}
export default Model.connect(['category','app','editorWindow'])(App)
