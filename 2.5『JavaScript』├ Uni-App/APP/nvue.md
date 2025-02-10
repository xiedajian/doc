[nvue](https://uniapp.dcloud.io/tutorial/nvue-outline.html)
[nvue 内置组件](https://uniapp.dcloud.io/component/barcode.html)
[nvue 样式](https://uniapp.dcloud.io/tutorial/nvue-css.html)


# nvue

在 App 端，如果使用 vue 页面，则使用 webview 渲染；如果使用 nvue 页面(native vue 的缩写)，则使用原生渲染。

uni-app App 端内置了一个基于 weex 改进的原生渲染引擎，提供了原生渲染能力。

一个 App 中可以同时使用两种页面，比如首页使用 nvue，二级页使用 vue 页面，hello uni-app 示例就是如此。

虽然 nvue 也可以多端编译，输出 H5 和小程序，但 nvue 的 css 写法受限，所以如果你不开发 App，那么不需要使用 nvue。


nvue 的组件和 API 写法与 vue 页面一致，其内置组件还比 vue 页面内置组件增加了更多

如果你是 web 前端，不熟悉原生排版，那么建议你仍然以使用 vue 页面为主，在 App 端某些 vue 页面表现不佳的场景下使用 nvue 作为强化补充。

如深度使用map组件，建议使用 nvue。除了层级问题，App 端 nvue 文件的 map 功能更完善，和小程序拉齐度更高，多端一致性更好。

如深度使用video，建议使用 nvue。

对 App 启动速度要求极致化。App 端如果首页使用 nvue 且在 manifest 里配置 fast 模式，那么 App 的启动速度可以控制在 1 秒左右。而使用 vue 页面的话，App 的启动速度一般是 3 秒起，取决于你的代码性能和体积。


# 快速上手

在 HBuilderX 的 uni-app 项目中，新建页面，

不管是 vue 页面还是 nvue 页面，都需要在pages.json中注册。

如果一个页面路由下同时有 vue 页面和 nvue 页面，即出现同名的 vue 和 nvue 文件。那么在 App 端，会仅使用 nvue 页面，同名的 vue 文件将不会被编译到 App 端。而在非 App 端，会优先使用 vue 页面。

开发 nvue 页面：
template： 模板写法、数据绑定同 vue。
style：由于采用原生渲染，并非所有浏览器的 css 均支持，布局模型只支持 flex 布局。[nvue 样式](https://uniapp.dcloud.io/tutorial/nvue-css.html)
script：写法同 vue


# nvue开发与vue开发的常见区别

[](https://uniapp.dcloud.io/tutorial/nvue-outline.html#nvue%E5%BC%80%E5%8F%91%E4%B8%8Evue%E5%BC%80%E5%8F%91%E7%9A%84%E5%B8%B8%E8%A7%81%E5%8C%BA%E5%88%AB)

nvue 页面控制显隐只可以使用v-if不可以使用v-show
nvue 页面只能使用flex布局，不支持其他布局方式。nvue 页面的布局排列方向默认为竖排（column）
文字内容，必须、只能在<text>组件下。
只有text标签可以设置字体大小，字体颜色。
布局不能使用百分比、没有媒体查询。
支持的css有限
不支持背景图。
class 进行绑定时只支持数组语法。
在 App.vue 中定义的全局js变量不会在 nvue 页面生效。globalData和vuex是生效的。
App.vue 中定义的全局css，对nvue和vue页面同时生效。如果全局css中有些css在nvue下不支持，编译时控制台会报警，建议把这些不支持的css包裹在条件编译 (opens new window)里，APP-PLUS-NVUE
不能在 style 中引入字体文件  [加载自定义字体](https://uniapp.dcloud.io/tutorial/nvue-api.html#dom)




# 关于 App 的调试debug

[](https://uniapp.dcloud.io/tutorial/snippet.html#app-debug)

常规开发里，在HBuilderX的运行菜单里运行App，手机端的错误或console.log日志信息会直接打印到控制台。

如果需要更多功能，比如审查元素、打断点debug，则需要启动调试模式。自 HBuilderX 2.0.3+ 版本起开始支持 App 端的调试。

打开调试窗口：运行 --> 运行到手机或模拟器 --> 选择设备，项目启动后，在下方的控制台选择 debug 图标。