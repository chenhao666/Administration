<template>
	<div>
		<el-menu  
			:default-active="activaNav" 
			:unique-opened="true" 
			class="el-menu-vertical-demo navMenu" 
			@open="handleOpen" 
			@close="handleClose" 
			:collapse="isCollapse" 
			:router="true" 
			background-color="#545c64" 
			text-color="#fff" 
			active-text-color="#ffd04b">
			<el-menu-item  @click="collapse()" index="0" :route="{path:'#'}">
				<i :class="isCollapse ? rightArrow : leftArrow"></i>
				<span slot="title">展开/收起</span>
			</el-menu-item>
			<el-submenu index="1">
				<template slot="title">
					<i class="iconfont icon-zixunzhuanhuan"></i>
					<span slot="title">资讯管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1" :route="{path:'/consult'}"><div class="navItem iconfont icon-jiantouarrow496"></div>资讯管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont icon-tupianguanli"></i>
					<span slot="title">图片管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1" :route="{path:'/pictureManage'}"><div class="navItem iconfont icon-jiantouarrow496"></div>图片管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="iconfont icon-chanpinguanli"></i>
					<span slot="title">产品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1"><div class="navItem iconfont icon-jiantouarrow496"></div>品牌管理</el-menu-item>
					<el-menu-item index="3-2"><div class="navItem iconfont icon-jiantouarrow496"></div>分类管理</el-menu-item>
					<el-menu-item index="3-3"><div class="navItem iconfont icon-jiantouarrow496"></div>产品管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="iconfont icon-pinglunguanli"></i>
					<span slot="title">评论管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="4-1"><div class="navItem iconfont icon-jiantouarrow496"></div>评论列表</el-menu-item>
					<el-menu-item index="4-2"><div class="navItem iconfont icon-jiantouarrow496"></div>意见反馈</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="iconfont icon-huiyuan"></i>
					<span slot="title">会员管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="5-1"><div class="navItem iconfont icon-jiantouarrow496"></div>会员列表</el-menu-item>
					<el-menu-item index="5-2"><div class="navItem iconfont icon-jiantouarrow496"></div>删除的会员</el-menu-item>
					<el-menu-item index="5-3"><div class="navItem iconfont icon-jiantouarrow496"></div>等级管理</el-menu-item>
					<el-menu-item index="5-4"><div class="navItem iconfont icon-jiantouarrow496"></div>积分管理</el-menu-item>
					<el-menu-item index="5-5"><div class="navItem iconfont icon-jiantouarrow496"></div>浏览记录</el-menu-item>
					<el-menu-item index="5-6"><div class="navItem iconfont icon-jiantouarrow496"></div>下载记录</el-menu-item>
					<el-menu-item index="5-7"><div class="navItem iconfont icon-jiantouarrow496"></div>分享记录</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="iconfont icon-guanliyuan"></i>
					<span slot="title">管理员管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="6-1" :route="{path:'/roleManage'}"><div class="navItem iconfont icon-jiantouarrow496"></div>角色管理</el-menu-item>
					<el-menu-item index="6-2" :route="{path:'/powerManage'}"><div class="navItem iconfont icon-jiantouarrow496"></div>权限管理</el-menu-item>
					<el-menu-item index="6-3" :route="{path:'/userManage'}"><div class="navItem iconfont icon-jiantouarrow496"></div>管理员列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title">
					<i class="iconfont icon-tongji"></i>
					<span slot="title">系统统计</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="7-1"><div class="navItem iconfont icon-jiantouarrow496"></div>折线图</el-menu-item>
					<el-menu-item index="7-2"><div class="navItem iconfont icon-jiantouarrow496"></div>时间轴折线图</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="8">
				<template slot="title">
					<i class="iconfont icon-xitongguanli"></i>
					<span slot="title">系统管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="8-1"><div class="navItem iconfont icon-jiantouarrow496"></div>系统设置</el-menu-item>
					<el-menu-item index="8-2"><div class="navItem iconfont icon-jiantouarrow496"></div>栏目管理</el-menu-item>
					<el-menu-item index="8-3"><div class="navItem iconfont icon-jiantouarrow496"></div>数据字典</el-menu-item>
					<el-menu-item index="8-4"><div class="navItem iconfont icon-jiantouarrow496"></div>屏蔽词</el-menu-item>
					<el-menu-item index="8-5"><div class="navItem iconfont icon-jiantouarrow496"></div>系统日志</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
 export default {
 	data() {
      return {
        isCollapse: false,
        leftArrow:'iconfont icon-shouqi',
        rightArrow:'iconfont icon-collapse-right',
        activaNav:sessionStorage.getItem('nav')
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      collapse () {
      	this.isCollapse=!this.isCollapse;
      	this.$emit('collapseP',this.isCollapse);
      }
    }
  }	
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
 }
 .el-menu{
 	border-right: none;
 }
 .el-menu-item.is-active a{
 	color: rgb(255, 208, 75);
 }
 .el-menu-item a{
 	color: #ffffff;
 }
</style>