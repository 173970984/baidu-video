<template>
	<view>
		
		
		<uni-popup ref="popup" :animation="false">
			<view class="popup-content">
			<video style="height: 30vh;" :src="videoSrc" controls></video>
			
				</view>
		</uni-popup>
		
		
		<view class="isempty" v-show="!datas">
			<empty></empty>
			<view class="toadd" @click="toadd">
				去添加
			</view>
		</view>
		
		<view class="listBOX" v-for="(item,index) in datas" :key="index">
			<view class="tops comflex just-b">
				<view class="time">
					{{item.create_time}}
				</view>
				<view class="status">
					{{item.status}}
				</view>
				
			</view>
			
			<view class="info comflex">
				<view class="img">
					<image class="imgs"  :src="item.img_url?item.img_url:'../../static/noimg.png'"></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
			</view>
			<view class="listbottom comflex just-c ali-c" v-show="item.video_url">
				<view class="dobtn" @click="handleDownload(item.video_url)">立即下载</view>
				<view class="dobtn" @click="open(item.video_url)">预览</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import empty from "../../components/empty";
	export default {
		components: {
			empty,
		},
		data() {
			return {
				page: 1,
				limit:20,
				datas:null,
				totalPage:99,
				doloading:false,
				videoSrc:""
			}
		},
		 onPullDownRefresh() {
			this.page=1
			this.datas=[]
			this.loadData()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			this.loadData()
		},
		async onReachBottom() {
			this.page+=1
			this.loadData()
		},
		methods: {
			toggle() {
				this.$refs.popup.open()
			},
			async handleDownload (videoSrc) { // 下载功能
					if(!videoSrc){
						return 
					}
			      await uni.showLoading({ title: '下载中' })
			      // 1. 将远程文件 下载到小程序内存中
			      const { tempFilePath } = (await uni.downloadFile({
			        url: videoSrc
			      }))[1]
			      // 2. 将内存中的文件 下载到本地系统相册
			      uni.saveVideoToPhotosAlbum({ filePath: tempFilePath })
			      uni.hideLoading()
			      // 3. 提示用户下载成功
			      await uni.showToast({ title: '下载成功', icon: 'none' })
			},
			open(videoSrc){
				if(!videoSrc){
					return 
				}
				 this.videoSrc=videoSrc
				 // 通过组件定义的ref调用uni-popup方法
				 this.$refs.popup.open()
			},
			toadd(){
				this.$api.helper.switchBar("/pages/index/index")
			},
			async loadData(){
				if(this.doloading){
					return 
				}
				if(this.page>this.totalPage){
					return 
				}
				
				this.doloading=true
				let param = {"page":this.page,"limit":this.limit}
				let datas = await this.$api.router.myvideo(param);
				if(this.datas){
					this.datas=this.datas.concat(datas.data)
				}else{
					this.datas=datas.data
				}
				this.totalPage=Math.ceil(datas.count/this.limit)
				let _self =this 
				setTimeout(()=>{
					_self.doloading=false
				},1000)
			}
		}
	}
</script>

<style lang="scss">
page{
	background: $page-color-base;
}

.isempty{
	padding-top: 140rpx;
}
.toadd{
	background: $base-color;
	width: 300rpx;
	padding: 20rpx;
	color: $white-bg;
	text-align: center;
	border-radius: 50rpx;
	margin: 0px auto;
}


.listBOX{
	margin-top:30rpx;
	background: #fff;
	padding: 10rpx 20rpx;
}

.tops{
	
	padding-bottom: 10rpx;
	border-bottom:1px solid $border-color-light;
	
}
.time{
	font-size: $font-sm+4upx;
	color: #303133;
}

.img{
}
.imgs{
	width: 200rpx;
	height: 200rpx;
	border-radius: 15rpx;
}
.info{
	padding: 20rpx 0rpx;
}
.status{
	font-size: $font-sm+4upx;
	color:#ccc;
}

.title{
	color: #303133;
	padding-left: 20rpx;
	word-break: break-all;
}
.listbottom{
	padding-top: 10rpx;
	border-top:1px solid  $border-color-light;
}
.dobtn{
	background: $base-color;
	color: #fff;
	padding: 10rpx;
	border-radius: 50rpx;
	width: 220rpx;
	text-align: center;
	margin:20rpx 10rpx;
}

.popup-content {
	width: 90%;
	margin: 0px auto;
	padding: 0px;
}
</style>
	
	
	
	
	
	
	