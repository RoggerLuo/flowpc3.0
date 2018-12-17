import React from 'react'
import './global.css'
import { Model } from 'dvax'
import IndexPage from './pages/indexPage'
import CategoryPage from './pages/categoryPage'
import Header from './globalHeader'
class App extends React.Component {
    state = {current: 'index'}
    handleClick = e => this.setState({current: e.key})
    render() {
        return (
            <div style={{height:'100%',justifyContent: 'space-between',display:'flex'}}>
                <Header {...this.props} {...this.state} handleClick={this.handleClick}/>
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
