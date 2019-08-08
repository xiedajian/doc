

## 问题：在 IE 下不能运行，报错

```
SCRIPT1003: 缺少 ')'
app.js (110911,3)
```
缺少 ), 缺少： 等 都是ES6语法在 IE 无法运行导致的


## 原因

vue-cli 3.x 官网关于浏览器兼容的介绍

[文档](https://cli.vuejs.org/zh/guide/browser-compatibility.html)

其中有一段

package.json 文件里的 browserslist 字段 (或一个单独的 .browserslistrc 文件)，指定了项目的目标浏览器的范围。这个值会被 @babel/preset-env 和 Autoprefixer 用来确定需要转译的 JavaScript 特性和需要添加的 CSS 浏览器前缀

一个默认的 Vue CLI 项目会使用 @vue/babel-preset-app，它通过 @babel/preset-env 和 browserslist 配置来决定项目需要的 polyfill。

默认情况下，它会把 useBuiltIns: 'usage' 传递给 @babel/preset-env，这样它会根据源代码中出现的语言特性自动检测需要的 polyfill。这确保了最终包里 polyfill 数量的最小化。

然而，这也意味着*如果其中一个依赖需要特殊的 polyfill，默认情况下 Babel 无法将其检测出来。*


## 解决

如果该依赖基于一个目标环境不支持的 ES 版本撰写: 将其添加到 vue.config.js 中的 transpileDependencies 选项。这会为该依赖同时开启语法语法转换和根据使用情况检测 polyfill。

针对报错的地方找到该第三方依赖包，比如：resize-detector

```
// vue.config.js

  /**
   * @type Array<string | RegExp>
   * @default []
   * @description 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
   */
  transpileDependencies: ["resize-detector"],
```

重启生效