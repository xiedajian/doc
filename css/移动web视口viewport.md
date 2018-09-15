
# 移动web

移动端的布局不同于pc端，首先我们要知道在移动端中，css中的1px并不等于物理上的1px，因为手机屏幕的分辨率已经越来越高，高像素但是屏幕尺寸却没有发生太大变化，那就意味着一个物理像素点实际上塞入了好几个像素。

在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。

css中的px就可以看做是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRatio在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西。

还有一个因素也会引起css中px的变化，那就是用户缩放。例如，当用户把页面放大一倍，那么css中1px所代表的物理像素也会增加一倍；反之把页面缩小一倍，css中1px所代表的物理像素也会减少一倍。

所以在做移动端开发时，为了使移动端的页面在不同的手机上同样的大小来显示，我们可以将页面的宽度固定，然后获取设备的宽度，可以得到我们之前设定的宽度与设备宽度的比例，再使用HTML5新增的viewport来对页面进行缩放，并固定不允许用户再重新缩放。



# viewport 视口

视口分为布局视口(layout viewport)、视觉视口(visual viewport)和理想视口(ideal viewport)

在看viewport的具体用法之前，我们先搞清楚几个概念。

## 布局视口 layout viewport：

把宽度为1000px的网站，放到宽度为375px的手机浏览器中查看，基本看不清楚网站的内容。为了解决这个问题，就引入了布局视口的概念。

为了容纳桌面端设计的网站，移动设备默认的布局视口远大于屏幕的宽度，具体是多宽，这个是由设备决定的

布局视口的尺寸可以通过document.documentElement.clientWidth获取


## 视觉视口(visual viewport)

视觉视口是用户正在看到的网站的区域，视觉视口的大小不是一成不变的，如果用户缩小网站，它看到的网站区域将变大，视觉视口也就变大了。如果用户放大网站，它看到的网站区域将变小，视觉视口也就变小了


## 理想视口(ideal viewport)

默认情况下，手机浏览器的布局视口宽度为980到1024，很显然这对手机设备来说并不理想，因此苹果最先引入了理想视口的概念

理想视口指的是把布局视口的宽度设置为与理想视口宽度一致，可以通过meta标签设置理想视口

```
<!-- 布局视口的宽度应该与理想视口的宽度一致 -->
<meta name="viewport" content="width=device-width">
```

一般的， 只有当网站是为手机准备的时候才应该使用理想视口



# meta视口标签

meta视口标签存在的主要目的是让布局视口的尺寸和理想视口的尺寸匹配

meta视口标签应该被放在HTML文档的<head>中，格式如下:

```
<meta name="viewport" content="name=value,name=value">
```

meta标签的每一个名/值对都是一个给浏览器发号命令的指令，它们被逗号分隔，共有6个

```
1、width:设置布局视口的宽度为特定的值

2、initial-scale:设置页面的初始缩放程度和布局视口的宽度

3、minimum-scale:设置了最小缩放程度(用户可缩小的程度)

4、maximum-scale:设置了最大缩放程度(用户可放大的程度)

5、user-scalable:是否阻止用户进行缩放

6、height:设置布局视口的高度(未被实现)
```

width通常取值device-width，表示和理想视口一致
initial-scale通常取值1.0，表示不缩放
minimum-scale和maximum-scale通常取值1.0
user-scalable通常取值no，表示禁止缩放

常用meta视口设置

```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```




