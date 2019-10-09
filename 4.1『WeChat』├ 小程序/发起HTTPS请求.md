[发起HTTPS网络通信](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=000ee27c9c8d98ab0086788fa5b00a)


小程序经常需要往服务器传递数据或者从服务器拉取信息，这个时候可以使用wx.request这个API，


# wx.request接口

如果我们需要从 https://test.com/getinfo 接口拉取用户信息，其代码示例如下所示
```
wx.request({

  url: 'https://test.com/getinfo',

  success: function(res) {

    console.log(res)// 服务器回包信息

  }

})
```

```
wx.request详细参数

参数名	类型	必填	默认值	描述
url	String	是		开发者服务器接口地址
data	Object/String	否		请求的参数
header	Object	否		设置请求的 header，header 中不能设置 Referer，默认header['content-type'] = 'application/json'
method	String	否	GET	（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
dataType	String	否	json	回包的内容格式，如果设为json，会尝试对返回的数据做一次 JSON解析
success	Function	否		收到开发者服务成功返回的回调函数，其参数是一个Object，见表4-2。
fail	Function	否		接口调用失败的回调函数
complete	Function	否		接口调用结束的回调函数（调用成功、失败都会执行）
```


## 请求参数

url是有长度限制的，其最大长度是1024字节，同时url上的参数需要拼接到字符串里，参数的值还需要做一次urlEncode。

向服务端发送的数据超过1024字节时，就要采用POST的形式，

用JSON格式会更加合适。此时我们可以在wx.request的header参数设置content-type头部为application/json，

POST:
```
// 请求的包体为 {"a":{"b":[1,2,3],"c":{"d":"test"}}}

wx.request({
  url: 'https://test.com/postdata',
  method: 'POST',
  header: { 'content-type': 'application/json'},
  data: {
    a: {
      b: [1, 2, 3],
      c: { d: "test" }
    }
  },
  success: function(res) {
    console.log(res)// 服务器回包信息
  }
})
```


GET: (两种方式)
```
// 通过url参数传递数据
wx.request({
  url:'https://test.com/getinfo?id=1&version=1.0.0',
  success: function(res) {
    console.log(res)// 服务器回包信息
  }
})

// 通过data参数传递数据
wx.request({
  url: 'https://test.com/getinfo',
  data: { id:1, version:'1.0.0' },
  success: function(res) {
    console.log(res)// 服务器回包信息
  }
})
```



## 响应参数

```
wx.request的success返回参数

参数名		类型			描述
data		Object/String	开发者服务器返回的数据
statusCode	Number			开发者服务器返回的 HTTP 状态码
header		Object			开发者服务器返回的 HTTP Response Header
```

尤其注意，只要成功收到服务器返回，无论HTTP状态码是多少都会进入success回调。
因此开发者自己通过对回包的返回码进行判断后再执行后续的业务逻辑。

success回调的参数data字段类型是根据header['content-type']决定的，
默认header['content-type']是'application/json'，在触发success回调前，小程序宿主环境会对data字段的值做JSON解析，
如果解析成功，那么data字段的值会被设置成解析后的Object对象，其他情况data字段都是String类型，其值为HTTP回包包体。



## 设置请求超时

小程序request默认超时时间是60秒，

在小程序项目根目录里边的app.json可以指定request的超时时间。
```
{
  "networkTimeout": {
    "request": 3000
  }
}
```


## 注意

url参数是当前发起请求的服务器接口地址，小程序宿主环境要求request发起的网络请求必须是https协议请求

同时为了保证小程序不乱用任意域名的服务，wx.request请求的域名需要在小程序管理平台进行配置

如果小程序正式版使用wx.request请求未配置的域名，在控制台会有相应的报错。


