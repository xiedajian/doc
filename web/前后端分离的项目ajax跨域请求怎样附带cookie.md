

原文：https://blog.csdn.net/palerock/article/details/73456992
参考：https://www.cnblogs.com/gdufs/p/8442648.html

## 在前后端分离的项目中，ajax跨域请求怎样附带cookie

在项目的实际开发中，我们总会遇到前后端分离的项目，在这样的项目中，跨域是第一个要解决的问题

除此之外，保存用户信息也是很重要的

然而，在后台保存用户信息通常使用的session和cookie结合的方法，

而在前端的实际情况中，跨域产生的ajax是无法携带cookie信息的，这样导致了session和cookie的用户信息储存模式受到影响，该怎样去解决这样一个问题呢


跨域了，不会带上已有的 Cookie

解决方案

1.自己架个反向代理啥的把两个搞到一个域名上。

2.前端设置withCredentials，后端设置Access-Control-Allow-Credentials。

```
// 后端设置Access-Control-Allow-Credentials
// 解决跨越问题
	  response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods", "*");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,SessionToken");


	// 允许跨域请求中携带cookie
        response.setHeader("Access-Control-Allow-Credentials", "true");


```

```
// 前端设置withCredentials

$.ajax({
  type: "post",
  url: xxx,
  data: xxx,
  contentType: 'application/json',
  dataType: "json",
  xhrFields: {
      withCredentials: true
  },

  success: function (data) {
  }
})
```
注意：  后台解决跨域代码的response.setHeader("Access-Control-Allow-Origin", "*");这部分和设置跨域携带cookie部分产生了冲突，在查阅相关资料我发现设置跨域ajax请求携带cookie的情况下，必须指定Access-Control-Allow-Origin，意思就是它的值不能为*，设置为response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));