
[Aliplayer](http://player.alicdn.com/aliplayer/index.html)
[功能演示](https://player.alicdn.com/aliplayer/presentation/index.html?type=cover)
[文档](https://help.aliyun.com/document_detail/125553.html)
[属性和接口说明](https://help.aliyun.com/document_detail/125572.html)
[场景化和自动定义组件](https://github.com/aliyunvideo/AliyunPlayer_Web)


# Aliplayer

Aliplayer Web播放器

实现了截图、国际化、变速、UI自定义、微信同层播放、自适应播放、加密播放、H5播放flv、自定义插件等功能。

通过插件的形式实现弹幕、广告等功能，并会开源到github上，也会支持用户根据自己业务需求来自定义SDK包。



### 适配播放

基本原则是H5优先，能用H5播放的肯定不用Flash去播放。
所以在移动端，我们肯定是用H5来播放的，PC端也依照这个原则尽量使用H5。
同时，我们会判断浏览器类型支持哪种播放格式，比如m3u8在PC端IE11以上的浏览器才能播放，
如果遇到IE11以下的浏览器，我们自动会选择Flash播放。
在视频格式方面，假设视频是rtmp和flv，我们会自动选择Flash播放。
另外，如果用户自主设置useH5Prism和useFlashPrism属性，那我们也会依照用户的选择。

根据终端类型、浏览器类型、设置的属性和地址协议选择最合适的播放器，适配的基本原则是：

- useFlashPrism = true、rtmp和http-flv协议时，采用flash播放
- 移动端采用H5播放
- useH5Prism = true，采用H5播放
- PC端MP4采用H5播放
- PC端如果浏览器或通过Aliplayer的插件支持播放m3u8，则采用H5播放，否则采用Flash播放
- 其它都用H5播放

H5优先级最高，能H5播放的绝不选择Flash，除非用户指定用Flash播放


### 浏览器支持情况

FLASH支持IE8以上，在浏览器上启动允许FLASH运行即可；
H5支持IE9以上，m3u8需要在IE11以上才可以运行；
其他浏览器都也都是可以支持的。


### 两种播放方式
- source，通过url 去播放	（常规用法）
- 通过点播vid+playauth去播放，第二种方式和视频云结合比较紧密 （需要配合阿里云业务）



[视频直播常见问题与解决办法](https://yq.aliyun.com/articles/621067)
[常见问题汇总](https://yq.aliyun.com/articles/279084)
[使用Aliplayer在微信中播放视频的正确姿势](https://yq.aliyun.com/articles/219539)
[Aliplayer Web播放器介绍及功能实现](https://yq.aliyun.com/articles/236764?utm_content=m_34654)