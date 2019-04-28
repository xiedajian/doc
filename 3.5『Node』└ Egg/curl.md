
官网：https://eggjs.org/zh-cn/core/httpclient.html



# HttpClient

互联网时代，无数服务是基于 HTTP 协议进行通信的，

Web 应用调用后端 HTTP 服务是一种非常常见的应用场景。

为此框架基于  [urllib](https://github.com/node-modules/urllib) 内置实现了一个 [HttpClient](https://github.com/eggjs/egg/blob/master/lib/core/httpclient.js)，应用可以非常便捷地完成任何 HTTP 请求。


# 通过 app 使用 HttpClient

框架在应用初始化的时候，会自动将 HttpClient 初始化到 app.httpclient。 

同时增加了一个 app.curl(url, options) 方法，它等价于 app.httpclient.request(url, options)。

这样就可以非常方便地使用 app.curl 方法完成一次 HTTP 请求。

```
// app.js
module.exports = app => {
  app.beforeStart(async () => {
    // 示例：启动的时候去读取 https://registry.npm.taobao.org/egg/latest 的版本信息
    const result = await app.curl('https://registry.npm.taobao.org/egg/latest', {
      dataType: 'json',
    });
    app.logger.info('Egg latest version: %s', result.data.version);
  });
};
```

# 通过 Context 使用 HttpClient

框架在 Context 中同样提供了 ctx.curl(url, options) 和 ctx.httpclient，保持跟 app 下的使用体验一致。 

这样就可以在有 Context 的地方（如在 controller 中）非常方便地使用 ctx.curl() 方法完成一次 HTTP 请求。

```
// app/controller/npm.js
class NpmController extends Controller {
  async index() {
    const ctx = this.ctx;

    // 示例：请求一个 npm 模块信息
    const result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });

    ctx.body = {
      status: result.status,
      headers: result.headers,
      package: result.data,
    };
  }
}
```


# 基本 HTTP 请求

HTTP 已经被广泛大量使用，尽管 HTTP 有多种请求方式，但是万变不离其宗，

我们先以基本的4个请求方法为例子， 逐步讲解一下更多的复杂应用场景。

以下例子都会在 controller 代码中对 https://httpbin.org 发起请求来完成。


## GET

读取数据几乎都是使用 GET 请求，它是 HTTP 世界最常见的一种，也是最广泛的一种，它的请求参数也是最容易构造的。

```
// app/controller/npm.js
class NpmController extends Controller {
  async get() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/get?foo=bar');
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }
}
```

GET 请求可以不用设置 options.method 参数，HttpClient 的默认 method 会设置为 GET。

返回值 result 会包含 3 个属性：status, headers 和 data

- status: 响应状态码，如 200, 302, 404, 500 等等
- headers: 响应头，类似 { 'content-type': 'text/html', ... }
- data: 响应 body，默认 HttpClient 不会做任何处理，会直接返回 Buffer 类型数据。 一旦设置了 options.dataType，HttpClient 将会根据此参数对 data 进行相应的处理。

完整的请求参数 options 和返回值 result 的说明请看下文的 [ options 参数详解](https://eggjs.org/zh-cn/core/httpclient.html#options-%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3)章节。


## POST

创建数据的场景一般来说都会使用 POST 请求，它相对于 GET 来说多了请求 body 这个参数。

以发送 JSON body 的场景举例：
```
// app/controller/npm.js
class NpmController extends Controller {
  async post() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/post', {
      // 必须指定 method
      method: 'POST',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
      data: {
        hello: 'world',
        now: Date.now(),
      },
      // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
      dataType: 'json',
    });
    ctx.body = result.data;
  }
}
```
下文还会详细讲解以 POST 实现 Form 表单提交和文件上传的功能。

## PUT


## DELETE



# 高级 HTTP 请求

在真实的应用场景下，还是会包含一些较为复杂的 HTTP 请求。

## Form 表单提交

面向浏览器设计的 Form 表单（不包含文件）提交接口，

通常都要求以 content-type: application/x-www-form-urlencoded 的格式提交请求数据。

```
// app/controller/npm.js
class NpmController extends Controller {
  async submit() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/post', {
      // 必须指定 method，支持 POST，PUT 和 DELETE
      method: 'POST',
      // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
      data: {
        now: Date.now(),
        foo: 'bar',
      },
      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    ctx.body = result.data.form;
    // 响应最终会是类似以下的结果：
    // {
    //   "foo": "bar",
    //   "now": "1483864184348"
    // }
  }
}
```

## 以 Multipart 方式上传文件

当一个 Form 表单提交包含文件的时候，请求数据格式就必须以 multipart/form-data 进行提交了。 这个时候需要引入 formstream 这个第三方模块来帮助我们生成可以被 HttpClient 消费的 form 对象。

```
// app/controller/npm.js
const FormStream = require('formstream');
class NpmController extends Controller {
  async upload() {
    const ctx = this.ctx;
    const form = new FormStream();
    // 设置普通的 key value
    form.field('foo', 'bar');
    // 上传当前文件本身用于测试
    form.file('file', __filename);

    const result = await ctx.curl('https://httpbin.org/post', {
      // 必须指定 method，支持 POST，PUT
      method: 'POST',
      // 生成符合 multipart/form-data 要求的请求 headers
      headers: form.headers(),
      // 以 stream 模式提交
      stream: form,
      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    ctx.body = result.data.files;
    // 响应最终会是类似以下的结果：
    // {
    //   "file": "'use strict';\n\nconst For...."
    // }
  }
}
```

当然，你还可以继续通过 form.file() 添加更多文件以实现一次性上传多个文件的需求。

```
form.file('file1', file1);
form.file('file2', file2);
```

## 以 Stream 方式上传文件

其实，在 Node.js 的世界里面，Stream 才是主流。 

如果服务端支持流式上传，最友好的方式还是直接发送 Stream。 

Stream 实际会以 Transfer-Encoding: chunked 传输编码格式发送，

这个转换是 HTTP 模块自动实现的。

```
// app/controller/npm.js
const fs = require('fs');
const FormStream = require('formstream');
class NpmController extends Controller {
  async uploadByStream() {
    const ctx = this.ctx;
    // 上传当前文件本身用于测试
    const fileStream = fs.createReadStream(__filename);
    // httpbin.org 不支持 stream 模式，使用本地 stream 接口代替
    const url = `${ctx.protocol}://${ctx.host}/stream`;
    const result = await ctx.curl(url, {
      // 必须指定 method，支持 POST，PUT
      method: 'POST',
      // 以 stream 模式提交
      stream: fileStream,
    });
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
    // 响应最终会是类似以下的结果：
    // {"streamSize":574}
  }
}
```



# options 参数详解

由于 HTTP 请求的复杂性，导致 httpclient.request(url, options) 的 options 参数会非常多。 

接下来将会以参数说明和代码配合一起讲解每个可选参数的实际用途。

HttpClient 默认全局配置:

```
// config/config.default.js
exports.httpclient = {
  // 是否开启本地 DNS 缓存，默认关闭，开启后有两个特性
  // 1. 所有的 DNS 查询都会默认优先使用缓存的，即使 DNS 查询错误也不影响应用
  // 2. 对同一个域名，在 dnsCacheLookupInterval 的间隔内（默认 10s）只会查询一次
  enableDNSCache: false,
  // 对同一个域名进行 DNS 查询的最小间隔时间
  dnsCacheLookupInterval: 10000,
  // DNS 同时缓存的最大域名数量，默认 1000
  dnsCacheMaxLength: 1000,

  request: {
    // 默认 request 超时时间
    timeout: 3000,
  },

  httpAgent: {
    // 默认开启 http KeepAlive 功能
    keepAlive: true,
    // 空闲的 KeepAlive socket 最长可以存活 4 秒
    freeSocketTimeout: 4000,
    // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
    timeout: 30000,
    // 允许创建的最大 socket 数
    maxSockets: Number.MAX_SAFE_INTEGER,
    // 最大空闲 socket 数
    maxFreeSockets: 256,
  },

  httpsAgent: {
    // 默认开启 https KeepAlive 功能
    keepAlive: true,
    // 空闲的 KeepAlive socket 最长可以存活 4 秒
    freeSocketTimeout: 4000,
    // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
    timeout: 30000,
    // 允许创建的最大 socket 数
    maxSockets: Number.MAX_SAFE_INTEGER,
    // 最大空闲 socket 数
    maxFreeSockets: 256,
  },
};
```

应用可以通过 config/config.default.js 覆盖此配置。


## data: Object

需要发送的请求数据，根据 method 自动选择正确的数据处理方式。

GET，HEAD：通过 querystring.stringify(data) 处理后拼接到 url 的 query 参数上。

POST，PUT 和 DELETE 等：需要根据 contentType 做进一步判断处理。

contentType = json：通过 JSON.stringify(data) 处理，并设置为 body 发送。

其他：通过 querystring.stringify(data) 处理，并设置为 body 发送。

```
// GET + data
ctx.curl(url, {
  data: { foo: 'bar' },
});

// POST + data
ctx.curl(url, {
  method: 'POST',
  data: { foo: 'bar' },
});

// POST + JSON + data
ctx.curl(url, {
  method: 'POST',
  contentType: 'json',
  data: { foo: 'bar' },
});
```


更详细参考： https://eggjs.org/zh-cn/core/httpclient.html#options-%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3