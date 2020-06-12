
[参考](https://www.cnblogs.com/goloving/p/8672361.html)


# 一、什么是节流和去抖？
1、节流
　　节流就是拧紧水龙头让水少流一点，但是不是不让水流了。想象一下在现实生活中有时候我们需要接一桶水，接水的同时不想一直站在那等着，可能要离开一会去干一点别的事请，让水差不多流满一桶水的时候再回来，这个时候，不能把水龙头开的太大，不然还没回来水就已经满了，浪费了好多水，这时候就需要节流，让自己回来的时候水差不多满了。

　　那在JS里有没有这种情况呢，典型的场景是图片懒加载监听页面的scoll事件，或者监听鼠标的mousemove事件，这些事件对应的处理方法相当于水，由于scroll和mousemove在鼠标移动的时候会被浏览器频繁的触发，会导致对应的事件也会被频繁的触发（水流的太快了），这样就会造成很大的浏览器资源开销，而且好多中间的处理是不必要的，这样就会造成浏览器卡顿的现象，这时候就需要节流。

　　如何节流呢？我们无法做到让浏览器不去触发对应的事件，但是可以做到让处理事件的方法执行频率减少，从而减少对应的处理开销。

2、去抖
　　最早接触这个词应该是在高中物理里面学到的，有时候开关在在真正闭合之前可能会发生一些抖动现象，如果抖动的明显的话，对应的小灯泡可能会闪烁，把灯泡闪坏了不重要，万一把眼睛再给闪坏了可就麻烦了，这个时候就有去抖电路的出现。

　　而在我们的页面里，也有这种情况，假设我们的一个输入框，输入内容的同时可能会去后台查询对应的联想词，如果用户输入的同时，频繁的触发input事件，然后频繁的向后台发送请求，那么直到用户输入完成时，之前的请求都应该是多余的，假设网络慢一点，后台返回的数据比较慢，那么显示的联想词可能会出现频繁的变换，直到最后的一个请求返回。

　　如何去抖呢？这个时候就可以在一定时间内监听是否再次输入，如果没有再次输入则认为本次输入完成，发送请求，否则就是判定用户仍在输入，不发送请求。

3、节流和去抖区别
　　*去抖和节流是不同的，因为节流虽然中间的处理函数被限制了，但是只是减少了频率，而去抖则把中间的处理函数全部过滤掉了，只执行规判定时间内的最后一个事件。*

去抖 debounce：将短时间内多次触发的事件合并成一次事件响应函数执行（往往是在第一次事件或者在最后一次事件触发时执行），即该段时间内仅一次真正执行事件响应函数。
节流 throttle：假如在短时间内同一事件多次触发，那么每隔一段更小的时间间隔就会执行事件响应函数，即该段时间内可能多次执行事件响应函数。

# debounce 和 throttle 

> 请注意了解 debounce 和 throttle 的区别

在处理诸如 resize、scroll、mousemove 和 keydown/keyup/keypress 等事件的时候，通常我们不希望这些事件太过频繁地触发，尤其是监听程序中涉及到大量的计算或者有非常耗费资源的操作

## debounce 去抖动函数

DOM 事件里的 debounce 概念其实是从机械开关和继电器的“去弹跳”（debounce）衍生 出来的，基本思路就是把多个信号合并为一个信号。

在 JavaScript 中，debounce 函数所做的事情就是，强制一个函数在某个连续时间段内只执行一次，哪怕它本来会被调用多次。

我们希望在用户停止某个操作一段时间之后才执行相应的监听函数，而不是在用户操作的过程当中，浏览器触发多少次事件，就执行多少次监听函数

去抖动函数就是为此设计出来的

以lodash的debounce函数为例：
```
_.debounce(func, [wait=0], [options={}])

```
创建一个去抖动函数，该函数延迟调用，func直到wait自上次调用去抖动函数后经过几毫秒。

lodash文档： https://lodash.com/docs/4.17.10#debounce


## throttle 节流函数

throttle 的概念理解起来更容易，就是固定函数执行的速率，即所谓的“节流”

以lodash的throttle函数为例：

```
_.throttle(func, [wait=0], [options={}])
```

创建一个func每wait毫秒只调用一次的限制函数

lodash文档： https://lodash.com/docs/4.17.10#throttle




# 去抖与节流

去抖与节流函数是一种最常用的 **高频触发优化方式**，能对性能有较大的帮助。

- **去抖 (debounce)**: 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

```js
function debounce(fn, wait, immediate) {
    let timer = null

    return function() {
        let args = arguments
        let context = this

        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}
```

- **节流(throttle)**: 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

```js
function throttle(fn, wait, immediate) {
    let timer = null
    let callNow = immediate
    
    return function() {
        let context = this,
            args = arguments

        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, wait)
        }
    }
}
```

