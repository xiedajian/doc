

# vue devtools

在本地测试开发 `vue` 组件的时候非常顺畅

一上生产环境,客户说数据展示错误,样式不对...

但是你在本地测试了几次,都难以复现

自然就想到了 `vue devtools`

但是新问题又来了,线上环境我们如何开启 `vue devtools` 呢?





## 案例演示

让我们以 `element-ui` 官网为例

先看下此时的 `chrome devtools` 是没有 `Vue` 的选项卡的

![图片](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibtpIU093Rdg4mMHrXqhRm7l6AcjjwycZQ1YL6IiajCicLCDNKxVk4E11yL19icTx0EBHdOGPeqRONvMQ/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)







## 一段神奇的代码

其实很简单,我们只需要打开控制台,运行一下以下代码



```
var Vue, walker, node;
walker = document.createTreeWalker(document.body,1);
while ((node = walker.nextNode())) {
  if (node.__vue__) {
    Vue = node.__vue__.$options._base;
    if (!Vue.config.devtools) {
      Vue.config.devtools = true;
      if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", Vue);
        console.log("==> vue devtools now is enabled");
      }
    }
    break;
  }
}
```





![图片](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibtpIU093Rdg4mMHrXqhRm7lsyib0XwmibAAZUbAX0C317hlDLXUtUFhicwn3Nm3PqR8iauNEaClr3uPdA/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

显示 `vue devtools now is enabled`

证明我们已经成功开启了 `vue devtools`



## 功能验证

然后再重启一下 `chrome devtool` 看下效果

![图片](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibtpIU093Rdg4mMHrXqhRm7lrCYh6zBmOF2focXSMzdTuWLLAeGAjJGnmNSI4cA033jm9TrmFvyFrA/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

我们会发现此时多了一个 `Vue` 选项卡,功能也和我们本地调试一样使用

对于遇到 `vue` 线上问题调试,真的非常好用!





# vue3

最近无意间又看到了这段代码,适配 `vue3` 亲测 `vben` 能用 https://vben.vvbin.cn/#/login?redirect=/dashboard

![图片](https://mmbiz.qpic.cn/mmbiz_png/lCQLg02gtibtpIU093Rdg4mMHrXqhRm7lNpMewbIdY1szfKYyYnaR8aapZmic937rJMeQM32nQAnuw1yRhWBQTRw/640?wx_fmt=png&from=appmsg&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

```
const el = document.querySelector('#app')
const  vm = el.__vue_app__

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
    app: vm,
    version: vm.version,
    types: {
      Comment: Symbol("Comment"),
      Fragment: Symbol("Fragment"),
      Static: Symbol("Static"),
      Text: Symbol("Text"),
    },
})
if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", vm);
    console.log("==> vue devtools now is enabled");
}
```



