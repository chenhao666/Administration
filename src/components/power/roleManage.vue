<template>
	<div class="role">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
		  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="role_list">
			<!--批量操作-->
			<div class="editBtn">
				<el-button @click="toggleSelection">全选</el-button>
				<el-button @click="addRole" type="primary"><span class="iconfont icon-crm11"></span>添加角色</el-button>
				<el-button type="danger" @click="delQuery"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
			</div>
			
			<el-table ref="multipleTable" border :data="tableData" :stripe="true" tooltip-effect="dark"   style="width: 96%;margin-left: 2%;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="角色ID" width="120" sortable prop="id">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="roleName" label="角色名" width="150">
				</el-table-column>
				<el-table-column prop="userList" label="用户列表" width="160" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="discription" label="描述"  show-overflow-tooltip>
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
			  <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
			  	<el-form-item label="角色名称" prop="name">
			  		<el-input v-model="form.name"></el-input>
			  	</el-form-item>
			  	<el-form-item label="备注">
			  		<el-input v-model="form.desc"></el-input>
			  	</el-form-item>
			  	<!--权限选择-->
			  	<el-form-item label="网站权限">
			  		<div class="choosePower">
				  		<div v-for="power in form.powers">
				  			<el-checkbox class="checkBoxBg" v-model="form.checkedPower" :label="power.id" :key="power.id" :indeterminate="indeterminate(power.id)"  @change="handleCheckedPowerChange([],power.id,power.children)">{{ power.name }}</el-checkbox>
				  			<div v-if="power.children">
				  				<div v-for="power2 in power.children">
				  					<el-checkbox :indeterminate="indeterminate(power2.id)" v-model="form.checkedPower" :label="power2.id" :key="power2.id" @change="handleCheckedPowerChange([power.id],power2.id,power2.children)">{{ power2.name }}</el-checkbox>
				  					<div v-if="power2.children">
				  						<el-checkbox-group  v-model="form.checkedPower" @change="handleCheckedPowerChange([power.id,power2.id],0,0)">
									  		<el-checkbox v-for="power3 in power2.children" :label="power3.id" :key="power3.id">{{power3.name}}</el-checkbox>
									  	</el-checkbox-group>
				  					</div>
				  				</div>
				  			</div>
				  		</div>
				  	</div>
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
//自定义默认数据
const powerData=[
	{
		name:'资讯管理',
		id:'1',
		children:[
			{
				name:'栏目管理',
				id:'2',
				children:[
					{
						name:'添加',
						id:'3'
					},{
						name:'修改',
						id:'4'
					},{
						name:'删除',
						id:'5'
					},{
						name:'查看',
						id:'6'
					},{
						name:'审核',
						id:'7'
					}
				]
			},{
				name:'文章管理',
				id:'8',
				children:[
					{
						name:'添加',
						id:'9'
					},{
						name:'修改',
						id:'10'
					},{
						name:'删除',
						id:'11'
					},{
						name:'查看',
						id:'12'
					},{
						name:'审核',
						id:'13'
					}
				]
			}
		]
	},{
		name:'用户中心',
		id:'14',
		children:[
			{
				name:'栏目管理',
				id:'15',
				children:[
					{
						name:'添加',
						id:'16'
					},{
						name:'修改',
						id:'17'
					},{
						name:'删除',
						id:'18'
					},{
						name:'查看',
						id:'19'
					},{
						name:'审核',
						id:'20'
					}
				]
			}
		]
	}
]

export default {
	name:'role',
	data(){
		return{
			tableData: [{
	          id: 1,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 2,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 3,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 4,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 5,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 6,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 7,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }, {
	          id: 8,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }],
	        multipleSelection: [],
	        multipleFlag:false,//全选状态
	        currentPage4: 1,//分页当前页数
	        dialogVisible: false,//弹窗状态
	        dialogTitle:'提示',
	        form:{
	        	name:'',
	        	desc:'',
	        	//权限
		        powers: powerData,
		        checkedPower: []
	        },
	        //表单验证
		    rules:{
		    	name: [
			        { required: true, message: '请输入角色名称', trigger: 'blur' }
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
      //添加角色
      addRole(){
      	this.dialogTitle="添加角色";
      	this.dialogVisible = true;
      },
      //编辑删除
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogTitle="编辑角色";
        this.dialogVisible = true;//打开弹窗
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确定删除当前权限节点吗?', '提示', {
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
      //权限选择
      handleCheckedPowerChange(pidArr,power,children) {
      	let checkedArr=this.form.checkedPower;
      	//判断是否存在
      	checkedArr=checkedArr.concat(pidArr);
      	checkedArr=$.unique(checkedArr);//数组去重

      	if(compireArr(pidArr,checkedArr)){
      		checkedArr=removeArr(checkedArr,pidArr);
      	}else{      			
      		checkedArr=removeArr(checkedArr,[power]);
      	}

      	let childrenArr=[];
      	//判断是否存在子节点
      	if(children){
      		for(let i=0;i<children.length;i++){
      			childrenArr.push(children[i].id);
      			if(children[i].children){
      				let child=children[i].children;
      				for(let j=0;j<child.length;j++){
      					childrenArr.push(child[j].id);
      				}
      			}
      		}
      		//判断 操作子节点
      		let compire=compireArr(checkedArr,childrenArr);
	      	if(compire){
	      		checkedArr=removeArr(checkedArr,childrenArr);
	      		checkedArr=removeArr(checkedArr,[power]);
	      	}else{
	      		checkedArr=checkedArr.concat(childrenArr);
	      		//console.log(checkedArr)
	      		checkedArr=$.unique(checkedArr);//数组去重
	      		checkedArr.push(power);
	      		//console.log(checkedArr)
	      	}
      	}
      	//赋值
      	this.form.checkedPower=checkedArr;
        //console.log(this.form.checkedPower)
      },
      //父标签选中状态
      indeterminate(id){
      	if(this.form.checkedPower.indexOf(id)>-1){
      		return true;
      	}else{
      		return false;
      	}
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
//判断数组包含
function compireArr(arr,arr2){
	console.log(arr2)
	for(let i=0;i<arr2.length;i++){
		let index=arr.indexOf(arr2[i]);
		if(index==-1){
			return false;
		}
	}
	return arr;
}
//移除数组
function removeArr(arr,arr2){
	let newArr=[];
	for(let i=0;i<arr.length;i++){
		let index=arr2.indexOf(arr[i]);
		if(index==-1){
			newArr.push(arr[i]);
		}
	}
	return newArr;
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
	.choosePower{
		max-height: 200px;
		overflow: auto;
	}
	.iconfont{
		font-size: 14px;
		float: left;
		margin: 0 auto;
	}
</style>