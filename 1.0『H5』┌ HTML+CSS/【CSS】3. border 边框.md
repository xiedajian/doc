

# css border 属性

```
border				复合属性
border-color		边框颜色
border-style		边框样式
border-width		边框宽度
border-top			设置某个边框复合属性
border-top-color	设置某个边框颜色

// CSS3
border-image		设置边框为图片
border-radius		边框的半径（圆角）
box-shadow			阴影效果
```

## border 

该边框属性是复合属性
```
border : border-width || border-style || border-color 
```


## border-image

属性允许您规定用边框的图片
```
border-image: source slice width outset repeat|initial|inherit;
```

border-image 属性是一个简写属性，用于设置以下属性：  
|border-image-source|用于指定要用于绘制边框的图像的位置										|
|border-image-slice	|图像边界向内偏移														|
|border-image-width	|图像边界的宽度														|
|border-image-outset|用于指定在边框外部绘制 border-image-area 的量							|
|border-image-repeat|用于设置图像边界是否应重复（repeat）、拉伸（stretch）或铺满（round）。	|

```
	div
	{
		-webkit-border-image:url(border.png) 30 30 round; /* Safari 5 */
		-o-border-image:url(border.png) 30 30 round; /* Opera */
		border-image:url(border.png) 30 30 round;
	}
```


## border-radius

用于创建圆角
```
	div{
		border-radius:25px;
		border-radius:25px 10px;
		border-radius:25px 10px 15px;
		border-radius:25%;
	}
```


## box-shadow

box-shadow 属性向框添加一个或多个阴影

该属性是由逗号分隔的阴影列表，每个阴影由 2-4 个长度值、可选的颜色值以及可选的 inset 关键词来规定。省略长度的值是 0。

```
	box-shadow: h-shadow v-shadow [blur spread color inset];
```

h-shadow	必需。水平阴影的位置。允许负值。

v-shadow	必需。垂直阴影的位置。允许负值。	

blur		可选。模糊距离。	默认为0；

spread		可选。阴影的尺寸。	

color		可选。阴影的颜色。请参阅 CSS 颜色值。	

inset		可选。将外部阴影 (outset) 改为内部阴影。


实例
```
	div{
		box-shadow: 10px 10px 5px #888888;
	}
```

