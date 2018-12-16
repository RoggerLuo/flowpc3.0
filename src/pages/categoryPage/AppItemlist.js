import { Button, Modal} from 'antd'
import { connect } from 'dvax'
import React from 'react'
import Lists from './Lists'

class AppItemlist extends React.Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = (record,index) => {
    this.setState({
      visible: true,
      getCateId:this.props.getCateid,   //appAdmin.list.id
    });
    this.props.dispatch({type:'appList/cateid',getCateId:this.props.getCateid})  //获得当前行的id
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
    this.props.dispatch({type:'appList/queryid',appId:this.props.appList.appids,categoryId:this.props.appList.cateids})   
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {//debugger
    const { visible, loading } = this.state; 
    return (
      <div> 
        <Button type="primary" onClick={this.showModal}>
            增加项目
        </Button>
        <Modal  
            visible={visible}
            title="选择进行分类："
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
                确认
                </Button>,
                ]
            }
            width="600px"        
            height="500px"
        >
                <Lists />                        
        </Modal>
    </div>
        );
  }
}
function mapStateProps(state){
  return {appList:state.appList}
}
export default connect(mapStateProps)(AppItemlist);

