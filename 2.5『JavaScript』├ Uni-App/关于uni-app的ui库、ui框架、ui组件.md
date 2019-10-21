

[文档链接](https://ask.dcloud.net.cn/article/35489)

[uni-ui](https://uniapp.dcloud.io/component/README?id=uniui)



# 跨端的样式库

首先需要一个认知，传统vue的库，只是for web的，不能跨6端。

而微信小程序的库，虽然可以跨到app，但不能跨到h5和百度支付宝小程序。

比如element ui只能用于h5，而vant ui有h5版和小程序版，h5版只能用于h5，

而小程序版只能用于微信和app（uni-app在app侧支持使用小程序ui组件）。

想要6端通用的ui框架，需要基于vue的无dom操作的库。最好还是纯flex布局。

虽然很多传统vue库不跨端，但这并不意味着uni-app的生态缺乏，事实相反。

具体如下：

- uni-app内置组件是最常用的，与微信内置组件相同。https://uniapp.dcloud.io/component/README
- 扩展组件是uni ui，在组件的文档里有专门的扩展组件分类。https://uniapp.dcloud.io/component/README?id=uniui
- 扩展组件支持单个从插件市场下载，也支持npm整体引入uni ui，见http://ext.dcloud.net.cn/plugin?id=55
- 更多三方ui库和模块，见插件市场，https://ext.dcloud.net.cn。玲琅满目，除了组件形式，还有很多页面模板和项目模板拿来即用。里面比较成套的原作者直接维护的ui库包括colorUI css库（颜值很高）、ThorUI组件库、graceUI商业支持库。
- 其他基于vue的无dom库也支持，zanui-mpvue、iview-mpvue。但注意这2个不是原作者维护，也不是纯flex布局。
- 如果你确定只开发微信小程序和App，也可以使用微信的自定义组件ui，这里是vant weapp版的集成示例http://ext.dcloud.net.cn/plugin?id=302。其他如iview weapp同理。App端因为是一个增强版的小程序引擎，可以运行微信小程序的ui库，但其他端运行不了只为微信做的UI库。
- 另外如果你在App侧使用nvue，也支持weex ui，以及graceUI weex版。


最后，请开发者务必牢记基础组件的作用，基础组件的性能是高于扩展组件的。

这和web开发不一样，web开发基本上不用基础组件，都是找一个ui库，全部组件都包含。

但uni-app体系不是这样，uni-ui库全部都是扩展组件，不含基础组件。

我们的建议是：开发时首先用基础组件，基础组件不满足的地方，再通过扩展组件补充。

为了性能考虑，不要把整个项目全部都构建在某个ui框架下。



# 扩展组件（uni-ui）：

[uni-ui](https://uniapp.dcloud.io/component/README?id=uniui)

uni-ui是DCloud提供的一个跨端ui库，它是基于vue组件的、flex布局的、无dom的跨全端ui框架。

注意与web开发不同，uni-ui不包括基础组件，它是基础组件的补充。

web开发中有的开发者习惯用一个ui库完成所有开发，但在uni-app体系中，推荐开发者首先使用性能更高的基础组件，然后按需引入必要的扩展组件。

uni-ui支持npm安装和zip下载安装2种方式。

npm安装参考：https://ext.dcloud.net.cn/plugin?id=55

下表为uni-ui的扩展组件清单，点击每个组件可单独安装。


