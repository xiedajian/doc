


## 资源文件处理

在我们的项目结构里，有两个资源文件的路径，分别是：src/assets 和 static/。那这两个到底有什么区别呢？


为了回答这个问题，我们首先需要理解webpack是怎样处理静态资源的。在*.vue组件中，所有的templates和css都会被vue-html-loader 和 css-loader解析，寻找资源的URL。

举个例子，在 <img src="./logo.png"> 和 background: url(./logo.png), “./logo.png”中，都是相对资源路径，都会被Webpack解析成模块依赖 。

由于logo.png不是JavaScript，当被看成一个模块依赖的时候，我们需要使用url-loader 和 file-loader进行处理。

该模板已经配置好了这些loaders，所以你能够使用相对/模块路径时不需要担心部署的问题。由于这些资源可能在构建的时候被内联/复制/重命名， 所以它们从本质上来说是你源码的一部分

这就是为什么我们建议将交由webpack处理的静态资源和其它源文件一样放在/src路径下面




# 结论

static/ 中的文件是完全不被Webpack处理的，它们被以相同的文件名直接被复制进最终目标。务必要使用绝对路径去引用它们

src/assets 中放置的文件希望被Webpack处理的，它们可能被重新命名复制进最终目标。使用相对路径引用它们




