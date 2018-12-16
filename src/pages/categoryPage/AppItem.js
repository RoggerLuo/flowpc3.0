import { Table } from 'antd';
import { connect } from 'dvax';
import React from 'react';

class AppItem extends React.Component {
  constructor(props){
    super(props);
    this.columns=[{
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '类别',
      render: (text, record) => {
       console.log(this.props.cates)  
       const cateids=this.props.cates
       var temp={};
       var t={}
       cateids.map(function(obj){
        if(obj._id==record.categoryId){
          temp=obj;
        }
      })
       return <div>{temp.name}</div>
       
     },

   }]; 
 }
 state = {
  selectedRowKeys: [],
};
onSelectChange = (selectedRowKeys) => {  
  this.setState({ selectedRowKeys });
  this.props.dispatch({type:'appList/listid',getAppId:selectedRowKeys})
} 
render() {
 const { dataSource }= this.props;
 const { selectedRowKeys } = this.state;
 const columns=this.columns;
 const rowSelection = {
  selectedRowKeys,
  onChange: this.onSelectChange,
  hideDefaultSelections: true,
  selections: [{
    key: 'all-data',
    text: 'Select All Data',
    onSelect: () => {
      this.setState({
        selectedRowKeys: dataSource._id, 
      });
    },
  }],
  onSelection: this.onSelection,
};
return (     
        <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} rowKey={record=>record._id} 
            pagination={{defaultPageSize:7}}
        />         
    
 );
}
}
export default connect()(AppItem);
