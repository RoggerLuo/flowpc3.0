import React from 'react'
import dva,{Model} from 'dvax'
import model from './model'
import Editor from './Editor'

Model.create(model)
/* 对外界一无所知,只能用本组件的model,dispatch自己model的方法 */
export default Editor
/*export function getText() {
    const editorState = dva._store.getState().editor.editorState
    const contentState = editorState.getCurrentContent()
    return contentState.getPlainText()
}*/
// export function replace(note) {
//     dva._store.dispatch({ type:'editor/read', note })
// }
