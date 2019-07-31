[文档](https://eggjs.org/zh-cn/core/cluster-and-ipc.html)
[Cluster 模块](https://nodejs.org/api/cluster.html)


# 多进程模型和进程间通讯

我们知道 JavaScript 代码是运行在单线程上的，换句话说一个 Node.js 进程只能运行在一个 CPU 上。

那么如果用 Node.js 来做 Web Server，就无法享受到多核运算的好处。

作为企业级的解决方案，我们要解决的一个问题就是:

如何榨干服务器资源，利用上多核 CPU 的并发优势？

而 Node.js 官方提供的解决方案是 Cluster 模块，其中包含一段简介：

单个 Node.js 实例在单线程环境下运行。为了更好地利用多核环境，用户有时希望启动一批 Node.js 进程用于加载。

集群化模块使得你很方便地创建子进程，以便于在服务端口之间共享。



# Cluster 是什么呢？

简单的说，
```
在服务器上同时启动多个进程。
每个进程里都跑的是同一份源代码（好比把以前一个进程的工作分给多个进程去做）。
更神奇的是，这些进程可以同时监听一个端口（具体原理推荐阅读 @DavidCai1993 这篇 Cluster 实现原理）。
```
其中：
```
负责启动其他进程的叫做 Master 进程，他好比是个『包工头』，不做具体的工作，只负责启动其他进程。
其他被启动的叫 Worker 进程，顾名思义就是干活的『工人』。它们接收请求，对外提供服务。
Worker 进程的数量一般根据服务器的 CPU 核数来定，这样就可以完美利用多核资源。
```

```
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
```



# 框架的多进程模型

上面的示例是不是很简单，但是作为企业级的解决方案，要考虑的东西还有很多。

Worker 进程异常退出以后该如何处理？
多个 Worker 进程之间如何共享资源？
多个 Worker 进程之间如何调度？


## 进程守护

而当一个进程出现异常导致 crash 或者 OOM 被系统杀死时，不像未捕获异常发生时我们还有机会让进程继续执行，
只能够让当前进程直接退出，Master 立刻 fork 一个新的 Worker。


## Agent 机制
说到这里，Node.js 多进程方案貌似已经成型，这也是我们早期线上使用的方案。
但后来我们发现有些工作其实不需要每个 Worker 都去做，如果都做，一来是浪费资源，更重要的是可能会导致多进程间资源访问冲突。
举个例子：生产环境的日志文件我们一般会按照日期进行归档，在单进程模型下这再简单不过了：

试想如果现在是 4 个进程来做同样的事情，是不是就乱套了。
所以，对于这一类后台运行的逻辑，我们希望将它们放到一个单独的进程上去执行，这个进程就叫 Agent Worker，简称 Agent。
Agent 好比是 Master 给其他 Worker 请的一个『秘书』，它不对外提供服务，只给 App Worker 打工，专门处理一些公共事务。
现在我们的多进程模型就变成下面这个样子了
```
                +--------+          +-------+
                | Master |<-------->| Agent |
                +--------+          +-------+
                ^   ^    ^
               /    |     \
             /      |       \
           /        |         \
         v          v          v
+----------+   +----------+   +----------+
| Worker 1 |   | Worker 2 |   | Worker 3 |
+----------+   +----------+   +----------+
```

那我们框架的启动时序如下：
```
+---------+           +---------+          +---------+
|  Master |           |  Agent  |          |  Worker |
+---------+           +----+----+          +----+----+
     |      fork agent     |                    |
     +-------------------->|                    |
     |      agent ready    |                    |
     |<--------------------+                    |
     |                     |     fork worker    |
     +----------------------------------------->|
     |     worker ready    |                    |
     |<-----------------------------------------+
     |      Egg ready      |                    |
     +-------------------->|                    |
     |      Egg ready      |                    |
     +----------------------------------------->|
```

Master 启动后先 fork Agent 进程
Agent 初始化成功后，通过 IPC 通道通知 Master
Master 再 fork 多个 App Worker
App Worker 初始化成功，通知 Master
所有的进程初始化成功后，Master 通知 Agent 和 Worker 应用启动成功

另外，关于 Agent Worker 还有几点需要注意的是：

由于 App Worker 依赖于 Agent，所以必须等 Agent 初始化完成后才能 fork App Worker
Agent 虽然是 App Worker 的『小秘』，但是业务相关的工作不应该放到 Agent 上去做，不然把她累垮了就不好了
由于 Agent 的特殊定位，我们应该保证它相对稳定。当它发生未捕获异常，框架不会像 App Worker 一样让他退出重启，而是记录异常日志、报警等待人工处理
Agent 和普通 App Worker 挂载的 API 不完全一样，如何识别差异可查看框架文档


# Agent 的用法

你可以在应用或插件根目录下的 agent.js 中实现你自己的逻辑（和启动自定义 用法类似，只是入口参数是 agent 对象）
```
// agent.js
module.exports = agent => {
  // 在这里写你的初始化逻辑

  // 也可以通过 messenger 对象发送消息给 App Worker
  // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.on('egg-ready', () => {
    const data = { ... };
    agent.messenger.sendToApp('xxx_action', data);
  });
};
// app.js
module.exports = app => {
  app.messenger.on('xxx_action', data => {
    // ...
  });
};
```

这个例子中，agent.js 的代码会执行在 agent 进程上，app.js 的代码会执行在 Worker 进程上，他们通过框架封装的 messenger 对象进行进程间通讯（IPC），后面的章节会对框架的 IPC 做详细的讲解。



# Master VS Agent VS Worker

当一个应用启动时，会同时启动这三类进程。
```
|类型	|进程数量	|作用	|稳定性				|是否运行业务代码				|
|Master	|1	|进程管理，进程间消息转发|非常高				|否								|
|Agent	|1	|后台运行工作（长连接客户端）|高					|少量							|
|Worker	|一般设置为 CPU 核数|执行业务代码					|
```


# 进程间通讯（IPC）

虽然每个 Worker 进程是相对独立的，但是它们之间始终还是需要通讯的，叫进程间通讯（IPC）。下面是 Node.js 官方提供的一段示例代码
```
'use strict';
const cluster = require('cluster');

if (cluster.isMaster) {
  const worker = cluster.fork();
  worker.send('hi there');
  worker.on('message', msg => {
    console.log(`msg: ${msg} from worker#${worker.id}`);
  });
} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}
```

细心的你可能已经发现 cluster 的 IPC 通道只存在于 Master 和 Worker/Agent 之间，Worker 与 Agent 进程互相间是没有的。

那么 Worker 之间想通讯该怎么办呢？是的，通过 Master 来转发。

```
广播消息： agent => all workers
                  +--------+          +-------+
                  | Master |<---------| Agent |
                  +--------+          +-------+
                 /    |     \
                /     |      \
               /      |       \
              /       |        \
             v        v         v
  +----------+   +----------+   +----------+
  | Worker 1 |   | Worker 2 |   | Worker 3 |
  +----------+   +----------+   +----------+

