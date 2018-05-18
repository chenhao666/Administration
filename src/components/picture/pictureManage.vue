<template>
	<div class="pictureManage">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>图片管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>图片管理</span>
			</div>			
			<div class="consult_list">
				<div style="display: inline-block;">					
					<div class="list_float">
						<div class="block">
						    <span class="demonstration">日期范围：</span>
						    <el-date-picker
						      v-model="dateRange"
						      type="daterange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期">
						    </el-date-picker>
						</div>
					</div>
					
					<div class="list_float">
						<el-input v-model="inputVal" placeholder="图片名称"></el-input>
					</div>
					
					<div class="list_float">
						<el-button type="success">搜索</el-button>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			
			<!--批量操作-->
			<div class="editBtn">
				<el-button @click="toggleSelection">全选</el-button>
				<el-button @click="addPicture" type="primary"><span class="iconfont icon-crm11"></span>添加图片</el-button>
				<el-button type="danger" @click="delQuery"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
			</div>
			<div class="listTotal">
				共有<span style="color:#666666;font-weight: bold;font-size: 16px;">{{ listTotal }}</span>条数据	
			</div>
			<div class="clear"></div>
			
			<el-table ref="multipleTable" border :data="tableData" :stripe="true" tooltip-effect="dark" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="40">
				</el-table-column>
				<el-table-column label="ID" width="70" sortable prop="id">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="pictureClass" label="分类"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="imageUrl" label="封面" min-width="100">
					<template slot-scope="scope">
				        <img :src="scope.row.imageUrl" alt="" width="80%"/>
				    </template>
				</el-table-column>
				<el-table-column prop="picName" label="图片名称">
				</el-table-column>
				<el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="state" label="发布状态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="160">
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
		</el-card>
	</div>
</template>

<script>
	export default{
		name:'pictureManage',
		data(){
			return{
				tableData: [{
			        id: 1,
			        pictureClass: '分类名称',
			        imageUrl:require('../../assets/pic.jpg'),
			        picName:'现代简约白色餐厅',
			        updateTime: '2014-6-11 11:11:42',
			        state: '草稿'
		        }, {
		        	id: 2,
			        pictureClass: '分类名称',
			        imageUrl:require('../../assets/pic.jpg'),
			        picName:'现代简约白色餐厅',
			        updateTime: '2014-6-11 11:11:42',
			        state: '草稿'
		        }],
		        multipleSelection: [],
		        multipleFlag:false,//全选状态
		        currentPage4: 1,//分页当前页数
				classValue: '',//分类的value值
				dateRange:'',//日期范围
				inputVal:'',//资讯名称
				listTotal:10000,//数据总条数
			}
		},
		mounted(){
			
		},
		methods:{
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
		    addPicture(){
		    	this.$router.push({path:'/picture/addPicture'})
		    },
		    //编辑
		    handleEdit(index, row) {
		      console.log(index, row);
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
		    	if(this.multipleSelection.length==0){
		    		this.$message({
		    			type: 'warning',
		          		message: '请选择要删除的选项!'	
		    		})
		    	}
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

<style scoped>
	.consult_list{
		width: 100%;
		text-align: center;
	}
	.list_float{
		float: left;
		margin: 0px 10px;
	}
	.el-select,.el-input{
		width: 120px;
	}
	.el-range-editor{
		width: 260px !important;
	}
</style>