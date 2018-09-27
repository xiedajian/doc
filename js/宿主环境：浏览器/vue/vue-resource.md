
# Vue-resource

Vue-resource有体积小，支持IE9以上的浏览器，支持promise特性的特点。同样推荐使用npm来安装Vue-resource。 

另外，vue-resource还提供了非常有用的inteceptor功能，使用inteceptor可以在请求前和请求后附加一些行为，比如使用inteceptor在ajax请求时显示loading界面。




# 安装

传统模式：引入vue-resource
<script src="js/vue.js"></script>
<script src="js/vue-resource.js"></script>

模块化：

$ npm install vue-resource 

在安装并引入vue-resource后，可以基于全局的Vue对象使用http，也可以基于某个Vue实例使用http


```
// 基于全局Vue对象使用http
Vue.http.get('/someUrl', [options]).then(successCallback, errorCallback);
Vue.http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

// 在一个Vue实例内使用$http
this.$http.get('/someUrl', [options]).then(successCallback, errorCallback);
this.$http.post('/someUrl', [body], [options]).then(successCallback, errorCallback);

```

在发送请求后，使用then方法来处理响应结果，then方法有两个参数，第一个参数是响应成功时的回调函数，第二个参数是响应失败时的回调函数

```
this.$http.get('/someUrl', [options]).then(function(response){
    // 响应成功回调
}, function(response){
    // 响应错误回调
});


```

## 支持的HTTP方法
vue-resource的请求API是按照REST风格设计的，它提供了7种请求API：

get(url, [options])
head(url, [options])
delete(url, [options])
jsonp(url, [options])
post(url, [body], [options])
put(url, [body], [options])
patch(url, [body], [options])

除了jsonp以外，另外6种的API名称是标准的HTTP方法。当服务端使用REST API时，客户端的编码风格和服务端的编码风格近乎一致，这可以减少前端和后端开发人员的沟通成本。


### options对象
发送请求时的options选项对象包含以下属性：

参数	类型	描述
url	string	请求的URL
method	string	请求的HTTP方法，例如：'GET', 'POST'或其他HTTP方法
body	Object, FormData string	request body
params	Object	请求的URL参数对象
headers	Object	request header
timeout	number	单位为毫秒的请求超时时间 (0 表示无超时时间)
before	function(request)	请求发送前的处理函数，类似于jQuery的beforeSend函数
progress	function(event)	ProgressEvent回调处理函数
credentials	boolean	表示跨域请求时是否需要使用凭证
emulateHTTP	boolean	发送PUT, PATCH, DELETE请求时以HTTP POST的方式发送，并设置请求头的X-HTTP-Method-Override
emulateJSON	boolean	将request body以application/x-www-form-urlencoded content type发送


### response对象
response对象包含以下属性：

方法	类型	描述
text()	string	以string形式返回response body
json()	Object	以JSON对象形式返回response body
blob()	Blob	以二进制形式返回response body
属性	类型	描述
ok	boolean	响应的HTTP状态码在200~299之间时，该属性为true
status	number	响应的HTTP状态码
statusText	string	响应的状态文本
headers	Object	响应头
