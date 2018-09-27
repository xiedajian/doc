

# computed

vue的计算属性是为了避免把逻辑写到模板表达式中

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护

```
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>

```

在这个地方，模板不再是简单的声明式逻辑。

你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串

对于任何复杂逻辑，你都应当使用计算属性来避免在模板表达式中使用逻辑

```
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>


var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

### 计算属性会自动更新

可以像绑定普通属性一样在模板中绑定计算属性。Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新


>  生命周期函数/methods/watch里面不应该使用箭头函数
> 箭头函数和普通函数的最大区别是this的指向问题:普通函数的this指向函数的调用者, 箭头函数没有作用域，所以的this指向函数外面所在的所用域
>vue中生命周期函数, methods,  watch 自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。
