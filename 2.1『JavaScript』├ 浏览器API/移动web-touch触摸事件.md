


# touch事件

touch事件即触摸事件，会在用户手指放在屏幕上面时、在屏幕上滑动时或从屏幕上移开时触发。

一共有四个触摸事件

```
touchstart:     当手指触摸屏幕时触发(手指数量不限)
touchmove:      当手指在屏幕上滑动时连续地触发(事件发生期间，调用preventDefault()可以阻止滚动)
touchend:       当手指从屏幕上移开时触发
touchcancel:    当系统停止跟踪触摸时触发(不常用)
```


# 300ms 事件延迟

touch事件延迟是指触发touch事件与它的功能执行之间有300毫秒的间隔。

其实，鼠标事件、焦点事件、浏览器默认行为也都存在着300ms的延迟




# touch事件对象

每个触摸事件的event对象都提供了类似鼠标事件中常见的属性

```
(function () {
  test.addEventListener('touchstart', function (e) {
    console.log(e)
  });
})(); 
```

常见的属性
```
1、currentTarget    属性返回事件正在执行的监听函数所绑定的节点
2、target           属性返回事件的实际目标节点
3、srcElement       属性与target属性功能一致
4、eventPhase       属性返回一个整数值，表示事件目前所处的事件流阶段。0表示事件没有发生，1表示捕获阶段，2表示目标阶段，3表示冒泡阶段
5、bubbles          属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性
6、cancelable       属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性s
```


## touchList

触摸事件对象有一个touchList数组属性，其中包含了每个触摸点的信息。

如果用户使用四个手指触摸屏幕，这个数组就会有四个元素。

一共有三个这样的数组

touches：         当前触摸屏幕的触摸点数组

changedTouches：  导致触摸事件被触发的触摸点数组

targetTouches：   事件目标元素上的触摸点数组

```
(function () {
  test.addEventListener('touchstart', function (e) {
    console.log(e.touches)
    console.log(e.changedTouches)
    console.log(e.targetTouches)
  });
  test.addEventListener('touchend', function (e) {
    console.log(e.touches)
    console.log(e.changedTouches)
    console.log(e.targetTouches)
  });
})();
```
这三个属性中最常用的是changedTouches，当元素触发了touchend事件，只有changedTouches数组包含被触发的元素



## 事件坐标

上面的这些触摸点数组中，包含了触摸点的位置信息，每个Touch对象都包含下列属性

```
clientx:         触摸目标在视口中的x坐标
clientY:         触摸目标在视口中的y坐标
identifier:      标识触摸的唯一ID
pageX:           触摸目标在页面中的x坐标（包含滚动）
pageY:           触摸目标在页面中的y坐标（包含滚动）
screenX:         触摸目标在屏幕中的x坐标
screenY:         触摸目标在屏幕中的y坐标
target:          触摸的DOM节点目标
```

changedTouches数组中的第一个元素就是导致事件触发的那个触摸点对象