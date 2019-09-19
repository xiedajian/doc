
https://github.com/gwuhaolin/blog/issues/3
[flv.js](https://github.com/Bilibili/flv.js)


# 使用flv.js做直播

为什么要在这个时候探索flv.js做直播呢？

原因在于各大浏览器厂商已经默认禁用Flash，之前常见的Flash直播方案需要用户同意使用Flash后才可以正常使用直播功能，这样的用户体验很致命。

在介绍flv.js之前先介绍下常见的直播协议以及给出我对它们的延迟与性能所做的测试得出的数据。
如果你看的很吃力可以先了解下音视频技术的一些基础概念。

做互联网直播的公司为了能兼容Web上的Flash播放，不约而同地选择了flv的媒体格式。
在从Flash到 HTML5过渡的时期，如果HTML5能支持flash的协议是再好不过了，可以平滑过渡，
然而HTML5并不原生支持flash协议。flv.js这个项目解决了HTML5支持flash协议的问题，
这就是flv.js应运而生短期爆红的历史背景。


## 常见直播协议

RTMP: 底层基于TCP，在浏览器端依赖Flash。
HTTP-FLV: 基于HTTP流式IO传输FLV，依赖浏览器支持播放FLV。
WebSocket-FLV: 基于WebSocket传输FLV，依赖浏览器支持播放FLV。WebSocket建立在HTTP之上，建立WebSocket连接前还要先建立HTTP连接。
HLS: Http Live Streaming，苹果提出基于HTTP的流媒体传输协议。HTML5可以直接打开播放。
RTP: 基于UDP，延迟1秒，浏览器不支持。


常见直播协议延迟与性能数据以下数据只做对比参考
```
传输协议		播放器		延迟		内存		CPU
RTMP		Flash		1s			430M		11%
HTTP-FLV	Video		1s			310M		4.4%
HLS			Video		20s			205M		3%
```

在支持浏览器的协议里，延迟排序是：
RTMP = HTTP-FLV = WebSocket-FLV < HLS
而性能排序恰好相反：
RTMP > HTTP-FLV = WebSocket-FLV > HLS
也就是说延迟小的性能不好。

可以看出在浏览器里做直播，使用HTTP-FLV协议是不错的，性能优于RTMP+Flash，延迟可以做到和RTMP+Flash一样甚至更好。


## flv.js 简介

flv.js是来自Bilibli的开源项目。

它解析FLV文件喂给原生HTML5 Video标签播放音视频数据，使浏览器在不借助Flash的情况下播放FLV成为可能。

它的工作原理是将 FLV 文件流转码复用成 ISO BMFF（MP4 碎片）片段，

然后通过 Media Source Extensions 将 MP4 片段喂进浏览器。


功能：

FLV 容器，具有 H.264 + AAC 编解码器播放功能

多部分分段视频播放

HTTP FLV 低延迟实时流播放

FLV 通过 WebSocket 实时流播放

兼容 Chrome, FireFox, Safari 10, IE11 和 Edge

十分低开销，并且通过你的浏览器进行硬件加速


## flv.js 优势

由于浏览器对原生Video标签采用了硬件加速，性能很好，支持高清。

同时支持录播和直播

去掉对Flash的依赖



## flv.js兼容方案

由于目前flv.js兼容性还不是很好，要用在产品中必要要兼顾到不支持flv.js的浏览器。兼容方案如下：

PC端
优先使用 HTTP-FLV，因为它延迟小，性能也不差1080P都很流畅。
不支持 flv.js 就使用 Flash播放器播 RTMP 流。
不想用Flash兼容也可以用HLS，但是PC端只有Safari支持HLS

移动端
优先使用 HTTP-FLV，因为它延迟小，支持HTTP-FLV的设备性能运行 flv.js 足够了。
不支持 flv.js 就使用 HLS，但是 HLS延迟非常大。
HLS 也不支持就没法直播了，因为移动端都不支持Flash。








