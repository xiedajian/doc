#### HTTP 请求方法
HTTP/1.1 协议规定的 HTTP 请求方法有 OPTIONS、GET、HEAD、POST、PUT、DELETE、TRACE、CONNECT 这几种。其中 POST 一般用来向服务端提交数据，本文主要讨论 POST 提交数据的几种编码方式。

协议规定 POST 提交的数据必须放在消息主体（entity-body）中，但协议并没有规定数据必须使用什么编码方式。但是，数据发送出去，还要服务端解析成功才有意义。

服务端通常是根据请求头（headers）中的 Content-Type 字段来获知请求中的消息主体是用何种方式编码，再对主体进行解析。POST 提交数据方案，包含了 Content-Type 和消息主体编码方式两部分。下面就正式开始介绍它们。

#### 四种常见的 POST 提交数据方式：

- 1.application/x-www-form-urlencoded

- 2.multipart/form-data

- 3.application/json

- 4.text/xml


##### 1.APPLICATION/X-WWW-FORM-URLENCODED

这应该是最常见的 POST 提交数据的方式了。浏览器的原生 form 表单，如果不设置 enctype属性，那么最终就会默认以 application/x-www-form-urlencoded 方式提交数据。

在POST提交数据中Content-Type 被指定为 application/x-www-form-urlencoded；提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。很多时候，我们用 Ajax 提交数据时，也是使用这种方式。

```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
```
##### 2.MULTIPART/FORM-DATA

这也是一个常见的 POST 数据提交的方式。我们使用表单上传文件时，必须让 form 的 enctype 等于这个值。这种方式一般用来上传文件，各大服务端语言对它也有着良好的支持。上面提到的这两种 POST 数据的方式，都是浏览器原生支持的。

```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "application/json");
```

##### 3.APPLICATION/JSON

application/json 这个 Content-Type 作为响应头大家肯定不陌生。实际上，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。由于 JSON 规范的流行，除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify，服务端语言也都有处理 JSON 的函数，使用 JSON 不会遇上什么麻烦。

```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "application/json");
```
顺便提一句，angular框架默认的post采用是这种编码，PHP端不能直接使用$POST接受，使用
```
  $_POST = json_decode(file_get_contents('php://input'),true);
```

##### 4.TEXT/XML

它是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范,它的使用也很广泛，能很好的支持已有的 XML-RPC 服务。不过，XML 结构还是过于臃肿，一般场景用 JSON 会更灵活方便。
```
xhr.open("POST","http://www.example.com",true);
xhr.setRequestHeader("Content-Type", "text/xml");
```



