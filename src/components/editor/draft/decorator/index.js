import React from 'react'
import { CompositeDecorator } from 'draft-js'
import header3 from './header3'
import header2 from './header2'
import header1 from './header1'

String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, '')
}

export default new CompositeDecorator([
    ...header3, ...header2, ...header1
])