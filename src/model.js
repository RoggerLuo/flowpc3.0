// import { initListData } from 'components/list'
// import { replace } from 'components/editor'

export default {
    namespace: 'app',
    state: {
        token:'',
        list:[],
        editingListIdx:0, //list
        editingNoteIdx:null,
        editingNote:{},
        
        selectedListIdx:0,
        selectedNote:{},

        historyNote:[],
        showSearchPanel: false,
        content: '',
        authStatus: true
    },
    reducers: {
    },
    effects: {
        * verify({fetch,change}){
            const res = yield fetch(`auth/verify`)
            if(res.errorCode === 401)  yield change('authStatus',false)
            if(res.status === 'ok')  yield change('authStatus',true)

        }
    }
}