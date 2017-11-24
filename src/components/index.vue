<template>
  <div class="indexP">
		<v-header class="v-header"></v-header>
		<v-nav class="v-aside" @collapseP="collapseP"></v-nav>
		<router-view class="v-content" :style="contentL"></router-view>
  </div>
</template>

<script>
import Header from './layout/header'
import Nav from './layout/nav'

export default {
  name: 'indexP',
  data () {
  	return {
  		contentL:'padding-left: 200px'	
  	}
  },
  methods: {
  	collapseP (flag) {
  		if(flag){
  			this.contentL='padding-left: 64px'	
  		}else{
  			this.contentL='padding-left: 200px'
  		}
  	}
  },
  components:{ 'v-header':Header,'v-nav':Nav }
}
</script>

<style>
.v-header{
	position: absolute;
	z-index: 3;
	top: 0px;
	width: 100%;
}
.v-aside{
	position: absolute;
	min-height: 100%;
	top: 0px;
	z-index: 2;
	padding-top: 61px;
	background: rgb(84, 92, 100);
	box-sizing: border-box;
}
.v-content{
	position: absolute;
	top: 0px;
	width: 100%;
	min-height: 100%;
	padding-top: 61px;
	box-sizing: border-box;
	z-index: 1;
}
.v-aside,.v-content{
	-moz-transition: all 0.4s ease 0s;
	-webkit-transition: all 0.4s ease 0s;
	-ms-transition: all 0.4s ease 0s;
	-o-transition: all 0.4s ease 0s;
	transition: all 0.4s ease 0s;
}
.el-breadcrumb{
	height: 40px;
	line-height: 40px;
	border-bottom: 1px solid #ccc;
	padding-left: 15px;
	box-sizing: border-box;
}
</style>
