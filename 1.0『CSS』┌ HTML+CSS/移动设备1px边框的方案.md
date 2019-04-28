
原文：https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html



# 1px 边框问题的原因与解决

问题现象： 1px的边框在移动端会很粗

问题出现原因： 手机 dpr 影响，1px的在 dpr2 的手机上实际占的是 2px 的宽度

解决方案：
  原理：在需要 1px 的元素上定位一个伪类，通过缩放伪类的 border 来达到 1px 的效果

```less
//  定义不同的 dpi 移动设备上的 1px 边框
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5){
  .border-1px{
	position: relative;
    &::after{
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #666;
		content: ' ';
        -webkit-transform: scaleY(0.7);
        transform: scaleY(0.7);
    }
  }
}
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){
  .border-1px{
	position: relative;
    &::after{
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #666;
		content: ' ';
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
  }
}
```










# 其他基本概念

## 视窗 viewport

简单的理解，viewport是严格等于浏览器的窗口。在桌面浏览器中，viewport就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。

移动端的viewport太窄，为了能更好为CSS布局服务，所以提供了两个viewport:虚拟的viewportvisualviewport和布局的viewportlayoutviewport。

George Cummins在Stack Overflow上对这两个基本概念做了详细的解释。

而事实上viewport是一个很复杂的知识点，上面的简单描述可能无法帮助你更好的理解viewport，而你又想对此做更深的了解，可以阅读PPK写的相关教程。


## 物理像素(physical pixel)
物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

## 设备独立像素(density-independent pixel)
设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

## CSS像素
CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

## 屏幕密度
屏幕密度是指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。

## 设备像素比(device pixel ratio)

设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

设备像素比 ＝ 物理像素 / 设备独立像素（css像素）

在JavaScript中，可以通过window.devicePixelRatio获取到当前设备的dpr。而在CSS中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。




众所周知，iPhone6的设备宽度和高度为375pt * 667pt,可以理解为设备的独立像素；而其dpr为2，根据上面公式，我们可以很轻松得知其物理像素为750pt * 1334pt。

如下图所示，某元素的CSS样式：

width: 2px;
height: 2px；
在不同的屏幕上，CSS像素所呈现的物理尺寸是一致的，而不同的是CSS像素所对应的物理像素具数是不一致的。在普通屏幕下1个CSS像素对应1个物理像素，而在Retina屏幕下，1个CSS像素对应的却是4个物理像素。

## meta标签
<meta>标签有很多种，而这里要着重说的是viewport的meta标签，其主要用来告诉浏览器如何规范的渲染Web页面，而你则需要告诉它视窗有多大。在开发移动端页面，我们需要设置meta标签如下：

```
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```
代码以显示网页的屏幕宽度定义了视窗宽度。网页的比例和最大比例被设置为100%。


