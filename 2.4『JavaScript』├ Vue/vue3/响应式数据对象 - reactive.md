
# 响应式数据对象 - reactive

本章将介绍到的是使用reactive来创建组件实例中的响应式数据对象。
1、概述：函数，创建一个响应式数据对象，响应式会影响到所有的子集嵌套；
2、用例：由vue提供，按需引入：import { reactive } from 'vue';
```
<template>
    <p>{{user.name}}</p>
</template>

<script>
    import { reactive } from 'vue';
    export default {
        setup() {
            const user = reactive({ name: 'li_si', age: 20 });
           return { user };
        }
    }
</script>
```




下面是reactive数据能访问到的部分常用方法及延伸方法。
readonly()
1、概述：创建一个只读代理，且原始对象的任何嵌套属性也将是只读的
2、用例：由vue提供，按需引入：import { readonly } from 'vue';
3、对普通变量创建只读：

```
<script>
    import { readonly } from 'vue';
    export default {
        setup() {
            const user = { name: 'li_si', age: 20 };
            const copy = readonly(user);
            return { copy };
        }
    }
</script>

copy.age++ // warning! target is readonly.
```
4、对reactive创建只读：
```
<script>
    import { reactive, readonly } from 'vue';
    export default {
        setup() {
            const user = reactive({ name: 'li_si', age: 20 });
            const copy = readonly(user);
            return { user };
        }
    }
</script>

user.age++ // age: 21
copy.age++ // warning! target is readonly.
```




isProxy()
1、概述：判读对象是否由reactive创建或者是readonly创建的代理。
2、用例：由vue提供，按需引入：import { isProxy } from 'vue';

```
import { ref, reactive, readonly, isProxy } from 'vue';

// ref创建
const refVal = ref(123);
isProxy(refVal) // false

// reactive创建
const reactiveVal = reactive({ age: 20 });
isProxy(reactiveVal) // true

// readonly代理
const readonlyVal = readonly(reactiveVal);
isProxy(readonlyVal) // true

// 普通变量
const defaultVal = 'default';
isProxy(defaultVal) // false
```




isReactive()
1、概述：检查对象是否由reactive创建
2、用例：由vue提供，按需引入：import { isReactive } from 'vue';

```
import { reactive, isReactive } from 'vue'
export default {
  setup() {
    const state = reactive({ name: 'zhang_san'});
    console.log(isReactive(state)) // true
  }
}
```
还能判断readonly代理的对象是否是由reactive创建
```
import { reactive, isReactive, readonly } from 'vue'
export default {
  setup() {
    const state = reactive({ name: 'zhang_san' });
    // 创建普通只读代理
    const plain = readonly({ name: 'li_si' });
    console.log(isReactive(plain)) // false
    // 创建reactive只读代理
    const stateCopy = readonly(state)
    console.log(isReactive(stateCopy)) // true
  }
}
```




isReadonly()
1、概述：检查代理是否由readonly创建
2、用例：由vue提供，按需引入：import { isReadonly } from 'vue';

```
import { reactive, readonly, isReadonly } from 'vue'
const reactiveVal = reactive({ name: 'zhang_san' });
const copy = readonly(reactiveVal);
console.log(isReadonly(copy)) // true
```








toRaw()
1、概述：返回reactive或者是readonly代理的原始对象
2、用例：由vue提供，按需引入：import { toRaw } from 'vue';
```
import { toRaw, reactive, readonly, isProxy } from 'vue';
const user = {}
const reactiveUser = reactive(user);
const readonlyUser = readonly(reactiveUser);

console.log(toRaw(reactiveUser) === user) // true
console.log(toRaw(readonlyUser) === user) // true
console.log(isProxy(toRaw(reactiveUser))) // false
console.log(isProxy(toRaw(readonlyUser))) // false
```







markRaw()
1、概述：标记一个对象，被标记后，该对象永远不会被转换为代理
2、用例：由vue提供，按需引入：import { markRaw } from 'vue';
```
import { markRaw, reactive, isReactive } from 'vue';
const user = markRaw({});
const reactiveUser = reactive(user);
console.log(isReactive(reactiveUser)) // false

const reactiveUser1 = reactive({ user });
console.log(isProxy(toRaw(reactiveUser1))) // true 
console.log(isProxy(toRaw(reactiveUser1.user))) // false
// 在reactive创建代理时，被markRaw标记的嵌套对象不会被reactive创建代理
```






shallowReactive()
1、概述：创建一个反应式代理，但是只是浅度创建。
2、用例：由vue提供，按需引入：import { shallowReactive } from 'vue';
```
import { isReactive, shallowReactive } from 'vue';
const data = shallowReactive({
    count: 10,
    content: {
        age: 20
    }
})
data.count++ // 11 逻辑层数据已发生变化，视图重新渲染
isReactive(data.content) // false 因为data.content属于深度嵌套，未被代理
data.content.age++ // 21 逻辑层数据已发生变化，但是视图层不会被更新渲染
```








shallowReadonly()
1、概述：创建一个只读代理，但是只是浅度创建。
2、用例：由vue提供，按需引入：import { shallowReadonly } from 'vue';
```
import { isReadonly, shallowReadonly } from 'vue';
const data = shallowReadonly({
    count: 10,
    content: {
        age: 20
    }
})
data.count++ // warning! target is readonly.
isReadonly(data.content) // false 因为data.content属于深度嵌套，未被代理
data.content.age++ // 21 深度嵌套未被代理，所以操作成功。
```




# reactive和ref的相互作用
1、将ref的数据对象挂载到reactive上时，会把原始的响应数据对象展开为原始值，这样就不需要.value而被直接访问到。

```
setup() {
    const ref1 = ref(0);
    const reative1 = reactive({ref1});
    console.log(reative1.ref1); // 0
    reative1.ref1 ++;
    console.log(reative1.ref1); // 1
    console.log(ref1.value); // 1
}
```


2、新的ref会覆盖旧的ref

```
setup() {
    const ref1 = ref(0);
    const reative = reactive({ref1});
    
    const ref2 = ref(100);
    reative.ref1 = ref2;
    reative.ref1 ++;
    
    console.log(reative.ref1); // 101
    console.log(ref2.value); // 101
    console.log(ref1.value); // 0
};
```

# ref和reactive区别

ref可以定义任何类型的数据,但是定义数据和对象时,在script部分使用时,赋值和取值，不如reactive方便
reactive只能用于数组，对象类型。
ref的本质是通过reactive创建的，ref(10)=>reactive({value:10});
reactive的本质是将每一层的数都解析成proxy对象，reactive 的响应式默认都是递归的，改变某一层的值都会递归的调用一遍，重新渲染dom


```html
<template>
    <p>{{count}}</p>
    <button @click="add">加1</button>
    <p>{{info.name}}</p>
    <button @click="changeName">改姓名</button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
interface Info{
  name:string;
  age:number;
}
// 响应式基本类型用ref
const count = ref<number>(0);
// 响应式引用类型用reactive
const info:Info = reactive({ age: 100,name:'zhangsan' });

const add = () => {
  // 基本类型赋值时，是赋值给value属性
  count.value += 1;
};

const changeName = () => {
  info.name="lisi";
};
</script>

```