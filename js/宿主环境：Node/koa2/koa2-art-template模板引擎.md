
文档：http://aui.github.io/art-template/koa/

# art-template

性能优越

```
npm install --save art-template
npm install --save koa-art-template
```

Example

```
const Koa = require('koa');
const render = require('koa-art-template');

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'view'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(async function (ctx) {
  await ctx.render('user');
});

app.listen(8080);
```



# 模板语法

与常规的art-template一样