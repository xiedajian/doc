
[WebAssembly ](https://www.wasm.com.cn/)

[几张图让你看懂WebAssembly](https://www.jianshu.com/p/bff8aa23fe4d)


WebAssembly 是一种可以使用非 JavaScript 编程语言编写代码并且能在浏览器上运行的技术方案。


使用WebAssembly，可以更快地在 web 应用上运行代码。这里有 几个 WebAssembly 代码运行速度比 JavaScript 高效的原因。

文件加载 - WebAssembly 文件体积更小，所以下载速度更快。

解析 - 解码 WebAssembly 比解析 JavaScript 要快

编译和优化 - 编译和优化所需的时间较少，因为在将文件推送到服务器之前已经进行了更多优化，JavaScript 需要为动态类型多次编译代码

重新优化 - WebAssembly 代码不需要重新优化，因为编译器有足够的信息可以在第一次运行时获得正确的代码

执行 - 执行可以更快，WebAssembly 指令更接近机器码

垃圾回收 - 目前 WebAssembly 不直接支持垃圾回收，垃圾回收都是手动控制的，所以比自动垃圾回收效率更高。

目前浏览器中的 MVP（最小化可行产品） 已经很快了。在接下来的几年里，随着浏览器的发展和新功能的增加，它将在未来几年内变得更快。没有人可以肯定地说，这些性能改进可以实现什么样的应用。但是，如果过去有任何迹象，我们可以期待惊奇。

