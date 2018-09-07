



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



