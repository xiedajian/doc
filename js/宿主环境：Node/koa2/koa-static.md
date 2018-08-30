
npm 文档：https://www.npmjs.com/package/koa-static


# koa 托管静态资源

```
// 1、安装 koa-static
npm install koa-static
```

```
const Koa = require('koa');
// 2、引入配置中间件
const static = require('koa-static');
const path = require('path');
const app = new Koa();

// 3. 配置中间件
app.use(static('static'))       // 例如：http://localhost:3001/index.css


app.listen(3001);
```

详细案例：icode仓库的 node/koa/koa-static.js