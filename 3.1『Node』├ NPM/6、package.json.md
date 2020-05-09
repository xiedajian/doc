
[参考](https://github.com/ericdum/mujiang.info/issues/6/)

[参考](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

[yarn 中文文档](https://classic.yarnpkg.com/zh-Hans/docs/package-json)


# 生成 package.json 文件

```
npm init 
npm init --yes
```


# package.json 文件详解

package.json文件就是一个JSON对象，该对象的每一个成员就是当前项目的一项设置

所有package.json中必要的配置。它必须是真正的json，而不是js对象。


# 重要字段

在package.json中最重要的就是name和version字段。他们都是必须的，如果没有就无法install。

name和version一起组成的标识在假设中是唯一的。改变包应该同时改变version。

## name

```
{
  "name": "my-awesome-package"
}
```
你可能在项目中使用过 var express = require(‘express’), 

require 函数后面的参数，就是package.json 中的name字段，

所以这个name一定要简短，且不能有大写，这是规定。

规则:

- 必须少于或等于 214 个字符（对于限定域的包来说包括 @scope/）。
- 不能以句点 (.) 或者下划线 (_) 开头。
- 名字里不能有大写字母。
- 必须只使用 URL 安全的字符。

Tips

- 不要使用和 Node.js 核心模块相同的名字。
- 不要在名字里包含 js 或者 node 单词。
- 短小精悍，让人看到名字就大概了解包的功能，记住它也会被用在 require() 调用里。
- 保证名字在 registry 里是唯一的。


## version

```
{  "version":  "1.0.0"  }
```
版本号：安装一个模块的时候， 你可能指定过特定的版本号，`npm install express @4.13.2`

版本号有三个组成部分，4, 13, 2   

4表示的是大版本，一般是重大升级。

13表示的是小版本, 在大版本的基础进行的小的更新，如某个功能废弃了，新增了那个功能。

2对该版本进行补丁，主要是版本bug的修复。



# 信息类字段

## description

```
{
  "description": "我的包的简短描述"
}
```
放简介，字符串。方便使用者在npm search中搜索。


## keywords

```
{
  "keywords": ["short", "relevant", "keywords", "for", "searching"]
}
```
关键字，数组、字符串。还是方便使用者在npm search中搜索。


## license

所有包都应该指定许可证，以便让用户了解他们是在什么授权下使用此包，以及此包还有哪些附加限制。

鼓励使用开源 (OSI-approved) 许可证，除非你有特别的原因不用它。 如果你开发的包是你工作的一部分，最好和公司讨论后再做决定。

最简单的方法是，假如你用一个像BSD或者MIT这样通用的许可证，就只需要指定一个许可证的名字，像这样：

```
{ "license" : "BSD" }
```




# 链接类字段

各种指向项目文档、issues 上报，以及代码托管网站的链接字段。

## homepage
```
{
  "homepage": "https://your-package.org"
}
```
homepage 是包的项目主页或者文档首页。

## bugs

```
{
  "bugs": "https://github.com/user/repo/issues"
}
```
你项目的提交问题的url和（或）邮件地址。这对遇到问题的使用者很有帮助。

## repository

```
{
  "repository": { "type": "git", "url": "https://github.com/user/repo.git" },
  "repository": "github:user/repo",
  "repository": "gitlab:user/repo",
  "repository": "bitbucket:user/repo",
  "repository": "gist:a1b2c3d4e5f"
}
```

指定你的代码存放的地方。这个对希望贡献的人有帮助。如果git仓库在github上，那么npm docs命令能找到你。




# 项目维护类字段

项目的维护者。

## author

```
{
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "http://your-website.com"
  },
  "author": "Your Name <you@example.com> (http://your-website.com)"
}
```
作者信息，一个人。

## contributors

```
{
  "contributors": [
    { "name": "Your Friend", "email": "friend@example.com", "url": "http://friends-website.com" }
    { "name": "Other Friend", "email": "other@example.com", "url": "http://other-website.com" }
  ],
  "contributors": [
    "Your Friend <friend@example.com> (http://friends-website.com)",
    "Other Friend <other@example.com> (http://other-website.com)"
  ]
}
```
贡献者信息，可能很多人。


# 文件类信息

指定包含在项目中的文件，以及项目的入口文件。

## files

```
{
  "files": ["filename.js", "directory/", "glob/*.{js,json}"]
}
```

项目包含的文件，可以是单独的文件、整个文件夹，或者通配符匹配到的文件。

## main

```
{
  "main": "filename.js"
}
```

项目的入口文件。这个字段的默认值是模块根目录下面的index.js。


## bin字段

```
{
  "bin": "bin.js",
  "bin": {
    "command-name": "bin/command-name.js",
    "other-command": "bin/other-command"
  }
}
```

随着项目一起被安装的可执行文件。

例如：
```
"bin": {
  "someTool": "./bin/someTool.js"
}
```
上面代码指定，someTool 命令对应的可执行文件为 bin 子目录下的 someTool.js。

在运行npm时，就可以不带路径，直接通过命令来调用这些脚本。
```
scripts: {  
  start: './node_modules/someTool/someTool.js build'
}

// 简写为

scripts: {  
  start: 'someTool build'
}

```


## man

```
{
  "man": "./man/doc.1",
  "man": ["./man/doc.1", "./man/doc.2"]
}
```

和项目相关的文档页面（man page）。


## directories

```
{
  "directories": {
    "lib": "path/to/lib/",
    "bin": "path/to/bin/",
    "man": "path/to/man/",
    "doc": "path/to/doc/",
    "example": "path/to/example/"
  }
}
```
当你的包安装时，你可以指定确切的位置来放二进制文件、man pages、文档、例子等。



# 任务类字段

包里还可以包含一些可执行脚本或者其他配置信息。

## scripts字段

scripts指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。
```
"scripts": {
    "start": "node index.js",
}
```
start 脚本的默认值为 node server.js。



## config 字段

config字段配置你的脚本的选项或参数。

下面是一个package.json文件。
```
{
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

然后，在server.js脚本就可以引用config字段的值。
```
http
  .createServer(...)
  .listen(process.env.npm_package_config_port)
```

用户执行npm run start命令时，这个脚本就可以得到值。
```
$ npm run start
```

用户可以改变这个值。
```
$ npm config set foo:port 80
```



# 依赖描述类字段

你的包很可能依赖其他包。你可以在你的 package.json 文件里指定那些依赖

## dependencies字段，devDependencies字段

dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。

它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。

```
{
  "devDependencies": {
    "browserify": "~13.0.0",
    "karma-browserify": "~5.0.1"
  }
}
```
对应的版本可以加上各种限定，主要有以下几种：
• 指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
• 波浪号指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
• 插入号指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。
• latest：安装最新版本






## browser字段

browser指定该模板供浏览器使用的版本。Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。
```
"browser": {
  "tipso": "./node_modules/tipso/src/tipso.js"
},
```

## engines 字段

engines字段指明了该模块运行的平台，engines 指定使用你的包客户必须使用的版本. 比如 Node 的某个版本或者浏览器。
```
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
```

该字段也可以指定适用的npm版本。
```
{ "engines" : { "npm" : "~1.0.20" } }
```




## os

此选项指定你的包的操作系统兼容性
```
"os" : [ "darwin", "linux" ]
```

你也可以用黑名单代替白名单，在名字前面加上“!”就可以了：
```
"os" : [ "!win32" ]
```

操作系统用process.platform来探测。

虽然没有很好地理由，但它是同时支持黑名单和白名单的。


