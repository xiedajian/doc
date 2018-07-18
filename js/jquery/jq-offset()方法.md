
# offset() 方法

offset() 方法返回或设置匹配元素相对于文档的偏移（位置）。


## 返回偏移坐标

$(selector).offset()

返回第一个匹配元素的偏移坐标。

该方法返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。


## 设置偏移坐标

$(selector).offset(value)

设置所有匹配元素的偏移坐标。

value 是包含top，left的对象 {top:100,left:0}


## 使用函数来设置偏移坐标

$(selector).offset(function(index,oldoffset))

使用函数来设置所有匹配元素的偏移坐标

index - 可选。接受选择器的 index 位置
oldvalue - 可选。接受选择器的当前坐标。


```
<html>
<head>
<script type="text/javascript" src="/jquery/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
  $("button").click(function(){
    $("p").offset(function(n,c){
    	newPos=new Object();
        newPos.left=c.left+100;
        newPos.top=c.top+100;
        return newPos;
    });
  });
});
</script>
</head>
<body>
<p>这是一个段落。</p>
<button>设置 p 元素的 offset 坐标</button>
</body>
</html>

```
