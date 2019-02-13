import React from 'react'
import './global.css'
// import { Model } from 'dvax'
import IndexPage from './pages/indexPage'
import CategoryPage from './pages/categoryPage'
// import Header from './globalHeader'
import 'assets/icon/iconfont.css'
class App extends React.Component {
    state = {current: 'index'}
    handleClick = e => this.setState({current: e.key})
    render() {
        return (
            <div style={{height:'100%',justifyContent: 'space-between',display:'flex'}}>
                {(()=>{
                    if(this.state.current==='category') {
                        return <CategoryPage handleClick={this.handleClick}/>
                    }
                    return <IndexPage handleClick={this.handleClick}/>
                })()}
            </div>
        )
    }
}
export default App
// Model.connect(['category','editor'])(
// {...this.props}
//                <Header {...this.state} handleClick={this.handleClick}/>
