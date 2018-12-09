import React from 'react'
import {
    connect
} from 'dvax'
import Note from './NoteContainer'
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
    width: 100%;
    text-align: center;
`
import {
    List,
    message,
    Spin
} from 'antd'
import InfiniteScroll from 'react-infinite-scroller'
class InfiniteListExample extends React.Component {
    state = {
        data: [],
        loading: false,
        hasMore: true,
        pageNum: 1,
        pageSize: 10
    }
    getData = (callback) => {
        this.setState(prevState => ({
            pageNum: prevState.pageNum + 1,
        }), function() {
            callback()
        })
    }
    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        })
        this.getData(() => {
            this.setState({
                loading: false,
            })
        })
    }
    render() {
        const end = (this.state.pageNum) * this.state.pageSize
        return (
            <Container>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!this.state.loading && this.state.hasMore}
                    useWindow={false}
                >
                    {this.props.notes.slice(0,end).map((note,index) => <Note {...this.props} index={index} note={note} key={index}/>) }
                    {this.state.loading && this.state.hasMore && (
                        <LoadingContainer><Spin/></LoadingContainer>
                    )}
                </InfiniteScroll>
            </Container>
        )
    }
}
function mapStateToProps(state) {
    return {
        notes: state.list.notes,
        currentIndex: state.list.index
    }
}
export default connect(mapStateToProps)(InfiniteListExample)

    // componentDidMount() {
    //   this.getData((res) => {
    //     this.setState({
    //       data: res.results,
    //     });
    //   });
    // }

            // if (data.length > 14) {
        //   message.warning('Infinite List loaded all');
        //   this.setState({
        //     hasMore: false,
        //     loading: false,
        //   });
        //   return;
        // }
