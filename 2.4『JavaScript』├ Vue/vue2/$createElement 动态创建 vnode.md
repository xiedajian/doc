
# $createElement

```
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // 一个 HTML 标签，组件设置，或一个函数
  // 必须 Return 上述其中一个
  'div',
  // {Object}
  // 一个对应属性的数据对象
  // 您可以在 template 中使用.可选项.
  {
    // (下一章，将详细说明相关细节)
  },
  // {String | Array}
  // 子节点(VNodes). 可选项.
  [
    createElement('h1', 'hello world'),
    createElement(MyComponent, {
      props: {
        someProp: 'foo'
      }
    }),
    'bar'
  ]
)
```

其中tag参数类似，第二个参数{}其实就一个数据对象，代表用在该节点的属性，比如常见的class,style,props,on等，完整的数据对象如下：
```
{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 "on"
  // 所以不再支持如 v-on:keyup.enter 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  // Vue 会为您持续追踨
  directives: [
    {
      name: 'my-custom-directive',
      value: '2'
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 如果子组件有定义 slot 的名称
  slot: 'name-of-slot'
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}
```

第三个参数[]可以看出来是表示该节点下面还有其他的节点，就放在此处[createElement(tag1),createElement(tag2)]。


# 案例

例如 element-ui 的 notify 弹窗，支持 vnode 节点
```
this.$notify({
	  title: '标题名称',
	  message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
	});
```

当然也可以创建 vue 组件, 例如 `vxe-grid`
```
this.$notify({
	title: '上传文件校验提示',
	duration: 0,
	message: h('vxe-grid', { props:{...options} , style:'width:280px'})
});
```