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
    user-select:none;
    padding:0px 5px;
    line-height:28px;
    color: #b7b6b6;
    border-bottom:1px solid #ececec;
    background-color:white;
`
const KYContainer = styled.div`
    background-color:white;
    padding:12px;
    border-bottom:1px solid #ececec;
`
const Tag = styled.span`
    padding:0px 5px;
    display:inline-block;
    font-size: 16px;
    color:black;
    user-select:none;
    cursor:pointer;
`
class InfiniteListExample extends React.Component {
    state = {}
    cancelNoteSelect = () => {
        if(Model.get('app').editingListIdx === 1) {
            Model.change('app','editingNoteIdx',null)
        }
    }
    unselect = ind => {
        const list = this.props.keywordsList.slice()
        list.splice(list.indexOf(ind),1)
        Model.change('listSimilar','keywordsList',list)
        this.cancelNoteSelect()
    }
    select = ind => {
        const list = this.props.keywordsList.slice()
        list.push(ind)
        Model.change('listSimilar','keywordsList',list)
        this.cancelNoteSelect()
    }
    render() {
        let weekMark = true
        let monthMark = true
        let threeMonthsMark = true

        const keywords = []
        this.props.notes.forEach(el=>{
            el.match_list.forEach(word=>{
                if(keywords.indexOf(word)===-1) {
                    keywords.push(word)
                }
            })
        })
        return (
            <Container>
                {
                    keywords.length?
                        <KYContainer>
                            { keywords.map((el,ind)=>{
                                if(this.props.keywordsList.indexOf(ind)!==-1) {
                                    return <Tag onClick={e=>this.unselect(ind)} style={{ background: '#CCC',color: 'white'}} key={ind}>{el}</Tag>
                                }
                                return <Tag onClick={e=>this.select(ind)} key={ind}>{el}</Tag>
                            })}

                        </KYContainer>
                        :null
                }

                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={()=>Model.dispatch({type:'list/loadMore'})}
                    hasMore={!this.props.loading && this.props.hasMore}
                    useWindow={false}
                >
                    {this.props.notes
                        .filter(note=>this.props.keywordsList.every(el_idx=>{
                            return note.match_list.indexOf(keywords[el_idx])!==-1
                        }))
                        .map((note,index) => {
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
export default Model.connect(['category','app','listSimilar'])(InfiniteListExample)
