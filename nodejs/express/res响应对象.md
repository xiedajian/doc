


http://www.expressjs.com.cn/4x/api.html#res



# res
响应对象

## 响应对象方法
下表中响应对象（res）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

方法					描述
res.download()		提示下载文件。
res.end()			终结响应处理流程。
res.json()			发送一个 JSON 格式的响应。
res.jsonp()			发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect()		重定向请求。
res.render()		渲染视图模板。
res.send()			发送各种类型的响应。
res.sendFile		以八位字节流的形式发送文件。
res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。


中间件返回的响应是随意的，可以响应一个 HTML 错误页面、一句简单的话、一个 JSON 字符串，或者其他任何您想要的东西
