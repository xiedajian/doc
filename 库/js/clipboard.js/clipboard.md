





# Clipboard.js

官网地址： https://clipboardjs.com/

cdn: <script src="https://cdn.bootcss.com/clipboard.js/2.0.1/clipboard.min.js"></script>


将文本复制到剪贴板的现代方法

没有Flash。没有框架。只需3kb gzipped

取代flash复制到剪切板，更好页面性能，不会造成卡顿想象，不止兼容PC端，还优雅的兼容移动端ios的safari浏览器



### 前言

ZeroClipboard的时代或许已经过去了，

zeroClipboard利用透明的 flash 覆盖在复制按钮上，点击 flash，将复制内容传入到 flash 中，再通过 flash 把传入的内容写到剪贴板上。

可能由于Flash技术正被各大浏览器厂商冷落，所以，截止到目前ZeroClipboard.js最新版，也无法实现在移动端浏览器进行文本复制。



## 安装

npm install clipboard --save



## 使用


```
<script src="dist/clipboard.min.js"></script>

new ClipboardJS('.btn');
```

