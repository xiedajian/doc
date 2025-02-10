
在vue2，我们需要实现一个功能就需要分别在 data、methods、computed 中进行操作
当我们业务复杂了就会大量出现上面的情况， 随着复杂度上升，代码超过几百行时，这时增加或者修改某个需求， 就要在 data、methods、computed 以及 mounted 中反复的跳转，这其中的的痛苦写过的都知道。

那么 vue2.x 版本给出的解决方案就是 Mixin, 但是使用 Mixin 也会遇到让人苦恼的问题：
- 命名冲突问题
- 不清楚暴露出来的变量的作用
- 逻辑重用到其他 component 经常遇到问题

Vue3.x 就推出了Composition API主要就是为了解决上面的问题，将零散分布的逻辑组合在一起来维护，并且还可以将单独的功能逻辑拆分成单独的文件。接下来我们就重点认识Composition API。



# Composition API


 Composition API

- reactive
- ref
- toRefs
- watch
- watchEffect
- computed
- 生命周期钩子





# setup
setup 是 Vue3.x 新增的一个选项， 他是组件内使用 Composition API的入口。
setup 执行时机
我在学习过程中看到很多文章都说 setup 是在 beforeCreate和created之间， 这个结论是错误的。实践是检验真理的唯一标准， 于是自己去检验了一下：

```
export default defineComponent({
  beforeCreate() {
    console.log("----beforeCreate----");
  },
  created() {
    console.log("----created----");
  },
  setup(props, context) {
    console.log("----setup----");
  },
});
```

setup 执行时机是在 beforeCreate 之前执行


使用setup时，它接受两个参数：

- props: 组件传入的属性
- context

setup 中接受的props是响应式的， 当传入新的 props 时，会及时被更新。由于是响应式的， 所以不可以使用 ES6 解构，解构会消除它的响应式。

错误代码示范：
```
// demo.vue
export default defineComponent ({
    setup(props, context) {
        const { name } = props
        console.log(name)
    },
})
```

那在开发中我们想要使用解构，还能保持props的响应式，有没有办法解决呢？

在后面toRefs学习的地方为大家解答。

第二个参数context，我们前面说了setup中不能访问 Vue2 中最常用的this对象，所以context中就提供了this中最常用的三个属性：attrs、slot 和emit，分别对应 Vue2.x 中的 $attr属性、slot插槽 和$emit发射事件。并且这几个属性都是自动同步最新的值，所以我们每次使用拿到的都是最新值。


> vue3中不再使用this