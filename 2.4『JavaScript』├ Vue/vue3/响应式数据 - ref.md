
# 响应式数据 - ref

本章将介绍的是另一个响应式数据的创建方式ref
1、概述：函数，创建并返回一个响应式数据对象，并在此对象上只包含一个.value属性指向该数据值；
2、用例：由vue提供，按需引入：import { ref } from 'vue';

```
<p>{{name}}</p>  // 视图中直接使用即可，不需要.value

import { ref } from 'vue';

setup() {
    const name = ref('zhang_san');
    console.log(name.value) // 'zhang_san'
    // 同样需要使用return返回
    return { name };
}
```

如果使用ref将一个对象创建为响应式代理的话，则该对象会被进行深度响应式创建
```
<p>{{data.count}}</p> // 0
<p>{{data.content.age}}</p> // 10 

setup(props, context) {
    const defaultVal = {
      count: 0,
      content: {
        age: 10
      }
    };
    const data = ref(defaultVal);
    console.log(data.value.count) // 0
    console.log(data.value.content.age) // 10
    return {
      data
    };
}
data.value.count ++ // 1 视图重新渲染
data.value.content.age++ // 11 视图重新渲染
```




下面是ref数据能访问到的部分常用方法及延伸方法。
unref()
1、概述：返回代理原始值，如果参数为ref则返回原始代理值，如果不是ref则返回参数本身
2、用例：由vue提供，按需引入：import { unref } from 'vue';

```
import { unref } from 'vue';
const a = ref(1);
const b = 'zhagn_san';
console.log(unref(a)) // 1
console.log(unref(b)) // zhagn_san
```


toRef()
1、概述：可以将reactive创建的代理的某个属性传递出来用ref进行代理
2、用例：由vue提供，按需引入：import { toRef } from 'vue';
```
import { reactive, toRef } from 'vue';
const data = reactive({ name: 'zhang_san', age: 20 });
const toRefValue = toRef(data, 'age');

toRefValue.value++  // toRefValue.value 21
console.log(data.age) // 21

data.age++ // data.age 22
console.log(toRefValue.value) // 22
```
3、注意：使用toRef将reactive的属性代理后，属性值的变化会同时影响toRef后的值和原本reactive的属性值
4、实例：在将prop的引用传递给复合函数的时候，toRef将非常有用
```
setup(props) {
    userHandler(toRef(props, 'name'));
    // 这将使得userHandler拿到的name为响应式代理
}
```



toRefs()
1、概述：可以将reactive创建的代理的所有属性传递出来用ref进行代理
2、用例：由vue提供，按需引入：import { toRefs } from 'vue';
```
import { reactive, toRefs } from 'vue';
const data = reactive({ name: 'zhang_san', age: 20 });
const toRefValue = toRefs(data);

toRefValue.age.value++  // toRefValue.age.value 21
console.log(data.age) // 21

data.age++ // data.age 22
console.log(toRefValue.age.value) // 22
```
3、注意：使用toRefs将reactive的属性代理后，属性值的变化会同时影响toRefs后的对应属性值和原本reactive的属性值
4、实例：从组合函数返回响应式对象时，这将很有用，而不是使用es6数据结构的方式，这样会使reactive的属性失去响应式代理
```
function userHandler() {
  const state = reactive({ name: 'zhang_san', age: 20});
  return toRefs(state)
}

export default {
  setup() {
    const { name, age} = userHandler();
    return { name, age };
  }
}
```



isRef()
1、概述：判断响应式代理是否为ref所创建
2、用例：由vue提供，按需引入：import { isRef } from 'vue';
```
import { ref, reactive, isRef } from 'vue';
const name = ref('zhang_san');
const user = reactive({sex: '男', age: 20});

console.log(isRef(name)) // true
console.log(isRef(user)) // false
// 应用场景：在获取一个未知的数据对象的值时，如：
const newV = isRef(name) ? name.value : name;
```