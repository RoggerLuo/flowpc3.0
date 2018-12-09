import React from 'react'
// import s from './style'
import './global.css'
import List,{ initListData, listAdd, listModify, listRemove } from 'components/list'
import Editor from 'components/editor'
import styled from 'styled-components'
import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
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
const Header = styled.div`
    width:100%;
    height:41px;
    line-height:40px;
    text-align:center;
    border-bottom:1px solid #ccc;
    position:absolute;
    top:0;
`
const Content = styled.div`
    width:100%;
    background-color:#f5f5f5;
    position:absolute;
    top:41px;
    bottom:0px;
    overflow-y:auto;
    display:flex;
`
class MenuTab extends React.Component {
  state = {
    current: 'index',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
        <Menu
            style={{lineHeight:'38px'}}
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
        >
            <Menu.Item key="category">
                &nbsp;分类&nbsp;
            </Menu.Item>
            <Menu.Item key="index">
                &nbsp;首页&nbsp; 
            </Menu.Item>
            <Menu.Item key="edit">
                &nbsp;编辑&nbsp;
            </Menu.Item>
        </Menu>
    )
  }
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.interfaces = {}
        this.onSelect = (selectedNote) => {
            this.interfaces.replace(selectedNote)
        }
    }
    componentDidMount(){
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
            <div style={{height:'100%'}}>
                <Header>
                    <MenuTab/>
                </Header>
                <Content>
                    <div style={{flex:1,padding:'5px 5px',borderRight:'1px solid #ccc'}}>
                        <ItemWrap>
                            <Item onClick={()=>{}}>
                                <ItemText>
                                    <div>{'data.name'}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                        <ItemWrap>
                            <Item onClick={()=>{}}>
                                <ItemText>
                                    <div>{'data.name'}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>

                        <ItemWrap>
                            <Item onClick={()=>{}}>
                                <ItemText>
                                    <div>{'data.name'}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                        
                        <ItemWrap>
                            <Item onClick={()=>{}}>
                                <ItemText>
                                    <div>{'data.name'}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                        <ItemWrap>
                            <Item onClick={()=>{}}>
                                <ItemText>
                                    <div>{'data.name'}</div>
                                </ItemText>
                            </Item>
                        </ItemWrap>
                    </div>

                    <div style={{flex:1,borderRight:'1px solid #ccc'}}>
                        <List onSelect={this.onSelect}/>
                    </div>
                    <div style={{flex:1}}>
                        <Editor deliver={Deliver(this.interfaces)}/>
                    </div>
                </Content>
            </div>
        )
    }
}
export default App


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
