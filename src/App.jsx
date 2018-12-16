import React from 'react'
import './global.css'
import styled from 'styled-components'
import Editor,{operations} from 'components/editor'
import { Model } from 'dvax'
import IndexPage from './pages/indexPage'
import CategoryPage from './pages/categoryPage'
const Header = styled.div`
    width:100%;
    height:41px;
    line-height:40px;
    text-align:left;
    border-bottom:1px solid #ccc;
    position:absolute;
    top:0;
    display:flex;
`
const Item = styled.div`
    padding: 0px 10px;
    font-weight:500;
`
class App extends React.Component {
    state = {current: 'index'}
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({current: e.key})
    }
    render() {
        return (
            <div style={{height:'100%',justifyContent: 'space-between',display:'flex'}}>
                <Header>
                    <div style={{flex:1,display:'flex',justifyContent:'space-between'}}>
                        <Item>
                            {this.state.current==='index'?
                                <div>{this.props.selectedCategory.name||'Uncategorized'}</div>:
                                <div onClick={()=>this.handleClick({key:'index'})} style={{cursor:'pointer'}}>返回</div>
                            }
                        </Item>
                        <div style={{paddingRight:'13px',color:'#ccc',cursor:'pointer'}} onClick={()=>this.handleClick({key:'category'})}>
                            {this.state.current==='index'? '设置':null}
                        </div>
                    </div>
                    
                    <div style={{flex:1}}>
                        <Item>

                        </Item>
                    </div>
                    <div style={{flex:1}}>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <Item onClick={()=>operations.new()} style={{cursor:'pointer'}}>
                                新建
                            </Item>
                            <Item>
                                {
                                    this.props.unsaved?
                                        <div style={{color:'orange'}}>未保存</div>:
                                        <div>已保存</div>
                                }
                            </Item>
                        </div>
                    </div>
                </Header>
                {(()=>{
                    if(this.state.current==='category') {
                        return <CategoryPage/>
                    }
                    return <IndexPage/>
                })()}
            </div>
        )
    }
}
export default Model.connect(['category','editor'])(App)
/* 
                        <Item >

                        </Item>


<Menu
    style={{lineHeight:'38px'}}
    onClick={this.handleClick}
    selectedKeys={[this.state.current]}
    mode="horizontal"
>
    <Menu.Item key="index">
        &nbsp;笔记&nbsp; 
    </Menu.Item>
    <Menu.Item key="category">
        &nbsp;分类&nbsp;
    </Menu.Item>

</Menu> */