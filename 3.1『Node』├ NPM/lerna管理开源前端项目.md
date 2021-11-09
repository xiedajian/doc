[npm](https://www.npmjs.com/package/lerna)
[github](https://github.com/lerna/lerna)
[参考](https://www.jianshu.com/p/f105e1427082)


当需要管理很多小的npm包，每个库之间又相互依赖，一段时间下来，版本号就很难管理，大多数时候需要手动更新版本依赖；

其实babel的重要贡献者Jamie Kyle1，在为 Babel 6 工作的过程中发现所有东西都拆分成漂亮的小插件包，但同时也就需要管理数十个软件包， 也遇到同样的问题。因此，多包存储库管理工具 Lerna 应运而生。为让项目更好用，他对项目进行了多次重写，试图让架构更完善。


# Lerna

Lerna官网对此给出了官方的解释：Lerna是一个管理包含多个软件包的JavaScript项目的工具。它可以：

1、解决包之间的依赖关系。

2、通过git仓库检测改动，自动同步。

3、根据相关的git提交的commit，生成CHANGELOG。

Lerna是一个命令行工具，可以将其安装在系统全局。简单的命令说明，可以使用：lerna -h查看命令帮助。

类似这样的结构来组织代码
```
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```


# 安装

```
npm i lerna -g
```


## 两种包管理模式

### 固定模式
1.默认的为固定模式(Fixed mode)，当使用lerna init命令初始化项目时，就默认为固定模式，也可以使用 lerna init --independent 命令初始化项目，这个时候就为独立模式(Independent mode)。

这种模式也是Babel使用的方式。如果你希望所有的版本一起变更， 可以更新minor版本号，这样会导致所有的模块都更新版本。

```
lerna init
```

### 独立模式
2.固定模式中，packages下的所有包共用一个版本号(version)，会自动将所有的包绑定到一个版本号上(该版本号也就是lerna.json中的version字段)，所以任意一个包发生了更新，这个共用的版本号就会发生改变。
独立模式允许每一个包有一个独立的版本号，在使用lerna publish命令时，可以为每个包单独制定具体的操作，同时可以只更新某一个包的版本号。此种模式时，lerna.json中的version字段指定为independent即可。
```
lerna init --independent
```


成功后，生成目录：
```
- packages(目录)
- lerna.json(配置文件)
- package.json(工程描述文件)
```


## 添加lerna.json配置
```
{
    "version": "0.7.30", 
    "packages": [
        "packages/package-1",
        "packages/package-2",
        "packages/package-3",
        "packages/package-4"
    ],
    "command": {
        "publish": {
            "message": "chore(release): publish %s",
			"ignoreChanges": [
			        "ignored-file",
			        "*.md"
			      ]
        },
        "bootstrap": {
			"ignore": "component-*",
            "npmClientArgs": [
                "--no-package-lock"
            ]
        }
    },
    "npmClient": "npm"
}
```

备注： 上面的配置文件中，部分字段做下如下说明：

- version指定的是所有包的统一版本号；对于independent模式，这个字段请指定为independent；

- npmClient指定的是npm的客户端。默认的，lerna将使用npm。读者也可依所需将程序设置为yarn，甚至cnpm等等。

- command字段，可以对publish和bootstrap命令进行参数传递和命令定制。如：command.publish.ignoreChanges，用来设置一些忽略的文件，以避免无关文件的提交对于版本号的变更，如README.md等等。command.bootstrap.npmClientArgs指定在bootstrap命令时，传递的默认参数，比如我们会常常使用--no-package-lock来禁止package-lock.json或yarn.lock等等。

- packages字段指定包所在的目录。


## 创建子包

```
lerna create [-y]
```

在packages所指目录下创建package包。