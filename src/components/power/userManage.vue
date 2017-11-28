<template>
	<div class="role">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="role_list">
			<!--批量操作-->
			<div class="editBtn">
				<el-button @click="toggleSelection">全选</el-button>
				<el-button @click="addRole" type="primary"><span class="iconfont icon-crm11"></span>添加管理员</el-button>
				<el-button type="danger" @click="delQuery"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
			</div>
			
			<el-table ref="multipleTable" border :data="tableData" :stripe="true" tooltip-effect="dark"   style="width: 96%;margin-left: 2%;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="ID" width="80" sortable prop="id">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="userName" label="登录名" width="100">
				</el-table-column>
				<el-table-column prop="mobile" label="手机" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="userEmail" label="邮箱" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="roles" label="角色" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="addTime" label="加入时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="200">
			      <template slot-scope="scope">
			        <el-button
			          size="mini"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			        <el-button
			          size="mini"
			          type="danger"
			          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<!--分页-->
			<div class="rolePage">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage4"
			      :page-sizes="[100, 200, 300, 400]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="10000">
			    </el-pagination>
			</div>
			<div class="clear"></div>
		</div>
		
		<!--dialog弹窗-->
		<div class="edit_dialog">
			<el-dialog
			  :title="dialogTitle"
			  :visible.sync="dialogVisible"
			  width="600px"
			  :append-to-body="true"
			  :close-on-click-modal="false"
			  :before-close="handleClose">
			  <!--表单开始-->
			  <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px">
			  	<el-form-item label="管理员" prop="name">
			  		<el-input v-model="ruleForm.name"></el-input>
			  	</el-form-item>
			  	<el-form-item label="初始密码" prop="pass">
			  		<el-input v-model="ruleForm.pass" type="password"></el-input>
			  	</el-form-item>
			  	<el-form-item label="确认密码" prop="checkPass">
			  		<el-input v-model="ruleForm.checkPass" type="password"></el-input>
			  	</el-form-item>
			  	<el-form-item label="性别" prop="sex">
			  		<el-radio-group v-model="ruleForm.sex">
			  			<el-radio :label="1">男</el-radio>
			  			<el-radio :label="0">女</el-radio>
			  		</el-radio-group>
			  	</el-form-item>
			  	<el-form-item label="手机" prop="mobile">
			  		<el-input v-model="ruleForm.mobile"></el-input>
			  	</el-form-item>
			  	<el-form-item label="邮箱" prop="email">
			  		<el-input v-model="ruleForm.email"></el-input>
			  	</el-form-item>
			  	<!--权限选择-->
			  	<el-form-item label="选择角色">
				  	<el-checkbox :indeterminate="ruleForm.isIndeterminate" v-model="ruleForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				  	<el-checkbox-group v-model="ruleForm.checkedRoles" @change="handlecheckedRolesChange">
				  		<el-checkbox v-for="role in ruleForm.roles" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
				  	</el-checkbox-group>
			  	</el-form-item>
			  	<el-form-item label="备注" prop="desc">
			  		<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			  	</el-form-item>
			  </el-form>
			  <!--表单结束-->
			  <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
