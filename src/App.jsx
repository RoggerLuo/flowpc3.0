import React from 'react'
import './global.css'
import styled from 'styled-components'
import { Menu } from 'antd'
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
                    <div style={{flex:1}}>
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

                        </Menu>

                    </div>
                    <div style={{flex:1}}>
                        <div style={{paddingLeft:'16px',fontWeight:500}}>
                            {this.props.selectedCategory.name||'Uncategorized'}
                        </div>
                    </div>
                    <div style={{flex:1}}>
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
export default Model.connect('category')(App)
