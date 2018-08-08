
# express

nodejs最常用框架，简单粗暴


## 安装

npm install express --save


## Express 应用生成器

npm install express-generator -g

通过应用生成器工具 express 可以快速创建一个应用的骨架,cli

```

	express myapp				// 创建一个名为myapp的应用

	express -h , --help
	express -V , --version
	express -e , --ejs			// add ejs 支持
	express -H , --hogan		// add hogan.js 支持
	express -c , --css			// add stylesheet 支持 （less|stylus|compass|sass）

```


安装并启用
```
 express myapp
 cd myapp 
 npm install

// 启动这个应用（MacOS 或 Linux 平台）
DEBUG=myapp npm start
// Windows 平台使用如下命令
set DEBUG=myapp & npm start

```
在浏览器中打开 http://localhost:3000/ 网址就可以看到这个应用了




### Express 托管静态文件

通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。

将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

app.use(express.static('public'));

现在，public 目录下面的文件就可以访问了。

http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html

如果你的静态资源存放在多个目录下面，你可以多次调用 express.static 中间件：

app.use(express.static('public'));
app.use(express.static('files'))

访问静态资源文件时，express.static 中间件会根据目录添加的顺序查找所需的文件。

如果你希望所有通过 express.static 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录指定一个挂载路径的方式来实现，如下所示：

app.use('/static', express.static('public'));
现在，你就爱可以通过带有 “/static” 前缀的地址来访问 public 目录下面的文件了。

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
