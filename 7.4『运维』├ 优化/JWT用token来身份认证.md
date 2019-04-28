


参考： https://www.cnblogs.com/xiekeli/p/5607107.html





# Token Auth的优点
Token机制相对于Cookie机制又有什么好处呢？

- 支持跨域访问: Cookie是不允许垮域访问的，这一点对Token机制是不存在的，前提是传输的用户认证信息通过HTTP头传输.
- 无状态(也称：服务端可扩展行):Token机制在服务端不需要存储session信息，因为Token 自身包含了所有登录用户的信息，只需要在客户端的cookie或本地介质存储状态信息.
更适用CDN: 可以通过内容分发网络请求你服务端的所有资料（如：javascript，HTML,图片等），而你的服务端只要提供API即可.
- 去耦: 不需要绑定到一个特定的身份验证方案。Token可以在任何地方生成，只要在你的API被调用的时候，你可以进行Token生成调用即可.
- 更适用于移动应用: 当你的客户端是一个原生平台（iOS, Android，Windows 8等）时，Cookie是不被支持的（你需要通过Cookie容器进行处理），这时采用Token认证机制就会简单得多。
- CSRF:因为不再依赖于Cookie，所以你就不需要考虑对CSRF（跨站请求伪造）的防范。
- 性能: 一次网络往返时间（通过数据库查询session信息）总比做一次HMACSHA256计算 的Token验证和解析要费时得多.
- 不需要为登录页面做特殊处理: 如果你使用Protractor 做功能测试的时候，不再需要为登录页面做特殊处理.
- 基于标准化:你的API可以采用标准化的 JSON Web Token (JWT). 这个标准已经存在多个后端库（.NET, Ruby, Java,Python, PHP）和多家公司的支持（如：Firebase,Google, Microsoft）.





# JWT

根据维基百科的定义，JSON WEB Token（JWT，读作 [/dʒɒt/]），是一种基于JSON的、用于在网络上声明某种主张的令牌（token）。

JWT通常由三部分组成: 头信息（header）, 消息体（payload）和签名（signature）。

头信息指定了该JWT使用的签名算法:

```
header = '{"alg":"HS256","typ":"JWT"}''
```

HS256 表示使用了 HMAC-SHA256 来生成签名

消息体包含了JWT的意图：

```
payload = '{"loggedInAs":"admin","iat":1422779638}'//iat表示令牌生成的时间
```

未签名的令牌由base64url编码的头信息和消息体拼接而成（使用"."分隔），签名则通过私有的key计算而成：

```
key = 'secretkey'  
unsignedToken = encodeBase64(header) + '.' + encodeBase64(payload)  
signature = HMAC-SHA256(key, unsignedToken) 
```
最后在未签名的令牌尾部拼接上base64url编码的签名（同样使用"."分隔）就是JWT了：

```
token = encodeBase64(header) + '.' + encodeBase64(payload) + '.' + encodeBase64(signature) 

# token看起来像这样: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI
```

JWT常常被用作保护服务端的资源（resource），客户端通常将JWT通过HTTP的Authorization header发送给服务端，服务端使用自己保存的key计算、验证签名以判断该JWT是否可信：



## JWT 该方案可防护CSRF攻击

跨站请求伪造Cross-site request forgery（简称CSRF, 读作 [sea-surf]）是一种典型的利用cookie-session漏洞的攻击，这里借用spring-security的一个例子来解释CSRF：

假设你经常使用bank.example.com进行网上转账，在你提交转账请求时bank.example.com的前端代码会提交一个HTTP请求:

```
POST /transfer HTTP/1.1
Host: bank.example.com
cookie: JsessionID=randomid; Domain=bank.example.com; Secure; HttpOnly
Content-Type: application/x-www-form-urlencoded

amount=100.00&routingNumber=1234&account=9876
```
你图方便没有登出bank.example.com，随后又访问了一个恶意网站，该网站的HTML页面包含了这样一个表单：

```
<form action="https://bank.example.com/transfer" method="post">
    <input type="hidden" name="amount" value="100.00"/>
    <input type="hidden" name="routingNumber" value="evilsRoutingNumber"/>
    <input type="hidden" name="account" value="evilsAccountNumber"/>
    <input type="submit" value="点击就送!"/>
</form>
```
你被“点击就送”吸引了，当你点了提交按钮时你已经向攻击者的账号转了100元。现实中的攻击可能更隐蔽，恶意网站的页面可能使用Javascript自动完成提交。尽管恶意网站没有办法盗取你的session cookie（从而假冒你的身份），但恶意网站向bank.example.com发起请求时，你的cookie会被自动发送过去。

因此，有些人认为前端代码将JWT通过HTTP header发送给服务端（而不是通过cookie自动发送）可以有效防护CSRF。



