
文档：https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0

# h（）函数

h() 函数是一个用于创建 VNode 的实用程序。也许可以更准确地将其命名为 createVNode()，但由于频繁使用和简洁，它被称为 h() 。它接受三个参数：

## 参数

```
h(
    // { tag | String | Object | Function} type
    // 一个 HTML 标签名、一个组件、一个异步组件、或一个函数式组件。
    // 必需的。
    'div',
 
    // {Object} PRops
    // 与 attribute、prop 和事件相对应的对象。
    // 这会在模板中用到。
    //
    // 可选的(在开发时。建议传，实在没有传的时候，传入 null)
    {},
 
    // {String | Array | Object} children
    // 子 VNodes, 使用 `h()` 构建,
    // 或使用字符串获取 "文本 VNode" 或者
    // 有插槽的对象。
    //
    // 可选的。
	[]
)	
```


## 案例

```
{
  props: ['message'],
  render: function (createElement) {
    return createElement( // createElement实际上就是h函数
      'div', // 元素类型
      { 		 // 属性对象
		id: 'test',
        class: ['my-class'], 
        style: { color: 'red' },
        on: {
          click: this.handleClick,
        },
      },
      [ // 子元素数组
        this.message, // 文本内容
        createElement('span', {}, '这是一个子元素'),
      ]
    )
  },
  methods: {
    handleClick: function (event) {
      console.log('Clicked!')
    }
  }
}
```


### 插槽slot
定义插槽
```
  render(h) {
    return h('div', [
      this.$slots.default, // 使用默认插槽
      this.$slots.header,  // 使用具名插槽 - 名为"header"
      this.$slots.footer,  // 使用具名插槽 - 名为"footer"
    ]);
  },
```

使用插槽
```
render() {
    return h(MyComponent, {}, [
      h('p', '这是默认插槽的内容'), 					// 默认插槽的内容
	  this.$createElement('p', { slot: 'default' }, '这是默认插槽的内容'),
      h('template', { slot: 'header' }, [ // 具名插槽"header"的内容
        h('h1', '这是头部插槽内容'),
      ]),
      h('template', { slot: 'footer' }, [ // 具名插槽"footer"的内容
        h('p', '这是底部插槽内容'),
      ]),
    ]);
  },
```

### v-model使用

h函数本身并不直接支持v-model指令，但通过正确设置props和自定义事件，可以模拟出类似的双向数据绑定效果。

```
return () => h('input', {
      type: 'text',
      value: internalValue.value, // 将内部状态绑定到input元素的value属性
      onInput: handleChange, 			// 监听输入事件并更新状态
    });
```



### update:visible 指令

```

{
        data() {
          return {
            visible: false
          };
        },
        render(h) {
          return h(
            "el-dialog",
            {
              ref: "modal",
              props: {
                visible: this.visible,
                appendToBody: true,
                width: "60%",
                height: "60%"
              },
              on: {
                "update:visible": this.handleVisible
              }
            },
            [h("p", "我是信息")]
          );
        },
        methods: {
          handleVisible(v) {
            console.log("handleVisible", v);
            this.visible = v;
          },
          open() {
            this.visible = true;
          },
          hide() {;
            this.visible = false
          }
        }
      }
```

