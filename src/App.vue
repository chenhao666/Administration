<template>
  <div id="app">
		<router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
.pg-canvas{
	width: 99% !important; 
	height: 99% !important;
}
#app{
	margin: 0px;
	padding: 0px;
	min-height: 100%;
}
.el-breadcrumb{
	height: 40px;
	line-height: 40px !important;
	border-bottom: 1px solid #ccc;
	padding-left: 15px;
	box-sizing: border-box;
}
</style>
