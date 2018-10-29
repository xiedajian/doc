

官网： https://vuex.vuejs.org/zh/
文档： https://vuex.vuejs.org/zh/api/



# vuex

vue提供了另外一个类似 Redux 的解决方案 Vuex，一个集中式状态管理的库

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

把组件的共享状态抽取出来，以一个类似全局单例模式管理，但不完全一样。

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)


## 在理解之前先看个简单的状态管理概念

https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8


## 为什么需要 vuex

在一个简单的 Vue 计数应用
```
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```
这个状态自管理应用包含以下几个部分：

state，驱动应用的数据源；
view，以声明方式将 state 映射到视图；
actions，响应在 view 上的用户输入导致的状态变化。

*遇到的问题：多个组件共享状态*
1.多个视图依赖于同一状态，父子组件间传参非常繁琐，兄弟组件间传递更加繁琐
2.不同视图的行为需要变更同一状态，父子组件直接引用或者通过事件来变更和同步状态的多份拷贝非常繁琐脆弱

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？

在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。



## vuex 和单纯的全局对象有一下两点不同

1. Vuex 的状态管理存储是响应式的：就是当你的组件使用到了 Vuex 的某个状态，一旦它发生改变了，所有关联的组件都会自动更新相对应的数据

2. 不能直接修改 Vuex 的状态：修改 Vuex 的状态唯一途径是提交(commit) mutations 来实现修改。这样的好处是可以做记录，方便调试



## 最简单的 store

安装 Vuex 之后，让我们来创建一个 store。创建过程直截了当——仅需要提供一个初始 state 对象和一些 mutation：

```
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


```

现在，你可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更：

```
	store.commit('increment')

	console.log(store.state.count) // -> 1

```

再次强调，我们通过提交 mutation 的方式，而非直接改变 store.state.count

这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变




# Vuex 的四个核心概念分别是： 

State： 单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。 

Getters：可以认为是 store 的计算属性。 有时候我们需要从 store 中的 state 中派生出一些状态，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来

Mutators：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。  注意：Mutation 必须是同步函数

Actions：Action 类似于 mutation, 不同在于：Action 提交的是 mutation，而不是直接变更状态. Action 可以包含任意异步操作。


## State 详解

在 Vue 组件中获得 Vuex 状态

从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态

```
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}

```
每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要*频繁地导入*，并且在测试组件时需要模拟状态。


####  改进

Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：

```
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到。让我们更新下 Counter 的实现：
```
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```





## Getters 详解

getters 可以认为是 store 的计算属性,有时候我们需要从 store 中的 state 中派生出一些状态,

就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。


Getter 接受 state 作为其第一个参数,其他 getter 作为第二个参数：

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
		doneTodosCount: (state, getters) => {
			return getters.doneTodos.length
		}
  }
})
```


其他组件通过属性访问

Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：
```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```


通过方法访问
你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果





## Mutation 详解

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，

并且它会接受 state 作为第一个参数：
```
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

mutations 注册的事件不能直接调用， 而是需要通过 commit 提交的方式来触发

```
store.commit('increment')
```


#### 提交载荷(传参)

提交时传递参数， 第二个参数，即 mutation 的 载荷（payload）, 最好是一个对象，这样可以传递的信息比较多
```
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

组件中使用 this.$store.commit('xxx') 提交 mutation
```
store.commit('increment', {
  amount: 10
})
```

> Mutation 必须是同步函数




## Action 详解

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）：
```
actions: {
  increment ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```


Action 通过 store.dispatch 方法触发：
```
store.dispatch('increment')
```

Actions 支持同样的载荷方式和对象方式进行分发：
```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```


来看一个更加实际的购物车示例，涉及到调用异步 API 和分发多重 mutation：
```
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

####  组合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：

```
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：
```
store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：
```
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async / await，我们可以如下组合 action：
```
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```


> 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。





# 辅助函数

Vuex 除了提供我们 Store 对象外，还对外提供了一系列的辅助函数，方便我们在代码中使用 Vuex，提供了操作 store 的各种属性的一系列语法糖

#### mapState

mapState 工具函数会将 store 中的 state 映射到局部计算属性中

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

利用对象展开符 ... 进一步简化写法
```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```


#### mapGetters

mapGetters 工具函数会将 store 中的 getter 映射到局部计算属性中。它的功能和 mapState 非常类似

```
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：
```
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```


#### mapMutations

在组件中提交 Mutation 你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，

或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。

mapMutations 工具函数会将 store 中的 commit 方法映射到组件的 methods 中。和 mapActions 的功能几乎一样

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```


#### mapActions

mapActions 工具函数会将 store 中的 dispatch 方法映射到组件的 methods 中

你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：

```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```




# 将 store 分割成模块 Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。

每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

详情查看： [https://vuex.vuejs.org/zh/guide/modules.html](https://vuex.vuejs.org/zh/guide/modules.html)