import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
const { hasCommandModifier, isCtrlKeyCommand } = KeyBindingUtil

export default function(e) {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
        return 'save'
    }
    if (e.keyCode === 78 /* `S` key */ && isCtrlKeyCommand(e) && hasCommandModifier(e)) {
        return 'new'
    }
    return getDefaultKeyBinding(e)
}
