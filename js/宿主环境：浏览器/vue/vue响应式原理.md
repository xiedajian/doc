
参考文档： https://www.xiaohuochai.cc/posts/5b11e3be93b30d62504cb6a3
参考文档：https://juejin.im/post/5adf0085518825673123da9a?utm_medium=fe&utm_source=weixinqun


Vue最显著的特性之一便是不太引人注意的响应式系统(reactivity system)。

模型层(model)只是普通JS对象，修改它则更新视图(view)。

这会让状态管理变得非常简单且直观，不过理解它的工作原理以避免一些常见的问题也是很重要的。

本文将详细介绍Vue响应式系统的底层细节


## 追踪变化

把一个普通JS对象传给Vue实例的data选项，Vue将遍历此对象所有的属性，并使用Object.defineProperty把这些属性全部转为getter/setter。

Object.defineProperty是仅ES5支持，且无法shim的特性，这也就是为什么Vue不支持IE8浏览器的原因

用户看不到getter/setter，但是在内部它们让Vue追踪依赖，在属性被访问和修改时通知变化

每个组件实例都有相应的watcher实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新


## 变化检测

受现代JS的限制（以及废弃 Object.observe），Vue不能检测到对象属性的添加或删除。

由于Vue会在初始化实例时对属性执行 getter/setter转化过程，所以属性必须在data对象上存在才能让Vue转换它，这样才能让它是响应的

直白一点就是在创建vue实例的时候的属性是响应式的，后来添加的属性不是响应式的

```
	var vm = new Vue({
	  data:{
	    a:1
	  }
	})
	// `vm.a` 是响应的
	vm.b = 2
	// `vm.b` 是非响应的

```

 Vue不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上

```
Vue.set(vm.someObject, 'b', 2)
```

也可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名

```
this.$set(this.someObject,'b',2)
```
