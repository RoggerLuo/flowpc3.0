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
    padding-right: 8px;    
    text-align:center;
    user-select:none;
    padding:0px 5px;
    line-height: 17px;
    font-size: 13px;
    color: #989898;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
`
const KYContainer = styled.div`
    background-color:white;
    padding:7px;
`
//    border-bottom:1px solid #ececec;

const Tag = styled.span`
    padding:0px 5px;
    display:inline-block;
    font-size: 15px;
    color:black;
    user-select:none;
    cursor:pointer;
`
class InfiniteListExample extends React.Component {
    state = {}
    cancelNoteSelect = () => {
        if(Model.get('app').editingListIdx === 1) {
            Model.change('app','editingNote',{})
        }
    }
    unselect = word => {
        const list = this.props.selectedKeywords.slice()
        list.splice(list.indexOf(word),1)
        Model.change('listSimilar','selectedKeywords',list)
        this.cancelNoteSelect()
    }
    select = word => {
        const list = this.props.selectedKeywords.slice()
        list.push(word)
        Model.change('listSimilar','selectedKeywords',list)
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
                            { keywords.map((word,ind)=>{
                                if(this.props.selectedKeywords.indexOf(word) !== -1) {
                                    return <Tag onClick={e=>this.unselect(word)} style={{ background: '#CCC',color: 'white'}} key={ind}>{word}</Tag>
                                }
                                return <Tag onClick={e=>this.select(word)} key={ind}>{word}</Tag>
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
                        .filter(note=>{
                            return this.props.selectedKeywords.every(word=>{ //every
                                return note.match_list.indexOf(word)!==-1
                            })
                        })
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
