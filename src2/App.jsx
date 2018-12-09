import React from 'react'
import './global.css'
import { Model } from 'dvax'
import styled from 'styled-components'
import model from './model'
Model.create(model)

const Margin = styled.div`
    margin:20px;
`
const Link = styled.a`
    text-decoration: none;
    color: black;
`

class App extends React.Component { 
    constructor(props) {
        super(props)
    }
    render() {
        return (<Margin>
            <h2>{'Welcome'}</h2>
            <Link href="https://www.npmjs.com/package/dvax" target="_blank">查看文档</Link>
        </Margin>)
    }
}
export default App