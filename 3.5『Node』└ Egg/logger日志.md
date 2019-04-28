
文档： https://eggjs.org/zh-cn/core/logger.html


# 日志

日志对于 Web 开发的重要性毋庸置疑，它对于监控应用的运行状态、问题排查等都有非常重要的意义。

框架内置了强大的企业级日志支持，由 egg-logger 模块提供

主要特性：

- 日志分级
- 统一错误日志，所有 logger 中使用 .error() 打印的 ERROR 级别日志都会打印到统一的错误日志文件中，便于追踪
- 启动日志和运行日志分离
- 自定义日志
- 多进程日志
- 自动切割日志
- 高性能


# 日志路径

- 所有日志文件默认都放在 ${appInfo.root}/logs/${appInfo.name} 路径下，例如 /home/admin/logs/example-app。
- 在本地开发环境 (env: local) 和单元测试环境 (env: unittest)，为了避免冲突以及集中管理，日志会打印在项目目录下的 logs 目录，例如 root/logs/example-app。


如果想自定义日志路径：

```
// config/config.${env}.js
exports.logger = {
  dir: '/path/to/your/custom/log/dir',
};
```


# 日志分类

框架内置了几种日志，分别在不同的场景下使用：

- appLogger ${appInfo.name}-web.log，例如 example-app-web.log，应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它。
- coreLogger egg-web.log 框架内核、插件日志。
- errorLogger common-error.log 实际一般不会直接使用它，任何 logger 的 .error() 调用输出的日志都会重定向到这里，重点通过查看此日志定位异常。
- agentLogger egg-agent.log agent 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里。


如果想自定义以上日志文件名称，可以在 config 文件中覆盖默认值：

```
// config/config.${env}.js
module.exports = appInfo => {
  return {
    logger: {
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
    },
  };
};
```



#  如何打印日志

ctx.logger.debug('debug info');
ctx.logger.info('some request data: %j', ctx.request.body);
ctx.logger.warn('WARNNING!!!!');
ctx.logger.error(new Error('whoops'));

如果我们在处理请求时需要打印日志，这时候使用 Context Logger，用于记录 Web 行为相关的日志。

每行日志会自动记录上当前请求的一些基本信息， 如 [$userId/$ip/$traceId/${cost}ms $method $url]。

```
ctx.logger.debug('debug info');
ctx.logger.info('some request data: %j', ctx.request.body);
ctx.logger.warn('WARNNING!!!!');

// 错误日志记录，直接会将错误日志完整堆栈信息记录下来，并且输出到 errorLog 中
// 为了保证异常可追踪，必须保证所有抛出的异常都是 Error 类型，因为只有 Error 类型才会带上堆栈信息，定位到问题。
ctx.logger.error(new Error('whoops'));
```

对于框架开发者和插件开发者会使用到的 Context Logger 还有 ctx.coreLogger。

例如
```
ctx.coreLogger.info('info');
```



# App Logger

如果我们想做一些应用级别的日志记录，如记录启动阶段的一些数据信息，可以通过 App Logger 来完成。

```
// app.js
module.exports = app => {
  app.logger.debug('debug info');
  app.logger.info('启动耗时 %d ms', Date.now() - start);
  app.logger.warn('warning!');

  app.logger.error(someErrorObj);
};
```


# 日志级别

日志分为 NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别。

日志打印到文件中的同时，为了方便开发，也会同时打印到终端中。


# 日志切割

企业级日志一个最常见的需求之一是对日志进行自动切割，以方便管理。框架对日志切割的支持由 egg-logrotator 插件提供。

按天切割

这是框架的默认日志切割方式，在每日 00:00 按照 .log.YYYY-MM-DD 文件名进行切割。

以 appLog 为例，当前写入的日志为 example-app-web.log，当凌晨 00:00 时，会对日志进行切割，把过去一天的日志按 example-app-web.log.YYYY-MM-DD 的形式切割为单独的文件

