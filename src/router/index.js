import Vue from 'vue'
import Router from 'vue-router'
//默认页
import IndexP from '@/components/index'
//首页
import Index from '@/components/index/index'
//登录
import Login from '@/components/login/login'
//咨询管理
import Consult from '@/components/consult/consultManage'
//添加咨询
import AddConsult from '@/components/consult/addConsult'
//图片管理
import Picture from '@/components/picture/pictureManage'
//角色管理
import RoleManage from '@/components/power/roleManage'
//权限管理
import PowerManage from '@/components/power/powerManage'
//管理员列表
import UserManage from '@/components/power/userManage'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: IndexP,
      beforeEnter:(to,from,next)=>{
      	sessionStorage.setItem('nav','0')
      	//判断是否登录  未登录则跳转到登录页面
      	if(!sessionStorage.getItem('loginFlag')){
      		next({path:'/login'});
      	}else{
      		next();
      	}
      },
      children:[
      	{
      		path:'/',
      		name:'首页',
      		component:Index,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','0')
		      	next();
	      	},
      	},
      	{
      		path:'consult',
      		name:'咨询管理',
      		component:Consult,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','1-1')
		      	next();
	      	}
      	},
      	{
      		path:'consult/addConsult',
      		name:'添加咨询',
      		component:AddConsult,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','1-1')
		      	next();
	      	}
      	},
      	{
      		path:'pictureManage',
      		name:'图片管理',
      		component:Picture,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','2-1')
		      	next();
	      	}
      	},
      	{
      		path:'roleManage',
      		name:'角色管理',
      		component:RoleManage,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','6-1')
		      	next();
	      	}
      	},{
      		path:'powerManage',
      		name:'权限管理',
      		component:PowerManage,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','6-2')
		      	next();
	      	}
      	},{
      		path:'userManage',
      		name:'管理员列表',
      		component:UserManage,
      		beforeEnter:(to,from,next)=>{
		      	//导航选中
		      	sessionStorage.setItem('nav','6-3')
		      	next();
	      	}
      	}
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    }
  ]
})
