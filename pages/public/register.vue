<template>
	<view class="container">
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="welcome">
				用户注册！
			</view>
			<view class="input-content">
				<bjx-form
				msg-type="in"
				    labelType="inline"
				    :rules="rules"
				    labelWidth="100"
				    :form="form"
				    ref="form">
					
					<view class="form-item">
						
					<bjx-form-item  prop="mobile" labelType="block" label="手机号码"  :label-right="form.mobile.length+'/11'">
							<input 
								class="inputbox"
								type="number" 
								v-model="form.mobile"
								placeholder="请输入手机号码"
								maxlength="11"
								data-key="mobile"
								@input="inputChange"
							/>
					</bjx-form-item>
					</view>
					
					<view class="form-item">
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
					<view class="form-item">
					<bjx-form-item  prop="password_confirmation"  labelType="block" label="确认密码"  :label-right="form.password_confirmation.length+'/20'">
							<input 
								class="inputbox"
								type="password" 
								v-model="form.password_confirmation"
								placeholder="请输入8-20位密码"
								maxlength="20"
								data-key="password_confirmation"
								@input="inputChange"
							/>
					</bjx-form-item>
					</view>
					<view class="form-item">
					<bjx-form-item  prop="invote_code" labelType="block" label="邀请码" >
							<input 
								class="inputbox"
								type="text" 
								v-model="form.invote_code"
								placeholder="请输入邀请码"
								maxlength="20"
								data-key="invote_code"
								@input="inputChange"
							/>
					</bjx-form-item>
						</view>
				
				    <button :disabled="dosubmit" class="confirm-btn" @click="submit" >立即注册</button>
				</bjx-form>
				
			</view>
			<view class="forget-section">
				已有账户?	<text @click="toLogin" class="tologin">马上登录</text>
			</view>
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
		data(){
			return {
				 form: {
					mobile: '',
					password: '',
					password_confirmation: '',
					invote_code: 'FBU3',
					code:123123,
				},
				rules: {
					mobile: {required: true,rule: 'phone',showTips:false},
					password: {required: true,rule: 'length:8,20'},
					password_confirmation: {required: true,rule: 'length:8,20|passwordConfirm'},
					invote_code: {rule: 'length:3,8'},
				},
				dosubmit: false 
			}
		},
		onLoad(){
			
		},
		methods: {
			// 数据提交
			submit() {
				let _self =this 
			   // 校验表单数据 val 为false 则表明 校验不通过
				_self.dosubmit=true		
				this.$refs.form.validate(async function(val){
					if(val){
						let datas  =  await _self.$api.router.register(_self.form)
					}
					setTimeout(()=>{
						_self.dosubmit=false
					},3000)
				})
				return 
			},
			
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				this.$api.helper.navTo("/pages/public/login")
			},
			async toLogin(){
				this.$api.helper.navTo("/pages/public/login")
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
		border-radius: 20px;
		background-size: cover;

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
		height: 120upx;
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
</style>
