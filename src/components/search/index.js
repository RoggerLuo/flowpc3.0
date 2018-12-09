import components from './components'
import onSearchInput from './onSearchInput'
import getSimilarNotes from './getSimilarNotes'
import toggle from './toggle'

global.flow = global.flow || {}
global.flow.search = { onSearchInput, getSimilarNotes, components, toggle }
