

# jquery

最经典的浏览器端快速操作 dom 的js库，兼容处理很好

最常用版本cdn
https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js


## 使用

1. 方式1
通过 <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script> 标签引入

然后用 全局变量 $ 来使用


2. 方式2

模块化使用

```
  npm i jquery

  // ES6
  import $ from 'jquery';
  // webpack 
  const $ = require('jquery');

```


> 标签引入的方式在模块化中也能用，但不推荐  const $ = widnow.jQuery;





## 常用方法


#### 1. each

  each() 方法规定为每个匹配元素规定运行的函数。

提示：返回 false 可用于及早停止循环。

```

	$(selector).each(function(index,element))

```

```
	  $("li").each(function(){
	    alert($(this).text())
	  });
```
