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
const InserLine = styled.div`
    padding:0px 5px;
    line-height:28px;
    color: #b7b6b6;
    border-bottom:1px solid #ececec;
    background-color:white;
`
class InfiniteListExample extends React.Component {
    state = {}
    render() {
        let weekMark = true
        let monthMark = true
        let threeMonthsMark = true
        return (
            <Container>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={()=>Model.dispatch({type:'list/loadMore'})}
                    hasMore={!this.props.loading && this.props.hasMore}
                    useWindow={false}
                >
                    {this.props.notes.map((note,index) => {
                        
                        if(
                            (Date.parse(new Date())/1000  - note.modify_time  ) > 60*60*24*7 &&
                            (Date.parse(new Date())/1000  - note.modify_time  ) < 60*60*24*30 &&
                            weekMark
                        ) {
                            weekMark = false
                            return (
                                <div key={index}>
                                    <InserLine>一周以前</InserLine>
                                    <Note {...this.props} note={note} index={index}/>
                                </div>
                            )
                        }
                        if(
                            (Date.parse(new Date())/1000  - note.modify_time  ) > 60*60*24*30 &&
                            (Date.parse(new Date())/1000  - note.modify_time  ) < 60*60*24*90 &&
                            monthMark
                        ) {
                            monthMark = false
                            return (
                                <div key={index}>
                                    <InserLine>一个月以前</InserLine>
                                    <Note {...this.props} note={note} index={index}/>
                                </div>
                            )
                        }
                        if(
                            (Date.parse(new Date())/1000  - note.modify_time  ) > 60*60*24*90 &&
                            threeMonthsMark
                        ) {
                            threeMonthsMark = false
                            return (
                                <div key={index}>
                                    <InserLine>三个月以前</InserLine>
                                    <Note {...this.props} note={note} index={index}/>
                                </div>
                            )
                        }
                        
                        return (
                            <div key={index}>
                                <Note {...this.props} note={note} index={index}/>
                            </div>
                        )
                    })}
                </InfiniteScroll>
                {this.props.loading && this.props.hasMore && (<LoadingContainer><Spin/></LoadingContainer>)}
            </Container>
        )
    }
}
export default Model.connect(['category','app','list'])(InfiniteListExample)
