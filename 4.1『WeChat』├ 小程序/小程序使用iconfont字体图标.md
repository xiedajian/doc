


在微信小程序中使用 iconfont 主要有两种方式，第一种是使用 Font class 方式，第二种是使用 Unicode 方式。



# 方式一：Font class 方式

1. 在 http://iconfont.cn/ 选择你想要的图标，选择 Font class 类型并下载到本地。


# 方式二：Unicode 方式

下载 iconfont 的时候要选 Unicode，然后点击“查看在线链接”复制里面的代码。

把解压完的 iconfont.css 里 @font-face 里面的内容替换成刚才复制的代码。



# uni-app 使用字体图标

uni-app 支持使用字体图标，使用方式与普通 web 项目相同，需要注意以下几点：

- 支持 base64 格式字体图标。
- 支持网络路径字体图标。
- 网络路径必须加协议头 https。
- 从 http://www.iconfont.cn 上拷贝的代码，默认是没加协议头的。
- uni-app 本地路径图标字体支持情况：
	字体文件小于 40kb，uni-app 会自动将其转化为 base64 格式；
	字体文件大于等于 40kb， 需开发者自己转换，否则使用将不生效；
	字体文件的引用路径仅支持以 ~@ 开头的绝对路径（不支持相对路径）。
	
```
 @font-face {
     font-family: test1-icon;
     src: url('~@/static/iconfont.ttf');
 }
```