指定接收方： one worker => another worker
                  +--------+          +-------+
                  | Master |----------| Agent |
                  +--------+          +-------+
                 ^    |
     send to    /     |
    worker 2   /      |
              /       |
             /        v
  +----------+   +----------+   +----------+
  | Worker 1 |   | Worker 2 |   | Worker 3 |
  +----------+   +----------+   +----------+
```

为了方便调用，我们封装了一个 messenger 对象挂在 app / agent 实例上，提供一系列友好的 API。


## 发送

```
app.messenger.broadcast(action, data)：发送给所有的 agent / app 进程（包括自己）
app.messenger.sendToApp(action, data): 发送给所有的 app 进程
在 app 上调用该方法会发送给自己和其他的 app 进程
在 agent 上调用该方法会发送给所有的 app 进程
app.messenger.sendToAgent(action, data): 发送给 agent 进程
在 app 上调用该方法会发送给 agent 进程
在 agent 上调用该方法会发送给 agent 自己
agent.messenger.sendRandom(action, data):
app 上没有该方法（现在 Egg 的实现是等同于 sentToAgent）
agent 会随机发送消息给一个 app 进程（由 master 来控制发送给谁）
app.messenger.sendTo(pid, action, data): 发送给指定进程
```
```
// app.js
module.exports = app => {
  // 注意，只有在 egg-ready 事件拿到之后才能发送消息
  app.messenger.once('egg-ready', () => {
    app.messenger.sendToAgent('agent-event', { foo: 'bar' });
    app.messenger.sendToApp('app-event', { foo: 'bar' });
  });
}
```

上面所有 app.messenger 上的方法都可以在 agent.messenger 上使用

### egg-ready

上面的示例中提到，需要等 egg-ready 消息之后才能发送消息。

只有在 Master 确认所有的 Agent 进程和 Worker 进程都已经成功启动（并 ready）之后，

才会通过 messenger 发送 egg-ready 消息给所有的 Agent 和 Worker，告知一切准备就绪，IPC 通道可以开始使用了。


## 接收

在 messenger 上监听对应的 action 事件，就可以收到其他进程发送来的信息了。
```
app.messenger.on(action, data => {
  // process data
});
app.messenger.once(action, data => {
  // process data
});
```
agent 上的 messenger 接收消息的用法和 app 上一致。


# IPC 实战案例

[实战案例](https://eggjs.org/zh-cn/core/cluster-and-ipc.html#ipc-%E5%AE%9E%E6%88%98)