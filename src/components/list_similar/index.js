import {Model} from 'dvax'
import model from './model'

import component from './list'

Model.create(model)

export default component

/* export function initListData(cb) {
    Model.dispatch({ type: 'list/fetchNotes', cb })
}
export function listAdd(note) {
    Model.dispatch({ type: 'list/add', note })
}
export function listModify(note) {
    Model.dispatch({ type: 'list/modify', note })
}
export function listRemove(itemId,callback) {
    Model.dispatch({ type: 'list/remove', itemId, callback })
} */