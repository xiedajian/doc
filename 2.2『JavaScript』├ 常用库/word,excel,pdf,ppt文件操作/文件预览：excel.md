


# 相关方案

## PDF.js

[官网](https://mozilla.github.io/pdf.js/)



## pdfobject.js
​ PDFObject.js - 将PDF嵌入到一个div内，而不是占据整个页面，要求浏览器支持显示PDF（主流浏览器都支持），如果浏览器不支持，也可通过配置PDF.js来实现

官网地址: PDFObject: A JavaScript utility for embedding PDFs

github地址：https://github.com/pipwerks/PDFObject


## 3、vue-pdf

Vue-pdf是通过Vue下基础基于 pdf.js 组件实现PDF文件的展示，操作和生成的组件。

github地址：https://github.com/FranckFreiburger/vue-pdf


## 4、iframe / object/ embed
iframe / object / embed 使用方法和效果都同理，即将 pdf 作为插件内嵌在这三个HTML标签内，以下用 iframe 为例，效果就如同直接用链接打开 pdf 文件是一样的，相当于一个新的页面内嵌在当前页面中。

```
        <iframe
          style="width: 100%; height: 100%"
          src="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"
        ></iframe>
```