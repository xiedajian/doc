
# vuex


vue提供了另外一个类似 Redux 的解决方案 Vuex，一个集中式状态管理的库

集中式状态管理模式则以一个全局单例模式管理应用的状态，类似于全局对象，但不完全一样。

Vuex 的状态管理存储是响应式的：就是当你的组件使用到了 Vuex 的某个状态，一旦它发生改变了，所有关联的组件都会自动更新相对应的数据


不能直接修改 Vuex 的状态：修改 Vuex 的状态唯一途径是提交(commit) mutations 来实现修改。


```



```


# Vuex 的四个核心概念分别是： 

The state tree：Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。至此它便作为一个『唯一数据源(SSOT)』而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。 

Getters：用来从 store 获取 Vue 组件数据。 

Mutators：事件处理器用来驱动状态的变化。 

Actions：可以给组件使用的函数，以此用来驱动事件处理器 mutations 


Vuex和简单的全局对象是不同的，当Vuex从store中读取状态值的时候，若状态发生了变化，那么相应的组件也会高效的更新。并且，改变store中状态的唯一途径就是提交commit mutations。这样便于我们跟踪每一次状态的变化。只要发生了状态的变化，一定伴随着mutation的提交。 


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
