<template>
	<view>
		<view class="title-box">
			{{title}}
		</view>
		<view style="margin: 30upx;">
			写入的：
			<view class="form-box">
				<view class="form-box-time">
					ID:
				</view>
				<input class="form-box-input" type="text" v-model="id"/>
			</view>
			<view class="form-box">
				<view class="form-box-time">
					PAYLOAD:
				</view>
				<input class="form-box-input" type="text" v-model="payload"/>
			</view>
			<view class="form-box">
				<view class="form-box-time">
					TYPE:
				</view>
				<input class="form-box-input" type="text" v-model="type"/>
			</view>
		</view>
		<view style="margin: 30upx;">
			读取的：
			<view class="form-box">
				<view class="form-box-time">
					ID:
				</view>
				<view class="form-box-input">
					{{read.id}}
				</view>
			</view>
			<view class="form-box">
				<view class="form-box-time">
					PAYLOAD:
				</view>
				<view class="form-box-input">
					{{read.payload}}
				</view>
			</view>
			<view class="form-box">
				<view class="form-box-time">
					TYPE:
				</view>
				<view class="form-box-input">
					{{read.type}}
				</view>
			</view>
		</view>
		<view style="margin: 30upx;">
			{{content}}
		</view>
		<view class="fixed-btn" style="z-index: 1;">
			<view v-if="isWrite"  class="my-button-primary" @click="writeData">写入数据</view>
		</view>
	</view>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss">
	.title-box{
		height: 100upx;
		line-height: 100upx;
		padding-left: 30upx;
		text-align: start;
		border-bottom: 1upx solid #d1d1d1;
	}
	.fixed-btn {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 99;
		width: 100%;
		padding: 24upx;
		box-sizing: border-box;
		background-color: #ffffff;
	}
	.my-button-primary {
		height: 80upx;
		background: linear-gradient(270deg, #5063b4 2%, #457fff 97%);
		border-radius: 8rpx;
		font-size: 34rpx;
		color: #ffffff;
		line-height: 80upx;
		margin: 10upx 0upx;
		text-align: center;
	}
	.my-button-primary:active{
		background: linear-gradient(270deg, #4b5eaa 2%, #427af4 97%);
	}
	.form-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 80upx;
		
		.form-box-input {
			font-size: 28upx;
			flex: 1;
			margin-left: 30upx;
			color: #3e3e3e;
			text-align: start;
		}
		.form-box-time {
			font-size: 28upx;
			margin-left: 30upx;
			width: 200upx;
			color: #3e3e3e;
			text-align: start;
		}
	}
</style>
