// import { initListData } from 'components/list'
// import { replace } from 'components/editor'

export default {
    namespace: 'app',
    state: {
        editingListIdx:0, //list
        editingNoteIdx:null,
        editingNote:{},
        
        selectedListIdx:0,
        selectedNote:{},

        historyNote:[],
        showSearchPanel: false,
        content: '',
    },
    reducers: {
    },
    effects: {}
}