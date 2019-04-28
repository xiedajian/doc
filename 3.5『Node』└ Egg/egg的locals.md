文档：https://eggjs.org/zh-cn/core/view.html#locals


# ctx.locals

原 Koa 中的 ctx.state，由于容易产生歧义，在框架中被覆盖为 locals，即 ctx.state 和 ctx.locals 等价，我们建议使用后者

locals 有两种 

- app.locals        // 公共的全局变量
- ctx.locals        // 单次请求的临时变量，会和app.locals合并后一起传递给模板中，在模板中可以直接使用


# app.locals 用处

和ctx.state一样，相当于公用变量，可以在其他中间件和页面模板中使用

例如：每个页面都需要用到用户信息，可以把用户信息存到app.locals中


# ctx.locals 有缓存，只在第一次访问 ctx.locals 时合并 app.locals。

```

// `app.locals` 会合并到 `ctx.locals
ctx.app.locals = { a: 1 };
ctx.locals.b = 2;
console.log(ctx.locals); // { a: 1, b: 2 }

// 一次请求过程中，仅会在第一次使用 `ctx.locals` 时把 `app.locals` 合并进去。
ctx.app.locals = { a: 2 };
console.log(ctx.locals); // 上面已经合并过一次，故输出还是 { a: 1, b: 2 }

// 也可以直接赋值整个对象，不用担心会覆盖前面的值，我们通过 setter 做了自动合并。
ctx.locals.c = 3;
ctx.locals = { d: 4 };
console.log(ctx.locals); // { a: 1, b: 2, c: 3, d: 4 }
```

# 在模板中还可以使用的变量

在实际业务开发中，controller 中一般不会直接使用这 2 个对象，直接使用 ctx.render(name, data) 即可：

- 框架会自动把 data 合并到 ctx.locals。
- 框架会自动注入 ctx, request, helper 方便使用。

```
ctx.app.locals = { appName: 'showcase' };
const data = { name: 'egg' };

// will auto merge `data` to `ctx.locals`, output: egg - showcase
await ctx.renderString('{{ name }} - {{ appName }}', data);

// helper, ctx, request will auto inject
await ctx.renderString('{{ name }} - {{ helper.lowercaseFirst(ctx.app.config.baseDir) }}', data);
```