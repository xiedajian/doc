

官网： https://vuex.vuejs.org/zh/
文档： https://vuex.vuejs.org/zh/api/



# vuex

vue提供了另外一个类似 Redux 的解决方案 Vuex，一个集中式状态管理的库

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

把组件的共享状态抽取出来，以一个类似全局单例模式管理，但不完全一样。

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)


## 在理解之前先看个简单的状态管理概念

https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8



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

The state tree：Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。 

Getters：用来从 store 获取 Vue 组件数据。 

Mutators：事件处理器用来驱动状态的变化。 

Actions：可以给组件使用的函数，以此用来驱动事件处理器 mutations  


```
// 如果在模块化中，请确保在开头调用了Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		count:0
		},
	mutations:{
		increment(state){
			state.count++
		}
	}
	})


// 可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
store.commit('increment')

console.log(store.state.count)		// -> 1

```
