

文档：http://weex.apache.org/cn/wiki/common-events.html


# click

当组件上发生点击手势时被触发

*组件<input> 和 <switch> 组件目前不支持 click 事件，请使用 change 或 input 事件来代替*

事件对象
- type: click
- target: 触发点击事件的目标组件
- timestamp: 触发点击事件时的时间戳




# longpress

长按事件

事件对象
- type : longpress
- target : 触发长按事件的目标组件
- timestamp : 长按事件触发时的时间戳


# Appear 事件

如果一个位于某个可滚动区域内的组件被绑定了 appear 事件，那么当这个组件的状态变为在屏幕上可见时，该事件将被触发。

事件对象
- type : appear
- target : 触发 Appear 事件的组件对象
- timestamp : 事件被触发时的时间戳
- direction : 触发事件时屏幕的滚动方向，up 或 down



# Disappear 事件

如果一个位于某个可滚动区域内的组件被绑定了 disappear 事件，那么当这个组件被滑出屏幕变为不可见状态时，该事件将被触发。

事件对象
- type : disappear
- target : 触发 Disappear 事件的组件对象
- timestamp : 事件被触发时的时间戳
- direction : 触发事件时屏幕的滚动方向，up 或 down


# Page 事件

*注意：仅支持 iOS 和 Android，H5 暂不支持。*

Weex 通过 viewappear 和 viewdisappear 事件提供了简单的页面状态管理能力。

viewappear 事件会在页面就要显示或配置的任何页面动画被执行前触发，例如，当调用 navigator 模块的 push 方法时，该事件将会在打开新页面时被触发。viewdisappear 事件会在页面就要关闭时被触发。

与组件的 appear 和 disappear 事件不同的是，viewappear 和 viewdisappear 事件关注的是整个页面的状态，所以它们必须绑定到页面的根元素上。

特殊情况下，这两个事件也能被绑定到非根元素的body组件上，例如wxc-navpage组件。

事件对象
- type : viewappear 或 viewdisappear
- target : 触发事件的组件对象
- timestamp : 事件被触发时的时间戳




# 手势事件

## Touch

当触摸到一个点，移动或从触摸面移开时触发 touch 手势。

触摸手势很精准，它会返回所有详细的事件信息

所以，监听 touch 手势可能很慢，即使只移动一丁点也需要处理大量事件。

有三种类型的 touch 手势

- touchstart 将在触摸到触摸面上时触发。
- touchmove 将在触摸点在触摸面移动时被触发。
- touchend 将在从触摸面离开时被触发。

shouldStopPropagation 每个touch事件都会被传递过来, 可控制touch事件是否冒泡（返回true）或者停止（返回false）；用于解决事件冲突或者自定义手势


## Pan

pan 手势也会返回触摸点在触摸面的移动信息，有点类似于 touch 手势

但是 pan 手势只会采样收集部分事件信息因此比 touch 事件要快得多，当然精准性差于 touch

pan 也有三种类型的手势，这些手势的意义与 touch 完全一样：

- panstart
- panmove
- panend

horizontalpan v0.10+：手势的 start/move/end 状态保存在 state 特性中。目前该手势在 Android 下会与 click 事件冲突
verticalpan v0.10+：势的 start/move/end 状态保存在 state 特性中。目前该手势在 Android 下会与 click 事件冲突

> Touch：完整信息，精准、很慢
> Pan：抽样信息，很快，不够精准


## Swipe

swipe 将会在用户在屏幕上滑动时触发，一次连续的滑动只会触发一次 swiper 手势

回调属性：

direction：仅在 swipe 手势中存在，返回滑动方向，返回值可能为 up, left, bottom, right


## LongPress

LongPress 将会在触摸点连续保持 500 ms以上时触发


## 手势事件回调属性

changedTouches：一个数组，包含了当前手势的触摸点的运动轨迹

- identifier：触摸点的唯一标识符。
- pageX：触摸点相对于文档左侧边缘的 X 轴坐标。
- pageY：触摸点相对于文档顶部边缘的 Y 轴坐标。
- screenX：触摸点相对于屏幕左侧边缘的 X 轴坐标。
- screenY：触摸点相对于屏幕顶部边缘的 Y 轴坐标。
- force: 屏幕收到的按压力度，值的范围为 0~1

> force 属性目前在支持 forceTouch iOS 设备才支持, iPhone 6s 及更新的 iOS 设备



*目前，由于会触发大量事件冲突，Weex Android 还不支持在滚动类型的元素上监听手势，例如 scroller, list 和 webview 这三个组件。*


# 事件冒泡   bubble=true 

> 注意: 目前仅 Weex Native（Android 和 iOS）支持，web 端 暂时不支持此项特性.

Weex 在 0.13 之前是不支持这一特性的，在 0.13 版本，Weex 提供了这项支持。

在捕获阶段，浏览器检查当前元素的最外层父节点（在 web 上，比如，<html> 元素），如果它上面绑定了一个 click 事件处理器，那么先执行这个处理器。然后检查下一个元素，<html> 的子元素里是 <video> 祖先元素的那个元素，做同样的检测。一步步直到遇到当前点击的这个元素本身。

接下来是冒泡阶段，方向和捕获阶段相反：浏览器先检测当前被点击的元素上是否注册了点击事件处理器，如果有则执行它。接下来检测它的父元素，一步步向上，直到最外层 <html> 元素。

一般使用默认的事件注册机制，将事件处理注册在冒泡阶段，所以处理冒泡阶段的情况比较多。当我们想要停止事件冒泡，只需要调用事件对象的 stopPropagation 方法。标准事件对象包含 stopPropagation 方法，当执行事件处理器时调用该方法，会立即停止事件冒泡，这样事件冒泡处理链上的后续处理器就不会再执行下去。

> Weex 在 0.13 版本 SDK 里实现了事件冒泡机制。注意事件冒泡默认是不开启的，你需要在模板根元素上加上属性 bubble=true 才能开启冒泡。


# 阻止冒泡    event.stopPropagation

通过调用 event.stopPropagation 方法阻止事件冒泡

注意 event.stopPropagation 和 bubble=true 的影响范围不同，前者仅针对当前冒泡到的元素以及其祖先层级有效，而对子元素无效。

而后者相当于一个全局开关，开启以后对该根元素内部所有子元素都开启了事件冒泡效果。两者可以同时存在

> 注意: 为了兼容之前的版本，Weex 默认不会开启事件冒泡机制。需要在根元素的属性上，添加 bubble="true" 来开启冒泡机制。否则，将不会向上传播事件