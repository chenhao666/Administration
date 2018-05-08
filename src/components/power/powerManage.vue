<template>
	<div class="role">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
		  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>权限管理</span>
			</div>
			<div class="role_list">
				<!--批量操作-->
				<div class="editBtn">
					<el-button @click="toggleSelection">全选</el-button>
					<el-button @click="addRole" type="primary"><span class="iconfont icon-crm11"></span>添加权限节点</el-button>
					<el-button type="danger" @click="delQuery"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
				</div>
				<div class="listTotal">
					共有<span style="color:#666666;font-weight: bold;font-size: 16px;">{{ listTotal }}</span>条数据	
				</div>
				<div class="clear"></div>
				
				<el-table ref="multipleTable" border :data="tableData" :stripe="true" tooltip-effect="dark" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55">
					</el-table-column>
					<el-table-column label="ID" width="120" sortable prop="id">
						<template slot-scope="scope">{{ scope.row.id }}</template>
					</el-table-column>
					<el-table-column prop="powerName" label="节点名称" width="150">
					</el-table-column>
					<el-table-column prop="parentName" label="父级节点" show-overflow-tooltip>
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
				<div class="curPageCss">
					<div style="display: inline-block;"></div>
				    <el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="currentPage4"
				      :page-sizes="[100, 200, 300, 400]"
				      :page-size="100"
				      layout="sizes, prev, pager, next, jumper"
				      :total="listTotal">
				    </el-pagination>
				</div>
				<div class="clear"></div>
			</div>
		</el-card>
		
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
			  	<el-form-item label="父级节点" prop="parentNode">
			  		<el-cascader :options="form.options" change-on-select @change="getParentNode"></el-cascader>
			  	</el-form-item>
			  	<el-form-item label="节点名称" prop="name">
			  		<el-input v-model="form.name"></el-input>
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
export default {
	name:'role',
	data(){
		//表单验证
		//验证是否选择父节点
		let checkParent = (rule ,value,callback) => {
			if(this.form.parentNode.length>0){
				callback();
			}else{
				callback(new Error('请选择父节点'));
			}
		}
		return{
			tableData: [{
	          id: 1,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 2,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 3,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 4,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 5,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 6,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 7,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }, {
	          id: 8,
	          powerName: '修改图片',
	          parentName: '图片管理'
	        }],
	        multipleSelection: [],
	        multipleFlag:false,//全选状态
	        currentPage4: 1,//分页当前页数
	        dialogVisible: false,//弹窗状态
	        dialogTitle:'提示',
	        listTotal:10000,//数据总条数
	        form:{
	        	name:'',
	        	//父节点
	        	parentNode:[],
	        	options: [{
		          value: 0,
		          label: '添加一级节点',
		        },{
		          value: 1,
		          label: '咨询管理',
		          children: [{
		            value: 2,
		            label: '栏目管理'
		          },{
		            value: 3,
		            label: '文章管理'
		          }]
		        }, {
		          value: 4,
		          label: '用户中心',
		          children: [{
		            value: 5,
		            label: '栏目管理'
		          }]
		        }]
	        },
	        //表单验证
		    rules:{
		    	name: [
			        { required: true, message: '请输入节点名称', trigger: 'blur' }
			    ],
			    parentNode: [
			        { validator: checkParent, trigger: 'blur' }
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
      	this.dialogTitle="添加权限节点";
      	this.dialogVisible = true;
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogTitle="编辑权限节点";
        this.dialogVisible = true;//打开弹窗
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确定删除当前角色吗?', '提示', {
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
      //选择父节点
      getParentNode(value){
      	this.form.parentNode=value;
      	//console.log(value)
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
		width: 100%;
	}
	.el-table__row{
		cursor: pointer;
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
	.el-select{
		width: 100%;
	}
	
	.el-cascader{
		width: 100%;
	}
</style>