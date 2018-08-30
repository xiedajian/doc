

官网： https://koa.bootcss.com/


Node.js 是一个异步的世界，官方 API 支持的都是 callback 形式的异步编程模型，这
会带来许多问题，例如：1、callback 嵌套问题 2、异步函数中可能同步调用 callback 返回
数据，带来不一致性。为了解决以上问题 Koa 出现了。


# Koa 框架介绍


Koa -- 基于 Node.js 平台的下一代 web 开发框架

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的Web 框架。

使用 koa 编写 web 应用，可以免除重复繁琐的回调函数嵌套， 并极大地提升错误处理的效率。

koa 不在内核方法中绑定任何中间件， 它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

开发思路和 express 差不多，最大的特点就是可以避免异步嵌套


# koa 与 express 最大的不同，个人觉得有3点：

1.在于 handler 的处理方法，express 是普通的回调函数， koa 是利用ES7 中 Async/Await 的特性，没有回调，没有回调，就大大加速了开发速度这一点而言，已经足以让我们跪舔了

2.koa是洋葱中间件模式，执行到next的时候，会去调用下一个中间件，下个中间件执行完再接着执行上个中间件next下面的代码

3.koa把 request, response 封装到了同一个上下文对象 content



# ES7 中 Async/Await

async function 是语言层面提供的语法糖，在 async function 中，我们可以通过 await 关键字来等待一个 Promise 被 resolve（或者 reject，此时会抛出异常）

Node.js 现在的 LTS 版本（8.x）已原生支持。

```
const fn = async function() {
  const user = await getUser();     // 等待异步操作
  const posts = await fetchPosts(user.id);      // 等待异步操作
  return { user, posts };
};
fn().then(res => console.log(res)).catch(err => console.error(err.stack));

```


# 洋葱中间件

通过案例来说明洋葱中间件的执行顺序
```
const Koa = require('koa');
const app = new Koa();


// 包含了中间件，http请求，content对象，ES7 async await的知识点
app.use(async (ctx,next) => {
	console.log('1');
	await next();
	console.log('2');
	ctx.body = 'Hello World';
});


//
app.use(async (ctx,next) => {
	console.log('3,我在下面，但是我先执');
});


app.listen(3001);
```

// 控制台打印结果  1 3 2



# 模块

由于 koa 不在内核方法中绑定任何中间件， 所以我们需要自己积累一些包和 中间件





# 建立在 koa 上的国产框架

- thinkjs  360团队开发的企业级框架
- egg      阿里团队开发的企业级框架