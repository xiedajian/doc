

# wifi
微信小程序提供的有WIFI API
[](https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.connectWifi.html)

uni-app
[](https://uniapp.dcloud.net.cn/api/system/wifi.html#connectWifi)
[](https://ext.dcloud.net.cn/plugin?id=10337)

# TCP

微信小程序提供的有TCP API
[](https://developers.weixin.qq.com/miniprogram/dev/api/network/tcp/wx.createTCPSocket.html)


uni-app 没有提供跨端的 TCP API。
在开发安卓，ios APP时，有两种方式可以进行TCP
1.原生语言插件
[](https://ext.dcloud.net.cn/plugin?id=2029)
[](https://blog.csdn.net/haduwi/article/details/124422976)
[](https://gitee.com/mobai1/tcp-unimodule)

2.native.js 调用安卓，ios的原生类
使用 plus.android.importClass() 调用安卓的类进行原生代码编写
[](https://zhuanlan.zhihu.com/p/24431869)
[](https://www.html5plus.org/doc/zh_cn/android.html)
[](https://www.cnblogs.com/hongyedeboke/p/6101990.html)
[](https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/114)