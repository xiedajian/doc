
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