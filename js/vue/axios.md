

文档： https://www.kancloud.cn/yunye/axios/234845
官网： https://www.axios.com/


Vue 原本有一个官方推荐的 ajax 插件 vue-resource，但是自从 Vue 更新到 2.0 之后，官方就不再更新 vue-resource

目前主流的 Vue 项目，都选择 axios 来完成 ajax 请求


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


### 并发

处理并发请求的助手函数

axios.all(iterable)
axios.spread(callback)
