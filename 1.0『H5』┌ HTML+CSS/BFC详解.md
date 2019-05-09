


# CSS中的BFC详解

# BFC的定义

Block Formatting Context，中文直译为块级格式上下文。

BFC就是一种布局方式，在这种布局方式下，盒子们自所在的containing block顶部一个接一个垂直排列，水平方向上撑满整个宽度（除非内部盒子自己建立了新的BFC）。

两个相邻的BFC之间的距离由margin决定。

在同一个BFC内部，两个垂直方向相邻的块级元素的margin会发生“塌陷”。


通俗一点，可以把BFC理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。


## 如何创建BFC

- float属性不为none 
- position为absolute或fixed
- display为inline-block、table-cell、table-caption 
- overflow不为visible(可以是hidden、scroll、auto)
	  

## BFC的特性

1.内部的Box会在垂直方向上一个接一个的放置。
2.垂直方向上的距离由margin决定
3.bfc的区域不会与float的元素区域重叠。
4.计算bfc的高度时，浮动元素也参与计算
5.bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

## BFC的作用

1. 清除内部浮动
我们在布局时经常会遇到这个问题：对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。
解决这个问题，只需要把把父元素变成一个BFC就行了。常用的办法是给父元素设置overflow:hidden。

2. 垂直margin合并
在CSS当中，相邻的两个盒子的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

3. 创建自适应两栏布局
在很多网站中，我们常看到这样的一种结构，左图片+右文字的两栏结构。
```
	.box {
        width:300px;
        border: 1px solid #000;
    }
    .img {
        float: left;
    }
    .info {
        background: #f1f1f1;
        color: #222;
    }

<div class="box">
	<img src="03.jpg" alt="" class="img">
	<p class="info">信息信息信息信息信息信息</p>
</div>
```
文字多了之后，会环绕图片
此时我们可以为P元素的内容建立一个BFC，让其内容消除对外界浮动元素的影响。给文字加上overflow:hidden
两栏布局的结构依然没有改变，如此就实现了两栏自适应布局。
```
    .info {
        background: #f1f1f1;
        color: #222;
		overflow:hidden;
    }
```


4.不被浮动元素覆盖:常见的两栏布局为例
我们知道浮动元素会脱离文档流，然后浮盖在文档流元素上。利用BFC解决侵占浮动元素的问题
左边固定宽度，右边不设宽，因此右边的宽度自适应，随浏览器窗口大小的变化而变化。
```
<div class="column"></div>
<div class="column"></div>
.column:nth-of-type(1) {
	float: left;
	width: 200px;
	height: 300px;
	margin-right: 10px;
	background-color: red;
}

.column:nth-of-type(2) {
	overflow: hidden;/*创建bfc */
	height: 300px;
	background-color: purple;
}
```