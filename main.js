import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import router from "common/router.js"
import md5 from "common/md5.js"
import helper from "common/helper.js"
import req from "common/request.js"
import store from './store'
// 消息提醒
// 打印数据
const logs = (datas)=>{
	console.log(datas)
}
// let mmmm = route.index()
Vue.prototype.$api = {router,helper,logs,req};
 Vue.prototype.$store = store;
const app = new Vue({
    ...App
})
app.$mount()
