


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




# 防抖与节流

防抖与节流函数是一种最常用的 **高频触发优化方式**，能对性能有较大的帮助。

- **防抖 (debounce)**: 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

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

