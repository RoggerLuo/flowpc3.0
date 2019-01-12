import { EditorState, ContentState } from 'draft-js'
import decorator from './decorator'

export function startFromText(text){
    const cs = ContentState.createFromText(text) 
    return EditorState.createWithContent(cs,decorator)
}

export const startFromScratch = () => EditorState.createEmpty(decorator) 
