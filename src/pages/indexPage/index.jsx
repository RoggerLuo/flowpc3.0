import React from 'react'
import List from 'components/list_main'
import ListSimilar from 'components/list_similar'
import Editor from 'components/editor'
import styled from 'styled-components'
import {Model} from 'dvax'
import Category from './category'
import DeleteButton from './delete'
import SearchArea from './SearchArea'
import LoginModal from './loginModal'
// import SearchPanel from './SearchPanel'
//<SearchPanel/>

const Body = styled.div`
    width:100%;
    background-color:white;
    position:absolute;
    top:0px;
    bottom:0px;
    overflow-y:auto;
    display:flex;
`
class App extends React.Component {
    constructor(props) {
        super(props)
        this.interfaces = {}
        this.onSelect = selectedNote => {
            const hisN =[...Model.get('app').historyNote]
            hisN.push(selectedNote)
            Model.change('app','historyNote',hisN)

            this.interfaces.replace(selectedNote)
        }
    }
    componentDidMount(){
        const token = localStorage.getItem('flow_token')
        if(token) {
            Model.change('login','visible',false)
        }else{
            Model.dispatch({type:'app/verify'})
        }

        Model.run('category',function*({fetch,change}){
            const res = yield fetch(`categories`)
            if(res ==='authorization failed') return
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
        function goback(){
            const hisN =[...Model.get('app').historyNote]
            if(hisN.length>1) {
                hisN.pop()
                const note = hisN.pop()
                global.interfaces.replace(note)
                // 这是找相似笔记的全局组件
                Model.dispatch({type:'listSimilar/getData',noteId:note.id,callback(){}})
                Model.change('listSimilar','selectedKeywords',[]) 
        
                hisN.push(note)
                Model.change('app','historyNote',hisN)            
            }
        }
        return (
            <Body>
                <LoginModal/>
                <div style={{width: '160px',borderRight:'1px solid #ccc'}}>
                    <Category {...this.props}/>
                </div>
                <div style={{width: '300px',flex:2,borderRight:'1px solid #ccc',display:'flex',flexDirection:'column'}}>
                    <SearchArea/>
                    <List onSelect={this.onSelect}/>
                </div>
                <div style={{flex:3}}>
                    <div onClick={goback} style={{backgroundColor:'white',cursor:'pointer',position:'absolute',top:0}}>
                        {"<goBack"}
                    </div>
                    <Editor deliver={Deliver(this.interfaces)}/>
                </div>
                <div style={{flex:2.1,borderRight:'1px solid #ccc'}}>
                    <ListSimilar onSelect={this.onSelect}/>
                </div>
                <DeleteButton {...this.props}/>
            </Body>
        )
    }
}
export default Model.connect(['category','app','editorWindow'])(App)
