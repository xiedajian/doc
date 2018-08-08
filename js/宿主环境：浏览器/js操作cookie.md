

参考文档： http://javascript.ruanyifeng.com/bom/cookie.html

# cookie

cookie 是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。

你可以使用 JavaScript 来创建和取回 cookie 的值。

Cookie 以名/值对形式存储

举例来说，用户访问网址www.example.com，服务器在浏览器写入一个 Cookie。这个 Cookie 就会包含www.example.com这个域名，以及根路径/。这意味着，这个 Cookie 对该域名的根路径和它的所有子路径都有效。如果路径设为/forums，那么这个 Cookie 只有在访问www.example.com/forums及其子路径时才有效。以后，浏览器一旦访问这个路径，浏览器就会附上这段 Cookie 发送给服务器。


## 浏览器是否打开cookie功能

浏览器可以设置不接受 Cookie，也可以设置不向服务器发送 Cookie。window.navigator.cookieEnabled属性返回一个布尔值，表示浏览器是否打开 Cookie 功能。


// 浏览器是否打开 Cookie 功能
window.navigator.cookieEnabled // true


## cookie 于 http

Cookie 由 HTTP 协议生成，也主要是供 HTTP 协议使用。

1. http响应向浏览器写cookie

服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个Set-Cookie字段。

TTP 回应可以包含多个Set-Cookie字段，即在浏览器生成多个 Cookie。

一个Set-Cookie字段里面，可以同时包括多个属性，没有次序的要求。

Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly

如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。

```
	Set-Cookie: key1=value1; domain=example.com; path=/blog

	// 改为
	Set-Cookie: key1=value2; domain=example.com; path=/blog

```

2. 浏览器发生http请求携带cookie

浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，再发回服务器。这时要使用 HTTP 头信息的Cookie字段。

Cookie字段可以包含多个 Cookie，使用分号（;）分隔

Cookie: name=value; name2=value2; name3=value3


服务器收到浏览器发来的 Cookie 时，有两点是无法知道的。

- Cookie 的各种属性，比如何时过期。
- 哪个域名设置的 Cookie，到底是一级域名设的，还是某一个二级域名设的。


## cookie 的属性

Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式，可以使用Date.prototype.toUTCString()进行格式转换。

Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie

Domain属性指定浏览器发出 HTTP 请求时，哪些域名要附带这个 Cookie

Path属性指定浏览器发出 HTTP 请求时，哪些路径要附带这个 Cookie

Secure属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器

HttpOnly属性指定该 Cookie 无法通过 JavaScript 脚本拿到



## js操作cookie

document.cookie属性用于读写当前网页的 Cookie。

读取的时候，它会返回当前网页的所有 Cookie

1. 创建：

document.cookie = "username=xiedajian";

为cookie添加一个过期时间 （以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除

document.cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT";

您可以使用 path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面。

document.cookie="username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 GMT; path=/";

** 注意：document.cookie一次只能写入一个 Cookie，而且写入并不是覆盖，而是添加。必须写成key=value的形式

2. 读取：

var x = document.cookie;

document.cookie 将以字符串的方式返回所有的 cookie，类型格式： cookie1=value; cookie2=value; cookie3=value;

3. 修改与删除

就是重写cookie




## Cookie 字符串

document.cookie 属性看起来像一个普通的文本字符串，其实它不是。

即使您在 document.cookie 中写入一个完整的 cookie 字符串, 当您重新读取该 cookie 信息时，cookie 信息是以名/值对的形式展示的。

如果您设置了新的 cookie，旧的 cookie 不会被覆盖







### 设置 cookie 值的函数

```
	function setCookie(c_name,value,expiredays)
	{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}

```


### 获取 cookie 值的函数
```

	function getCookie(c_name)
	{
		if (document.cookie.length>0)
		{
		 	c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1)
			{ 
			    c_start=c_start + c_name.length+1 
			    c_end=document.cookie.indexOf(";",c_start)
			    if (c_end==-1) c_end=document.cookie.length
			    return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
	}
```



### 删除cookie

```

	function delCookie(key)
	{
            var date = new Date(); 		//获取当前时间
            date.setTime(date.getTime()-10000); 	//将date设置为过去的时间
            document.cookie = key + "=''; expires =" +date.toGMTString();	//设置cookie
	}
```
