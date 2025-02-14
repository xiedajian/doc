
[文档](https://docs.npmjs.com/cli/link)


在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，

方便地对模块进行调试和测试

```
npm link 					# 创建链接，在自定义包目录下执行
npm link <package-name>		# 引用，在需要用到的项目执行。 注意：package-name是依据该包 package.json 的 name 而非文件名称

alias: npm ln
```


## 创建链接

npm link 链接过程分为两步

首先、`npm link` 将会在全局包{prefix}/lib/node_modules/下面创建一个指向命令执行的地方的符号链接。
同时也会创建一个{prefix}/bin/{name}下面对应的bin包。

另一种情况下，`npm link package-name` 将会创建一个从global包指向当前文件夹node_modules/下对应的链接。

注意：package-name是依据 package.json 的name而非文件名称。



## 案例说明
 
在这里，我们有两个项目，

一个是npm-link-module，是我们要开发的npm模块,

另一个是npm-link-example,是我们要运行npm模块的项目

1.首先，进入我们的自定义模块 npm-link-module，package.json 的 name 为 npm-link-module，执行 npm link
```
cd npm-link-module
npm link							# 创建
```

执行命令后，npm-link-module会根据package.json上的配置，被链接到全局，路径是{prefix}/lib/node_modules/<package>，这是官方文档上的描述，我们可以使用npm config get prefix命令获取到prefix的值(不过我这里使用的是windows，实际被链接到的路径是{prefix}/node_modules/<package>，不知道是不是npm升级的原因)，如果是win系统的话，实际观察，会发现在{prefix}/lib/node_modules/<package>路径下的node-link-module是一个快捷方式



2.然后，进入npm-link-example项目，执行 npm link npm-link-module
```
cd npm-link-example
npm link npm-link-module			# 引用
```

npm-link-module会被链接到 npm-link-example/node_modules下面


# 加载本地地址包

[参考](https://www.cnblogs.com/lin0123/p/13020292.html)
```
{ 
  "dependencies" :{ 
    "dyl" : "file:../dyl", // 本地地址
    "xyz" : "git+ssh://git@github.com:npm/npm.git#v1.0.27", // git 地址
    "fir" : "git+ssh://git@github.com:npm/npm#semver:^5.0",
    "wdy" : "git+https://isaacs@github.com/npm/npm.git",
    "xxy" : "git://github.com/npm/npm.git#v1.0.27",
  }
}
```

"dyl" : "file:local", // 对应的目录local的本地包
"dyl" : "file:local/icon", // 对应的目录local/icon的本地包

与 npm link 效果类似


# npm link 与 npm file:// 的区别

npm link 和 npm file:// 都可以用于在开发过程中引用本地的 npm 包，但它们在使用方式、原理和应用场景上存在一些区别，下面为你详细介绍：

### 原理差异
npm link
npm link 是通过在全局 node_modules 目录下创建一个符号链接指向本地包的目录，然后在项目的 node_modules 中再创建一个符号链接指向全局 node_modules 中的包。这种方式实际上是建立了多层的符号链接关系，使得项目可以直接引用本地开发的包。

npm file://
npm file:// 是让 npm 直接从指定的本地文件系统路径复制包的内容到项目的 node_modules 中。当你运行 npm install 时，npm 会将指定路径下的包复制到项目的依赖目录，本质上是进行了文件的复制操作。

### 优缺点对比
npm link
优点：实时反映代码修改，方便快速调试；全局管理，适用于多项目开发。
缺点：可能会受到符号链接相关问题的影响，例如在某些文件系统或环境中符号链接可能无法正常工作；全局环境中的符号链接可能会造成管理上的混乱。

npm file://
优点：简单直接，不会在全局环境中留下额外的配置；适用于一次性的本地包引用。
缺点：每次修改本地包代码后，需要重新运行 npm install 才能更新项目中的依赖，效率较低。