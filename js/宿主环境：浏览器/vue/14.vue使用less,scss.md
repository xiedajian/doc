


# 使用less

## 第一步：安装less依赖

npm install less less-loader --save-dev


## 第二步：在配置文件中配置

实际上如果我们通过vue-cli来构建项目，这一步是可以省略的。vue已经配置后了

下面是已经配置好的配置

在webpack.dev.conf.js中，我们可以看到下面的代码：

```
 module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
```
即webpack.dev.conf.js在合并了webpack.base.conf.js的基础上又添加了dev环境下的module。 

在build文件夹下有一个utils.js文件，这个文件提供了一些通用的方法，供webpack.dev.conf.js和webpack.prod.conf.js使用。 其中styleLoaders方法如下：

```
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
```
通过这个方法可以对大多数css预处理进行了配置，具体配置在cssLoaders方法中


## 在单组件.vue中使用   lang="less"

```
<style scoped lang="less">
  .hello {
    color: red;
    font-size: 0.45rem;
    h2 {
      color: blue;
    }
  }
</style>

<template>
  <div class="hello">
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data: function () {
    return {
      msg: "Welcome to your vue.js app"
    }
  }
}
</script>
```
注意一下几点：

- 已经在webpack中配置了，所以这里不需要引入任何less文件。
- 在style中声明lang="less"。 注意： scoped的作用仅仅是限定css的作用域，防止变量污染。
- 这样就可以根据less的语法使用了





# 使用 sass 

与使用 less 一样

1. 安装
```
npm install node-sass sass-loader --save-dev

```
2. 无需配置，vue已经自带less sass配置
3. 在单组件.vue中使用 
```
<style lang="scss" scoped></style>
```
