import React from 'react'
import {Model} from 'dvax'
import { Tree} from 'antd';
const { TreeNode } = Tree;
export default class TreeComp extends React.Component {
  state = {
    expandedKeys: ['0'], // 使用0作为默认
    autoExpandParent: true,
    checkedKeys: [], //'0-0-0'
    selectedKeys: [],
  }
  componentDidMount(){
    const self = this
    Model.run('addStaffModal',function*({fetch,change}){
        const res = yield fetch(`subject-setting/org`)
        if(res.status!=='ok') return
        yield change('data',res.results)        
        res.results.forEach((el,ind)=>{
            el.key = String(ind) // 根key
        })
        function mapFunction(el){
            if(el.children) {
                const children = el.children.map(mapFunction)
                children.forEach((el2,ind)=>{
                    el2.key = el.key+String(ind) //使用数字作为key，方便去找层级
                })
                return {title:el.name,key:el.key,children}  
            }else{
                return {title:el.name,key:el.key} 
            }
        } 
        const treeData = res.results.map(mapFunction)
        yield change('treeData',treeData)        
    })
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    const data = Model.get('addStaffModal').data
    let obj = data[0]
    // if(selectedKeys[0]===undefined) debugger
    for(let i=1;i<selectedKeys[0].length;i++){        
        obj = obj.children[parseInt(selectedKeys[0][i])]
    }
    Model.run('addStaffModal',function*({fetch}){
        Model.change('addStaffModal','employees',[])
        const res = yield fetch(`subject-setting/employees`,{query:{orgId:obj.id}})        
        Model.change('addStaffModal','employees',res.results.data)
    })
    this.setState({ selectedKeys });
  }
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })
  render() {
    if(this.props.treeData.length === 0) return null // 有这一句才能自动展开
    return (
      <Tree
        onExpand={this.onExpand}
        defaultExpandAll={true}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(this.props.treeData)}
      </Tree>
    );
  }
}
