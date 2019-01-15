import {Model} from 'dvax'
function updateList(namespace){
    const notes = get(namespace).notes.slice()
    const __note = notes.find(el=>el.id===selectedNote.id)
    if(!__note) return
    const idx = notes.indexOf(__note)
    notes.splice(idx,1)
    Model.change(namespace,'notes',notes)
    Model.change('app','selectedNote',{})
    Model.dispatch({type:`${namespace}/loadMore`})
}

export default updateList