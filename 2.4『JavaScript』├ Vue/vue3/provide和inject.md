[原文](https://www.jianshu.com/p/0ca1b4e1a44c)

本章将介绍到的是Vue3.x中的provide和inject，他们的使用时成组合使用，用于从父级组件向下级的子组件，孙组件传递值。
1、概述：实现嵌套组件树形数据传递与接收。
2、使用：由vue提供，按需引入：import { provide, inject } from 'vue';
3、用例：

```
import { provide, inject } from 'vue'
// 父组件注入
const component = {
  setup() {
    provide('name', 'zhagn_san');
    // 如果是需要注入多个值则重复使用provide即可
  };
};
// 子组件接收
const children = {
  setup() {
    // inject的第二个参数为没有接收到注入的数据时的默认返回值，如果没有，则返回undefined
    const user = inject('name', 'li_si');
    // 需要接收多个注入的值也是重复使用inject即可
    return { user };
  };
};
```

4、实例：再实际使用过程中，往往我们需要将注入的值实现响应式变化，则需要注入响应式
```
// 父组件注入
const component = {
  setup() {
    const user = reactive({ name: 'zhagn_san', age: 20 });
    provide('user', user);
  };
};
// 子组件接收后，如果父组件中的user发生了改变，则子组件中也会发生响应式变化
const children = {
  setup() {
    const user = inject('user', {});
    return { user };
  };
};
```

5、注意：不建议在注入时对响应式变量进行改变（在子组件中改变注入的值），因为此操作会改变Vue的单向数据流。建议采用注入改变其值的方法来对响应式变量进行改变。
```
import { reactive, provide, inject } from 'vue'
// 父组件注入
const component = {
  setup() {
    const user = reactive({ name: 'zhagn_san', age: 20 });
    function changeHandler() {
        user.age = 30;
    }
    provide('user', user);
   provide('changeHandler', changeHandler);
  };
};
// 子组件接收后，通过调用注入的方法来对响应式变量进行改变
const children = {
  setup() {
    const user = inject('user', {});
    const changeHandler = inject('changeHandler');
    return { user, changeHandler };
  };
};
```