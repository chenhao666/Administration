import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)
function statValue(){
	state.username=sessionStorage.getItem('username');
	state.loginFlag=sessionStorage.getItem('loginFlag')
}
//全局数据
const state={
	username:'',//用户名
	loginFlag:'',//登录状态
}
//触发状态
const mutations={
	loginFlag(state){
		statValue(state);
		router.push({path:'/'});
	}
}

const actives={
	
}

export default new Vuex.Store({
	state,
	mutations,
	actives
})
