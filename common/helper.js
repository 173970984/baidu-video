import md5 from "./md5.js"
export default {
	//验证码
	captcha(){
		return this.BASEHOST()+"captcha/flat?"+this.getTime()
	},
	// 返回基础host
	BASEHOST(){
		return "http://www.77urls.com/"
	},
	// 消息提醒
	msg (title, duration=2000, mask=false, icon='none'){
		
		//统一提示方便全局修改
		try{
			if(Boolean(title) === false){
				return;
			}
			uni.showToast({
				title,
				duration,
				mask,
				icon
			});
		}catch(err){
			title=err
			uni.showToast({
				title,
				duration,
				mask,
				icon
			});
			
		} 
	},
	// 打印数据
	logs (datas){
		console.log(datas)
	},
	//显示加载中
	showloading(tips){
		if(!tips){
			tips="处理中..."
		}
		uni.showLoading({
			title:tips,
			mask:true
		})
	},
	// 隐藏loading
	hideloading(times){
		if(!times){
			times=500
		}
		setTimeout(function(){
			uni.hideLoading()
		},times)
	},
	// 跳转
	navTo(url,times){
		
		if(!times){
			uni.navigateTo({
				url:url
			})
		}else{
			setTimeout(()=>{
				uni.navigateTo({
					url:url
				})
			},times)
		}
		
	},
	// 底部导航栏跳转
	navTar(url){
		uni.switchTab({
			url:url
		});
	},
	// 关闭当前页面跳转
	navRedirect(url){
	  uni.redirectTo({
			url:url
		});
	},
	switchBar(url){
	  uni.switchTab({
			url:url
		});
	},
	// 设置缓存
	cacheSet(key,val){
		if(val.length<=0){
			return 
		}
		uni.setStorageSync(key,val)
		console.log("设置缓存")
		console.log(key)
		console.log(val)
	},
	// 获取缓存
	cacheGet(key){
		return uni.getStorageSync(key)
	},
	// 获取当前时间戳
	getTime(){
		return  Date.parse(new Date())/1000;
	},  
	// 生成签名
	createSign(){
		let mdkey = "d2ViQXBwOndlYkFwcA=="
		let times = this.getTime()
		return {"t":times,"sign":md5(mdkey+times)};
	}
	
}
