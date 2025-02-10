

# 观察者 - watch

本章将介绍的是Vue3.x中的观察者watch，区别于Vue2.x，采用了函数的模式实现

```
watch(data,()=>{},{})
```

参数一，监听的数据
参数二，数据改变时触发的回调函数（newVal,oldVal）
参数三，options配置项，为一个对象


1、概述：Vue2.x中的响应式变量监听，在Vue3.x中以方法的形式使用
2、使用：由vue提供，按需引入：import { watch } from 'vue';
3、监听单一数据

```
 import { ref, reactive, computed, watch } from 'vue';
setup(props) {
    // ref
    const age = ref(20);
    watch(() => age.value, (nv, ov) => { ... });
    
   // reactive
   const product = reactive({ name: '饮料', count: 1 });
   watch(() => product.count, (nv, ov) => { ... }); 
   
   // props
   watch(() => props.msg, (nv, ov) => { ... }); 
   
   // computed
   const userAge = computed(() => `今年${age.value}岁了！`);
   watch(() => userAge.value, (nv, ov) => { ... }); 
}
```


4、监听对象
```
import { ref, reactive, watch } from 'vue';
setup(props) {
    // ref
    const user = ref({ name: 'zhang_san', age: 20 });
    // 字面量引发的监听触发: user.value = { ... };
    watch(() => user.value, (nv, ov) => { ... });
    // 如果使用 user.value.age = 30这种方式去修改user的age值; 将不会触发上面的监听，需要使用watch的第三个参数（深度监听），且触发监听后的nv===ov true
    watch(() => user.value, (nv, ov) => { ... }, { deep: true });
    // 如果我们只需要监听name的值，那么
    watch(() => user.value.name, (nv, ov) => { ... });
    
   // reactive
   const reactiveData = reactive({ user: { name: 'zhang_san', age: 20 } });
    // 字面量引发的监听触发: reactiveData.user = { ... };
    watch(() => reactiveData.user, (nv, ov) => { ... });
    // 如果使用 user.user.age = 30这种方式去修改user的age值，将不会触发监听，需要使用watch的第三个参数（深度监听），且触发监听后的nv===ov true
    watch(() => reactiveData.user, (nv, ov) => { ... }, { deep: true });
    // 如果我们只需要监听name的值，那么
    watch(() => reactiveData.user.name, (nv, ov) => { ... });
}

```


5、监听数组
```
import { ref, reactive, watch } from 'vue';
setup(props) {
   // ref
   const user = ref([
      { name: 'zhang_san', age: 10 },
      { name: 'li_si', age: 10 }
   ]);
   // 字面量引发的监听触发: user.value = [ ... ];
   watch(() => user.value, (nv, ov) => { ... });
  // 如果使用数组的操作方法（如：push()）或者user.value[0].age = 20这类操作去修改数组某项的属性值，将不会触发监听，也需要使用深度监听模式，且触发监听后的nv===ov true
  watch(() => user.value, (nv, ov) => { ... }, { deep: true });
  
  // reactive
  const reactiveData = reactive({
    user: [
      { name: 'zhang_san', age: 10 },
      { name: 'li_si', age: 10 }
   ]
  });
  // 字面量引发的监听触发: user.user = [ ... ];
  watch(() => reactiveData.user, (nv, ov) => { ... });
  // 如果使用数组的操作方法（如：push()）或者user.value[0].age = 20这类操作去修改数组某项的属性值，将不会触发监听，也需要使用深度监听模式，且触发监听后的nv===ov true
  watch(() => reactiveData.user, (nv, ov) => { ... }, { deep: true });
}

```

6、监听多个数据
```
import { ref, reactive, computed, watch } from 'vue';
setup(props) {
    const age = ref(20);
    const user = ref({ name: 'zhang_san', age: 20 });
    
    watch([() => age.value, () => user.name], ([newAge, newName], [oldAge, oldName]) => { ... });
}
```


7、终止监听
```
import { ref, watch } from 'vue';
const age = ref(20);
// watch监听会返回一个方法
const stop = watch(age, (nv, ov) => { ... });
// 当调用此方法后，该监听就会被移除
stop();
```

8、清除watch中无效的异步任务
```
<template>
  <div>
    <input type="text" v-model="keywords" />
  </div>
</template>

<script>
import { watch, ref, reactive } from "@vue/composition-api";
export default {
  setup() {
    const keywords = ref("");
    // 异步任务：打印用户输入的关键词
    const asyncPrint = val => {
      return setTimeout(() => {
        console.log(val);
      }, 1000);
    };

    watch(
      keywords,
      (keywords, prevKeywords, onCleanup) => {
        // 执行异步任务，并得到关闭异步任务的 timerId
        const timerId = asyncPrint(keywords);
        // 如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        onCleanup(() => clearTimeout(timerId));
      },
      { lazy: true }
    );
    return {
      keywords
    };
  }
};
</script>
```


