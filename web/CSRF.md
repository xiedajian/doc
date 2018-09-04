
# CSRF

CSRF（Cross-site request forgery跨站请求伪造）也被称为 One Click Attack 或者 Session Riding，通常缩写为 CSRF 或者 XSRF，是一种对网站的恶意利用。

CSRF 攻击会对网站发起恶意伪造的请求，严重影响网站的安全。

防范方式：

通常来说，对于 CSRF 攻击有一些通用的防范方案，简单的介绍几种常用的防范方案：

• Synchronizer Tokens：通过响应页面时将 token 渲染到页面上，在 form 表单提交的时候通过隐藏域提交上来。
• Double Cookie Defense：将 token 设置在 Cookie 中，在提交 post 请求的时候提交 Cookie，并通过 header 或者 body 带上 Cookie 中的 token，服务端进行对比校验。
• Custom Header：信任带有特定的 header（例如 X-Requested-With: XMLHttpRequest）的请求。这个方案可以被绕过，所以 rails 和 django 等框架都放弃了该防范方式