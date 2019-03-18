

# npx

npm v5.2.0引入的一条命令（npx），引入这个命令的目的是为了提升开发者使用包内提供的命令行工具的体验。


解决什么问题

- 使用本地安装的可执行工具，不需要全局安装，而不需要配置 scripts
- 执行一次性命令，用完自动删除
- 使用不同的node版本运行命令


# 使用本地已安装的可执行工具，而不需要配置 scripts，不需要全局安装

在过去的几年中，npm 生态越来越倾向于将 devDependencies 安装包作为项目本地依赖安装，而不是让用户在全局安装。

关于为什么本地安装，而不全局安装，原因很明显。本地安装更灵活

包括 vue-cli ，我也是本地安装的，而不是全局。这样会非常灵活，你可以使用 vue-cli@2.x，也可以使用 vue-cli@3.x 。

我的电脑上面有很多 Vue 项目，依赖的 Vue 版本都不太一样。


那么，对于本地安装的 vue-cli ，你在初始化项目的时候，你可能需要如下操作：
```
./node_modules/.bin/vue init webpack yourproject
```


或者，在 run-script 中声明：
```
 "scripts": {
   "init-yourproject": "vue init webpack yourproject"
 }
```
然后，执行：
```
npm run init-yourproject
```

> 可以看到，这些 init 的操作都是属于一次性操作，但是却需要在 scripts 中声明，不科学！



那么，现在有了 npx 以后，操作就变得简单了：

我们在一个空的文件夹中，安装了本地 vue-cli，然后不需要写 scripts，直接使用 npx。
```
npx vue init webpack yourproject
```


# 执行一次性命令


举例：使用create-react-app创建一个react项目。

老方法：
```
npm install -g create-react-app
create-react-app my-app
```

npx方式：
```
npx create-react-app my-app
```

这条命令会临时安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。

下次再执行，还是会重新临时安装。

npx 会帮你执行依赖包里的二进制文件。


举例来说，之前我们可能会写这样的命令：
```
npm i -D webpack
./node_modules/.bin/webpack -v
```

如果你对 bash 比较熟，可能会写成这样：
```
npm i -D webpack
`npm bin`/webpack -v
```

有了 npx，你只需要这样：
```
npm i -D webpack
npx webpack -v
```

也就是说 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！


npx 甚至支持运行远程仓库的可执行文件：
```
npx github:piuccio/cowsay hello
```


再比如 npx http-server 可以一句话帮你开启一个静态服务器！（第一次运行会稍微慢一些）
```
npx http-server
```


# 指定node版本来运行npm scripts

可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

```
npx -p node@<version> node -v 			可以使用指定版本的node运行命令
npx -p node@8 npm run build
```

可以使用 npx 的 -p 选项指定安装特定的包，并把它们添加到系统变量中。





[参考：](https://www.jianshu.com/p/cee806439865)