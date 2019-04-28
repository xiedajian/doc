
参考文档：https://www.86886.wang/detail/5b97bf1ea4768f24318b31bc

# CSRF

CSRF（Cross-site request forgery跨站请求伪造）也被称为 One Click Attack 或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。

CSRF 攻击会对网站发起恶意伪造的请求，严重影响网站的安全。

防范方式：

通常来说，对于 CSRF 攻击有一些通用的防范方案，简单的介绍几种常用的防范方案：

• Synchronizer Tokens：通过响应页面时将 token 渲染到页面上，在 form 表单提交的时候通过隐藏域提交上来。
• Double Cookie Defense：将 token 设置在 Cookie 中，在提交 post 请求的时候提交 Cookie，并通过 header 或者 body 带上 Cookie 中的 token，服务端进行对比校验。
• Custom Header：信任带有特定的 header（例如 X-Requested-With: XMLHttpRequest）的请求。这个方案可以被绕过，所以 rails 和 django 等框架都放弃了该防范方式





## 通过一个案例理解csrf跨站请求伪造

我现在有一个很简单的站点 www.a.com ，它有两个API接口，如下所示：

```
// 模拟登录
app.get('/api/login', function(req, res) {
 res.cookie('token', 'asdf')
  res.json({
    msg: '登录成功'
  })
})

// 模拟删除
app.post('/api/delete', function(req, res) {
  res.json({
    msg: '文章已删除'
  })
})
app.listen(3050);
```

现在我访问/api/login表示登录成功，然后后端会设置cookie

我们正常通过www.a.com 来 post 访问 /api/delete 会删除文章

下面模拟一下，跨站的 www.b.com 是怎么利用 form 可以跨越的历史问题来达到csrf跨站攻击的

现在有个恶意攻击者，它知道通过向http://www.a.com/api/delete发送post请求可以删除用户文章，只要用户已经登录了，它就可以这么做

第一步：它向用户发送了一封邮件（邮件可以是HTML格式的哦），告诉他中奖了

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <form action="http://www.a.com/api/delete" method="POST">
    <input value="1" name="id" hidden> <!--删除id为1的文章-->
    <button type="submit">恭喜你中奖啦，去看看</button>
  </form>
</body>
</html>
```

用户点开邮件，然后点击了钓鱼网站的按钮

这是它成功删除了自己在www.a.com的文章

你可能会奇怪，从http://www.b.com向http://www.a.com发送请求，不是跨域了吗？为什么还能携带cookie？没错，传统的表单就是存在这样的问题，这是历史遗留问题，表单提提交是允许跨域的

csrf跨站请求伪造，它其实就是利用技术手段欺骗用户的浏览器，去访问一个已经认证过的网站，并执行一些恶意操作，由于用户已经认证过，所以服务器端会认为这是用户发送的合法请求。

对于传统的表单提交，后端可以在请求表单时向表单中添加一个随机token，表单提交后后端验证token有效性，这样就可以知道是不是用户提交的了.

对于前后端分离的项目，这个问题就更好解决了，可以把后端返回的token存到localStorage中，这样在跨域的情况下www.b.com攻击者是无法获取www.a.com的token的，自然也就无法钓鱼了