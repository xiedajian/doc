

# 1.《使用Flexible实现手淘H5页面的终端适配》

大漠老师在15年发布的利用rem来做适配的方案：

[原文](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
[转载文章](https://blog.csdn.net/qq_16664643/article/details/52267562)

各种终端设备，设计师和前端开发之间又应该采用什么协作模式？

而整个手淘设计师和前端开发的适配协作基本思路是：
- 选择一种尺寸作为设计和开发基准
- 定义一套适配规则，自动适配剩下的两种尺寸(其实不仅这两种，你懂的)
- 特殊适配效果给出设计效果

根据上面所说的，设计师给我们的设计图是一个750px * 1600px的页面：著作权归作者所有。

[flexible方案](https://github.com/amfe/lib-flexible)

flexible实际上就是能过JS来动态改写meta标签，代码类似这样：
```
var metaEl = doc.createElement('meta');
var scale = isRetina ? 0.5:1;
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
if (docEl.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl);
} else {
    var wrap = doc.createElement('div');
    wrap.appendChild(metaEl);
    documen.write(wrap.innerHTML);
}
```



# 2. 《再聊移动端页面的适配》

大漠老师在17年发布的利用vm来做适配的方案：使用vw来替代以前Flexible中的rem缩放方案

[原文](https://www.w3cplus.com/css/vw-for-layout.html)
[转载文章](https://blog.csdn.net/qq_21729177/article/details/79466951)

以前的Flexible方案是通过JavaScript来模拟vw的特性，那么到今天为止，vw已经得到了众多浏览器的支持，
也就是说，可以直接考虑将vw单位运用于我们的适配布局中。

vw是基于Viewport视窗的长度单位，这里的视窗（Viewport）指的就是浏览器可视化的区域，
而这个可视区域是window.innerWidth/window.innerHeight的大小
```
屏幕高度：screen.height {
	屏幕可用高度:screen.avaiHeight{
		浏览器高度:window.outerHeight{
			工具栏高度
			页面可用高度:window.innerHeight{
				Body展示高度:body.clientHeight
				滚动条:window.innerHeight-body.clientHeight
			}
		}
	}
	任务栏高度:screen.height-screen.avaiHeight
}
```

CSS3 中和Viewport相关的单位有四个，分别为vw、vh、vmin和vmax

vw：是Viewport's width的简写,1vw等于window.innerWidth的1%
vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%
vmin：vmin的值是当前vw和vh中较小的值
vmax：vmax的值是当前vw和vh中较大的值

所以在这个方案中大胆的使用vw来替代以前Flexible中的rem缩放方案。
先来回归到我们的实际业务中来。目前出视觉设计稿，我们都是使用750px宽度的，
从上面的原理来看，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。
看到这里，很多同学开始感到崩溃，又要计算，能不能简便一点，能不能再简单一点，
其实是可以的，我们可以使用PostCSS的插件postcss-px-to-viewport，让我们可以直接在代码中写px


解决1px方案:
解决1px的方案。使用PostCSS插件，可以使用postcss-write-svg。
使用postcss-write-svg你可以通过border-image或者background-image两种方式来处理。比如：
```
@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}

```



# 3.《如何在Vue项目中使用vw实现移动端适配》


[原文](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
[转载文章](https://www.jianshu.com/p/1f1b23f8348f)

怎么实现vw的兼容问题。为了解决这个兼容问题，我将借助Vue官网提供的构建工程以及一些PostCSS插件来完成。在继续后面的内容之前，需要准备一些东西：著作权归作者所有。

```
NodeJs
NPM
Webpack
Vue-cli
postcss-import
postcss-url
postcss-aspect-ratio-mini
postcss-cssnext
autoprefixer
postcss-px-to-viewport
postcss-write-svg
cssnano
```

其中：
postcss-cssnext 可以使用css的新语法
autoprefixer 处理浏览器兼容前缀
postcss-px-to-viewport 单位转化，px=>vm
postcss-write-svg 实现1px边框




















