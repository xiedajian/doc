


# koa 中间件

# middleware

通俗的讲：中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件。

在 express 中间件（Middleware）是一个函数，它可以访问请求对象（request object (req)）, 响应对象（response object (res)）, 和 web 应用中处理请求-响应循环流程中的中间件，一
般被命名为 next 的变量。

在 Koa 中中间件和 express 有点类似。

中间件的功能包括：
- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件

如果想往下匹配的话，那么需要写 next()

与 express 中间件不同的是，koa中间件采用洋葱模式，先进后出


# 洋葱中间件

执行到 next ，会先等待下一层中间件，等下一层执行完，接着执行next下面的代码

```

app.use(async (ctx,next)=>{
    console.log(1)
    await next()
    console.log(3)
})

app.use(async (ctx,next)=>{
    console.log(2)
})


// 执行结果 打印 1 2 3，说明了执行顺序
```


# 公共变量

公共变量,通常设置在ctx.state，可以用在其他中间件和前端视图

```
// 写一个中间件配置公共信息， 通常写在ctx.state， 其他中间件和前端试图都可以使用
app.use(async (ctx,next)=>{
    ctx.state.userinfo = 'xiedajian'
    await next()
})

router.get('/demo', async ctx => {
    console.log(ctx.state.userinfo);    // 在中间件中使用公共变量
})
```

在前端视图中使用

```
<p><%= userinfo %></p>
```



详细案例：icode仓库的 node/koa/koa-middleware.js 