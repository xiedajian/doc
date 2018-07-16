

# vue实例


## 创建一个Vue实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的：

```
	var vm = new Vue({
	  // 选项
	})
```

虽然没有完全遵循 MVVM 模型，但是 Vue 的设计也受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的缩写) 这个变量名表示 Vue 实例。

当创建一个 Vue 实例时，你可以传入一个选项对象

## 数据和方法

```
	// 我们的数据对象
	var data = { a: 1 }

	// 该对象被加入到一个 Vue 实例中
	var vm = new Vue({
	  data: data
	})

	// 获得这个实例上的属性
	// 返回源数据中对应的字段
	vm.a == data.a // => true

	// 设置属性也会影响到原始数据
	vm.a = 2
	data.a // => 2

	// ……反之亦然
	data.a = 3
	vm.a // => 3

```

当data改变时，视图会进行重渲染。

值得注意的是只有当实例被创建时 data 中存在的属性才是响应式的。

也就是说如果你添加一个新的属性，是不会触发视图更新的

## $前缀的 vue 实例属性与方法

除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来。例如：


```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})

```


## 钩子


beforeCreate

created

beforeMount

mounted

beforeUpdata

updated

beforeDestory

destoryed


