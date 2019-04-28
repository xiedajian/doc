
# window.requestAnimationFrame

requestAnimationFrame 是专门为实现高性能的帧动画而设计的一个API，目前已在多个浏览器得到了支持

requestAnimationFrame 比起 setTimeout、setInterval的优势主要有两点：

1. requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。

2. 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。


requestAnimationFrame是一个全局函数。


调用requestAnimationFrame后，它会要求浏览器根据自己的频率进行一次重绘，它接收一个回调函数作为参数，在即将开始的浏览器重绘时，会调用这个函数，并会给这个函数传入调用回调函数时的时间作为参数。


所以，可以这么说，requestAnimationFrame就是一个性能优化版、专为动画量身打造的setTimeout，不同的是requestAnimationFrame不是自己指定回调函数运行的时间，而是跟着浏览器内建的刷新频率来执行回调，这当然就能达到浏览器所能实现动画的最佳效果了。


## 取消

requestAnimationFrame函数会返回一个资源标识符，可以把它作为参数传入cancelAnimationFrame函数来取消requestAnimationFrame的回调

跟setTimeout的clearTimeout很相似


## Polyfill垫片

```
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

```

这样子我们就能在所有浏览器上使用requestAnimationFrame和cancelAnimationFrame了。


## 简单案例

下面举个简单的例子来说明怎么运用requestAnimationFrame进行动画，下面的代码会将id为demo的div以动画的形式向右移动到300px

```
	<div id="demo" style="position:absolute; width:100px; height:100px; background:#ccc; left:0; top:0;"></div>
	<script>
	var demo = document.getElementById('demo');
	function rander(){
	 demo.style.left = parseInt(demo.style.left) + 1 + 'px'; //每一帧向右移动1px
	}
	requestAnimationFrame(function(){
	 rander();
	 //当超过300px后才停止
	 if(parseInt(demo.style.left)<=300) requestAnimationFrame(arguments.callee);
	});
	</script>

```
