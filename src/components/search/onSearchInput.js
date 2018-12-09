// const sendRequest = (text) => {
//     global.flow.dispatch({type:'search/request', text})
// }
// const debounce = global.flow.utils.debounce(sendRequest,1000)
// debounce(event.target.value)

export default (event) => {
    global.flow.dispatch({ type:'search/change', key: 'text', value: event.target.value })
}
