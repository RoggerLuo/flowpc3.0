import React from 'react'
import { Model } from 'dvax'
import Note from './note'
import styled from 'styled-components'
const Container = styled.div`
    overflow: auto;
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
    bottom: 2%;
    text-align: center;
    left:16%;
    right:50%;
`
import { message, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

class InfiniteListExample extends React.Component {
    state = {}
    render() {
        return (
            <Container>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={()=>Model.dispatch({type:'list/loadMore'})}
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
export default Model.connect(['app','list'])(InfiniteListExample)
