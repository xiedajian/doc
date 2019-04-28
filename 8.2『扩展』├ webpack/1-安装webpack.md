[文档](https://www.webpackjs.com/guides/installation/)

# webpack

前端必备的编译打包工具



# 安装

```
npm install --save-dev webpack
```

如果你使用 webpack 4+ 版本，你还需要安装 CLI
```
npm install --save-dev webpack-cli
```

对于大多数项目，我们建议本地安装。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。

通常，webpack 通过运行一个或多个 npm scripts，会在本地 node_modules 目录中查找安装的 webpack：
```
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```


# 全局安装

将使 webpack 在全局环境下可用：
```
npm install --global webpack
```

> 不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。



# 使用 npx 来避免全局安装 webpack 又方便使用

> 关于 npx 的使用请自行查询

```
npx webpack
```
调用本地局部安装的webpack-cli 
作用相当于
```
./node_modules/.bin/webpack
```



# 默认配置  

入口 ： ./src/index.js
出口： ./dist/main.js



# webpack 模块化支持

ES2015 中的 import 和 export 语句已经被标准化。虽然大多数浏览器还无法支持它们，但是 webpack 却能够提供开箱即用般的支持。

事实上，webpack 在幕后会将代码“转译”，以便旧版本浏览器可以执行。

注意，webpack 不会更改代码中除 import 和 export 语句以外的部分。

如果你在使用其它 ES2015 特性，请确保你在 webpack 的 loader 系统中使用了一个像是 Babel 或 Bublé 的转译器。



# 使用一个配置文件

在 webpack 4 中，可以无须任何配置使用，然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 配置文件。

这比在终端(terminal)中手动输入大量命令要高效的多，所以让我们创建一个取代以上使用 CLI 选项方式的配置文件：

webpack.config.js
```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

然后在 package.json 加入 NPM 脚本(NPM Scripts)
```
"build": "webpack --config webpack.config.js"
```

现在，可以使用 npm run build 命令




# 编译模式 mode

提供 mode 配置选项，告知 webpack 使用相应模式的内置优化

取值： development | production

 CLI 参数中传递：
 ```
 webpack --config webpack.config.js --mode=production
 ```
 
 两种模式的不同
 
 development 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
 
 production 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin