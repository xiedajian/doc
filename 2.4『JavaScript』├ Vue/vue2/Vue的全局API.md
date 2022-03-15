

# Vue的全局API

Vue的全局API提供大量的功能，我这里就给大家罗列几个常用的结果，其他的还是参考官网.

## Vue.nextTick
语法： Vue.nextTick( [callback, context] )

参数：    
{Function} [callback]
{Object} [context]

用法： 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
```
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})
```


## Vue.set
语法： Vue.set( object, key, value )

参数：
```
{Object} object
{string} key
{any} value
```
返回值： 设置的值.

用法：
设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。
这个方法主要用于避开 Vue 不能检测属性被添加的限制。 注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。


## Vue.compile
语法：
Vue.compile( template )

参数：
{string} template

用法：
```
//在render函数中编译模板字符串。只在独立构建时有效
var res = Vue.compile('<div><span>{{ msg }}</span></div>')
new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
```


扩展组件Vue.extend 的用法、Vue.use加载插件、Vue.filter加载过滤器、Vue.directive自定义指令


