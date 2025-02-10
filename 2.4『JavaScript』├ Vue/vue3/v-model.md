
# Vue3.x中重写的v-model

v-model 在vue3可以说是破坏式更新，改动还是不少的

在Vue2.x中，v-model 是props 和 emit 组合而成的语法糖, 我们使用的v-model只能双向绑定一个值，在某些需求面前显的力不从心。但是在Vue3.x中已经可以实现啦！

- 变更：value => modelValue
- 变更：update:input => update:modelValue
- 新增：一个组件可以设置多个 v-model
- 新增：开发者可以自定义 v-model修饰符
- v-bind 的 .sync 修饰符和组件的 model 选项已移除


1、概述：数据双向绑定
2、回顾：在Vue2.x中，v-model进行数据双向绑定（语法糖）的原理

```
<my-components v-model="msg"></my-components>
// 等价于
<my-components :value="msg" @input="value=$event"></my-components>

// myComponents组件中接收绑定数据和触发数据改变
props: { msg: String }; // 获取数据
this.$emit("input", 'newVal'); // 触发事件并传值
```
且在Vue2.x中不能够绑定多个v-model


3、用例：Vue3.x重写了v-model的实现方式，以适用用绑定多个v-model
①：单个数据实现数据双向绑定

```
<my-components v-model="msg"></my-components>
// 等价于
<my-components :modelValue="msg" @update:modelValue="value=$event"></my-components>

// myComponents组件中接收绑定数据和触发数据改变
props: { modelValue: String }; // 获取数据
setup(props, { emit }) {
    emit('update:modelValue', 'newValue'); // 触发事件并传值
};
```

②：多个数据实现数据双向绑定
```
<my-components v-model:msg="msg" v-model:name="name"></my-components>
// 等价于
<my-components :msg="msg" @update:msg="value=$event" :name="name" @update:name="name=$event"></my-components>

// myComponents组件中接收绑定数据和触发数据改变
props: { msg: String, name: String }; // 获取数据
setup(props, { emit }) {
    emit('update:msg', 'newValue'); // 触发事件并传值
    emit('update:name', 'newValue'); // 触发事件并传值
};
```


# useVModel语法糖

使用useVModel, 子组件就能修改父组件传递的属性值

父组件
```html
<div>
   <ChildComps
      v-model:visible="visibleFeedbackModal"
    />
</div>

```


子组件
```js
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  visible: string;
}>();
const emit = defineEmits(['update:visible']);

// 带有类型定义的写法
const emit = defineEmits<{
  (e: 'update:visible', params: any): void;
}>();


const visibleModel = useVModel(props, 'visible', emit);

const handleDialogClose = async () => {
    visibleModel.value = false;
};
  

```