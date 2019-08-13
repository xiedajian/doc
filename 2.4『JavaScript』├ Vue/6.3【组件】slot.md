[文档](https://cn.vuejs.org/v2/guide/components-slots.html)

vue : 2.6

# slot 插槽

- 默认插槽	（一个不带 name 的 `<slot>` 出口会带有隐含的名字“default”。）
- 具名插槽	（name 属性来区分）
- 作用域插槽	 (向父组件传参)

插槽用`<slot>`标签来确定渲染的位置，里面放如果父组件没传内容时的后备内容

具名插槽用`name` 属性来表示插槽的名字，不传为默认插槽

作用域插槽在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件`v-slot`指令介绍的对象上


# 作用域插槽

child组件：
```
<span>
  <slot v-bind:user="child">{{ child.lastName }}</slot>
</span>
```
绑定在 <slot> 元素上的特性被称为插槽 prop

父组件:
```
<child v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</child>
```
在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 slotProps，但你也可以使用任意你喜欢的名字。


## 解构插槽 Prop

可以使用 ES2015 解构来传入具体的插槽 prop，上边的案例如下：
```
<child v-slot:default="{user}">
  {{ user.firstName }}
</child>
```

同样开启了 prop 重命名等其它可能，例如将 user 重命名为 person：
```
<child v-slot:default="{user:people}">
  {{ people.firstName }}
</child>
```

甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：
```
<child v-slot:default="{user:{firstName:'defaultName'}}}">
  {{ people.firstName }}
</child>
```



# v-slot 指令缩写模式

跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。

例如 v-slot:header 可以被重写为 #header
```
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

```
<current-user #default="{ user }">
  {{ user.firstName }}
</current-user>
```


# 动态插槽名

动态指令参数也可以用在 v-slot 上，来定义动态的插槽名：
```
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```