
文档： https://eggjs.org/zh-cn/core/security.html#%E5%AE%89%E5%85%A8%E5%A8%81%E8%83%81csrf%E7%9A%84%E9%98%B2%E8%8C%83



# 表单内容的获取出现的问题

```
// app/router.js
module.exports = app => {
  app.router.post('/form', app.controller.form.post);
};

// app/controller/form.js
exports.post = async ctx => {
  ctx.body = `body: ${JSON.stringify(ctx.request.body)}`;
};

// 模拟发起 post 请求。
// curl -X POST http://127.0.0.1:7001/form --data '{"name":"controller"}' --header 'Content-Type:application/json'
```

> 这里直接发起 POST 请求会报错：'secret is missing'。错误信息来自 koa-csrf/index.js#L69 

> 原因：框架内部针对表单 POST 请求均会验证 CSRF 的值，因此我们在表单提交时，请带上 CSRF key 进行提交，可参考安全威胁csrf的防范

> 注意：上面的校验是因为框架中内置了安全插件 egg-security，提供了一些默认的安全实践，并且框架的安全插件是默认开启的，如果需要关闭其中一些安全防范，直接设置该项的 enable 属性为 false 即可。

*除非清楚的确认后果，否则不建议擅自关闭安全插件提供的功能。*

```
// config/config.default.js 中设置
exports.security = {
  csrf: false
};
```


# egg框架的 CSRF 防范方案

CSRF（Cross-site request forgery跨站请求伪造）也被称为 One Click Attack 或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。

CSRF 攻击会对网站发起恶意伪造的请求，严重影响网站的安全。

防范方式：

通常来说，对于 CSRF 攻击有一些通用的防范方案，简单的介绍几种常用的防范方案：

• Synchronizer Tokens：通过响应页面时将 token 渲染到页面上，在 form 表单提交的时候通过隐藏域提交上来。
• Double Cookie Defense：将 token 设置在 Cookie 中，在提交 post 请求的时候提交 Cookie，并通过 header 或者 body 带上 Cookie 中的 token，服务端进行对比校验。
• Custom Header：信任带有特定的 header（例如 X-Requested-With: XMLHttpRequest）的请求。这个方案可以被绕过，所以 rails 和 django 等框架都放弃了该防范方式

## 同步表单的 CSRF 校验

在同步渲染页面时，在表单请求中增加一个 name 为 _csrf 的 url query，值为 ctx.csrf，这样用户在提交这个表单的时候会将 CSRF token 提交上来：

```
<form method="POST" action="/upload?_csrf={{ ctx.csrf | safe }}" enctype="multipart/form-data">
  title: <input name="title" />
  file: <input name="file" type="file" />
  <button type="submit">upload</button>
</form>
```

为了防范 BREACH 攻击，通过同步方式渲染到页面上的 CSRF token 在每次请求时都会变化 

```
  // 调用 rotateCsrfSecret 刷新用户的 CSRF token
  ctx.rotateCsrfSecret();
```


##  AJAX 请求  CSRF 校验

在 CSRF 默认配置下，token 会被设置在 Cookie 中，在 AJAX 请求的时候，可以从 Cookie 中取到 token，放置到 query、body 或者 header 中发送给服务端。

In jQuery:

```
var csrftoken = Cookies.get('csrfToken');

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader('x-csrf-token', csrftoken);
    }
  },
});
```

## 刷新 CSRF token

当 CSRF token 存储在 Cookie 中时，一旦在同一个浏览器上发生用户切换，新登陆的用户将会依旧使用旧的 token（之前用户使用的），这会带来一定的安全风险，因此在每次用户登陆的时候都必须刷新 CSRF token。

```
// login controller
exports.login = function* (ctx) {
  const { username, password } = ctx.request.body;
  const user = yield ctx.service.user.find({ username, password });
  if (!user) ctx.throw(403);
  ctx.session = { user };

  // 调用 rotateCsrfSecret 刷新用户的 CSRF token
  ctx.rotateCsrfSecret();

  ctx.body = { success: true };
}
```