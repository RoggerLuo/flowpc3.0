import {connect} from 'dvax'
import AppItem from './AppItem'

function Lists({appList,appAdmin,dispatch}){
	const lists=()=>{
		dispatch({type:'appList/loadList'});
	}
	const cates=()=>{
		dispatch({type:'appAdmin/loadcategory'});
	}
	const cate=()=>{
		dispatch({type:'appList/cateid'})
	}
	

	return(
		<AppItem dataSource={appList.list} cates={appAdmin.list} cate={appList.cateids} />
		);
}
function mapStateToProps(state){
	return {appList:state.appList,appAdmin:state.appAdmin};
}
export default connect (mapStateToProps)(Lists);