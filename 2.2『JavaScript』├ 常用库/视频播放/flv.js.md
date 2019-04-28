[npm]](https://github.com/Bilibili/flv.js)


# 先普及点背景知识，为什么 HTML5 视频播放要用 flv 格式？

因为Flash。flash快死了，但是它的影响力还在，flash技术是过去10多年的互联网视频基础技术，
大量相关基础设施都是围绕Flash构建的，比如 CDN 普遍支持的 RTMP 和 flv over http协议。
做互联网直播的公司为了能兼容Web上的Flash播放，不约而同地选择了flv的媒体格式。
在从Flash到 HTML5过渡的时期，如果HTML5能支持flash的协议是再好不过了，可以平滑过渡，
然而HTML5并不原生支持flash协议。flv.js这个项目解决了HTML5支持flash协议的问题，
这就是flv.js应运而生短期爆红的历史背景。


# Flv.js 

是 HTML5 Flash 视频（FLV）播放器，纯原生 JavaScript 开发，没有用到 Flash。由 bilibili 网站开源。

一个实现了在 HTML5 视频中播放 FLV 格式视频的 JavaScript 库。它的工作原理是将 FLV 文件流转码复用成 ISO BMFF（MP4 碎片）片段，

然后通过 Media Source Extensions 将 MP4 片段喂进浏览器。

flv.js 是使用 ECMAScript 6 编写的，然后通过 Babel Compiler 编译成 ECMAScript 5，使用 Browserify 打包。


功能：

FLV 容器，具有 H.264 + AAC 编解码器播放功能

多部分分段视频播放

HTTP FLV 低延迟实时流播放

FLV 通过 WebSocket 实时流播放

兼容 Chrome, FireFox, Safari 10, IE11 和 Edge

十分低开销，并且通过你的浏览器进行硬件加速