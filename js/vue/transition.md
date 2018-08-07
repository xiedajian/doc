
文档： https://cn.vuejs.org/v2/guide/transitions.html

# tarnsition

过渡动画

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

包括以下工具：

在 CSS 过渡和动画中自动应用 class
可以配合使用第三方 CSS 动画库，如 Animate.css
在过渡钩子函数中使用 JavaScript 直接操作 DOM
可以配合使用第三方 JavaScript 动画库，如 Velocity.js



Vue 提供了 transition 的封装组件

在下列情形中，可以给任何元素和组件添加进入/离开过渡

条件渲染 (使用 v-if)
条件展示 (使用 v-show)
动态组件
组件根节点

```

  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
```

css

```
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```


