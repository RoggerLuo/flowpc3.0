import React from 'react'
import List from 'components/list_main'
import ListSimilar from 'components/list_similar'
import Editor from 'components/editor'
import EditorWindow from 'components/editorWindow'
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
const EWindow = styled.div`
    position: absolute;
    min-width: 400px;
    min-height: 100px;
    background: white;
`
const temp = {
}
const location = {
    top:0,
    left:0
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
                <div style={{flex:1.2,borderRight:'1px solid #ccc'}}>
                    <Category {...this.props}/>
                </div>
                
                <div style={{flex:2,borderRight:'1px solid #ccc'}}>
                    <List onSelect={this.onSelect}/>
                </div>
                <div style={{flex:3}}>
                    <Editor deliver={Deliver(this.interfaces)}/>
                    <DeleteButton {...this.props}/>
                </div>

                <div style={{flex:2,borderRight:'1px solid #ccc'}}>
                    <ListSimilar onSelect={this.onSelect}/>
                </div>
                <EWindow style={location}>
                    <div style={{background:'#ccc',width:'100%',height:'30px'}} 
                        onMouseDown={e=>{
                            temp.isIn = true
                            temp.x = e.pageX
                            temp.y = e.pageY
                        }}
                        onMouseUp={e=>{
                            temp.isIn = false
                        }}
                        onMouseMove={e=>{
                            if(temp.isIn) {
                                const distantX = e.pageX - temp.x
                                const distantY = e.pageY - temp.y
                                console.log(distantX+location.left)
                                const pa = e.target.parentNode
                                pa.style.left = pa.style.left.slice(0,-2) + distantX + 'px'
                                // location.left = distantX+location.left
                                // location.top = distantY+location.top
                            }
                        }
                    }></div>
                    <EditorWindow deliver={Deliver(this.interfaces)}/>
                </EWindow>
            </Body>
        )
    }
}
export default Model.connect(['category','app','editorWindow'])(App)
