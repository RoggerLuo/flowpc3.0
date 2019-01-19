import moveSelectionToEnd from './moveSelectionToEnd'
import { startFromScratch, startFromText } from './draft'
import { Model } from 'dvax'
import debounce from 'dvax/debounce'
function updateNoteInList(list_namespace,newText){
    const editingNote = Model.get('app').editingNote
    const notes = Model.get(list_namespace).notes
    const __editingNote = notes.find(el=>el.id===editingNote.id)
    if(__editingNote) {
        const idx = notes.indexOf(__editingNote)
        Model.change(list_namespace,`notes[${idx}].content`,newText)    
    }
}
const selectNull = () => Model.change('app','editingNote',{})
const markSaved = () => Model.change('editor', 'unsaved', false)
const markUnsaved = () => Model.change('editor', 'unsaved', true)
const isUnsaved = () => Model.get('editor').unsaved
const delaySeconds = 15000
function saveNote(noteId,content,callback){
    if(!isUnsaved()) return
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
            const new_note = {category:category_id,content,id,modify_time:Date.now()/1000}
            notes.unshift(new_note)
            yield change('notes',notes)
            callback && callback(id)
            Model.change('app','editingNote',new_note)
        }
    })
}
export default function() {
    const self = this
    const innerState = {
        oldText:'',
        saveNoteDebouce: debounce(saveNote,delaySeconds),
        postQ: []
    }
    return {
        newNote() {
            function setNew(){
                selectNull()
                innerState.oldText = ''
                innerState.saveNoteDebouce = debounce(saveNote,delaySeconds)
                self.setState({ editorState: startFromScratch(), noteId:'new' }, () => {
                    self.state.inputDOM.blur()            
                    self.state.inputDOM.focus()
                })                
            }
            if(isUnsaved()) {
                const { noteId, editorState } = self.state
                const newText = editorState.getCurrentContent().getPlainText()    
                saveNote(noteId,newText,()=>{
                    markSaved()
                })
            }else{
                setNew()
            }
        },
        replace(note) {
            innerState.saveNoteDebouce = debounce(saveNote,delaySeconds)
            const _editorState = startFromText(note.content)
            innerState.oldText = _editorState.getCurrentContent().getPlainText()
            self.setState({ editorState:_editorState, noteId: note.id })
        },
        onChange(editorState) {
            const { noteId } = self.state
            const newText = editorState.getCurrentContent().getPlainText()
            if(noteId==='new' && newText==='') return // 新建而且为空就不保存
            self.setState({ editorState }, () => {
                if (newText !== innerState.oldText) {
                    markUnsaved()
                    innerState.saveNoteDebouce(noteId,newText,insertId=>{
                        markSaved()
                        if(insertId) { //如果是新建
                            self.setState({noteId:insertId})
                        }
                    })                    
                    updateNoteInList('list',newText)
                    updateNoteInList('listSimilar',newText)
                    innerState.oldText = newText
                }
            })
        },
        focus() { // 点击空白区域
            if (document.activeElement.contentEditable !== 'true') {
                self.setState({ editorState: moveSelectionToEnd(self.state.editorState) }, () => {
                    self.state.inputDOM.focus()
                })
            }
        },
        saveNote() {
            const { noteId, editorState } = self.state
            const content = editorState.getCurrentContent().getPlainText()
            saveNote(noteId,content,insertId=>{
                markSaved()
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