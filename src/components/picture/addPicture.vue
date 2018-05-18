<template>
	<div class="addPicture">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>图片管理</el-breadcrumb-item>
			<el-breadcrumb-item>添加图片</el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
			    <span>添加图片</span>
			</div>
			
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="图片标题" prop="title">
					<el-input v-model="ruleForm.title"></el-input>
				</el-form-item>
			  	
			  	<el-form-item label="简略标题">
				  	<el-input v-model="ruleForm.briefTitle"></el-input>
				</el-form-item>
				
				<el-form-item label="分类栏目" prop="pictureClass">
					<el-select v-model="ruleForm.consultClass" placeholder="分类栏目">
						<el-option label="全部类型" value="0"></el-option>
						<el-option label="新闻资讯" value="1"></el-option>
						<el-option label="行业动态" value="2"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="排序值">
				  	<el-input v-model="ruleForm.num"></el-input>
				</el-form-item>
				
				<el-form-item label="允许评论">
					<el-radio-group v-model="ruleForm.comment">
						<el-radio label="1">允许</el-radio>
						<el-radio label="0">不允许</el-radio>
					</el-radio-group>
				</el-form-item>
				
				<el-form-item label="发布日期" prop="date">
					<div class="block">
						<el-date-picker 
							v-model="ruleForm.date" 
							type="daterange" 
							range-separator="至" 
							start-placeholder="开始日期" 
							end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</el-form-item>
				
				<el-form-item label="图片作者">
				  	<el-input v-model="ruleForm.author"></el-input>
				</el-form-item>
				
				<el-form-item label="图片来源">
				  	<el-input v-model="ruleForm.source"></el-input>
				</el-form-item>
				
				<el-form-item label="关键词">
				  	<el-input v-model="ruleForm.keyword"></el-input>
				</el-form-item>
				
				<el-form-item label="图片摘要" prop="desc">
					<el-input type="textarea" rows='4' resize="none" v-model="ruleForm.desc" placeholder="说点什么...最少输入10个字符"></el-input>
				</el-form-item>
				
				<el-form-item label="缩略图">
					<el-upload
							class="upload-demo"
							:action="uploadPic"
							:data="uploadData"
							:limit="1"
							:on-error="uploadError"
							:on-success="handlePictureCardPreview"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-exceed="onExceed"
							:before-upload="beforeAvatarUpload"
							:file-list="fileList"
							list-type="picture">
					  		<el-button size="small" type="primary">点击上传</el-button>
					  		<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过3MB</div>
					</el-upload>
				</el-form-item>
				
				<el-form-item label="图片上传">
					<el-upload
					  :action="uploadPics"
					  list-type="picture-card"
					  :on-preview="handlePreviews"
					  :file-list='fileLists'
					  :on-remove="handleRemoves">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				
				<div class="btnGroup">
					<el-button type="primary" @click="submitForm('ruleForm')">保存并提交审核</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">保存草稿</el-button>
					<el-button type="info" @click="goBack">取消</el-button>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default{
		name:'addPicture',
		data(){
			return{
				uploadPic:'',//图片上传地址
				uploadData:{},//文件上传携带的参数
				fileList:[],//上传图片列表
				uploadPics:'https://jsonplaceholder.typicode.com/posts/',//图片上传地址
				dialogImageUrl: '',//图片放大
        		dialogVisible: false,//图片放大弹窗
        		fileLists:[],//上传文件列表
				ruleForm:{
					title:'',//图片标题
					briefTitle:'',//简略标题
					pictureClass:'',//分类栏目
					num:'',//排序值
					comment:'',//是否允许评论
					date:'',//发布日期
					author:'',//图片作者
					source:'',//图片来源
					keyword:'',//关键词
					desc:'',//图片摘要
				},
				rules:{
					title:[
						{ required: true, message: '请输入图片标题', trigger: 'blur' }
					],
					pictureClass:[
						{ required: true, message: '请选择分类栏目', trigger: 'blur' }
					],
					date:[
						{ required: true, message: '请选择发布日期', trigger: 'blur' }
					]
				}
			}
		},
		mounted(){
			
		},
		methods:{
			//图片上传失败
			uploadError(err, file, fileList){
		    	this.$message.error("图片上传失败");
		    	console.log(err);
		    },
		    //上传成功
			handlePictureCardPreview(response, file) {
				console.log(response)
	      	},
	      	//上传前
	     	beforeAvatarUpload(file) {
	        	//const isJPG = file.type === 'image/jpeg';
	        	const isLt2M = file.size / 1024 / 1024 < 3;
	
	        	/*if (!isJPG) {
	          	this.$message.error('上传头像图片只能是 JPG 格式!');
	        	}*/
	        	if (!isLt2M) {
	          		this.$message.error('上传头像图片大小不能超过 3MB!');
	        	}
	        	//return isJPG && isLt2M;
	        	return isLt2M;
	      	},
	      	//文件超出个数
	      	onExceed(){
		    	this.$message({
					message: '前先删除图片在进行上传操作',
					type: 'warning'
				});
		    },
		    //预览
	      	handlePreview(file) {
	        	console.log(file);
	     	},
	     	//上传图片删除
			handleRemove(file, fileList) {
	        	console.log(file, fileList);
	      	},
		    //提交表单
		    submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		        	if (valid) {
		            	alert('submit!');
		        	} else {
		           		console.log('error submit!!');
		            	return false;
		        	}
		        });
		    },
		    //文件列表移除文件时的钩子
	      	handleRemoves(file, fileList) {
	        	console.log(file, fileList);
	      	},
	      	//文件上传
	      	handlePreviews(file) {
	        	this.dialogImageUrl = file.url;
	        	this.dialogVisible = true;
	      	},
	     	 //取消
	      	goBack(){
	      		this.$router.push({path:'/pictureManage'})
	      	}
		}
	}
</script>

<style scoped>
	.el-select{
		width: 100%;
	}
	.btnGroup{
		text-align: center;
	}
</style>