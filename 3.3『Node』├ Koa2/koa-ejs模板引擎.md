
ejs npm 文档：https://www.npmjs.com/package/ejs

# koa 中使用 ejs 模板引擎

# 1.安装 koa-views 和 ejs 模块

```
 npm i koa-views
 npm i ejs
```

# 2. 引入 koa-views

const views = require('koa-views')

# 3. 配置 koa-views 中间件 , 后缀名为 html

app.use(views('views',{map:{html:'ejs'}}))


# 4.使用ejs,  ctx.render('index',{title})
```
router.get('/ejsdemo', async ctx => {
    let title = 'hello koa2'
    await ctx.render('index',{title})   // 注意，异步操作，添加await
})
```



# 模板中的公共数据

实际工作中，经常会有这样的需求，多个页面都需要一些相同的数据，比如说用户的资料，那公共数据放到哪里呢

可以存放在 ctx.state , 这样的话模板的任何地方都可以使用

```
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



# 在ejs模板中的模板语法

• <% %>     流程控制标签
• <%= %>    绑定数据
• <%- %>    绑定html
• <%- include header.ejs %>    引入模板

```
<%- include header.ejs %> 

<%for(var i=0;i<list.length;i++) { %>
    <li><%=list[i] %></li>
<%}%>
```

详细案例：icode仓库的 node/koa/koa-ejs.js