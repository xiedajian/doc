



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

缺点：只能get，不能set

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