
# 内置模块

没有UI的模块，就是手机的硬件功能


# 原生模块

Weex 推荐将它们包装到模块中，然后使用 weex.requireModule('xxx') 来引入。 

这是使用 javascript 调用原生功能的一种方法，如网络，存储，剪贴板和页面导航等功能。



## stream

用于实现网络请求

```
fetch(options, callback[,progressCallback])
```

- options {Object}：请求的一些选项
    - method {string}： HTTP 方法 GET 或是 POST,PUT，DELETE，HEAD，PATCH
    - url {string}：请求的 URL
    - headers {Object}：HTTP 请求头
    - type {string}：响应类型, json,text 或是 jsonp {在原生实现中其实与 json 相同)
    - body {string}：HTTP 请求体
- callback {Function}：响应结果回调，回调函数将收到如下的 response 对象
    - status {number}：返回的状态码
    - ok {boolean}：如果状态码在 200~299 之间就为真。
    - statusText {string}：状态描述文本
    - data {Object | string}: 返回的数据，如果请求类型是 json 和 jsonp，则它就是一个 object ，如果不是，则它就是一个 string。
    - headers {Object}：响应头
- progressCallback {Function}：关于请求状态的回调。 这个回调函数将在请求完成后就被调用
    - readyState {number}：当前状态
    - status {number}：响应状态码.
    - length {number}：已经接受到的数据长度. 你可以从响应头中获取总长度
    - statusText {string}：状态文本
    - headers {Object}：响应头

>  body 参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。
>  GET 请求不支持 body 方式传递参数，请使用 url 传参
> 默认 Content-Type 是 ‘application/x-www-form-urlencoded’
> 如果你需要通过 POST json ， 需要将 Content-Type 设为 ‘application/json’