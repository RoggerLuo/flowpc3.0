import dva,{Model} from 'dvax'
import model from './model'
import component from './component'
Model.create(model)
export default component
export function initListData(cb) {
    dva._store.dispatch({ type: 'list/fetchNotes', cb })
}
export function listAdd(note) {
    dva._store.dispatch({ type: 'list/add', note })
}
export function listModify(note) {
    dva._store.dispatch({ type: 'list/modify', note })
}
export function listRemove(itemId,callback) {
    dva._store.dispatch({ type: 'list/remove', itemId, callback })
}