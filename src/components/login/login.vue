<template>
	<div id="particles">
		<div class="loginBg">
			<div class="loginForm">
				<div class="login_title">系统登录</div>
				<el-input placeholder="请输入用户名" v-model="username" class="loginInput" autofocus>
				    <template slot="prepend"><span class="iconfont icon-yonghuming"></span></template>
				</el-input>
				<el-input type="password" @keyup.enter.native="submitForm" placeholder="请输入密码" v-model="password" auto-complete="off" class="loginInput">
				    <template slot="prepend"><span class="iconfont icon-mima"></span></template>
				</el-input>
				<el-button type="primary" class="loginSubmit" @click="submitForm">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name:'login',
	data () {
		return {
			username:'',
			password:''
		}
	},
	mounted () {
		$('#particles').particleground({
		    dotColor: '#0078DE',
		    lineColor:'#0078DE',
		    proximity:60
		});
	},
	methods:{
		submitForm(){
			if(!this.username){
				this.$message({
		          message: '用户名不能为空！',
		          type: 'warning'
		        });
		        return;
			}
			if(!this.password){
				this.$message({
		          message: '密码不能为空！',
		          type: 'warning'
		        });
		        return;
			}
			//登录成功存储sessionStorage
			sessionStorage.setItem('username',this.username);
			sessionStorage.setItem('loginFlag',true);
			
			this.$message({
		          message: '登陆成功！',
		          type: 'success'
		    });
		    this.$store.commit("loginFlag");
			//发送ajax请求
			/*this.$ajax.post('/user', {
			    username:this.username,
			    password: this.password
			  })
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
			  });*/
		}
	}
}
</script>

<style scoped>
.login_title{
	width: 100%;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 20px;
	letter-spacing: 5px;
	font-weight: bold;
	color: deepskyblue;
}
#particles{
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	position: absolute;
	background: rgb(20, 26, 72);
	z-index: 1;
}
.loginBg{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -170px;
	margin-left: -200px;
	width: 400px;
	height: 340px;
	/*border: 1px solid red;*/
	background: rgba(255,255,255,0.5);
	z-index: 2;
}
.loginForm{
	width: 80%;
	margin-left: 10%;
	margin-top: 40px;
}
.loginInput{
	margin-top: 30px;
}
.el-input {
    width:100%;
  }
 .loginSubmit{
 	display: block;
 	width: 100%;
 	margin: 0 auto;
 	margin-top: 30px;
 	font-size: 16px;
 	letter-spacing: 5px;
 	cursor: pointer;
 }
</style>