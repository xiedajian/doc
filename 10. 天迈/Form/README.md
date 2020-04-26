
# Form 表单组件

接受参数：
```js
  props: {
	// 表单项列表
    options: {
      type: Array,
      default: []
    },
	// label 宽度
    labelWidth: {
      type: String,
      default: "100px"
    },
	// 参数校验规则，同Element-ui
    rules: {
      type: Object,
      default: null
    },
	// 是否是行内
    inline: {
      type: Boolean,
      default: false
    },
	// 尺寸 同element-ui
    size: {
      type: String,
      default: "medium"
    },
	// 通用参数
    params: {
      type: Object,
      default: () => ({})
      // 内置属性 copy data modeKey type grid groupType
    }
  },
```

提供的方法：
```
- init()  			// 初始化表单，default 默认值装载， 如this.params.copy || this.params.data存在，且 params.type !== "add" 会把对应的值装载
```