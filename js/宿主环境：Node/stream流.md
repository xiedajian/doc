
中文文档：http://nodejs.cn/api/stream.html

# stream - 流

流（stream）是一种在 Node.js 中处理流式数据的抽象接口。

stream 模块提供了一些基础的 API，用于构建实现了流接口的对象。

Node.js 提供了多种流对象

例如，发送到 HTTP 服务器的请求和 process.stdout 都是流的实例。

流可以是可读的、可写的、或是可读写的。 所有的流都是 EventEmitter 的实例。

stream 模块可以通过以下方式使用：

const stream = require('stream');

尽管理解流的工作方式很重要，但是 stream 模块本身主要用于开发者创建新类型的流实例。

对于以消费流对象为主的开发者，极少需要直接使用 stream 模块。


# 流的类型

Node.js 中有四种基本的流类型：

- Writable - 可写入数据的流（例如 fs.createWriteStream()）。
- Readable - 可读取数据的流（例如 fs.createReadStream()）。
- Duplex - 可读又可写的流（例如 net.Socket）。
- Transform - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）。
- 
另外本模块还包含了工具类函数 pipeline 和 finished。


# 对象模式

所有 Node.js API 创建的流都是专门运作在字符串和 Buffer（或 Uint8Array）对象上

当然，流的实现也可以使用其它类型的 JavaScript 值（除了 null，因为它在流中有特殊用途）

这些流会以“对象模式”进行操作

当创建流时，可以使用 objectMode 选项把流实例切换到对象模式。

 试图将已经存在的流切换到对象模式是不安全的。
