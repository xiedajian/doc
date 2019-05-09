

# css font text属性

```
	font  			复合属性。设置或检索对象中的文本特性
	color			文本颜色  'red' | #000000 | rgb(255,255,254) | rgba(255,255,255,0.5) 
	font-family		文本的字体
	font-size		字体尺寸大小
	font-style		字体样式,  normal正常的字体 | 斜体italic | oblique倾斜的字体
	font-weight		文本字体的粗细 100-900
	font-variant	英文字母是否为小型的大写字母  normal | small-caps 
	
	text-align			文本对齐方式		left|right|center|justify|inherit
	text-justify		当 text-align被设置为 justify 时的对齐方式		auto , none , inter-word , inter-ideograph , inter-cluster , distribute , kashida
	text-decoration		文本的装饰   underline下划线 |overline顶划线| line-through删除线 | blink闪烁的文本
	text-shadow			文字阴影及模糊效果
	text-indent			缩进， 如：20px
	text-transform		字母大小写   none | capitalize开头字母大写 | uppercase大写 | lowercase小写
	text-overflow		属性规定当文本溢出包含元素时发生的事情
	line-height			行高。文字的上下行间距,即字体最底端与字体内部顶端之间的距离
	letter-spacing		字母间距  如：8px
	white-space			如何处理元素内的空白  normal|pre|nowrap|pre-wrap|pre-line|inherit
	word-spacing		单词间的空白 ，如：10px;
	word-wrap			允许长单词换行到下一行： normal|break-word;
	vertical-align		垂直对其方式		baseline默认|sub | super | top | text-top | middle | bottom | text-bottom | length | %
	direction			文本流的方向		ltr左到右 | rtl右到左
	
	// CSS3
	@font-face			定义字体
```


## font-family

字体设置, 多个字体名称，如果浏览器不支持第一个字体，则会尝试下一个。
```
font-family:"设置字体名称";
```

```
p{ font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;}
```

附中文字体的英文名称：
宋体 SimSun
黑体 SimHei
微软雅黑 Microsoft YaHei
微软正黑体 Microsoft JhengHei
新宋体 NSimSun
新细明体 PMingLiU
细明体 MingLiU
标楷体 DFKai-SB
仿宋 FangSong
楷体 KaiTi
仿宋_GB2312 FangSong_GB2312
楷体_GB2312 KaiTi_GB2312


##  @font-face	

在 CSS3 之前 ，web 设计师必须使用已在用户计算机上安装好的字体。

@font-face 可以让前端工程师随心所欲的使用各种字体，字体文件存放到 web 服务器上，它会在需要时被自动下载到用户的计算机上。

```
@font-face {
    font-family: <YourWebFontName>;
    src: <source> [<format>][,<source> [<format>]]*;
    [font-weight: <weight>];
    [font-style: <style>];
}
```

YourWebFontName:此值指的就是你自定义的字体名称，
source:此值指的是你自定义的字体的存放路径，可以是相对路径也可以是绝路径；
format：此值指的是你自定义的字体的格式，主要用来帮助浏览器识别，其值主要有以下几种类型：truetype,opentype,truetype-aat,embedded-opentype,avg等；
weight和style: weight定义字体是否为粗体，style主要定义字体样式，如斜体

实例1
```
<style> 
	@font-face{
		font-family: myFirstFont;
		src: url('Sansation_Light.ttf'),
			 url('Sansation_Light.eot'); /* IE9+ */
	}
	div{font-family:myFirstFont;}
</style>
```

自定义字体格式说明：
.ttf(TrueType格式)：是Windows和Mac的最常见的字体，是一种RAW格式
.otf字体：被认为是一种原始的字体格式，其内置在TureType的基础上
.woff (Web Open Font格式): 针对网页进行特殊优化，Web字体中最佳格式
.eot(Embedded Open Type格式)：字体是IE专用字体



## font-variant

英文字母是否为小型的大写字母 
 
normal : 正常的字体
small-caps : 小型的大写字母字体


## text-transform

字母大小写

none : 　无转换发生
capitalize : 　将每个单词的第一个字母转换成大写，其余无转换发生
uppercase : 　转换成大写
lowercase : 　转换成小写


## vertical-align	

设置元素的垂直对齐方式

|baseline	|默认。元素放置在父元素的基线上。								|
|sub		|垂直对齐文本的下标。											|
|super		|垂直对齐文本的上标												|
|top		|把元素的顶端与行中最高元素的顶端对齐							|
|text-top	|把元素的顶端与父元素字体的顶端对齐								|
|middle		|把此元素放置在父元素的中部。									|
|bottom		|把元素的顶端与行中最低的元素的顶端对齐。						|
|text-bottom|把元素的底端与父元素字体的底端对齐。							|
|length		|																|
|%			|使用 "line-height" 属性的百分比值来排列此元素。允许使用负值。	|
|inherit	|规定应该从父元素继承 vertical-align 属性的值。					|



## text-shadow

文本阴影
```
text-shadow: -1px -1px 1px rgba(0,0,0,0.9);  /*X轴位移，Y轴位移，阴影模糊半径，颜色*/
```

## text-overflow

属性规定当文本溢出包含元素时发生的事情
- clip 		修剪文本,默认
- ellipsis 	显示省略符号来代表被修剪的文本
- string 	使用给定的字符串来代表被修剪的文本

