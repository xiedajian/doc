


# ThinkJS

ThinkJS 是一款面向未来开发的 Node.js 框架，整合了大量的项目最佳实践，让企业级开发变得如此简单、高效。

从 3.0 开始，框架底层基于 Koa 2.x 实现，兼容 Koa 的所有功能。



# 特性
- 基于 Koa 2.x，兼容 middleware
- 内核小巧，支持 Extend、Adapter 等插件方式
- 性能优异，单元测试覆盖程度高
- 内置自动编译、自动更新机制，方便快速开发
- 使用更优雅的 async/await 处理异步问题，不再支持 */yield
- 从 3.2 开始支持 TypeScript


# 安装 ThinkJS 命令

```
$ npm install -g think-cli
```

安装完成后，系统中会有 thinkjs 命令
（可以通过 thinkjs -V 查看 think-cli 的版本号，此版本号非 thinkjs 的版本号）。
如果找不到这个命令，请确认环境变量是否正确


如果是从 2.x 升级，需要将之前的命令删除，然后重新安装。

# 卸载旧版本命令

$ npm uninstall -g thinkjs


# 创建项目
执行 thinkjs new [project_name] 来创建项目，如：

```
$ thinkjs new demo;
$ cd demo;
$ npm install; 
$ npm start; 
```
执行完成后，控制台下会看到类似下面的日志：
```
[2017-06-25 15:21:35.408] [INFO] - Server running at http://127.0.0.1:8360
[2017-06-25 15:21:35.412] [INFO] - ThinkJS version: 3.0.0-beta1
[2017-06-25 15:21:35.413] [INFO] - Enviroment: development
[2017-06-25 15:21:35.413] [INFO] - Workers: 8
```

打开浏览器访问 http://127.0.0.1:8360/，如果是在远程机器上创建的项目，需要把 IP 换成对应的地址。



# 项目结构
默认创建的项目结构如下：

```
|--- development.js   //开发环境下的入口文件
|--- nginx.conf  //nginx 配置文件
|--- package.json
|--- pm2.json //pm2 配置文件
|--- production.js //生产环境下的入口文件
|--- README.md
|--- src
| |--- bootstrap  //启动自动执行目录 
| | |--- master.js //Master 进程下自动执行
| | |--- worker.js //Worker 进程下自动执行
| |--- config  //配置文件目录
| | |--- adapter.js  // adapter 配置文件 
| | |--- config.js  // 默认配置文件 
| | |--- config.production.js  //生产环境下的默认配置文件，和 config.js 合并 
| | |--- extend.js  //extend 配置文件 
| | |--- middleware.js //middleware 配置文件 
| | |--- router.js //自定义路由配置文件
| |--- controller  //控制器目录 
| | |--- base.js
| | |--- index.js
| |--- logic //logic 目录
| | |--- index.js
| |--- model //模型目录
| | |--- index.js
|--- view  //模板目录
| |--- index_index.html

```
