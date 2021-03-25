<template>
	<view class="content">
		<view class="logbox">
			<image class="logo" src="../../static/logo.png"></image>
		</view>
		<view class="text-area">
			<bjx-form
			
			msg-type="in"
			    labelType="inline"
			    :rules="rules"
			    labelWidth="100"
			    :form="form"
			    ref="form">
				
				<view class="form-item">
					<bjx-form-item  prop="title"  labelType="block" label="标题"  :label-right="form.title.length+'/11'">
						
							<input
								class="inputbox"
								type="text" 
								v-model="form.title"
								placeholder="请输入标题"
								maxlength="50"
								data-key="title"
							/>
							
					</bjx-form-item>
				</view>
				<view class="form-item">
					<bjx-form-item  prop="url" labelType="block" label="百家号文章地址"  :label-right="form.url.length+'/500'">
							
							<textarea class="textarea"
								v-model="form.url"
								placeholder="请输入地址"
								maxlength="500"
								data-key="username"
							></textarea>
							
							<view class="tips">
								地址，必须为https://baijiahao.baidu.com/ 开头的百家号文章
							</view>
					</bjx-form-item>
				</view>
				
					<view class="form-item">
							<bjx-form-item  prop="time" class="form-item" labelType="block" label="时间长度" >
									
										<slider @change="changeTime" value="40" min="40" max="120"  name="time" show-value></slider>
							</bjx-form-item>
					</view>
			
				<view class="form-item">
					<bjx-form-item  prop="voice" class="form-item" labelType="block" label="" >
							
							<radio-group name="voice" class="radiobox">
								<label class="radiobox1">
									<radio value="1" checked="true" @click="changeVoice(1)" /><text>男声</text>
								</label>
								<label>
									<radio value="2" @click="changeVoice(2)" /><text>女声</text>
								</label>
							</radio-group>
							
					</bjx-form-item>
				</view>
				
			</bjx-form>
			
			<button class="confirm-btn" @click="dopost" :disabled="dosubmit">立即提交</button>
		</view>
	</view>
</template>

<script>
	import bjxForm from '@/components/bjx-form/bjx-form.vue'
	import bjxFormItem from '@/components/bjx-form/bjx-form-item.vue'
	
	export default{
	
		components: {
		    bjxForm,
		    bjxFormItem
		},
		data() {
			return {
				dosubmit:false,
				form: {
					title: '',
					url: '',
					"time":40,
					"voice":1
				},
				rules: {
					title: {required: true,rule: 'length:3,50',showTips:false},
					url: {required: true,rule: 'baijia|length:~,500'},
				},
				dosubmit: false ,
				captchaImg:null
			}
		},
		onLoad() {

		},
		methods: {
			changeTime(e){
				this.form.time=  e.detail.value
				console.log('value 发生变化：' + e.detail.value)
			},
			changeVoice(val){
				this.form.voice=val
			},
			async dopost(){
				let _self =this 
			
				if(_self.dosubmit){
					return 
				}
				_self.dosubmit = true;
				this.$refs.form.validate(async function(val){
					if(val){
						
						let datas = await _self.$api.router.postData(_self.form)
						if(datas.code!==0){
							_self.captchaImg=_self.$api.helper.captcha();
							_self.$api.helper.msg(datas.msg)
							_self.dosubmit = false;
						}else{
							_self.$api.helper.msg("提交成功")
							
							setTimeout(()=>{
								uni.switchTab({
									url:"/pages/video/list"
								})
							},2000)
							
						}
					}
					setTimeout(()=>{
						_self.dosubmit=false
					},3000)
				})
				return 
			}
		}
	}
</script>

<style>
.logbox{
	margin-top:50upx;
	margin-bottom:50upx;
	text-align: center;
}
.text-area {
	width: 95%;
	margin: 0px auto;
}

.logo{
	margin: 0px auto;
	width: 200upx;
	height: 200upx;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.form-item{
	background: #F5F5F5;
	border-radius: 25upx;
	padding: 20upx;
	margin-bottom: 20upx;
}
.form-item2{
	border: 12px solid red;

}

.textarea{
	width: 100%;;
	height: 150upx;
	overflow-y: scroll;
}

.confirm-btn{
	width: 630upx;
	height: 88upx;
	line-height: 88upx;
	border-radius: 50px;
	margin-top: 20upx;
	margin-bottom: 100upx;
	background: url(../../static/btn_normal.png) no-repeat;
	background-size: cover;
	color: #fff;
	font-size: $font-lg;
	&:after{
		border-radius: 100px;
	}
}
	
.radiobox{
	label{
		margin-right: 20upx;
	}
}

.radiobox1{
	margin-right: 30rpx;
}

.tips{
	color: #909399;
}
</style>
