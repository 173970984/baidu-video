<template>
	<view>
		<view class="notice-item">
			<text class="title"></text>
			<view class="content">
				<text class="title"  selectable="true">客服微信：pos668778</text>
				<view class="img-wrapper">
					<image mode="aspectFit" @longtap="savePosterPath(url)" class="pic" src="../../static/kefu1.png"></image>
				</view>
			</view>
		
			<view class="content">
				<text class="title"  selectable="true">客服微信：wx200300800</text>
				<view class="img-wrapper">
					<image mode="aspectFit" @longtap="savePosterPath(url)"  class="pic" src="../../static/kefu2.png"></image>
				
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:"../../static/kefu2.png"
			}
		},
		methods: {
		savePosterPath(url) {
				uni.downloadFile({
					url,
					success: (resFile) => {
						console.log(resFile, "resFile");
						if (resFile.statusCode === 200) {
							uni.getSetting({
								success: (res) => {
									if (!res.authSetting["scope.writePhotosAlbum"]) {
										uni.authorize({
											scope: "scope.writePhotosAlbum",
											success: () => {
												uni.saveImageToPhotosAlbum({
													filePath: resFile.tempFilePath,
													success: (res) => {
														return uni.showToast({
															title: "保存成功！",
														});
													},
													fail: (res) => {
														return uni.showToast({
															title: res.errMsg,
														});
													},
													complete: (res) => {},
												});
											},
											fail: () => {
												uni.showModal({
													title: "您已拒绝获取相册权限",
													content: "是否进入权限管理，调整授权？",
													success: (res) => {
														if (res.confirm) {
															uni.openSetting({
																success: (res) => {
																	console.log(res.authSetting);
																},
															});
														} else if (res.cancel) {
															return uni.showToast({
																title: "已取消！",
															});
														}
													},
												});
											},
										});
									} else {
										uni.saveImageToPhotosAlbum({
											filePath: resFile.tempFilePath,
											success: (res) => {
												return uni.showToast({
													title: "保存成功！",
												});
											},
											fail: (res) => {
												return uni.showToast({
													title: res.errMsg,
												});
											},
											complete: (res) => {},
										});
									}
								},
								fail: (res) => {},
							});
						} else {
							return uni.showToast({
								title: resFile.errMsg,
							});
						}
					},
					fail: (res) => {
						return uni.showToast({
							title: res.errMsg,
						});
					},
				});
			},
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		text-align: center;
		width: 710upx;
		padding: 30upx 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
		text-align: center;
	
	}

	.img-wrapper {
		padding-top: 30upx;
		width: 100%;
		height: 360upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
