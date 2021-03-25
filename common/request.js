import helper from "./helper.js"

export default { 

	async dopost(endpoint,datas={},loading=true,jsonData=true){
		// 是否需要加载loading
		if (loading) {
			uni.showLoading({
				title: 'loading',
				mask: true
			});
		}
		// 地址
		if(endpoint==null || endpoint==undefined){
			uni.showToast({
				title: "请求地址缺失",
				icon: 'none'
			});	
			return 
		}
		//设置sign
		Object.assign(datas, helper.createSign());
		console.log("请求地址")
		console.log(endpoint)
		console.log("请求数据")
		console.log(datas)
		
		try{
			let [error, res] = await uni.request({
				url: endpoint,
				data: datas,
				method: "POST",
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			});
			
			if (res.data.code === 0) {
				let  r = JSON.stringify(res.data)
				console.log("返回响应数据 :"+r)
				helper.hideloading()
				return res.data
			}else{
				
				helper.hideloading()
				if(res.data.code==null || res.data.code==undefined){
					res.data.msg="请求失败"
				}
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				});	
				console.log("返回响应错误数据 : "+JSON.stringify(res.data))
				
				// 是否需要去登录
				this.tologin(res.data.code)
				
				return res.data;
			}
			console.log("返回响应数据 : "+JSON.stringify(res.data))
			return res.data;
		}catch(err){
			helper.hideloading()
			this.postLog(err)
			helper.msg("网络异常,请稍后再试")
		}	
		helper.logs("结束、。。。。。。。。。。。。。。。。")
		helper.hideloading()
	}
	// get请求
	,async doget(endpoint,datas={},callback,loading=true,jsonData=true){
		// 是否需要加载loading
		if (loading) {
			uni.showLoading({
				title: 'loading',
				mask: true
			});
		}
		// 地址
		if(endpoint==null || endpoint==undefined){
			uni.showToast({
				title: "请求地址缺失",
				icon: 'none'
			});	
			return 
		}
		//设置sign
		Object.assign(datas, helper.createSign());
		helper.logs("请求数据包")
		helper.logs(datas)
		try{
			let [error, res] = await uni.request({
				url: endpoint,
				data: datas,
				method: "GET",
				header: {
					'Content-Type':'application/json'
				}
			});
			
			helper.hideloading()
			
			if(res.data.code==0){
				helper.msg(res.msg)
				
				return res.data
			}else{
				// 是否需要去登录
				this.tologin(res.data.code)
				helper.msg(res.msg+res.data.code)
			}
			
		}catch(err){
			helper.hideloading()
			this.postLog(err)
			helper.msg("网络异常,请稍后再试")
		}	
		helper.logs("结束、。。。。。。。。。。。。。。。。")
		helper.hideloading()
		
		
	},
	
	tologin(code){
		if(code==10020){
			helper.navTo("/pages/public/login")
		}
	},
	// 提交异常log
	postLog(err){
		console.log("dolog")
		console.log(helper.BASEHOST()+"public/dolog")
		console.log(err)
		let datas={}
		datas['error']=err;
		Object.assign(datas, helper.createSign());
		helper.logs("请求数据包")
		helper.logs(datas)
	
		uni.request({
			url: helper.BASEHOST()+"public/dolog",
			data: datas,
			method: "POST",
			header: {
				'Content-Type':'application/json'
			} 
		});
	},
	
	// 文件上传
	uploadImage(callback,isCamera = false){
		let _self = this
		
		try{
			uni.chooseImage({
				count:1,
				sourceType:isCamera?['camera']:['camera','album'],
				sizeType:['compressed'],
				success: (res) => {
					// 上传地址
					let url = helper.BASEHOST()+"upload/uploadImage"
					let datas={};
					//设置sign
					Object.assign(datas, helper.createSign());
					helper.logs("请求数据包")
					helper.logs(datas)
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					uni.uploadFile({
						fileType: "image",
						header: {
						},
						url: url,
						formData:datas,
						filePath: res.tempFilePaths[0],
						name: "file",
						success: (res) => {
							let datas = JSON.parse(res.data)
							helper.hideloading()
							if(datas.code===0){
								console.log("上传成功")
								callback(datas)
							}else{
								
								helper.msg(datas.msg)
								if(datas.code==10020){
									setTimeout(function(){
										helper.navTo("/pages/public/login")
									},1500)
								}
							}
							
						},
						fail: (err) => {
							helper.hideloading()
							console.log("err" + err)
							console.log(err)
							_self.$api.msg("上传失败")
						}
					
					})
					console.log(res)
				}
			})	
			
		}catch(err){
			helper.hideloading()
			this.postLog(err)
			helper.msg("网络异常,请稍后再试")
		}	
		helper.hideloading()
	},
}

