[文档](https://vitejs.cn/guide/#index-html-and-project-root)


# index.html 与项目根目录

你可能已经注意到，在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

Vite 将 index.html 视为源码和模块图的一部分。Vite 解析 <script type="module" src="..."> ，这个标签指向你的 JavaScript 源码。
甚至内联引入 JavaScript 的 <script type="module"> 和引用 CSS 的 <link href> 也能利用 Vite 特有的功能被解析。
另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，在接下来的文档中你将看到它会以 <root> 代称。
源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码（并且功能更强大！）。
Vite 还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。

Vite 也支持多个 .html 作入口点的 多页面应用模式

[多页面应用模式](https://vitejs.cn/guide/build.html#multi-page-app)