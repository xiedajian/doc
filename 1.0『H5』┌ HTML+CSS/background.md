
## CSS 背景
在CSS2.1里，background属性的简写方式包含五种属性值，从CSS3开始，又增加了3个新的属性值，加起来一共8个。

```
	// CSS2.1
	background-color 		使用的背景颜色。
	background-image 		使用的背景图像。
	background-repeat 		如何重复背景图像。
	background-attachment 	背景图像是否固定或者随着页面的其余部分滚动。
	background-position 	背景图像的位置。

	// CSS3
	background-size 	背景图片的尺寸。
	background-origin 	背景图片的定位区域,相对于什么位置来定位。
	background-clip 	背景的绘制区域,相对于什么位置来定位。


```
简写形式
```
background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];

```
按上边的顺序，无需全写，需要注意的是里面的/，/可以在支持这种写法的浏览器里在background-position后面接着写background-size。

```
	.example {
	  background: aquamarine 
	              url(img.png) 
	              no-repeat 
	              scroll 
	              center center / 50% 
	              content-box content-box;
	}

```

### background-color
定义了元素的背景颜色,有几种写法

```
	p {background-color:#6495ed;}
	p {background-color:rgb(255,0,0);}
	p {background-color:rgba(255,0,0,0.5);}
	p {background-color:red;}

```


### background-image
background-image 属性描述了元素的背景图像，默认情况下，背景图像进行平铺重复显示，以覆盖整个元素实体.

```
	body {background-image:url('paper.gif');}

```


### background-repeat
控制背景图片是否重复
[ no-repeat ,repeat-x ,repeat-y ]


### background-attachment

设置背景图像是否固定或者随着页面的其余部分滚动

[ scroll , fixed , inherit ]


### background-position 
属性改变图像在背景中的位置
两个参数，第一个控制水平位置，第二个控制垂直位置
[ top , center , bottom ]

```
	p {background-position:right top;}
	p {background-position:50% 50%;}
	p {background-position:50px 50px;}
```

### background-size
背景图片的尺寸
[ 50px , 50% , cover , contain ]
```
	div{background-size:80px 60px;}
	div{background-size:50% 80%;}
	div{background-size:cover;}		// 图像扩展至足够大，以使背景图像完全覆盖背景区域 
	div{background-size:contain;}	// 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域
```



### background-origin 
背景图片的定位区域
注释：如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。
[ padding-box , border-box , content-box ]
- padding-box: 背景图像相对于内边距框来定位
- border-box: 背景图像相对于边框盒来定位
- content-box: 背景图像相对于内容框来定位


### background-clip 
背景的绘制区域
注释：如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。
[ padding-box , border-box , content-box ]
- padding-box: 背景被裁剪到内边距框
- border-box: 背景被裁剪到边框盒
- content-box: 背景被裁剪到内容框





