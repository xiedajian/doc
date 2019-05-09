
# CSS backgorund背景

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


# CSS 渐变

CSS渐变分成两种，
- linear-gradient()的线性渐变：向下/向上/向左/向右/对角方向
- radial-gradient()的径向渐变：由它们的中心定义


## linear-gradient 线性渐变
```
background: linear-gradient(direction, color-stop1, color-stop2, ...);
```
设置一个方向或角度，和多个颜色

例如
```
  // 方向
  background: -webkit-linear-gradient(left top, red , blue); 
  background: -o-linear-gradient(bottom right, red, blue); 
  background: -moz-linear-gradient(bottom right, red, blue); 
  background: linear-gradient(to bottom right, red , blue); // 从左上角到右下角
  background: linear-gradient(right, red , blue);  // 从左到右
  
  // 角度  逆时针方向计算(0deg从下到上的，90deg从左到右)
  background: linear-gradient(180deg, red, blue);  // 向下
  
  // 颜色还支持透明度 transparent
  background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
  
  // 重复的线性渐变
  background: repeating-linear-gradient(red, yellow 10%, green 20%); // 默认方向向下，0是red，10%是yellow，20%是green，循环
```

## radial-gradient 径向渐变

径向渐变由它的中心定义。
```
background: radial-gradient(center, shape size, start-color, ..., last-color);
```

例如
```
	background: radial-gradient(red, green, blue); // 颜色结点均匀分布（默认情况下）
	background: radial-gradient(red 5%, green 15%, blue 60%); // 不均匀分布

	// 设置形状：  circle 圆形， ellipse 椭圆形。 默认值是 ellipse
	background: radial-gradient(circle, red, yellow, green); // 圆形分布

	// 重复的径向渐变
	background: repeating-radial-gradient(red, yellow 10%, green 15%);
```


## background-color
定义了元素的背景颜色,有几种写法

```
	p {background-color:#6495ed;}
	p {background-color:rgb(255,0,0);}
	p {background-color:rgba(255,0,0,0.5);}
	p {background-color:red;}
```


## background-image

background-image 属性描述了元素的背景图像，默认情况下，背景图像进行平铺重复显示，以覆盖整个元素实体.

```
	body {background-image:url('paper.gif');}
```


## background-repeat

控制背景图片是否重复
[ no-repeat ,repeat-x ,repeat-y ]


## background-attachment

设置背景图像是否固定或者随着页面的其余部分滚动

[ scroll , fixed , inherit，local ]

对于可以滚动的元素（设置为overflow:scroll的元素）,设置background-attachment:scroll 不生效，需设置background-attachment:local，则背景会随内容的滚动而滚动。


## background-position 

属性改变图像在背景中的位置
两个参数，第一个控制水平位置，第二个控制垂直位置
[ top , center , bottom ]

```
	p {background-position:right top;}
	p {background-position:50% 50%;}
	p {background-position:50px 50px;}
```


## background-size

背景图片的尺寸
[ 50px , 50% , cover , contain ]
```
	div{background-size:80px 60px;}
	div{background-size:50% 80%;}
	div{background-size:cover;}		// 图像扩展至足够大，以使背景图像完全覆盖背景区域 
	div{background-size:contain;}	// 把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域
```


## background-origin 

背景图片的定位区域
注释：如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。
[ padding-box , border-box , content-box ]
- padding-box: 背景图像相对于内边距框来定位
- border-box: 背景图像相对于边框盒来定位
- content-box: 背景图像相对于内容框来定位


## background-clip 

背景的绘制区域
注释：如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。
[ padding-box , border-box , content-box ]
- padding-box: 背景被裁剪到内边距框
- border-box: 背景被裁剪到边框盒
- content-box: 背景被裁剪到内容框

