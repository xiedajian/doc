
### 介绍
art-template 是一个简约、超快的模板引擎。

它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 极限的运行性能，并且同时支持 NodeJS 和浏览器。在线速度测试。

github: https://github.com/aui/art-template
官网： https://aui.github.io/art-template/
中文： https://aui.github.io/art-template/zh-cn/index.html


### 特性
拥有接近 JavaScript 渲染极限的的性能
调试友好：语法、运行时错误日志精确到模板所在行；支持在模板文件上打断点（Webpack Loader）
支持 Express、Koa、Webpack
支持模板继承与子模板
浏览器版本仅 6KB 大小

#
v4 对 NodeJS 进行了更好的支持，并且拥有领先的渲染性能，同时带来了全家桶：express-art-template 与 koa-art-template。




### 安装
官网文档：https://aui.github.io/art-template/zh-cn/docs/installation.html
##### 方式1 npm
```
npm install art-template --save
```

##### 方式2 在浏览器中实时编译
下载并引入
https://raw.githubusercontent.com/aui/art-template/master/lib/template-web.js

兼容
IE8+（IE8 需要补丁才能运行。示例）

因为浏览器不支持文件系统，所以 template(filename, data) 不支持传入文件路径，它内部使用 document.getElementById(filename).innerHTML 来获取模板，例如：

```
<script src="lib/template-web.js"></script>
<script id="tpl-user" type="text/html">
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}
</script>
```


##### 方式3 在浏览器中预编译  Webpack
使用 Webpack 的 Loader: art-template-loader。
```
npm install art-template
npm install art-template-loader --save-dev
```
