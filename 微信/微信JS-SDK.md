
官网文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115


# JS-SDK

微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包。

通过使用微信JS-SDK，网页开发者可借助微信高效地使用拍照、选图、语音、位置等手机系统的能力，同时可以直接使用微信分享、扫一扫、卡券、支付等微信特有的能力，为微信用户提供更优质的网页体验。

此文档面向网页开发者介绍微信JS-SDK如何使用及相关注意事项。




## 使用步骤

#### 步骤一：绑定域名

先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。

备注：登录后可在“开发者中心”查看对应的接口权限。


#### 步骤二：引入JS文件

在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.2.0.js

备注：支持使用 AMD/CMD 标准模块加载方法加载


#### 步骤三：通过config接口注入权限验证配置

所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用

> 注意（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）

```
	wx.config({
	    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	    appId: '', // 必填，公众号的唯一标识
	    timestamp: , // 必填，生成签名的时间戳
	    nonceStr: '', // 必填，生成签名的随机串
	    signature: '',// 必填，签名
	    jsApiList: [] // 必填，需要使用的JS接口列表
	});
```

#### 步骤四：通过ready接口处理成功验证

 config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，

 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。

 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

```
	wx.ready(function(){

		// 在这里调用接口

	});
```


#### 步骤五：通过error接口处理失败验证

config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

wx.error(function(res){

});



## JS-SDK 可以实现的功能

- 分享 （朋友圈，好友，qq，qq空间，微博）

- 拍照，图片上传

- 音频，智能音频识别

- 设备信息，地理位置

- 界面操作（显示隐藏右上角菜单内容）

- 摇一摇周边设备

- 扫码

- 跳转至微信小店

- 微信卡劵 （添加，查看，调起）

- 微信支付

- 快速输入（微信收货地址）


### 分享到朋友圈实例

```
    // 注入JSSDK配置参数，默认开启所有接口权限
    wx.config({json_encode($re_js)});

    // 微信JSSDK异常处理
    wx.error(function (e) {
        console.log(e);
    });

    // 当JSSDK初始化完成后，再执行相关操作
    wx.ready(function () {
        // 这里就可以调用 wx 的jssdk的操作了

        //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: '', // 分享标题
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                console.log("share success!");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                console.log("share cancel!");
            }
        });

        //获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                console.log("share success!");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                console.log("share cancel!");
            }

        });

    });

```
