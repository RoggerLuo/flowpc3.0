import React from 'react'
import { Editor } from 'draft-js'
import keyBinding from './keyBinding'

export default function({ editorState, onChange, handleKeyCommand, setRef }) {
    return (
        <Editor 
            editorState={editorState} 
            onChange={onChange} 
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={keyBinding}
            ref={setRef} 
        />
    )
}
