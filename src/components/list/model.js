import invariant from 'invariant'

export default {
    namespace: 'list',
    state: {
        notes: [],
        editingNoteIndex: null,
        loading:false,
        hasMore:true,
        query:{
            pageNum: 1,
            pageSize: 15,
            categoryId:'all'
        }
    },
    reducers: {
        fetch(state,{ notes }) {
            return { ...state, notes }
        },
        select(state,{ editingNoteIndex }) {
            return { ...state, editingNoteIndex }
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
        * getData({ fetch, change, get },{callback}){
            const query = {...get().query}
            query.pageNum = 1
            yield change('query',query)    
            yield change('loading',true)
            const res = yield fetch(`notes`,{query})
            if(res.hasErrors) return
            const notes = res.data
            yield change('notes',notes)
            yield change('loading',false)
            if(notes.length < query.pageSize && query.pageNum!=1) {
                yield change('hasMore',false)
            }
            callback && callback(notes)
        },
        * loadMore({change,fetch,get}){
            const query = {...get().query}
            query.pageNum += 1
            yield change('query',query)    
            
            yield change('loading',true)
            const res = yield fetch(`notes`,{query})
            if(res.hasErrors) return
            const notes = res.data
            yield change('notes',[...get().notes,...notes])
            yield change('loading',false)
            if(notes.length < query.pageSize) {
                yield change('hasMore',false)
            }
        },
        * deleteNote({ fetch, call, put },{ id }) {
            yield call(fetch, `note/${id}`, { method: 'delete' })
        }
    },
    event: {
        onReady(dispatch) {}
    }
}
