







# weexpack 项目 打包、签名、发布


一、 weexpack build android  和  weexpack run android 的 区别。

单纯打包

weexpack build android


（2）打包并运行

weexpack run android

注：执行时，发现两者都是调起了浏览器


二、不同平台的打包

html5平台：

（1）打包html5平台

1
weexpack build web
这样你可以把打包后的资源上传到cdn服务器，然后上线你的web项目。


（2）在 html5 平台运行

1
weexpack run web



Android平台：

（1）打包Android平台  构建 apk 文件

1
weexpack build android
（2）在Android平台运行

1
weexpack run android
