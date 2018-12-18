export default actions => command => {
    if (command === 'save') {
        actions.saveNote()
        return 'handled'
    }
    if (command === 'new') {
        actions.newNote()
        return 'handled'
    }
    return 'not-handled'
}
