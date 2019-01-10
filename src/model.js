// import { initListData } from 'components/list'
// import { replace } from 'components/editor'

export default {
    namespace: 'app',
    state: {
        editingListIdx:0, //list
        editingNoteIdx:null,

        selectedListIdx:0,
        selectedNoteIdx:null,
        showSearchPanel: false,
        content: '',
    },
    reducers: {
    },
    effects: {}
}