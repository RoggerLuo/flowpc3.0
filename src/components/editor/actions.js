import moveSelectionToEnd from './moveSelectionToEnd'
import { startFromScratch, startFromText } from './draft'
import { Model } from 'dvax'
import debounce from 'dvax/debounce'
import moment from 'moment'
function updateNoteInList(list_namespace,newText){
    const editingNote = Model.get('app').editingNote
    const notes = Model.get(list_namespace).notes
    const __editingNote = notes.find(el=>el.id===editingNote.id)
    if(__editingNote) {
        const idx = notes.indexOf(__editingNote)
        Model.change(list_namespace,`notes[${idx}].content`,newText)    
    }
}
function saveNote(noteId,content,callback){
    if(!Model.get('editor').unsaved) return
    Model.run('list',function*({fetch,get,change}){
        if(noteId !== 'new') {
            const body = {content}
            const res = yield fetch(`note/${noteId}`,{method:'post',body})
            callback && callback()
        }else{ // new
            let category_id = Model.get('category').selectedCategory.id
            if(category_id === 'all') {
                category_id = 0
            }
            const body = {content,category_id}
            const res = yield fetch(`note`,{method:'post',body})
            const id = res.data.insert_id
            const notes = get().notes.slice()
            const new_note = {category:category_id,content,id,modify_time:moment().unix()}
            notes.unshift(new_note)
            yield change('notes',notes)
            const editingNoteIdx = get('app').editingNoteIdx
            callback && callback(id)
            Model.change('app','editingNote',new_note)
        }
    })
}
export default function() {
    const self = this
    let oldText = ''
    const innerTemp = {saveNoteDebouce(){}}
    return {
        newNote() {
            const { noteId, editorState } = self.state
            const newText = editorState.getCurrentContent().getPlainText()
            if(Model.get('editor').unsaved) {
                saveNote(noteId,newText)
            }   
            Model.change('app','editingNote',{})
            self.state.inputDOM.blur()            
            self.setState({ editorState: startFromScratch(), noteId:'new' }, () => {
                self.state.inputDOM.focus()
            })
        },
        replace(note) {
            innerTemp.saveNoteDebouce = debounce(saveNote,1500)
            const _editorState = startFromText(note.content)
            oldText = _editorState.getCurrentContent().getPlainText()
            self.setState({ editorState:_editorState, noteId: note.id })
        },
        onChange(editorState) {
            const { noteId } = self.state
            const newText = editorState.getCurrentContent().getPlainText()
            if(noteId==='new' && newText==='') return // 新建而且为空就不保存
            self.setState({ editorState }, () => {
                if (newText !== oldText) {
                    Model.change('editor', 'unsaved', true)
                    oldText = newText
                    updateNoteInList('list',newText)
                    updateNoteInList('listSimilar',newText)
                }
            })
            innerTemp.saveNoteDebouce(noteId,newText,insertId=>{
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
        },
        saveNote() {
            const { noteId, editorState } = self.state
            const content = editorState.getCurrentContent().getPlainText()
            saveNote(noteId,content,insertId=>{
                Model.change('editor', 'unsaved', false)
                if(insertId) { //如果是新建
                    self.setState({noteId:insertId})
                }
            })        
        },
        deleteNote() {
            return
        },
    }
}