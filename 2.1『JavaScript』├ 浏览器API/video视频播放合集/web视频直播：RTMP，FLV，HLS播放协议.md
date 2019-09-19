

[直播原理与web直播实战](https://juejin.im/post/5ab851b6f265da23826df601#heading-27)


# web中直播技术

目前互联网上web做直播，主要是展示，视频直播服务支持输出 RTMP、FLV、HLS 三种协议


## HLS

HLS（HTTP Live Streaming全称）是一个基于HTTP的视频流协议，
由Apple公司实现，将视频分成 5-10 秒的视频小分片，然后用 m3u8 索引表进行管理。
由于客户端下载到的视频都是 5-10 秒的完整数据，故视频的流畅性很好，但也同样引入了很大的延迟（HLS 的一般延迟在 10-30s 左右）。

Mac OS上的QuickTime、Safari 以及iOS上的 Safari都能很好的支持 HLS，高版本 Android 也增加了对 HLS 的支持。
一些常见的客户端如：MPlayerX、VLC 也都支持HLS协议，如果需要在chrome上播放，需要使用 videojs-contrib-hls.js 解析。

相比于 FLV，HLS 在iPhone 和大部分 Android 手机浏览器上的支持非常给力，所以常用于 QQ 和微信朋友圈的 URL 分享。

HLS简单讲就是把整个流分成一个个小的片段，基于 HTTP 的文件来下载，每次只下载一小部分。

web中常用到的播放器有 video.js 配合 videojs-contrib-hls.js


## RTMP

Real Time Messaging Protocol（简称 RTMP）是 Macromedia 开发的一套视频直播协议，现在属于 Adobe。
RTMP 协议比较全能，既可以用来推送，又可以用来直播。
其核心理念是将大块的视频帧和音频帧“剁碎”，然后以小数据包的形式在互联网上进行传输，且支持加密，
因此隐私性相对比较理想，但拆包组包的过程比较复杂，所以在海量并发时容易出现一些不可预期的稳定性问题。

这套方案需要搭建专门的 RTMP 流媒体服务如 Adobe Media Server，并且在浏览器中只能使用 Flash 实现播放器。
它的实时性非常好，延迟很小，但无法支持移动端 WEB 播放是它的硬伤。

浏览器端，HTML5 video标签无法播放 RTMP 协议的视频，可以通过 video.js 来实现。


## FLV

HTTP-FLV 协议由 Adobe 公司主推，格式极其简单，只是在大块的视频帧和音视频头部加入一些标记头信息，
由于这种极致的简洁，在延迟表现和大规模并发方面都很成熟。


唯一的不足就是在手机浏览器上的支持非常有限，但是用作手机端 APP 直播协议却异常合适。

Bilibli 的开源项目 flv.js ，它解析FLV文件喂给原生HTML5 Video标签播放音视频数据，使浏览器在不借助Flash的情况下播放FLV成为可能。



## HLS VS RTMP 优缺点对比

```
协议				原理						延时			优点			缺点		使用场景

HLS(http)			集合一段时间数据				10s-30s			跨平台			延时性高		移动端
					生成ts切片文件更m3u8文件

RTMP(TCP)			每个时刻的数据				2s				延时低、实时性好	跨平台差	 	PC+直播+实时性要求高+互动性强
					收到后立即发送

```


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















