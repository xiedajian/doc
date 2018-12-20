
[参考](https://github.com/ericdum/mujiang.info/issues/6/)

[参考](http://javascript.ruanyifeng.com/nodejs/packagejson.html)




# 生成 package.json 文件

```
npm init 

npm init --yes
```


# package.json 文件详解

package.json文件就是一个JSON对象，该对象的每一个成员就是当前项目的一项设置

所有package.json中必要的配置。它必须是真正的json，而不是js对象。


## name

在package.json中最重要的就是name和version字段。他们都是必须的，如果没有就无法install。

name和version一起组成的标识在假设中是唯一的。改变包应该同时改变version。

你可能在项目中使用过 var express = require(‘express’), require 函数后面的参数，

就是package.json 中的name字段，所以这个name一定要简短，且不能有大写，这是规定。



## version

版本号：安装一个模块的时候， 你可能指定过特定的版本号，`npm install express @4.13.2`

版本号有三个组成部分，4, 13, 2   

4表示的是大版本，一般是重大升级。

13表示的是小版本, 在大版本的基础进行的小的更新，如某个功能废弃了，新增了那个功能。

2对该版本进行补丁，主要是版本bug的修复。

## scripts字段

scripts指定了运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。
```
"scripts": {
    "start": "node index.js",
}
```

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


## bin字段

bin项用来指定各个内部命令对应的可执行文件的位置。
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

## main字段

main字段指定了加载的入口文件，

require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的index.js。



## config 字段

config字段用于添加命令行的环境变量。

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



## description

放简介，字符串。方便屌丝们在npm search中搜索。


## keywords

关键字，数组、字符串。还是方便屌丝们在npm search中搜索。


## homepage

项目官网的url。

注意：这和“url”_不_一样。如果你放一个“url”字段，registry会以为是一个跳转到你发布在其他地方的地址，然后喊你滚粗。


## bugs

你项目的提交问题的url和（或）邮件地址。这对遇到问题的屌丝很有帮助。

差不多长这样：
```
{ 
	"url" : "http://github.com/owner/project/issues",
	"email" : "project@hostname.com"
}
```


## license

你应该要指定一个许可证，让人知道使用的权利和限制的。

最简单的方法是，假如你用一个像BSD或者MIT这样通用的许可证，就只需要指定一个许可证的名字，像这样：

```
{ "license" : "BSD" }
```


## browser字段

browser指定该模板供浏览器使用的版本。Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。
```
"browser": {
  "tipso": "./node_modules/tipso/src/tipso.js"
},
```

## engines 字段

engines字段指明了该模块运行的平台，比如 Node 的某个版本或者浏览器。
```
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
```

该字段也可以指定适用的npm版本。
```
{ "engines" : { "npm" : "~1.0.20" } }
```


## repository

指定你的代码存放的地方。这个对希望贡献的人有帮助。如果git仓库在github上，那么npm docs命令能找到你。

```
"repository" :
  { "type" : "git"
  , "url" : "http://github.com/isaacs/npm.git"
  }

"repository" :
  { "type" : "svn"
  , "url" : "http://v8.googlecode.com/svn/trunk/"
  }
```


## os

你可以指定你的模块要运行在哪些操作系统中：
```
"os" : [ "darwin", "linux" ]
```

你也可以用黑名单代替白名单，在名字前面加上“!”就可以了：
```
"os" : [ "!win32" ]
```

操作系统用process.platform来探测。

虽然没有很好地理由，但它是同时支持黑名单和白名单的。