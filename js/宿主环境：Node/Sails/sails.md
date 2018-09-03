
官网： https://sailsjs.com


# sails

Sails 是基于 exrpess 的大而全的框架

Sails可以轻松构建自定义的企业级Node.js应用程序

Sails是Node.js最流行的MVC框架，旨在模拟熟悉的Ruby on Rails框架的MVC模式，但支持现代应用程序的需求：具有可扩展，面向服务的体系结构的数据驱动API。

- Sails捆绑了一个强大的ORM，即Waterline，它提供了一个简单的数据访问层，无论您使用什么数据库，它都可以正常工作。
- 自动生成的REST API, Sails附带蓝图，可帮助您快速启动应用程序的后端，而无需编写任何代码。
- Sails与任何前端兼容：Angular，React，iOS，Android，Windows Phone，自定义硬件或其他完全兼容
- 轻松WebSocket集成. 由于Sails会为您转换传入的套接字消息，因此它们会自动与Sails应用程序中的每个路由兼容


# 安装脚手架

```
npm install sails -g
```


# 创建应用

```
sails new test-project
```

您将看到选择项目模板的提示：

```
Choose a template for your new Sails app:
 1. Web App  ·  Extensible project with auth, login, & password recovery
 2. Empty    ·  An empty Sails app, yours to configure
 (type "?" for help, or <CTRL+> to cancel)
?
```

键入1（或按Enter键）以我们的“Web App”模板开始：一个固执己见的入门项目，其中包括登录，密码恢复，电子邮件和计费等基本功能。

或者，如果您想从头开始使用空项目，请选择2经典的Sails应用程序

然后，看看你的新Sails应用程序：

```
cd test-project
sails lift
```

现在您可以访问 localhost：1337 查看您的全新主页。








