
参考： [https://www.html5rocks.com/en/tutorials/security/content-security-policy/](https://www.html5rocks.com/en/tutorials/security/content-security-policy/)

# Content Security Policy (CSP)

一般来说，CSP作为黑客/白名单机制，用于扩展程序加载或执行的资源。

Web的安全模式植根于同一起源策略。

代码 https://mybank.com 只能访问 https://mybank.com 数据，并且 https://evil.example.com 绝对不允许访问。

每个起源与网络的其余部分保持隔离，为开发人员提供了一个安全的沙箱，用于构建和播放。

在理论上，这是非常辉煌的。实际上，攻击者发现了颠覆系统的聪明方法。

例如，跨站脚本（XSS）攻击绕过同一起源策略，通过欺骗网站将恶意代码与预期内容一起发送。

这是一个巨大的问题，因为浏览器将页面上显示的所有代码信任为该页面安全来源的合法部分。

该XSS小抄是一个攻击者可能利用通过注入恶意代码来破坏这种信任的方法的旧有代表性的横截面。

如果一个攻击者成功地注入了任何代码，那么它几乎是游戏过程：用户会话数据被泄露，应该保密的信息被过滤到坏人。
