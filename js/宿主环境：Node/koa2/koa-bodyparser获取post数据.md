

# koa-bodyparser 中间件用于获取 post 提交的数据

```
// 1.安装模块
npm i koa-bodyparser
```

使用
```
var Koa = require('koa');
// 2.引入模块
var bodyParser = require('koa-bodyparser');
var app = new Koa();

// 3.配置中间件
app.use(bodyParser());

app.use(async ctx => {
    //  4.使用 ctx.request.body 接受 post 数据
    ctx.body = ctx.request.body;
});
app.listen(3001)
```

详细案例：icode仓库的 node/koa/koa-bodyparser.js