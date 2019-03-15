
[中文官网](https://babel.docschina.org/)


# babel

Babel 是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。

这意味着，你可以现在就用 ES6 编写程序，而不用担心现有环境是否支持



# babel-cli

Babel 提供 babel-cli 工具，用于命令行转码。
```
npm install babel-cli -g
```

基本用法如下。

转码结果写入一个文件
```
$ babel example.js --out-file compiled.js				# --out-file 或 -o 参数指定输出文件
# 或者
$ babel example.js -o compiled.js
```

整个目录转码
```
$ babel src --out-dir dist							# --out-dir 或 -d 参数指定输出目录, -s 参数生成source map文件
# 或者
$ babel src -d dist
```


# 配置文件.babelrc

Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

如果要使babel起作用，便需要配置babel规则。

该文件用来设置转码规则和插件，基本格式如下。

```
  {
    "presets": [],
    "plugins": []
  }
```

”presets”属性字段设定转码规则，”plugins”属性设置使用到的插件。

"presets": ["env"] 表示使用bable-preset-env规则进行转码，即实现对ES2015+语法进行转码。 


