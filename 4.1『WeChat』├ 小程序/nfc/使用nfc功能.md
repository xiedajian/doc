[近场通信 (NFC)](https://developers.weixin.qq.com/miniprogram/dev/framework/device/nfc.html)
[微信小程序nfc](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.stopHCE.html)


# 操作步骤

1.获取 NFC 实例	`wx.getNFCAdapter()`, 得到nfc实例 NFCAdapter
2.NFC 实例开始发现设备 `NFCAdapter.startDiscovery`
3.监听 发现的 NFC 	`NFCAdapter.onDiscovered` , 获取到nfc支持的标准协议 (NFC-A / NFC-B / NFC-F/ NFC-V/ ISO-DEP / NDEF )
4.得到支持的协议后 获取 对应的协议实例		例如设置支持 ISO-DEP协议 `NFCAdapter.getIsoDep`


```js
let NFCAdapter = wx.getNFCAdapter();

NFCAdapter.startDiscovery({
	success: res => {
		
		NFCAdapter.onDiscovered(({id,techs,messages}) => {
			// techs : ["ISO-DEP", "NFC-A"]
			
			if(techs.includes("ISO-DEP")){
				let IsoDep = NFCAdapter.getIsoDep()
				
				IsoDep.connect({
					success: res => {

						// 往 NFC 卡片写入 
						IsoDep.transceive({
							data:'',
							success: res=>{
								IsoDep.close()
							}
						})	
					},
					fail: error => {
						this.title = '刷新重试';
						console.error(error);
					},
					complete: res => {
						console.log(res);
					}
				})
			}
		});
	},
	fail: error => {
		this.title = '刷新重试';
		console.error(error);
	},
	complete: res => {
		console.log(res);
	}
});
```

> transceive 发送数据需要传递二进制数据
