import React from 'react'
import { startFromScratch } from './draft'
import Container from './EditorContainer'
import Editor from './EditorUnderlying'
import Keyboard from 'dvax/keyboard'
import keyCommand from './keyCommand'
import getActions from './actions'

const keybind = function(ref,actions){
    const { deleteNote, saveNote, newNote } = { ...actions }
    const k = new Keyboard(ref)
    k.keybind(({ keyMap, meta, ctrl }, catcher) => {
        catcher(keyMap['n'], { meta, ctrl }, newNote)
        catcher(keyMap['s'], { meta }, saveNote)
        catcher(keyMap['backSpace'], { meta, ctrl }, deleteNote)
    })
}

class MyEditor extends React.Component {
    constructor(props) {
        super(props)
        const itemId = Date.parse(new Date()) / 1000
        this.state = { editorState: startFromScratch(), itemId, inputDOM: null }
        this.actions = getActions.bind(this)()
        this.setRef = ref => {
            this.setState({ inputDOM: ref })
            keybind(ref,this.actions)
        }
        this.props.deliver({ replace: this.actions.replace })
    }
    render() {
        return (
            <Container focus={this.actions.focus}>
                <Editor 
                    editorState={this.state.editorState} 
                    onChange={this.actions.onChange}
                    handleKeyCommand={keyCommand(this.actions)}
                    setRef={this.setRef}
                />
            </Container>
        )
    }
}

export default MyEditor