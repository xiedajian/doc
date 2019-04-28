
github: https://github.com/ustbhuangyi/better-scroll

文档： https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88


# better-scroll

better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。它的核心是借鉴的 iscroll 的实现，它的 API 设计基本兼容 iscroll，在 iscroll 的基础上又扩展了一些 feature 以及做了一些性能优化。

better-scroll 是基于原生 JS 实现的，不依赖任何框架。它编译后的代码大小是 63kb，压缩后是 35kb，gzip 后仅有 9kb，是一款非常轻量的 JS lib。


# better-scroll 与 iscroll 区别

1.iscroll 多年没人维护了， fix了 iscroll 的一些 bug，比如在手指 move 的过程中移出屏幕外的情况 iscroll 没有处理。
2.iscroll 在 probeType 为 3 的情况的实现是基于 js 实现的帧动画，这个在移动端体验是很差的，而 better-scroll 仍然基于 css3 实现。
3.iscroll 的源码构建还是太老了，用 es6 + webpack 重写也是方便维护


# 安装

方式1： 直接用 script 加载的方式，加载后会在 window 上挂载一个 BScroll 的对象。
CDN： https://unpkg.com/better-scroll/dist/bscroll.min.js

方式2： npm
```
npm install better-scroll --save
```

```
import BScroll from 'better-scroll'
或者
var BScroll = require('better-scroll')
```


# 起步

学习使用 better-scroll 最好的方式是看它的 demo 代码，我们把代码都放在了 example 目录。由于目前最适合移动端开发的前端 mvvm 框架是 Vue，并且 better-scroll 可以很好的和 Vue 配合使用的，所以 demo 我都用 Vue 进行了重写。

better-scroll 最常见的应用场景是列表滚动，我们来看一下它的 html 结构

```
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
    ...
  </ul>
  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
</div>
```

上面的代码中 better-scroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。
这里要注意的是，better-scroll 只处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。

最简单的初始化代码如下：

```
import BScroll from 'better-scroll'
let wrapper = document.querySelector('.wrapper')
let scroll = new BScroll(wrapper)
```

当然，如果传递的是一个字符串，better-scroll 内部会尝试调用 querySelector 去获取这个 DOM 对象，所以初始化代码也可以是这样：

```
import BScroll from 'better-scroll'
let scroll = new BScroll('.wrapper')
```


# 滚动原理

参考： https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#%E6%BB%9A%E5%8A%A8%E5%8E%9F%E7%90%86


# better-scroll 在 MVVM 框架的应用

原文： https://zhuanlan.zhihu.com/p/27407024

如何在 Vue 中使用 better-scroll

```
<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>...</li>
      <li>...</li>
      ...
    </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    mounted() {
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.wrapper, {})
      })
    }
  }
</script>
```
Vue.js 提供了我们一个获取 DOM 对象的接口—— vm.$refs。在这里，我们通过了 this.$refs.wrapper访问到了这个 DOM 对象，

并且我们在 mounted 这个钩子函数里，this.$nextTick 的回调函数中初始化 better-scroll 。因为这个时候，wrapper 的 DOM 已经渲染了，我们可以正确计算它以及它内层 content 的高度，以确保滚动正常。

这里的 this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染，感兴趣的同学可以了解一下它的内部实现细节，底层用到了 MutationObserver 或者是 setTimeout(fn, 0)。其实我们在这里把 this.$nextTick 替换成 setTimeout(fn, 20) 也是可以的（20 ms 是一个经验值，每一个 Tick 约为 17 ms），对用户体验而言都是无感知的。

## 异步数据的处理

在我们的实际工作中，列表的数据往往都是异步获取的，因此我们初始化 better-scroll 的时机需要在数据获取后
```
<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        data: []
      }
    },
    created() {
      requestData().then((res) => {
        this.data = res.data
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.wrapper, {})
        })
      })
    }
  }
</script>
```
我们获取到数据的后，需要通过异步的方式再去初始化 better-scroll，因为 Vue 是数据驱动的， Vue 数据发生变化（this.data = res.data）到页面重新渲染是一个异步的过程，我们的初始化时机是要在 DOM 重新渲染后，所以这里用到了 this.$nextTick，当然替换成 setTimeout(fn, 20) 也是可以的

