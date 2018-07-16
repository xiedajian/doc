
# jquery.transit.js


jQuery Transit 使用 CSS3 的新特性来实现过渡效果，比默认的.animate方法要顺畅得多。

你可以使用$.fn.transition()调用CSS3 transition功能来制作动画。其工作方式完全类似$.fn.animate()，只是它使用的是CSS3 transitions。


官网： http://ricostacruz.com/jquery.transit/

GitHub: https://github.com/rstacruz/jquery.transit/

cdn: <script src="https://cdn.bootcss.com/jquery.transit/0.9.12/jquery.transit.min.js"></script>



## 安装

```
	$ bower install --save jquery.transit
	$ npm install --save jquery.transit
```


## 使用

1. 引入

```
	<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://cdn.bootcss.com/jquery.transit/0.9.12/jquery.transit.min.js"></script>
```

2. 制作动画

// 和 jq.animate 一样的API
$(selector).animate(styles,speed,easing,callback)

$(selector).transition(styles,speed,easing,callback)

```
	$("#box").transition({ opacity: 0.1, scale: 0.3 });
	$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500);                         // duration
	$("#box").transition({ opacity: 0.1, scale: 0.3 }, 'fast');                      // easing
	$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');                   // duration+easing
	$("#box").transition({ opacity: 0.1, scale: 0.3 }, function() {..});             // callback
	$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() {..}); 

```
