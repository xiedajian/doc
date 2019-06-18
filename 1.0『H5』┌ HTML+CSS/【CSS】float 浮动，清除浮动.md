


# float

Float浮动用于设置对象靠左与靠右浮动样式

float : none | left |right




# 清除浮动的方法总结


### 1.父级div定义 伪类:after 和 zoom

```
<style type="text/css"> 
	.clearfix:after {
		display: block;
		content: ".";
		height: 0;
		line-height: 0;
		clear: both;
		visibility: hidden;
	 }
	.clearfix { *zoom:1; } 
</style> 
<div id="box" class="clearfloat">
	<div id="div1">
		1
	</div>
	<div id="div2">
		2
	</div>
</div>
```

### 2.内墙法:在尾部添加空的div 清除clear:both
```
<style type="text/css"> 
   .div1{background:#000080;border:1px solid red}
   .div2{background:#800080;border:1px solid red;height:100px;margin-top:10px}
   
   .left{float:left;width:20%;height:200px;background:#DDD}
   .right{float:right;width:30%;height:80px;background:#DDD}
   
   /*清除浮动代码*/
   .clearfloat{clear:both}
</style> 
<div class="div1"> 
	<div class="left">Left</div> 
	<div class="right">Right</div>
	<div class="clearfloat"></div>
</div>
<div class="div2">
    div2
</div>
```


### 3.外墙法：在两个盒子中间添加一个额外的块级元素，并给这个添加的元素设置clear：both属性
```
<style type="text/css"> 
   .clearfloat{clear:both}
</style> 
<div id="div1">
	1
</div>
<div id="clearfloat"></div>
<div id="div2">
	2
</div>
```