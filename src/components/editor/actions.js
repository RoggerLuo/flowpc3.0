import moveSelectionToEnd from './moveSelectionToEnd'
import { startFromScratch, startFromText } from './draft'
import { Model } from 'dvax'

export default function() {
    const self = this
    let newNoteAdded = false
    let oldText = ''
    return {
        deleteNote() {
            const { itemId, editorState } = self.state
            // 构建hint
            let content = editorState.getCurrentContent().getPlainText()
            if (content.length > 20) {
                content = content.slice(0, 20) + '...'
            }
            if (!confirm(`确定要删除当前文章吗?\n"${content}"`)) return
            // 发送请求，执行callback
            const callback = () => self.props.onDelete(itemId)
            Model.dispatch({ type: 'editor/delete', itemId, callback })
        },
        saveNote() {
            const { itemId, editorState } = self.state
            const note = { itemId, content: editorState.getCurrentContent().getPlainText() }
            if (newNoteAdded) {
                newNoteAdded = false
                self.props.onNew && self.props.onNew(note)
            } else {
                self.props.onSave && self.props.onSave(note)
            }
            const unsaved = Model.get('editor').unsaved
            Model.dispatch({ type: 'editor/save', unsaved, itemId, editorState })
        },
        newNote() {
            // saveNote = saveNote.bind(this)
            this.saveNote()
            self.state.inputDOM.blur()
            const itemId = Date.parse(new Date()) / 1000
            self.setState({ editorState: startFromScratch(), itemId }, () => {
                state.inputDOM.focus()
                newNoteAdded = true
            })
        },
        replace(note) {
            const editorState = startFromText(note.content)
            oldText = editorState.getCurrentContent().getPlainText()
            self.setState({ editorState, itemId: note.itemId })
        },
        onChange(editorState) {
            const newText = editorState.getCurrentContent().getPlainText()
            self.setState({ editorState }, () => {
                if (newText !== oldText) {
                    Model.change('editor', 'unsaved', true)
                    oldText = newText
                }
            })
        },
        focus() {
            if (document.activeElement.contentEditable != 'true') {
                self.setState({ editorState: moveSelectionToEnd(self.state.editorState) }, () => {
                    self.state.inputDOM.focus()
                })
            }
        }
    }
}