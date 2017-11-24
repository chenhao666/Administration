<template>
	<div class="role">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
		  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		
		<div class="role_list">
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="角色ID" width="120" sortable prop="id">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="roleName" label="角色名" width="150">
				</el-table-column>
				<el-table-column prop="userList" label="用户列表" width="200">
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
			<!--批量操作-->
			<div class="editBtn">
				<el-button @click="toggleSelection">全选</el-button>
				<el-button type="danger" @click="delQuery">批量删除</el-button>
			</div>
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
	</div>
</template>

<script>
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
	        }, {
	          id: 9,
	          roleName: '王小虎',
	          userList: 'admin',
	          discription:'最高权限111111'
	        }],
	        multipleSelection: [],
	        multipleFlag:false,//全选状态
	        currentPage4: 1//分页当前页数
		}
	},
	methods: {
		//全选
      toggleSelection() {
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
      //编辑删除
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
      }
    }
}
</script>

<style>
	.role_list{
		width: 96%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.el-table__row{
		cursor: pointer;
	}
	th,td{
		text-align: center !important;
	}
	.rolePage{
		margin-top: 20px;
		margin-bottom: 20px;
		float: right;
	}
	.editBtn{
		margin-top: 20px;
		margin-bottom: 20px;
		float: left;
	}
</style>