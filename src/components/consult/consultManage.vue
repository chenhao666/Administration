<template>
	<div class="consult">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  <el-breadcrumb-item>咨询管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>咨询管理</span>
			</div>			
			<div class="consult_list">
				<div style="display: inline-block;">
					<div class="list_float">
						<template>
						  	<el-select v-model="classValue" placeholder="全部分类">
							    <el-option
							      v-for="item in options"
							      :key="item.value"
							      :label="item.label"
							      :value="item.value">
							    </el-option>
						  	</el-select>
						</template>
					</div>
						
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
						<el-input v-model="inputVal" placeholder="资讯名称"></el-input>
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
				<el-button @click="addConsult" type="primary"><span class="iconfont icon-crm11"></span>添加咨询</el-button>
				<el-button type="danger" @click="delQuery"><span class="iconfont icon-shanchu"></span>批量删除</el-button>
			</div>
			<div class="listTotal">
				共有<span style="color:#666666;font-weight: bold;font-size: 16px;">{{ listTotal }}</span>条数据	
			</div>
			<div class="clear"></div>
			
			<el-table ref="multipleTable" border :data="tableData" :stripe="true" tooltip-effect="dark" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="40">
				</el-table-column>
				<el-table-column label="ID" width="80" sortable prop="id">
					<template slot-scope="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="title" label="标题"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="consultClass" label="分类" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="source" label="来源" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="num" label="浏览次数" show-overflow-tooltip>
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
		name:'consult',
		data(){
			return{
				options:[
					{ label:'全部分类',value:'0' },
					{ label:'分类一',value:'1' },
					{ label:'分类二',value:'2' },
					{ label:'分类三',value:'3' },
					{ label:'分类四',value:'4' },
				],//选择框数据
				tableData: [{
		          id: 1,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		         id: 2,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		          id: 3,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		          id: 4,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		          id: 5,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		          id: 6,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		          id: 7,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }, {
		          id: 8,
		          title: '资讯标题',
		          consultClass: '行业动态',
		          source: '新闻',
		          updateTime: '2014-6-11 11:11:42',
		          num: '21212',
		          state: '草稿'
		        }],
		        multipleSelection: [],
		        multipleFlag:false,//全选状态
		        currentPage4: 1,//分页当前页数
		        dialogVisible: false,//弹窗状态
		        dialogTitle:'提示',
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
		    addConsult(){
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
	.consult_list{
		width: 100%;
		text-align: center;
	}
	.list_float{
		float: left;
		margin: 0px 10px;
	}
</style>