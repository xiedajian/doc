

# 路由

# koa-router

koa 没有自带的路由，所以需要安装模块 koa-router 

```
npm i koa-router
```


使用

```
const koa = require('koa')
const router = require('koa-router')()  //注意后面的()
const app = new koa()

router.get('/news', async ctx => {
    ctx.body = 'hello news'
})

app.use(router.routes())            // 启动路由
app.use(router.allowedMethods)      // 建议配置， 在所有路由中间件最后调用，根据 ctx.status 设置response响应头
app.listen(3001)
```


# 动态路由

```
// 动态路由：id
router.get('/news/:id',async ctx=>{
    // 获取动态路由的参数
    var id = ctx.params.id      // 通过ctx.params获取动态路由参数
    console.log(id);
    ctx.body = `hello ${id}`
})
```


# get 传值

在koa2中，get传值通过 ctx.request 接收，但是接收方式有两种

1. ctx.request.query  格式化好的参数对象
2. ctx.request.querystring  请求字符串，就是？后面的字符串

```
// 获取 get 传值
router.get('/news/detail', async ctx => {
    // 从request 中获取 get 请求
    let request = ctx.request
    let req_url = request.url
    let req_query = request.query
    let req_queryString = request.querystring
    console.log(req_url);
    console.log(req_query);
    console.log(req_queryString);

    // 直接从上下文 ctx 中获取
    let ctx_url = ctx.url;
    let ctx_query = ctx.query
    let ctx_queryString = ctx.querystring
    console.log(ctx_url);
    console.log(ctx_query);
    console.log(ctx_queryString);
    ctx.body = 'hello news/detail'
})
```

详细案例：icode仓库的 node/koa/koa-router.js