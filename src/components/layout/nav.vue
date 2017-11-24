<template>
	<div>
		<el-menu  :default-active="activaNav" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item index="0" @click="collapse()">
				<i :class="isCollapse ? rightArrow : leftArrow"></i>
				<span slot="title">展开/收起</span>
			</el-menu-item>
			<el-submenu index="1">
				<template slot="title">
					<i class="iconfont icon-zixunzhuanhuan"></i>
					<span slot="title">资讯管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1">资讯管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont icon-tupianguanli"></i>
					<span slot="title">图片管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1">图片管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="iconfont icon-chanpinguanli"></i>
					<span slot="title">产品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="3-1">品牌管理</el-menu-item>
					<el-menu-item index="3-2">分类管理</el-menu-item>
					<el-menu-item index="3-3">产品管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="iconfont icon-pinglunguanli"></i>
					<span slot="title">评论管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="4-1">评论列表</el-menu-item>
					<el-menu-item index="4-2">意见反馈</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="iconfont icon-huiyuan"></i>
					<span slot="title">会员管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="5-1">会员列表</el-menu-item>
					<el-menu-item index="5-2">删除的会员</el-menu-item>
					<el-menu-item index="5-3">等级管理</el-menu-item>
					<el-menu-item index="5-4">积分管理</el-menu-item>
					<el-menu-item index="5-5">浏览记录</el-menu-item>
					<el-menu-item index="5-6">下载记录</el-menu-item>
					<el-menu-item index="5-7">分享记录</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="iconfont icon-guanliyuan"></i>
					<span slot="title">管理员管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="6-1"><router-link to="/roleManage">角色管理</router-link></el-menu-item>
					<el-menu-item index="6-2">权限管理</el-menu-item>
					<el-menu-item index="6-3">管理员列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title">
					<i class="iconfont icon-tongji"></i>
					<span slot="title">系统统计</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="7-1">折线图</el-menu-item>
					<el-menu-item index="7-2">时间轴折线图</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="8">
				<template slot="title">
					<i class="iconfont icon-xitongguanli"></i>
					<span slot="title">系统管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="8-1">系统设置</el-menu-item>
					<el-menu-item index="8-2">栏目管理</el-menu-item>
					<el-menu-item index="8-3">数据字典</el-menu-item>
					<el-menu-item index="8-4">屏蔽词</el-menu-item>
					<el-menu-item index="8-5">系统日志</el-menu-item>
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