# WatchEffect

会立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。（有点像计算属性）

如果用到 a 就只会监听 a, 就是用到几个监听几个 而且是非惰性,会默认调用一次

```html
<script setup lang="ts">
import { ref, watchEffect } from "vue";

let num = ref(0)

//3s后改变值
setTimeout(() => {
  num.value++
}, 3000)

watchEffect(() => {
  console.log('num 值改变：', num.value)
})

</script>
```
可以在控制台上看到，第一次进入页面时，打印出num 值改变：0,三秒后，再次打印num 值改变：1


2. WatchEffect 停止监听

当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。
但是我们采用异步的方式创建了一个监听器，这个时候监听器没有与当前组件绑定，所以即使组件销毁了，监听器依然存在。
这个时候我们可以显式调用停止监听

```
<script setup lang="ts">
import { watchEffect } from 'vue'
// 它会自动停止
watchEffect(() => {})
// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)

const stop = watchEffect(() => {
  /* ... */
})

// 显式调用
stop()
</script>
```


3. 清除副作用（onInvalidate）

watchEffect 的第一个参数——effect函数——可以接收一个参数：叫onInvalidate，也是一个函数，用于清除 effect 产生的副作用

就是在触发监听之前会调用一个函数可以处理你的逻辑，例如防抖

```
import { ref, watchEffect } from "vue";

let num = ref(0)

//3s后改变值
setTimeout(() => {
  num.value++
}, 3000)

watchEffect((onInvalidate) => {
  console.log(num.value)
  onInvalidate(() => {
    console.log('执行');
  });
})
```
控制台依次输出：0 => 执行 => 1


watchEffect的第二个参数，用来定义副作用刷新时机，可以作为一个调试器来使用

flush （更新时机）：
1、pre：组件更新前执行
2、sync：强制效果始终同步触发
3、post：组件更新后执行

```
<script setup lang="ts">
import { ref, watchEffect } from "vue";

let num = ref(0)

//3s后改变值
setTimeout(() => {
  num.value++
}, 3000)

watchEffect((onInvalidate) => {
  console.log(num.value)
  onInvalidate(() => {
    console.log('执行');
  });
}, {
  flush: "post", //此时这个函数会在组件更新之后去执行
  onTrigger(e) { //作为一个调试工具，可在开发中方便调试
    console.log('触发', e);
  },
})
</script>
```


# watch和watchEffect的区别

watch 是需要传入侦听的数据源，而 watchEffect 是自动收集数据源作为依赖。
watch 可以访问侦听状态变化前后的值，而 watchEffect 没有，watchEffect获取的改变后的值。
watch 是属性改变的时候执行，当然也可以immediate，而 watchEffect 是默认会执行一次，然后属性改变也会执行。
watch监听ref值，不用加.value,
watch监听对象的某个属性值时,书写方式是watch([()=>obj.propA],()=>{})

```
// 情况一监听ref响应式数据
 watch(count,(newValue,oldValue)=>{
     console.log(newValue,oldValue)
 },{immediate:true}) // immediate 立即监听

// 情况二 监听多个ref响应式数据
watch([count,name],(newValue,oldValue) =>{
    console.log(newValue,oldValue) // 此时value的数据是数组
})

// 情况三 监听reactvie响应式数据
// 如果watch监听是reactive定义的响应式数据，则无法获取正确的oldValue,且强制开启深度监听。
   watch(person,(newValue,oldValue)=>{
       console.log(newValue,oldValue) // 两个值一致都是一样的
   })
  
  // 情况四 监听reactive定义的响应式数据的某个属性(基础数据类型)
  watch(()=>person.name,(newValue,oldValue) =>{
      console.log(newValue,oldValue)
  })
  
 // 情况五 监听多个reactive定义的多个响应式数据的属性(基础数据类型)
 watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
  console.log(newValue,oldValue)
 })
 
 // 情况六 监听reactive定义的响应式数据的某个属性(复杂数据类型)
 watch(() => person.class,(newValue,oldValue) =>{
   // 此时的class 为 { b:{c:20 } }, 想要监听c值的变化 则需要开启deep深度监听
   console.log(newValue,oldValue)
 },{deep:true}) 


```