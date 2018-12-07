

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



# 使用

模块化使用需先引入axios模块

```
	import axios from 'axios'	
```


## 执行 GET 请求

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

## 执行 POST 请求

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


# 请求方法的别名

为方便起见，为所有支持的请求方法提供了别名

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])

> axios post方法默认使用application/json格式编码数据

请求配置:

这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

```
{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```


# 响应结构

某个请求的响应包含以下信息

```
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
}

```

使用 then 时，你将接收下面这样的响应：
```
axios.get('/user/12345')
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```


# 配置的默认值/defaults

你可以指定将被用在各个请求的配置默认值

全局的 axios 默认值
```
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

自定义实例默认值
```
// 创建实例时设置配置的默认值
var instance = axios.create({
  baseURL: 'https://api.example.com'
});

// 在实例已创建后修改默认值
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

配置的优先顺序

配置会以一个优先顺序进行合并。

这个顺序是：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。

后者将优先于前者。这里是一个例子：
```
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```


# 拦截器

在请求或响应被 then 或 catch 处理前拦截它们

```
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你想在稍后移除拦截器，可以这样：
```
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

可以为自定义 axios 实例添加拦截器
```
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```



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



# axios默认是不让ajax请求头部携带cookie的
# axios 解决跨域cookie丢失问题

设置 axios.defaults.withCredentials = true 即可

示例代码：
```
                axios.defaults.withCredentials = true;
                var param = new URLSearchParams();
                param.append("vCode",vcode);
                axios.post('http://localhost',param)
                    .then(function(res) {
                        var rs=res.data;
                        console.log(rs.data);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
```




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
Vue.prototype.$axios= axios


在组件中使用

```
this.$axios.get('api/getNewsList').then((response)=>{
        this.newsList=response.data.data;
      }).catch((response)=>{
        console.log(response);
      })
```


### 方法3：结合vuex

在vuex在封装一层
