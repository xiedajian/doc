
文档： https://router.vuejs.org/installation.html

# vue-router

Vue Router是Vue.js的官方路由器。它与Vue.js核心深度集成，使用Vue.js构建单页应用程序变得轻而易举。

功能包括：

- 嵌套路由/视图映射

- 模块化，基于组件的路由器配置

- 路线参数，查询，通配符

- 查看由Vue.js过渡系统提供支持的过渡效果

- 细粒度的导航控制

- 与自动活动CSS类的链接

- HTML5历史模式或哈希模式，在IE9中具有自动回退功能

- 可自定义的滚动行为


## 模块化工程中明确地安装路由功能

如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

```
	import Vue from 'vue'
	import VueRouter from 'vue-router'

	Vue.use(VueRouter)
```
如果使用全局的 script 标签，则无须如此


## 路由之间跳转？

声明式（标签跳转）  <router-link :to="index">	

编程式（ js跳转）   router.push('index')

## 使用

Vue-router通过管理URL，实现URL和组件的对应，以及通过URL进行组件之间的切换。

把vue-router添加进来，需要做的是，将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们

```
    /***
     * 定义路由4步曲
     * 0. 如果是模块化，比如vue-cli，需要先Vue.use(VueRouter)
     * 1. route 定义单个路由的内容
     * 2. routes 定义路由组
     * 3. router 定义vue-router路由
     * 4. router 挂在到组件
     * */

    /***
     * 使用路由，主要靠两个标签
     * <router-link> 链接
     * <router-view> 显示在哪里
     * */
```


路由中有三个基本的概念 route, routes, router。

1， route，它是一条路由，由这个英文单词也可以看出来，它是单数

2， routes 是一组路由，把上面的每一条路由组合起来，形成一个数组。[{home 按钮 =>home内容 }， { about按钮 => about 内容}]

3， router 是一个机制，相当于一个管理者，它来管理路由。因为routes 只是定义了一组路由，它放在哪里是静止的，当真正来了请求，怎么办？ 就是当用户点击home 按钮的时候，怎么办？这时router 就起作用了，它到routes 中去查找，去找到对应的 home 内容，所以页面中就显示了 home 内容。

4，客户端中的路由，实际上就是dom 元素的显示和隐藏。当页面中显示home 内容的时候，about 中的内容全部隐藏，反之也是一样。客户端路由有两种实现方式：基于hash 和基于html5 history api.

在vue-router中, 我们看到它定义了两个标签<router-link> 和<router-view>来对应点击和显示部分。<router-link> 就是定义页面中点击的部分，<router-view> 定义显示部分，就是点击后，区配的内容显示在什么地方。所以 <router-link> 还有一个非常重要的属性 to，定义点击之后，要到哪里去，
 如：<router-link  to="/home">Home</router-link>


## 命名路由

路由的name属性可以给路由命名，这样就可以在<router-link>更方便使用

```
	const router = new VueRouter({
	  routes: [
	    {
	      path: '/user/:userId',
	      name: 'user',
	      component: User
	    }
	  ]
	})

```
下面是html中和js中导航到指定路由的用法
```
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

```
router.push({ name: 'user', params: { userId: 123 }})

```



## 命名视图

有时候想同时（同级）展示多个视图，而不是嵌套展示，

例如创建一个布局，有 sidebar（侧导航） 和 main（主内容） 两个视图，这个时候命名视图就派上用场了。

你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。

如果 router-view 没有设置名字，那么默认为 default。


```
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>

```
界面中两个视图

```
	var Foo = { template: '<div>foo</div>' }
	var Bar = { template: '<div>bar</div>' }
	var routes = [
	        {
	            path:"/one",
	            name:"one",
	            components:{
	                a:Foo,
	                b:Bar
	            }
	        },
	    ]

```




## 重定向和别名

重定向：

重定向(Redirect)就是通过各种方法将各种网络请求重新定个方向转到其它位置,用于网站调整或网页被移到一个新地址,它也是通过 routes 配置来完成，

下面例子是从 /a 重定向到 /b：

```
	var router = new VueRouter({
	  routes: [
	    { path: '/a', redirect: '/b' }
	  ]
	})
```

别名:

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

简单的说就是给 /a 起了一个外号叫做 /b ,但是本质上还是 /a

上面对应的路由配置为：

```
	var router = new VueRouter({
	  routes: [
	    { path: '/a', component: A, alias: '/b' }
	  ]
	})
```

『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。



## 路由组件传参

在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性

使用 props 将组件和路由解耦：

取代与 $route 的耦合

```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})

```

通过 props 解耦

```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。



## 入门


使用Vue.js，我们已经在使用组件编写应用程序。

将Vue Router添加到混合中时，我们需要做的就是将组件映射到路由，让Vue Router知道在哪里渲染它们

```
	<div id="app">
	  <h1>Hello App!</h1>
	  <p>
	    <router-link to="/foo">Go to Foo</router-link>
	    <router-link to="/bar">Go to Bar</router-link>
	  </p>
	  <router-view></router-view>
	</div>


	const Foo = { template: '<div>foo</div>' }
	const Bar = { template: '<div>bar</div>' }

	const routes = [
	  { path: '/foo', component: Foo },
	  { path: '/bar', component: Bar }
	]

	const router = new VueRouter({
	  routes // short for `routes: routes`
	})

	const app = new Vue({
	  router
	}).$mount('#app')


	export default {
	  computed: {
	    username () {
	      // We will see what `params` is shortly
	      return this.$route.params.username
	    }
	  },
	  methods: {
	    goBack () {
	      window.history.length > 1
	        ? this.$router.go(-1)
	        : this.$router.push('/')
	    }
	  }
	}

```

## HTML5 History 模式

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```
不过这种模式要玩好，还需要后台配置支持。

因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面