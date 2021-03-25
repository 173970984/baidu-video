<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
					<bjx-form
					msg-type="in"
					    labelType="inline"
					    :rules="rules"
					    labelWidth="100"
					    :form="form"
					    ref="form">
						<view class="form-item" >
							<bjx-form-item  prop="mobile" labelType="block" label="手机号码"  :label-right="form.mobile.length+'/11'">
									<input 
										class="inputbox"
										type="number" 
										v-model="form.mobile"
										placeholder="请输入手机号码"
										maxlength="11"
										data-key="username"
										@input="inputChange"
									/>
							</bjx-form-item>
						</view>
						
							<view class="form-item" >
						<bjx-form-item  prop="password" labelType="block" label="密码"  :label-right="form.password.length+'/20'">
								<input 
									class="inputbox"
									type="password" 
									v-model="form.password"
									placeholder="请输入8-20位密码"
									maxlength="20"
									data-key="password"
									@input="inputChange"
								/>
						</bjx-form-item>
							</view>
						
							<view class="form-item relative" >
						<bjx-form-item  prop="captcha"  labelType="block" label="验证码" >
							<input 
								class="inputbox"
								type="text" 
								v-model="form.captcha"
								placeholder="请输入验证码"
								maxlength="6"
								data-key="captcha"
								@input="inputChange"
							/>
							<image @click="changeCaptch" :src="captchaImg" class="captcha absolute"></image>
						</bjx-form-item>
							</view>
					</bjx-form>
					
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="dosubmit">登录</button>
			<view class="forget-section">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	import bjxForm from '@/components/bjx-form/bjx-form.vue'
	import bjxFormItem from '@/components/bjx-form/bjx-form-item.vue'
	
	export default{
	
		components: {
		    bjxForm,
		    bjxFormItem
		},
		data(){
			return {
				form: {
					mobile: '18620740186',
					password: 'qweqweqwe',
					captcha:'',
				},
				rules: {
					mobile: {required: true,rule: 'phone',showTips:false},
					password: {required: true,rule: 'length:8,20'},
					captcha: {required: true,rule: 'length:4,8'},
				},
				dosubmit: false ,
				captchaImg:null
			}
		},
		onLoad(){
			this.captchaImg=this.$api.helper.captcha();
			console.log(this.captchaImg)
		},
		methods: {
			
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			changeCaptch(){
				this.captchaImg=this.$api.helper.captcha();
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				
				this.$api.helper.navTo("/pages/public/register");
			},
			async toLogin(){
				let _self =this 
			
				if(_self.dosubmit){
					return 
				}
				_self.dosubmit = true;
				
				this.$refs.form.validate(async function(val){
					if(val){
						
						let datas = await _self.$api.router.dologin(_self.form)
						if(datas.code!==0){
							_self.captchaImg=_self.$api.helper.captcha();
							_self.$api.helper.msg(datas.msg)
							_self.dosubmit = false;
						}else{
							_self.$api.helper.msg("登录成功,等待跳转。。。")
							
							_self.login(datas.data)
							setTimeout(()=>{
								console.log(1231)
								uni.switchTab({
									url:"/pages/user/user"
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
		},

	}
</script>

<style lang='scss'>
	
	page{
		
		display: inline-block;
		height: 250px;
		width: 80%;
		background:url(../../static/loginbg.png) no-repeat;
		background-size: cover;
		border-radius: 20px;

	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #fff;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		ming-height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 88upx;
		line-height: 88upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: url(../../static/btn_normal.png) no-repeat;
		background-size: cover;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
	.icon-zuojiantou-up{
		color: #fff;
	}
	
	.captcha{
		height: 130rpx;
		width:50%;
	}
	
	.form-item{
		background: $white-bg;
		border-radius: 15rpx;
		padding: 10px;
		font-size: 	$font-sm+2upx;
		color: $font-color-base;
		margin-bottom:40rpx;
		
	}
	.inputbox{
		font-size: $font-sm+2upx;
		color: $font-color-base;
	
		margin-top: 20rpx;
	}
	
	.tologin{
		margin-left: 30rpx;
		color: $border-color-light;
	}
	
	.captcha{
		width: 40%;
		height: 80rpx;
		right: 25upx;
		top: 25upx;
		z-index: 2;
	}
</style>
