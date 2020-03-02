

# 搭建一个vue组件npm包

vue cli3 让我们很轻松的创建打包一个库


## vue-cli-service

vue-cli-service serve
```
Usage: vue-cli-service serve [options]
Options:
  --open    服务器启动时打开浏览器
  --copy    将URL复制到服务器启动时的剪贴板 (直接到浏览器去粘贴就OK了 http://localhost:8080/)
  --mode    指定环境模式 (默认: development)
  --host    host 地址 (default: 0.0.0.0)
  --port    端口号 (default: 8080)
  --https   使用https (default: false)
```

vue-cli-service build
 ```
 Usage: vue-cli-service build [options] [entry|pattern]
 Options:
   --mode        指定环境模式 (default: production)
   --dest        指定输出目录 (default: dist)
   --modern      构建两个版本的 js 包：一个面向支持现代浏览器的原生 ES2015+ 包，以及一个针对其他旧浏览器的包。
   --target      允许您以项目库或Web组件的形式在项目内部构建任何组件 app | lib | wc | wc-async (default: app) ???
   --name        lib或者web组件库的名称 (default: "name" in package.json or entry filename)
   --no-clean    在构建项目之前不要删除输出目录(dist)
   --report      生成report.html以帮助分析包内容
   --report-json 生成report.json来帮助分析包内容
   --watch       监听 - 当有改变时 自动重新打包~
 ```


vue-cli-service inspect
```
Usage: vue-cli-service inspect [options] [...paths]
Options:
  --mode    指定环境模式 (default: development)
```



想要搭建一个组件库，我们必须先要有一个大概的思路。

规划目录结构
配置项目以支持目录结构
编写组件
编写示例
配置使用库模式打包编译
发布到npm





# 规划目录结构

1、创建项目
在指定目录中使用命令创建一个默认的项目，或者根据自己需要自己选择。

```
$ vue create .
```


2、调整目录
我们需要一个目录存放组件，一个目录存放示例，按照以下方式对目录进行改造。

```
.
...
|-- examples      // 原 src 目录，改成 examples 用作示例展示
|-- packages      // 新增 packages 用于编写存放组件
...
. 
```



# 配置项目以支持新的目录结构

我们通过上一步的目录改造后，会遇到两个问题。

1.src目录更名为examples，导致项目无法运行
2.新增packages目录，该目录未加入webpack编译

注：cli3 提供一个可选的 vue.config.js 配置文件。如果这个文件存在则他会被自动加载，所有的对项目和webpack的配置，都在这个文件中。


### 1、重新配置入口，修改配置中的 pages 选项
新版 Vue CLI 支持使用 vue.config.js 中的 pages 选项构建一个多页面的应用。

这里使用 pages 修改入口到 examples

```
module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  }
}
```

### 2、支持对 packages 目录的处理，修改配置中的 chainWebpack 选项
packages 是我们新增的一个目录，默认是不被 webpack 处理的，所以需要添加配置对该目录的支持。

chainWebpack 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。

```
module.exports = {
  // 修改 src 为 examples
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
        .add('packages')
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```