const roleOptions = [
	{
		id:1,
		name:"超级管理员"
	},{
		id:2,
		name:"咨询管理员"
	},{
		id:3,
		name:"图片管理员"
	},{
		id:4,
		name:"产品管理员"
	},{
		id:5,
		name:"评论管理员"
	},{
		id:6,
		name:"会员管理"
	}
];
export default {
	name:'role',
	data(){
		//定义表单校验方法
		//密码验证
		let checkPsw=(rule, value, callback)=>{
			let pswTest=/^[a-zA-Z]\w{5,17}$/;
			if(!pswTest.test(value)){
				callback(new Error('以字母开头，长度在6~18之间，只能包含字符、数字和下划线'))
			}else{
				callback();
			}
		};
		//确认密码
		let checkRePsw=(rule, value, callback)=>{
			let pswTest=/^[a-zA-Z]\w{5,17}$/;
			if(!pswTest.test(value)){
				callback(new Error('以字母开头，长度在6~18之间，只能包含字符、数字和下划线'))
				return;
			}
			if(value!==this.ruleForm.pass){
				callback(new Error('两次密码输入不一致'));
				return;
			}
			callback();	
		};
		//手机号码验证
		let checkMobile=(rule, value, callback)=>{
			let Ptest=/^1[34578]{1}\d{9}$/;
			if(!Ptest.test(value)){
				callback(new Error('请输入正确的手机格式'))
			}else{
				callback();
			}
		}
		//邮箱验证
		let checkEmail=(rule, value, callback)=>{
			let Ptest=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
			if(!Ptest.test(value)){
				callback(new Error('请输入正确的邮箱格式'))
			}else{
				callback();
			}
		}
		return{
			tableData: [{
	          id: 1,
	          userName: '王小虎',
	          mobile: '12345678901',
	          userEmail:'123456@qq.com',
	          roles:['超级管理员'],
	          addTime:'2017-11-28 13:50'
	        }, {
	          id: 2,
	          userName: '王小虎',
	          mobile: '12345678901',
	          userEmail:'123456@qq.com',
	          roles:['超级管理员'],
	          addTime:'2017-11-28 13:50'
	        }, {
	          id: 3,
	          userName: '王小虎',
	          mobile: '12345678901',
	          userEmail:'123456@qq.com',
	          roles:['超级管理员'],
	          addTime:'2017-11-28 13:50'
	        }, {
	          id: 4,
	          userName: '王小虎',
	          mobile: '12345678901',
	          userEmail:'123456@qq.com',
	          roles:['超级管理员'],
	          addTime:'2017-11-28 13:50'
	        }],
	        multipleSelection: [],
	        multipleFlag:false,//全选状态
	        currentPage4: 1,//分页当前页数
	        dialogVisible: false,//弹窗状态
	        dialogTitle:'提示',
	        ruleForm:{
		        name: '',
		        pass:'',
		        checkPass:'',
		        sex:1,
		        mobile:'',
		        email:'',
		        desc:'',
		        //角色选择
		        checkAll: false,
		        checkedRoles: [],
		        roles: roleOptions,
		        isIndeterminate: false
	        },
	        //表单验证
	        rules:{
	        	name:[
	        		 { required: true, message: '请输入管理员名称', trigger: 'blur' }
	        	],
	        	pass:[
	        		{  required: true, validator: checkPsw, trigger: 'blur' }
	        	],
	        	checkPass:[
	        		{  required: true, validator: checkRePsw, trigger: 'blur' }
	        	],
	        	mobile:[
	        		{  required: true, validator: checkMobile, trigger: 'blur' }
	        	],
	        	email:[
	        		{  required: true, validator: checkEmail, trigger: 'blur' }
	        	]
	        }
		}
	},
	methods: {
	  //全选
      toggleSelection() {
      	//更改状态
      	this.multipleFlag=!this.multipleFlag;
        if (this.multipleFlag) {
          let rows=this.tableData;
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //添加
      addRole(){
      	this.dialogTitle="添加管理员";
      	this.dialogVisible = true;
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogTitle="编辑管理员";
        this.dialogVisible = true;//打开弹窗
      },
      //启用/禁用
      handleState(index,row){
      	console.log(index, row);
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确定删除当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //批量删除
      delQuery(){
      	console.log(this.multipleSelection);
      },
      //分页方法
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //dialog弹窗
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //选择角色
      handleCheckAllChange(val) {
      	let idArr=[];
      	for(let i=0;i<roleOptions.length;i++){
      		idArr.push(roleOptions[i].id);
      	}
        this.ruleForm.checkedRoles = val ? idArr : [];
        this.ruleForm.isIndeterminate = false;
        //console.log(this.form.checkedRoles);
      },
      handlecheckedRolesChange(value) {
        let checkedCount = value.length;
        this.ruleForm.checkAll = checkedCount === this.ruleForm.roles.length;
        this.ruleForm.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.roles.length;
      },
      //表单提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.dialogVisible = false;
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style scoped>
	.role_list{
		width: 96%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.el-table__row{
		cursor: pointer;
	}
	.el-table__header th,.el-table__header td{
		text-align: center !important;
	}
	.rolePage{
		margin-top: 10px;
		margin-bottom: 10px;
		float: right;
	}
	.editBtn{
		margin-top: 20px;
		margin-bottom: 20px;
		float: left;
		margin-left: 2%;
	}
	.edit_dialog .el-checkbox+.el-checkbox{
		margin-left: 0px;
	}
	.el-dialog .el-form-item__content .el-checkbox{
		margin-left: 30px !important;
	}
	.el-dialog .el-form-item__content .checkBoxBg{
		margin-left: 20px !important;
		width: 90%;
		background: #EFEFEF;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.el-table--border th, .el-table__fixed-right-patch{
		box-sizing: border-box !important;
	}
	.iconfont{
		font-size: 14px;
		float: left;
		margin: 0 auto;
	}
</style>