[原文](https://www.cnblogs.com/h2zZhou/p/12929472.html)

# browser VS module VS main

前端开发中使用到 npm 包那可算是家常便饭，而使用到 npm 包总免不了接触到 package.json 包配置文件。那么这里就有一个问题，当我们在不同环境下 import 一个 npm 包时，到底加载的是 npm 包的哪个文件？

老司机们很快地给出答案：main 字段中指定的文件。

然而我们清楚 npm 包其实又分为：

- 只允许在客户端使用的，
- 只允许造服务端使用的，
- 浏览器/服务端都可以使用。

如果我们需要开发一个 npm 包同时兼容支持 web端 和 server 端，需要在不同环境下加载npm包不同的入口文件，显然一个 main 字段已经不能够满足我们的需求，这就衍生出来了 module 与 browser 字段。

本文就来说下 这几个字段的使用场景，以及同时存在这几个字段时，他们之间的优先级。


# 文件优先级

在说 package.json 之前，先说下文件优先级

由于我们使用的模块规范有 ESM 和 commonJS 两种，为了能在 node 环境下原生执行 ESM 规范的脚本文件，.mjs 文件就应运而生。

当存在 index.mjs 和 index.js 这种同名不同后缀的文件时，import './index' 或者 require('./index') 是会优先加载 index.mjs 文件的。

也就是说，优先级 mjs > js


# browser，module 和 main 字段

字段定义
- main : 定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
- module : 定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
- browser : 定义 npm 包在 browser 环境下的入口文件





















