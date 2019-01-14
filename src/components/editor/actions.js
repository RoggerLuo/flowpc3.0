import moveSelectionToEnd from './moveSelectionToEnd'
import { startFromScratch, startFromText } from './draft'
import { Model } from 'dvax'
import debounce from 'dvax/debounce'
import moment from 'moment'
import { message } from 'antd';
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
            notes.unshift({category:category_id,content,id,modify_time:moment().unix()})
            yield change('notes',notes)
            const editingNoteIdx = get('app').editingNoteIdx
            callback && callback(id)
            if(editingNoteIdx!==null) {
                Model.change('app','editingNoteIdx',editingNoteIdx+1)
            }else{
                Model.change('app','editingNoteIdx',0)
            }
        }
    })
}
// let saveNoteDebouce = ()=>{}

export default function() {
    const self = this
    let oldText = ''
    const innerTemp = {
        saveNoteDebouce(){
        }
    }
    return {
        newNote() {
            const { noteId, editorState } = self.state
            const newText = editorState.getCurrentContent().getPlainText()
            if(Model.get('editor').unsaved) {
                saveNote(noteId,newText)
            }
            Model.change('app','editingNoteIdx',null)
            self.state.inputDOM.blur()            
            self.setState({ editorState: startFromScratch(), noteId:'new' }, () => {
                self.state.inputDOM.focus()
            })
        },
        replace(note) {

            /* debugger
            if(Model.get('editor').unsaved) {
                const { noteId, editorState } = self.state
                const newText = editorState.getCurrentContent().getPlainText()
                debugger
                if(noteId==='new' && newText==='') return // 新建而且为空就不保存
                self.setState({ editorState }, () => {
                    if (newText !== oldText) {
                        Model.change('editor', 'unsaved', true)
                        oldText = newText
                        const idx = Model.get('app').editingNoteIdx
                        if(idx!==null) { 
                            Model.change('list',`notes[${idx}].content`,newText)
                        }
                    }
                })
                saveNote(noteId,newText,insertId=>{
                    Model.change('editor', 'unsaved', false)
                    if(insertId) { //如果是新建
                        self.setState({noteId:insertId})
                    }
                })
            } */
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
                    const idx = Model.get('app').editingNoteIdx
                    if(idx!==null) {        
                        Model.change('list',`notes[${idx}].content`,newText)
                    }
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
            // const { itemId, editorState } = self.state
            // // 构建hint
            // let content = editorState.getCurrentContent().getPlainText()
            // if (content.length > 20) {
            //     content = content.slice(0, 20) + '...'
            // }
            // if (!confirm(`确定要删除当前文章吗?\n"${content}"`)) return
            // // 发送请求，执行callback
            // const callback = () => self.props.onDelete(itemId)
            // Model.dispatch({ type: 'editor/delete', itemId, callback })
        },
    }
}