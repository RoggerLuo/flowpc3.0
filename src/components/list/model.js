import invariant from 'invariant'

export default {
    namespace: 'list',
    state: {
        notes: [],
        index: 0,
        loading:false,
        hasMore:true,
        query:{
            pageNum: 1,
            pageSize: 15,
            category:0
        }
    },
    reducers: {
        fetch(state,{ notes }) {
            return { ...state, notes }
        },
        select(state,{ index }) {
            return { ...state, index }
        },
        add(state,{ note }) {
            const notes = [note,...state.notes]
            return { ...state, notes, index: 0 }
        },
        modify(state,{ note }) {
            const notes = [...state.notes]
            notes.some(_note=>{
                if(_note.itemId == note.itemId) {
                    _note.content = note.content
                    return true
                }
            })
            return { ...state, notes }
        },
        remove(state,{ itemId, callback }) {
            let index = 0
            state.notes.some((_note,_ind)=>{
                if(_note.itemId == itemId) {
                    index = _ind
                    return true
                }
            })
            const notes = [...state.notes]
            notes.splice(index,1)
            if(notes[state.index]) {
                callback && callback(notes[state.index])
            } else {
                if(notes[state.index - 1]) {
                    callback && callback(notes[state.index - 1])
                }
            }
            if(!notes[state.index]) {
                return { ...state, notes, index: state.index - 1 }
            }
            return { ...state, notes }
        }
    },
    effects: {
        * fetchNotes({ fetch, put },{ cb }) {
            return 
            const rawNotes = yield fetch(`notes`)
            const notes = rawNotes.map(entry => {
                const itemId = entry[1]
                const content = entry[2]
                const wordList = entry[3]
                const modifiedTime = entry[4]
                return { itemId, content, wordList, modifiedTime }
            })
            if (notes.length > 0) {
                const note = notes[0]
                invariant(note.hasOwnProperty('itemId') && note.hasOwnProperty('content') && note.hasOwnProperty('wordList'), 'notes格式不对')
            }
            yield put({ type: 'fetch', notes })
            cb(notes)
        },
        * deleteNote({ fetch, call, put },{ id }) {
            yield call(fetch, `note/${id}`, { method: 'delete' })
        }
    },
    event: {
        onReady(dispatch) {}
    }
}
