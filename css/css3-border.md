

# css3 border

- border-radius

- box-shadow

- border-image



## border-radius

用于创建圆角

```
	div
		{
		border:2px solid;
		border-radius:25px;
		-moz-border-radius:25px; /* Old Firefox */
	}

```


## box-shadow

css3

box-shadow 属性向框添加一个或多个阴影

该属性是由逗号分隔的阴影列表，每个阴影由 2-4 个长度值、可选的颜色值以及可选的 inset 关键词来规定。省略长度的值是 0。


### 语法

```
	box-shadow: h-shadow v-shadow [blur spread color inset];

```

h-shadow	必需。水平阴影的位置。允许负值。

v-shadow	必需。垂直阴影的位置。允许负值。	

blur		可选。模糊距离。	

spread		可选。阴影的尺寸。	

color		可选。阴影的颜色。请参阅 CSS 颜色值。	

inset		可选。将外部阴影 (outset) 改为内部阴影。



### 实例

```
	div
	{
		box-shadow: 10px 10px 5px #888888;
	}

```




## border-imaage


属性允许您规定用于边框的图片


```
	div
	{
		-webkit-border-image:url(border.png) 30 30 round; /* Safari 5 */
		-o-border-image:url(border.png) 30 30 round; /* Opera */
		border-image:url(border.png) 30 30 round;
	}

```

border-image 属性是一个简写属性，用于设置以下属性：

border-image-source		用在边框的图片的路径。	
border-image-slice		图片边框向内偏移。	
border-image-width		图片边框的宽度。	
border-image-outset		边框图像区域超出边框的量。	
border-image-repeat		图像边框是否应平铺(repeat)、铺满(round)或拉伸(stretch)。

如果省略值，会设置其默认值。
