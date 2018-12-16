import React from 'react'
import {Model} from 'dvax'
import model from './model'
import Editor,{operations} from './Editor'

Model.create(model)
export {operations}
export default Editor
