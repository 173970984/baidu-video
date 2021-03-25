import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo:{
			'token':"",
			"tokenHead":"Bearer",
			"phone":"",
			"realName":""
		}
		
	},
	mutations: {
		getNewId(){
			
		},
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
			console.log("登录设置缓存=======================");
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo ={} 
			state.authentication={}
			state.myexpo={}
			state.companyInfo={}
			state.cityInfo={}
			state.wechatConfig={}
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
				key: 'userInfoObj'
			})
		}
	},
	actions: {
	
	}
})

export default store
