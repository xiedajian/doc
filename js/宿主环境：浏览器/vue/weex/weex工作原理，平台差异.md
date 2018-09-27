
# 工作原理

Weex 表面上是一个客户端技术，但实际上它串联起了从本地开发、云端部署到分发的整个链路。

开发者首先可在本地像编写 web 页面一样编写一个 app 的界面，然后通过命令行工具将之编译成一段 JavaScript 代码，生成一个 Weex 的 JS bundle；

同时，开发者可以将生成的 JS bundle 部署至云端，然后通过网络请求或预下发的方式加载至用户的移动应用客户端；

在移动应用客户端里，Weex SDK 会准备好一个 JavaScript 执行环境，并且在用户打开一个 Weex 页面时在这个执行环境中执行相应的 JS bundle

并将执行过程中产生的各种命令发送到 native 端进行界面渲染、数据存储、网络通信、调用设备功能及用户交互响应等功能

同时，如果用户希望使用浏览器访问这个界面，那么他可以在浏览器里打开一个相同的 web 页面

这个页面和移动应用使用相同的页面源代码，但被编译成适合Web展示的JS Bundle

通过浏览器里的 JavaScript 引擎及 Weex SDK 运行起来的。



# 本地开发环境

Weex 的本地开发环境基于 web 开发体验而设计，web 开发者可以通过自己熟悉的 HTML/CSS/JavaScript 技术和语法实现移动应用的界面。同时 Weex 也对 Vue.js 这一非常优秀的前端框架做了官方的支持。

此外，Weex 的工程设计也是 web 开发者非常熟悉的，首先 web 开发者可以使用自己熟悉的 npm 进行依赖管理；其次 web 开发者在初始化工程、开发、调试、质量控制等各个环节，都可以参考 web 开发已有的最佳实践。

和如今 web 开发的最佳实践一样，Weex 会把一个页面的源代码全部编译打包成一个 JS bundle，在浏览器中，我们需要把这个 JS bundle 作为一段 <script> 载入网页；而在客户端里，我们把这段 JS bundle 通过Weex SDK加载并直接执行



# Weex 环境中没有 DOM,没有 BOM

相关文档： http://weex.apache.org/cn/wiki/platform-difference.html

DOM（Document Object Model），即文档对象模型，是 HTML 和 XML 文档的编程接口，是 Web 中的概念。Weex 的运行环境以原生应用为主，在 Android 和 iOS 环境中渲染出来的是原生的组件，不是 DOM Element。

不支持 DOM 操作
既然原生环境中不支持 Web API，没有 Element 、Event 、File 等对象，详细列表可以参考 Web APIs on MDN。不支持选中元素，如 document.getElementById 、 document.querySelector 等；当然也不支持基于 DOM API 的程序库（如 jQuery）

有限的事件类型
Weex 支持在标签上绑定事件，和在浏览器中的写法一样，但是 Weex 中的事件是由原生组件捕获并触发的，行为和浏览器中有所不同，事件中的属性也和 Web 中有差异。
不区分事件的捕获阶段和冒泡阶段，相当于 DOM 0 级事件

BOM（Browser Object Model），即浏览器对象模型，是浏览器环境为 javascript 提供的接口。Weex 在原生端没有并不基于浏览器运行，不支持浏览器提供的 BOM 接口。

没有 window 、screen 对象

Weex 中并未提供浏览器中的 window 和 screen 对象，不支持使用全局变量。如果是想要获取设备的屏幕或环境信息，可以使用 WXEnvironment 变量。

WXEnvironment
- weexVersion: WeexSDK 的版本。
- appName: 应用的名称。
- appVersion: 应用的版本。
- platform: 运行平台，可能的值是 Web 、Android 、iOS 之一。
- osName: 系统的名称。
- osVersion: 系统版本。
- deviceWidth: 设备宽度。
- deviceHeight: 设备高度

没有 document 对象

没有 history 、location 、navigator 对象


能够调用移动设备原生 API
在 Weex 中能够调用移动设备原生 API，使用方法是通过注册、调用模块来实现。其中有一些模块是 Weex 内置的，如 clipboard 、 navigator 、storage 等