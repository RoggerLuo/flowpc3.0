import React from 'react'

export function NoteWrapper({ isSelected, children }){
    let style = { cursor:'pointer' }
    let _class = ""
    if(isSelected){
        style = { backgroundColor: '#ececec' } 
        _class = "selectedNote"
    }
    return (
      <div style={style} className={_class}>
          {children}
      </div>
    )
}
