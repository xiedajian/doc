


# 开发代码兼容

Vue CLI 3初始化的项目，构建时会根据package.json中的browserslist配置自动检测需要转译的语言特性，为构建代码转译JavaScript 并为 CSS 添加浏览器前缀，通常只需要修改browserslist即可兼容目标浏览器，例如兼容IE10可以做如下配置：

```
"browserslist": [
    "ie 10"
  ]
```



# 依赖包兼容

但该特性仅对源码(src/)有效，对依赖包无效，当依赖包需要做兼容性转译时，有三种选择：


1.如果确切知道有兼容性问题的依赖包名，可以配置项目根目录下的vue.config.js（默认不存在），将依赖包名添加到transpileDependencies键中，这会为该依赖同时开启语法语法转换和根据使用情况检测 polyfill。例如：
```
module.exports = {
    transpileDependencies: ["vue-plugin-load-script"]       // 需要编译的依赖包名
}
```


2.如果确切的知道需要转译的语言特性，可以配置根目录下的babel.config.js，为presets的值添加所需要的 polyfill，例如：
```
module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.symbol'
      ]
    }]
  ]
}
```


3.然而更多的情况是，我们并不确切的知道项目中引发兼容问题的具体原因，这时还可以配置为根据兼容目标导入所有 polyfill，需要设置babel.config.js为：
```
module.exports = {
  presets: [
    ['@vue/app', {
        useBuiltIns: 'entry'
    }]
  ]
}
```


```
npm install @babel/polyfill
```
同时在入口文件（main.js）第一行添加

```
import '@babel/polyfill'
```
这种方式可能导入代码中不需要的polyfill，从而使打包体积更大。

我在这里遇到一个问题，有的依赖不仅需要添加它自身到 transpileDependencies 中，还需要添加它的某些依赖到 transpileDependencies 中，如果官方文档中没有明确指出的话可能还是不能正确的配置。
