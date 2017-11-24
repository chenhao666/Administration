import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//全局数据
const state={
	username:'',
	loginFlag:''
}
//触发状态
const mutations={

}

const actives={
	
}

export default new Vuex.Store({
	state,
	mutations,
	actives
})
