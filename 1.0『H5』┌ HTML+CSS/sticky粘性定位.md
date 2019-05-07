
# sticky

sticky 英文字面意思是粘，粘贴，所以姑且称之为粘性定位。

position的含义是指定位类型，取值类型可以有：static、relative、absolute、fixed、inherit和sticky，

这里sticky是CSS3新发布的一个属性

这是一个结合了 position:relative 和 position:fixed 两种定位功能于一体的特殊定位，适用于一些特殊场景。

position设置了sticky的元素，在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置是top、left等属性无效），当该元素的位置将要移出偏移范围时，定位又会变成fixed，根据设置的left、top等属性成固定位置的效果。


## sticky属性特点

sticky属性有以下几个特点：

- 该元素并不脱离文档流，仍然保留元素原本在文档流中的位置。

- 当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动。

- 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量


## sticky生效条件

1. 一个是元素自身在文档流中的位置

2. 须指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
	并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。

3. 设定为 position:sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 position:sticky 不会生效。这里需要解释一下：
如果 position:sticky 元素的任意父节点定位设置为 overflow:hidden，则父容器无法进行滚动，所以 position:sticky 元素也不会有滚动然后固定的情况。
如果 position:sticky 元素的任意父节点定位设置为 position:relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewprot 定位。

4. 达到设定的阀值。这个还算好理解，也就是设定了 position:sticky 的元素表现为 relative 还是 fixed 是根据元素是否达到设定了的阈值决定的。


## 兼容

兼容不是很好，sofari和firefox支持，chrome60+支持



## 案例

```

	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Title</title>
	    <style>
	        body{
	            height: 2000px;
	        }
	        .box{
	            width: 100%;
	            height: 100px;
	            margin-bottom: 100px;
	            background-color: burlywood;
	            text-align: center;
	        }
	        #box2{
	            position: -webkit-sticky;
	            position: sticky;
	            top:0;
	        }
	    </style>
	</head>
	<body>
	<div class="box">box1</div>
	<div class="box"  id="box2">box2</div>
	<div class="box">box3</div>
	<div class="box">box4</div>
	</body>
	</html>

```


传统js的方式通过监听scroll方式
```
<script>
   $(function () {
       var box = $('#box2');
       var boxOffTop = box.offset().top ;

       $(document).on('scroll',function () {
           // 要定位元素距离浏览器顶部的距离 与 滚动条的滑动距离 相比
           if (boxOffTop<= $(this).scrollTop()){
               box.css({'position':'fixed','top':'0px'})
           }else {
               box.css({'position':'static'})
           }

       })
   })


</script>
```
