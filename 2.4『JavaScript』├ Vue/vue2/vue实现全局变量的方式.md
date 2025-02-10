



## 1.创建一个模块充当全局模块

其实就是模块化开发全局变量，global模块：
```
export default {
    version: '0.0.1',
    name: 'name',
}
```

其他模块使用时引入global模块：

```
import global_ from 'global'

console.log(global_.version);
```

缺点：不是响应式，不能实时变化

## 2.全局变量挂载到 Vue.prototype

```
    Vue.prototype.$Global = {
        version:'0.0.1'
    }
```
挂载完之后需要的时候，不再需要导入，直接使用 this.$Global

```
exoprt default{
    data(){
        return{
            version: this.$Global.version
        }
    }
}

```

## 3.使用 Vuex

集中化组件状态管理

新建一个store.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        count:1
    },

    mutations:{
        add(state){
            state.count++;
        },
        reduce(state){
            state.count--;
        }
    }
})

```
然后再用到的组件中引入

```
import store from '@/store/store.js'

export default {
    data() {
        return {
            msg: 'countxxxx:'+store.state.count
        }
    }
}

```

## Vue.observable

多组件状态共享。vue.observable是一个用于创建可观察对象的函数    （vue 2.6以上的版本）

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器

```
import Vue from 'vue'

export const store = Vue.observable({
  name: '李四'
})
```

作用等同于

```
new vue({name:'李四'})
```





为了更好地理解Observable的使用，我们来看一个完整的实例。

1. 创建独立的全局变量存储文件

   ```
   // state.js
   
   import Vue from 'vue';
   
   export const state = Vue.observable({
     count: 0
   });
   ```

   2.在别的文件页面1引入使用

```
// Counter.vue

<template>
  <div>
    <p>{{ state.count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { state } from './state';
export default {
  data() {
    return {
      state
    };
  },
  methods: {
    increment() {
      this.state.count++;
    }
  }
};
</script>
```

页面2：与页面1 相同的引入方法，修改页面2 的值，页面1的值也会发生变化。