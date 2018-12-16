import moveSelectionToEnd from './moveSelectionToEnd'
import { startFromScratch, startFromText } from './draft'
import { Model } from 'dvax'
import debounce from 'dvax/debounce'

function saveNote(noteId,content,callback){
    Model.run('list',function*({fetch,get,change}){
        if(noteId !== 'new') {
            const body = {content}
            const res = yield fetch(`note/${noteId}`,{method:'post',body})
            callback && callback()
        }else{ // new
            const body = {content,category_id:Model.get('category').selectedCategory.id }
            const res = yield fetch(`note`,{method:'post',body})
            const id = res.data.insert_id
            const notes = get().notes.slice()
            notes.unshift({content,id})
            yield change('notes',notes)
            callback && callback(id)
            Model.change('list','editingNoteIndex',0)
        }
    })
}
const saveNoteDebouce = debounce(saveNote,1500)

export default function() {
    const self = this
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
        //     const { noteId, editorState } = self.state
        //     const note = { noteId, content: editorState.getCurrentContent().getPlainText() }
        //     if(noteId !== 'new') {
        //         self.props.onSave && self.props.onSave(note)
        //     }
            // if (newNoteAdded) {
            //     newNoteAdded = false
            //     self.props.onNew && self.props.onNew(note)
            // } else {
            //     self.props.onSave && self.props.onSave(note)
            // }
            // const unsaved = Model.get('editor').unsaved
            // debugger
            // Model.dispatch({ type: 'editor/save', unsaved, itemId, editorState })
        },
        newNote() {
            const { noteId, editorState } = self.state
            const newText = editorState.getCurrentContent().getPlainText()
            if(Model.get('editor').unsaved) {
                saveNote(noteId,newText)
            }
            Model.change('list','editingNoteIndex',null)
            // saveNote = saveNote.bind(this)
            // this.saveNote()

            self.state.inputDOM.blur()
            // const itemId = Date.parse(new Date()) / 1000
            
            self.setState({ editorState: startFromScratch(), noteId:'new' }, () => {
                self.state.inputDOM.focus()
                // newNoteAdded = true
            })
        },
        replace(note) {
            const editorState = startFromText(note.content)
            oldText = editorState.getCurrentContent().getPlainText()
            self.setState({ editorState, noteId: note.id })
        },
        onChange(editorState) {
            const { noteId } = self.state
            const newText = editorState.getCurrentContent().getPlainText()
            if(noteId==='new' && newText==='') return // 新建就不保存
            self.setState({ editorState }, () => {
                if (newText !== oldText) {
                    Model.change('editor', 'unsaved', true)
                    oldText = newText
                    const idx = Model.get('list').editingNoteIndex
                    if(idx!==null) {
                        Model.change('list',`notes[${idx}].content`,newText)
                    }
                }
            })
            saveNoteDebouce(noteId,newText,insertId=>{
                Model.change('editor', 'unsaved', false)
                if(insertId) { //如果是新建
                    self.setState({noteId:insertId})
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