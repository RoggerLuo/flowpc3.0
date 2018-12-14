import { Table } from 'antd'
import { Model } from 'dvax'
import React from 'react'
import columns from './columns' 
class EditableTable extends React.Component {
    componentDidMount(){
        Model.run('category',function*({fetch,change}){
            const res = yield fetch(`categories`)
            yield change('list',res.data)
        })
    }
  constructor(props) {
        super(props);   
        this.columns = columns
   }  
  render() {
    const { dataSource } = this.props
    const columns = this.columns;
    return (    
      <div>   
        <Table 
            bordered  
            pagination={{defaultCurrent:1,defaultPageSize:6}} 
            dataSource={dataSource} 
            columns={columns} 
            rowKey={record=>record.id} 
        />   
      </div> 
      )
  }
}
export default EditableTable





