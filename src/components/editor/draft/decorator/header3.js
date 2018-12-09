import React from 'react'

export default [
  {
    strategy: headerStrategy,
    component: Header,
  },
  {
    strategy: poundSignStrategy,
    component: PoundSign,
  }
]

function headerStrategy(contentBlock, callback, contentState) {
    const text = contentBlock.getText()
    if(text.ltrim().indexOf('###') === 0){
      callback(3, text.length)
    }
}
function poundSignStrategy(contentBlock, callback) {
    const text = contentBlock.getText()
    if(text.ltrim().indexOf('###') === 0){
      callback(0, 3)
    }
}

function Header(props){
  return (<span style={{fontSize:'20px'}}>{props.children}</span>)
}

function PoundSign(props){
  return (<span style={{fontSize:'20px',color:'#ccc'}}>{props.children}</span>)
}
