

文档： https://www.kancloud.cn/yunye/axios/234845
官网： https://www.axios.com/
gitHub: https://github.com/axios/axios


# axios

axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端


它本身具有以下特征：

- 从浏览器中创建 XMLHttpRequest
- 从 node.js 发出 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防止 CSRF/XSRF



## 安装

安装其他插件的时候，可以直接在 main.js 中引入并 Vue.use()，但是 axios 并不能 use，只能每个需要发送请求的组件中即时引入

为了解决这个问题，有两种开发思路，一是在引入 axios 之后，修改原型链，二是结合 Vuex，封装一个 aciton


使用npm

npm install axios 

使用cdn:

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>



### 使用

模块化使用需先引入axios模块

```
	import axios from 'axios'	
```

执行 GET 请求

```
	// 为给定 ID 的 user 创建请求
	axios.get('/user?ID=12345')
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });

	// 可选地，上面的请求可以这样做
	axios.get('/user', {
	    params: {
	      ID: 12345
	    }
	  })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
```

执行 POST 请求

```
	axios.post('/user', {
	    firstName: 'Fred',
	    lastName: 'Flintstone'
	  })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
```


可以通过向 axios 传递相关配置来创建请求

```
	axios(config)
	// 发送 POST 请求
	axios({
	  method: 'post',
	  url: '/user/12345',
	  data: {
	    firstName: 'Fred',
	    lastName: 'Flintstone'
	  }
	});

```


请求方法的别名
为方便起见，为所有支持的请求方法提供了别名

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

> axios post方法默认使用application/json格式编码数据


### 解决post方法使用application/x-www-form-urlencoded格式编码数据

1. 设置  headers:{ 'Content-type': 'application/x-www-form-urlencoded'}
   
```
axios.post('url',data,{headers:{ 'Content-type': 'application/x-www-form-urlencoded'}})

// 不想在每次请求都设置的话，可以集中设置下
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

```
2. 仅仅这样并没有达到想要的效果，post的body主体中还是{"age":10}这样的格
   式，并不是我们想要的query参数。引入Qs，这个库是axios里面包含的，不需要再下载了
	 ```
	 import qs from 'qs'
	 var data = qs.stringify({"name":"xie"});
	 axios.post('url',data).then()
	``` 

### 并发

处理并发请求的助手函数

axios.all(iterable)
axios.spread(callback)





# 配合vue



Vue 原本有一个官方推荐的 ajax 插件 vue-resource，但是自从 Vue 更新到 2.0 之后，官方就不再更新 vue-resource

目前主流的 Vue 项目，都选择 axios 来完成 ajax 请求

之前一直使用的是 vue-resource插件，在主入口文件引入import VueResource from 'vue-resource'之后，直接使用Vue.use(VueResource)之后即可将该插件全局引用了；


初用axios时，无脑的按照上面的步骤进行全局引用，结果当时是惨惨的。 
看了看文档，Axios 是一个基于 promise 的 HTTP 库

> axios并没有install 方法，所以是不能使用vue.use()方法的。 
> 那么难道每个文件都要来引用一次？解决方法有很多种： 
> 1.结合 vue-axios使用 
> 2. axios 改写为 Vue 的原型属性 
> 3.结合 Vuex的action

### 结合 vue-axios使用

vue-axios

用于将axios集成到Vuejs的小包装器

github: https://github.com/axios/axios

安装： npm install --save axios vue-axios

vue-axios是按照vue插件的方式去写的。那么结合vue-axios，就可以去使用vue.use方法了

```
首先在主入口文件main.js中引用

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);
```
之后就可以使用了，在组件文件中的methods里去使用了

```
getNewsList(){
      this.axios.get('api/getNewsList').then((response)=>{
        this.newsList=response.data.data;
      }).catch((response)=>{
        console.log(response);
      })


    },
```

### 方法2： axios 改写为 Vue 的原型属性

首先在主入口文件main.js中引用，之后挂在vue的原型链上

import axios from 'axios'
Vue.prototype.$ajax= axios


在组件中使用

```
this.$ajax.get('api/getNewsList').then((response)=>{
        this.newsList=response.data.data;
      }).catch((response)=>{
        console.log(response);
      })
```


### 方法3：结合vuex

在vuex在封装一层
