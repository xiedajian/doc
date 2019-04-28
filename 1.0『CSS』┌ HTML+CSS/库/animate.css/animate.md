
# animate.css

官网： https://daneden.github.io/animate.css/

Animate.css是一个有趣的，跨浏览器的css3动画库。很值得我们在项目中引用。


// cdn

https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css


## 使用

```
	<!-- 引入 -->
	<head>
	  <link rel="stylesheet" href="animate.min.css">
	</head>

	<!-- 给指定的元素加上指定的动画样式名 -->
	<div class="animated bounceOutLeft"></div>


```

引入css文件后，即可使用类名

这里包括两个class名，第一个是基本的，animated必须添加的样式名，任何想实现的元素都得添加这个。第二个是指定的动画样式名。



## 动画循环调用

加上 infinite 类


```
	<!-- 加上 infinite 类名 -->
	<div class="animated infinite bounceOutLeft"></div>

```


### 更改动画配置

animate.css 的默认设置也许有些时候并不是我们想要的，所以你可以重新设置，比如：

```
	#jq22{
	    animate-duration: 2s;    //动画持续时间
	    animate-delay: 1s;    //动画延迟时间
	    animate-iteration-count: 2;    //动画执行次数
	}
```


### 监听动画钩子函数

利用钩子添加事件

```
	$('#yourElement').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		// doSomething...
	});

```

### chrome扩展


animate playerbox

可以快速查看各个效果及代码实现

地址：https://chrome.google.com/webstore/detail/lpjcokgibjaiedlkgjlkplfdppmehbeb?utm_source=chrome-app-launcher-info-dialog
