import React from 'react'
import { connect } from 'dvax'
import Words from './Words'

const isArray = (item) => item instanceof Array

function GroupsContainer({ result }) {
    if(!isArray(result)) throw result
    if(result.length === 0) return null         
    return (<Words groups={result} />)
}

function mapStateToProps(state) {
    return { result: state.search.result }
}

export default connect(mapStateToProps)(GroupsContainer)

