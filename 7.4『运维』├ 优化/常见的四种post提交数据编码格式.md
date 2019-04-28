

# HTTP 请求方法

HTTP/1.1 协议规定的 HTTP 请求方法有 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT 这几种。其中 POST 一般用来向服务端提交数据，本文主要讨论 POST 提交数据的几种编码方式。

协议规定 POST 提交的数据必须放在消息主体（entity-body）中，但协议并没有规定数据必须使用什么编码方式。但是，数据发送出去，还要服务端解析成功才有意义。

服务端通常是根据请求头（headers）中的 Content-Type 字段来获知请求中的消息主体是用何种方式编码，再对主体进行解析。POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。下面就正式开始介绍它们。



# 四种常见的 POST 提交数据方式：

- 1.application/x-www-form-urlencoded

- 2.multipart/form-data

- 3.application/json

- 4.text/xml



## 1.APPLICATION/X-WWW-FORM-URLENCODED

这应该是最常见的 POST 提交数据的方式了。浏览器的原生 form 表单，如果不设置 enctype属性，那么最终就会默认以 application/x-www-form-urlencoded 方式提交数据。

在POST提交数据中Content-Type 被指定为 application/x-www-form-urlencoded；提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。很多时候，我们用 Ajax 提交数据时，也是使用这种方式。

```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
```


## 2.MULTIPART/FORM-DATA

这也是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctype 等于这个值。这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。上面提到的这两种 POST 数据的方式，都是浏览器原生支持的。

```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "application/json");
```


## 3.APPLICATION/JSON

application/json 这个 Content-Type 作为响应头大家肯定不陌生。

实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。

由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。

```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "application/json");
```

顺便提一句，angular框架与 axios 默认的post采用是这种编码，PHP端不能直接使用$POST接受，使用

```
  $_POST = json_decode(file_get_contents('php://input'),true);
```


## 4.TEXT/XML

它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范,它的使用也很广泛，能很好的支持已有的 XML-RPC 服务。不过，XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。
```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "text/xml");
```




# AJAX跨域POST发送json时，会先发送一个 OPTIONS 预请求

我们会发现，在很多post,put,delete等请求之前，会有一次 options 请求。

根本原因就是，W3C规范这样要求了！在跨域请求中，分为简单请求（get和部分post，post时content-type属于application/x-www-form-urlencoded，multipart/form-data，text/plain中的一种）和复杂请求。而复杂请求发出之前，就会出现一次options请求。

什么是options请求呢？它是一种探测性的请求，通过这个方法，客户端可以在采取具体资源请求之前，决定对该资源采取何种必要措施，或者了解服务器的性能。

在ajax中出现options请求，也是一种提前探测的情况，ajax跨域请求时，如果请求的是json，就属于复杂请求，因此需要提前发出一次options请求，用以检查请求是否是可靠安全的，如果options获得的回应是拒绝性质的，比如404\403\500等http状态，就会停止post、put等请求的发出。

虽然在下面的参考文献中有人提出可以取消options请求，但是实测后发现是不行的，jquery封装之后，更不能轻易取消。因此，靠javascript客户端取消options请求是不可能的，只能通过服务端对options请求做出正确的回应，这样才能保证options请求之后，post、put等请求可以被发出。但是，我们不能允许所有的options请求，而应该是有条件的，所以最好是通过一个特殊的机制，去验证客户端发出的options请求数据是否是符合服务端的条件的，如果不满足，返回403，则客户端会取消原有的post计划。


前台跨域post请求，由于CORS（cross origin resource share）规范的存在，浏览器会首先发送一次options嗅探，同时header带上origin，判断是否有跨域请求权限，服务器响应access control allow origin的值，供浏览器与origin匹配，如果匹配则正式发送post请求。

如果有服务器程序权限，设置，比如jsp中，设置header access control allow origin等于*，就可以得到跨域访问的目的。