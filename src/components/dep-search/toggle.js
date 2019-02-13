export default () => {
    global.flow.dispatch({type: 'search/toggle'})
    const state = global.app._store.getState()
    if(state.search.visibility){
        global.flow.utils.searchFocus()
    }
}