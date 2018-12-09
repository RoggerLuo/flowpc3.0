import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
const { hasCommandModifier, isCtrlKeyCommand } = KeyBindingUtil
import { Editor, EditorState, ContentState } from 'draft-js'
export function handleKeyCommand(command) {
    if (command === 'myeditor-save') {
        this.saveNote()
        return 'handled'
    }
    if (command === 'myeditor-new') {
        this.newNote()
        return 'handled'
    }
    return 'not-handled'
}

export function myKeyBindingFn(e) {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
        return 'myeditor-save'
    }
    if (e.keyCode === 78 /* `S` key */ && isCtrlKeyCommand(e) && hasCommandModifier(e)) {
        return 'myeditor-new'
    }
    return getDefaultKeyBinding(e)
}
