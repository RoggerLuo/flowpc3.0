import React from 'react'
import invariant from 'invariant'
import { NoteContent, NoteWrapper } from './NoteComps'

function Note({ dispatch, onSelect, index, currentIndex, note }){
    const isSelected = index === currentIndex
    const select = () => {
        if(isSelected) return
        invariant(typeof(onSelect)==='function','onSelect should be a function')
        dispatch({ type: 'list/select', index })
        onSelect(note)
    }
    return (
        <NoteWrapper isSelected={isSelected}>
            <NoteContent {...note} select={select}/>
        </NoteWrapper>
    )
}

export default Note
