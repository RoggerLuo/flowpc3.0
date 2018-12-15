import React from 'react'
import './global.css'
import styled from 'styled-components'
import { Menu } from 'antd'
import IndexPage from './pages/indexpage'
import CategoryPage from './pages/category'
const Header = styled.div`
    width:100%;
    height:41px;
    line-height:40px;
    text-align:center;
    border-bottom:1px solid #ccc;
    position:absolute;
    top:0;
`
class MenuTab extends React.Component {
    state = {current: 'index'}
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({current: e.key})
    }
    render() {
        return (
            <div style={{height:'100%'}}>
                <Header>
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
export default MenuTab