为什么这里在 created 这个钩子函数里请求数据而不是放到 mounted 的钩子函数里？
因为 requestData 是发送一个网络请求，这是一个异步过程，当拿到响应数据的时候，Vue 的 DOM 早就已经渲染好了，但是数据改变 —> DOM 重新渲染仍然是一个异步过程，所以即使在我们拿到数据后，也要异步初始化 better-scroll。


## 数据的动态更新

我们在实际开发中，除了数据异步获取，还有一些场景可以动态更新列表中的数据，比如常见的下拉加载，上拉刷新等。比如我们用 better-scroll 配合 Vue 实现下拉加载功能，代码如下：
```
<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        data: []
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        requestData().then((res) => {
          this.data = res.data.concat(this.data)
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.wrapper, {})
              this.scroll.on('touchend', (pos) => {
                // 下拉动作
                if (pos.y > 50) {
                  this.loadData()
                }
              })
            } else {
              this.scroll.refresh()
            }
          })
        })
      }
    }
  }
</script>
```
这段代码比之前稍微复杂一些, 当我们在滑动列表松开手指时候， better-scroll 会对外派发一个 touchend 事件，我们监听了这个事件，并且判断了 pos.y > 50（我们把这个行为定义成一次下拉的动作）

如果是下拉的话我们会重新请求数据，并且把新的数据和之前的 data 做一次 concat，也就更新了列表的数据，那么数据的改变就会映射到 DOM 的变化。

需要注意的一点，这里我们对 this.scroll 做了判断，如果没有初始化过我们会通过 new BScroll 初始化，并且绑定一些事件，否则我们会调用 this.scroll.refresh 方法重新计算，来确保滚动效果的正常。

这里，我们就通过 better-scroll 配合 Vue，实现了列表的下拉刷新功能，上拉加载也是类似的套路，一切看上去都是 ok 的。但是，我们发现这里写了大量命令式的代码（这一点不是 Vue.js 推荐的），如果有很多类似滚动的组件，我们就需要写很多类似的命令式且重复性的代码，而且我们把数据请求和 better-scroll 也做了强耦合，这些对于一个追求编程逼格的人来说，就不 ok 了。

## scroll 组件的抽象和封装

因此，我们有强烈的需求抽象出来一个 scroll 组件，类似小程序的 scroll-view 组件，方便开发者的使用。

首先，我们要考虑的是 scroll 组件本质上就是一个可以滚动的列表组件，至于列表的 DOM 结构，只需要满足 better-scroll 的 DOM 结构规范即可，具体用什么标签，有哪些辅助节点（比如下拉刷新上拉加载的 loading 层），这些都不是 scroll 组件需要关心的。因此， scroll 组件的 DOM 结构十分简单，如下所示：

```
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
```
这里我们用到了 Vue 的特殊元素—— slot 插槽，它可以满足我们灵活定制列表 DOM 结构的需求。接下来我们来看看 JS 部分：
```
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        })

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
```

JS 部分实际上就是对 better-scroll 做一层 Vue 的封装，通过 props 的形式，把一些对 better-scroll 定制化的控制权交给父组件；通过 methods 暴露的一些方法对 better-scroll 的方法做一层代理；通过 watch 传入的 data，当 data 发生改变的时候，在适当的时机调用 refresh 方法重新计算 better-scroll 确保滚动效果正常，这里之所以要有一个 refreshDelay 的设置是考虑到如果我们对列表操作用到了 transition-group 做动画效果，那么 DOM 的渲染完毕时间就是在动画完成之后。

有了这一层 scroll 组件的封装，我们来修改刚刚最复杂的代码（假设我们已经全局注册了 scroll 组件）。

```
<template>
  <scroll class="wrapper"
          :data="data"
          :pulldown="pulldown"
          @pulldown="loadData">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </scroll>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        data: [],
        pulldown: true
      }
    },
    created() {
      this.loadData()
    },
    methods: {
      loadData() {
        requestData().then((res) => {
          this.data = res.data.concat(this.data)
        })
      }
    }
  }
</script>
```

可以很明显的看到我们的 JS 部分精简了非常多的代码，没有对 better-scroll 再做命令式的操作了，同时把数据请求和 better-scroll 也做了剥离，父组件只需要把数据 data 通过 prop 传给 scroll 组件，就可以保证 scroll 组件的滚动效果。同时，如果想实现下拉刷新的功能，只需要通过 prop 把 pulldown 设置为 true，并且监听 pulldown 的事件去做一些数据获取并更新的动作即可，整个逻辑也是非常清晰的。