

# weex

> Weex 是一个使用 Web 开发体验来开发高性能原生应用的框架。

可以使用 JavaScript 和现代流行的前端框架来开发移动应用

Weex 的结构是解耦的，渲染引擎与语法层是分开的，也不依赖任何特定的前端框架，目前主要支持 Vue.js 和 Rax 这两个前端框架。

尽管 Weex 多端都是用的同一份代码，但是仍然支持针对特定的平台开发功能。


# 创建项目

> Node.js 和 npm 的基本知识
> weex-toolkit 的脚手架工具来辅助开发和调试

```
npm install weex-toolkit -g         // weex -v 查看当前weex版本

weex create weex-app

cd weex-app

npm install

npm start
```

工具会启动一个本地的 web 服务，监听 8081 端口。可以打开 http://localhost:8081 查看页面在 Web 下的渲染效果

源代码在 src/ 目录中，你可以像一个普通的 Vue.js 项目一样来开发

还可以打开 http://localhost:8081/preview.html 开启一个预览页面，它会把 web 端的页面放在一个 iframe 中渲染，而且在右侧生成一个二维码。

用 Weex playground app 扫描这个二维码可以看到页面在手机上渲染的真实效果


# 编译和运行

> 默认情况下 weex create 命令并不初始化 iOS 和 Android 项目，你可以通过执行 weex platform add 来添加特定平台的项目。
> 开发环境：对于 iOS，安装并且配置好 Xcode。对于 Android，安装并且配置好 Android Studio。

```
weex platform add ios
weex platform add android

weex run ios                // 运行android/ios/web项目
weex run android
weex run web

weex debug                  // 启动一个调试服务，并且在 Chrome 中打开调试页面

```

> weex-toolkit工具文档：http://weex.apache.org/cn/tools/toolkit.html



# 开发

weex-toolkit 已经为我们生成了标准项目结构

在 package.json 中，已经配置好了几个常用的 npm script，分别是：

```
build: 源码打包，生成 JS Bundle
dev: webpack watch 模式，方便开发
serve: 开启HotReload服务器，代码改动的将会实时同步到网页
```





# 组件

Weex 在 iOS 和 Android 上都实现了一个渲染引擎，并提供了一套基础的内置组件。基于这些组件，你可以用 js 封装更多的上层组件。

尽管 Weex 中的组件看起来很像 HTML 标签，但你无法使用所有 HTML 标签，只能使用内置组件和自定义组件。

在框架内部，Weex 使用的是原生系统提供的 Widget 来渲染的。尽管 Weex 强调每个跨平台的一致性，但我们仍然接受平台本身的行为和 UI 差异。

除了内置组件以外，Weex 也支持你扩展更多原生组件，但是你需要在每个平台上实现它们，并保持其行为一致。




# 原生模块

Weex 推荐将它们包装到模块中，然后使用 weex.requireModule('xxx') 来引入。 

这是使用 javascript 调用原生功能的一种方法，如网络，存储，剪贴板和页面导航等功能。


## 三端差异

尽管 Weex 多端都是用的同一份代码，但是仍然支持针对特定的平台开发功能。

Weex 提供了 weex.config.env 和 WXEnvironment（它们是相同的）来获得当前的运行时环境。

可以用 WXEnvironment.platform 来确定代码运行在哪个平台上。

WXEnvironment 还包含其他环境信息，如 osVersion 和 deviceModel

更多可以参考：http://weex.apache.org/cn/references/weex-variable.html#weex-huan-jing-bian-liang

