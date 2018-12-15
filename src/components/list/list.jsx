import React from 'react'
import { Model } from 'dvax'
import Note from './note'
import styled from 'styled-components'
const Container = styled.div`
    border-right: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 10px 10px;
    height: 100%;
    &::-webkit-scrollbar {
        width: 0px;
        background: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
        background: #d6d6d6;
    }
`
const LoadingContainer = styled.div`
    position: absolute;
    bottom: 40px;
    text-align: center;
    left:0;
    width:100%;
`
import { message, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

class InfiniteListExample extends React.Component {
    state = {}
    componentDidMount = () => {
        this.getData()
    }
    getData = () => {
        Model.run('list',function*({ fetch, change, get }) {
            const query = {...get().query}
            yield change('loading',true)
            const res = yield fetch(`notes`,{query})
            if(res.hasErrors) return
            const notes = res.data
            yield change('notes',[...get().notes,...notes])
            yield change('loading',false)
            query.pageNum += 1
            yield change('query',query)
            if(notes.length < query.pageSize) {
                yield change('hasMore',false)
            }
        })
    }
    render() {
        return (
            <Container>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.getData}
                    hasMore={!this.props.loading && this.props.hasMore}
                    useWindow={false}
                >
                    {this.props.notes.map((note,index) => <Note {...this.props} index={index} note={note} key={index}/>) }
                </InfiniteScroll>
                {this.props.loading && this.props.hasMore && (<LoadingContainer><Spin/></LoadingContainer>)}
            </Container>
        )
    }
}
export default Model.connect('app')(Model.connect('list')(InfiniteListExample))
