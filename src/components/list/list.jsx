import React from 'react'
import { Model } from 'dvax'
import Note from './note'
import styled from 'styled-components'
/*     padding: 1px;
    border-radius: 4px;
    border-right: 1px solid #e8e8e8;
 */
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
    bottom: 49%;
    text-align: center;
    left:0;
    width:100%;
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
