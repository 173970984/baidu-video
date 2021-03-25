import  req  from "./request.js"
import helper from "./helper.js"
let BASE_HOST =helper.BASEHOST()
export default {
	 async index(){
	 	let url = BASE_HOST+"public/index"
	 	let datas =await  req.doget(url)
	 	return datas
	 },
	 
	// 会员注册
	async register(param){
		let url = BASE_HOST+"public/register"
		let datas =await  req.dopost(url,param)
		if(datas.code==0){
			helper.msg(datas.msg)
			//注册成功跳转登录页面
			setTimeout(function(){
				helper.navRedirect("/pages/public/login")
			},2000)
		}else{
			return datas
		}
	},
	 
	// 会员登录
	async dologin(param){
		let url = BASE_HOST+"user/login"
		let res =await  req.dopost(url,param)
		return res
	},
	// 退出登录
	async dologout(){
		let url = BASE_HOST+"public/logout"
		let res =await  req.dopost(url)
		return res
	},
	
	// 我的视频
	async myvideo(param){
		let url = BASE_HOST+"video/myvideo"
		let res =await  req.dopost(url,param)
		return res
	},
	
	
	
	// 我的视频
	async postData(param){
		let url = BASE_HOST+"video/apiindex"
		let res =await  req.dopost(url,param)
		return res
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 会员账户信息
	async userAccount(){
		let url = BASE_HOST+"user/account"
		let res =await  req.dopost(url)
		return res
	},
	
	//矿机列表
	async machieList(){
		let url = BASE_HOST+"machine/index"
		let res =await  req.dopost(url)
		return res
	},
	
	
	//公告列表
	async notice(){
		let url = BASE_HOST+"notice/index"
		let res =await  req.dopost(url)
		return res
	},
	
	//公告详情
	async noticeDetail(id){
		let url = BASE_HOST+"notice/detail"
		let res =await  req.dopost(url,{"id":id})
		return res
	},
	
	
	//实名认证
	async realnameAuth(datas){
		let url = BASE_HOST+"user/auth"
		let res =await  req.dopost(url,datas)
		return res
	},
	
	
	//我的矿机
	async mymachine(){
		let url = BASE_HOST+"user/mymachine"
		let res =await  req.dopost(url)
		return res
	},
	
	//矿机领取
	async countprofile(){
		let url = BASE_HOST+"user/countProfit"
		let res =await  req.dopost(url)
		return res
	},

}

