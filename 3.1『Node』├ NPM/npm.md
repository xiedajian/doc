



# 包与 NPM

1. 包
Nodejs 中除了它自己提供的核心模块外，我们可以自定义模块，也可以使用第三方的模块。

Nodejs 中第三方模块由包组成，可以通过包来对一组具有相互依赖关系的模块进行统一管理

完全符合 CommonJs 规范的包目录一般包含如下这些文件。
• package.json :包描述文件。
• bin :用于存放可执行二进制文件的目录。
• lib :用于存放 JavaScript 代码的目录。
• doc :用于存放文档的目录。


2. NPM 介绍
npm 是世界上最大的开放源代码的生态系统。

我们可以通过 npm 下载各种各样的包，这些源代码（包）我们可以在 https://www.npmjs.com 找到。

npm 是随同 NodeJS 一起安装的包管理工具，能解决 NodeJS 代码部署上的很多问题，

常见的使用场景有以下几种：
•允许用户从 NPM 服务器下载别人编写的第三方包到本地使用。(silly-datetime)
•允许用户从 NPM 服务器下载并安装别人编写的命令行程序(工具)到本地使用。（supervisor）
•允许用户将自己编写的包或命令行程序上传到 NPM 服务器供别人使用。



# npm

1. 查看 npm 版本

```
npm -v
```

2. 查看某条命令的详细帮助 
```
npm help install				# 例如输入npm help install
```


3. npm 自身升级

旧版本的 npm 可以很容易得通过 npm 命令来升级
```
$ npm install npm -g

$ npm install npm@latest -g 			# 安装最新版本
```

4. npm 清理缓存
```
npm cache clean -f
```

5. 在项目中引导创建一个package.json文件
```
npm init [-f|--force|-y|--yes]
```
此处使用-y 可以跳过后面让你填写内容操作，所有内容都是用默认值就好，有需要的话回头可以在package.json 文件中进行修改


6. 查看包的安装路径		(输出 node_modules的路径)
```
npm root [-g]
```

7. 管理npm的配置路径 	(对于config这块用得最多应该是设置代理)
```
npm config set <key> <value> [-g|--global]
npm config get <key>
npm config delete <key>
npm config list
npm config edit
```

8. npm list 查看已安装的 node 包

```
npm list		# 当前目录下
npm list -g		# 全局安装的包
npm ls  		# list 简写为 ls
npm ls -g 
```


9.npm list 加上 --depth 0，来限制结果的层数
```
npm ls --depth 0			# npm list会把依赖包递归展示，如果只看第一层依赖包，用 --depth 限制层数

npm ls -g --depth 0			# 查看全局安装的模块及依赖
```

10. npm 用户登录

发布模板到npm社区前需要先登录，然后再进入发布的操作
```
npm adduser 
```

11. npm publish 发布模块

详情查看 npm 发布模块.md
```
npm publish [<tarball>|<folder>] [--tag <tag>] [--access <public|restricted>]
```



# 使用 npm 命令安装模块

已jquery为例

```
$ npm install jquery										# 默认安装最新版本，局部安装

$ npm install jquery -g                 # -g 全局安装

$ npm install jquery --save             # --save 保存记录到 package.json 文件

$ npm install jquery --save -dev        # --save 保存记录到 package.json 文件的 dev 依赖列表

$ npm install jquery@1.12.4。						# @安装特定的版本

$ npm install juqery--force             # --force 或-f ，强制安装，不管node_module是否已经安装过

```

2.更新已安装模块
```
$ npm update jquery 
    
$ npm update jquery  -g
```


3. 卸载模块

```
npm uninstall jqeury

npm uninstall jqeury --save-dev

npm uninstall jqeury -g
```

4. 检查模块是否已经过时
```
$ npm outdated 						# 此命令会列出所有已经过时的包，可以及时进行包的更新
```


5. 查看 模块 的版本 

```
npm info jquery   //查看模块的版本
```





# 设置 npm 使用淘宝源

http://www.npmjs.org npm 包官网

https://npm.taobao.org/ 淘宝 npm 镜像官网

淘宝 NPM 镜像是一个完整 npmjs.org 镜像，你可以用此代替官方版本(只读)，同步频率目前为 10 分钟 一次以保证尽量与官方服务同步。

建议把 npm 的源切换到 淘宝源。 获取安装cnpm，使用cnpm。

安装cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

临时使用淘宝源
```
npm install --registry=https://registry.npm.taobao.org
npm install node-red-contrib-composer@latest --registry https://registry.npm.taobao.org
```

全局配置切换到淘宝源

```
 npm config set registry https://registry.npm.taobao.org
```


全局配置切换到官方源
```
 npm config set registry https://registry.npmjs.org
```

检测是否切换到了淘宝源
```
npm info underscore

```

```
...
gitHead: 'e4743ab712b8ab42ad4ccb48b155034d02394e4d',
  dist: 
   { shasum: '4f3fb53b106e6097fcf9cb4109f2a5e9bdfa5022',
     size: 34172,
     noattachment: false,
    //　有　registry.npm.taobao.org　等字样　　说明切换成功
     tarball: 'http://registry.npm.taobao.org/underscore/download/underscore-1.8.3.tgz' },
  directories: {},
  publish_time: 1427988774520 }

```



## 模块的安装过程

总结一下，Node模块的安装过程是这样的。

1. 发出npm install命令

2. npm 向 registry 查询模块压缩包的网址

3. 下载压缩包，存放在~/.npm目录

4. 解压压缩包到当前项目的node_modules目录

注意，一个模块安装以后，本地其实保存了两份。一份是~/.npm目录下的压缩包，另一份是node_modules目录下解压后的代码。

但是，运行npm install的时候，只会检查node_modules目录，而不会检查~/.npm目录。也就是说，如果一个模块在～/.npm下有压缩包，但是没有安装在node_modules目录中，npm 依然会从远程仓库下载一次新的压缩包。

这种行为固然可以保证总是取得最新的代码，但有时并不是我们想要的。最大的问题是，它会极大地影响安装速度。即使某个模块的压缩包就在缓存目录中，也要去远程仓库下载，这怎么可能不慢呢？

另外，有些场合没有网络（比如飞机上），但是你想安装的模块，明明就在缓存目录之中，这时也无法安装。




## package.json

package.json 定义了这个项目所需要的各种模块,以及项目的配置信息(比如名称、版本、许可证等元数据)

1、创建 package.json
```
npm init
npm init –yes
```

2、package.json 文件

```
{
 "name": "test",
 "version": "1.0.0",
 "description": "test",
 "main": "main.js",
 "keywords": [
 "test"
 ],
 "author": "wade",
 "license": "MIT",
 "dependencies": {
 "express": "^4.10.1"
 },
 "devDependencies": {
 "jslint": "^0.6.5"
 }
}

```

3、安装模块并把模块写入 package.json(依赖)

```
npm install babel-cli --save-dev
```


4、dependencies 与 devDependencies 之间的区别?

使用 npm install node_module –save 自动更新 dependencies 字段值;
使用 npm install node_module –save-dev 自动更新 devDependencies 字段值;

dependencie 配置当前程序所依赖的其他包。

devDependencie 配置当前程序所依赖的其他包，只会下载模块，而不下载这些模块的测试和文档框架

```
"dependencies": {
    "ejs": "^2.3.4",
    "express": "^4.13.3",
    "formidable": "^1.0.17"
}
```
^表示第一位版本号不变，后面两位取最新的
~表示前两位不变，最后一个取最新
*表示全部取最新


