import React from 'react'
import dva,{Model} from 'dvax'
import model from './model'
import Editor from './Editor'

Model.create(model)
export default Editor
