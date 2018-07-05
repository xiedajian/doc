

移动端的布局不同于pc端，首先我们要知道在移动端中，css中的1px并不等于物理上的1px，因为手机屏幕的分辨率已经越来越高，高像素但是屏幕尺寸却没有发生太大变化，那就意味着一个物理像素点实际上塞入了好几个像素。

在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为：设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。css中的px就可以看做是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRatio在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西。

还有一个因素也会引起css中px的变化，那就是用户缩放。例如，当用户把页面放大一倍，那么css中1px所代表的物理像素也会增加一倍；反之把页面缩小一倍，css中1px所代表的物理像素也会减少一倍。

所以在做移动端开发时，为了使移动端的页面在不同的手机上同样的大小来显示，我们可以将页面的宽度固定，然后获取设备的宽度，可以得到我们之前设定的宽度与设备宽度的比例，再使用HTML5新增的viewport来对页面进行缩放，并固定不允许用户再重新缩放。


在看viewport的具体用法之前，我们先搞清楚几个概念。

layout viewport：

layout viewport 是网页的所有内容，他可以全部或者部分展示给用户。
visual viewport

visual viewport 就是当前显示给用户内容的窗口，你可以拖动或者放大缩小网页。



## viewport具体用法为: 

使用该meta标签时，在content中写属性，用逗号隔开

```
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0,user-scalable=0" />

```

- width				设置layout viewport 的宽度，为一个正整数，使用字符串”width-device”表示设备宽度

- initial-scale		设置页面的初始缩放值，为一个数字，可以带小数

- minimum-scale		允许用户的最小缩放值，为一个数字，可以带小数

- maximum-scale		允许用户的最大缩放值，为一个数字，可以带小数

- height			设置layout viewport 的高度，这个属性对我们并不重要，很少使用

- user-scalable		是否允许用户手动进行缩放，值为”no”或”yes”, no 代表不允许，yes代表允许

- target-densitydpi	值可以为一个数值或 high-dpi 、 medium-dpi、 low-dpi、 device-dpi 这几个字符串中的一个
