import invariant from 'invariant'

export default {
    namespace: 'list',
    state: {
        notes: [],
        _originalNotes:[],
        loading:false,
        hasMore:true,
        query:{
            // pageNum: 1,
            startIndex:0,
            pageSize: 20,
            categoryId:'all'
        }
    },
    reducers: {
        fetch(state,{ notes }) {
            return { ...state, notes }
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
        
        * replaceNotesBack({ fetch, change, get }){
            yield change('notes',[])
            yield change('notes',get()._originalNotes)
        },

        * replaceNotes({ fetch, change, get },{notes}){
            yield change('notes',[])
            yield change('notes',notes)
        },
        * getData({ fetch, change, get },{callback}){
            const query = {...get().query}
            // query.pageNum = 1
            yield change('query.startIndex',0)    
            yield change('loading',true)
            const res = yield fetch(`note`,{query})
            if(res.hasErrors) return
            const notes = res.data || []
            yield change('notes',[])
            yield change('notes',notes)
            yield change('_originalNotes',notes)
            yield change('loading',false)
            if(notes.length < query.pageSize && query.pageNum!=1) {
                yield change('hasMore',false)
            }
            callback && callback(notes)
        },
        * loadMore({change,fetch,get}){
            const query = {}
            query.startIndex = get().query.startIndex
            const startIndex = get().notes.length
            if(get().query.startIndex > startIndex) {
                query.startIndex = startIndex
            }
            yield change('query.startIndex',query.startIndex + get().query.pageSize) 
            query.pageSize = get().query.pageSize
            yield change('loading',true)
            const res = yield fetch(`notes`,{query})
            console.log('load more...')
            if(res.hasErrors) return
            const notes = res.data
            const newNotes = [...get().notes,...notes]
            yield change('notes',newNotes)
            yield change('_originalNotes',newNotes)

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
