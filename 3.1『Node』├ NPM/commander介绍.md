前言

在使用Nodejs过程中，有很多包都支持全局安装，然后提供一个命令，然后在命令行我们就可以完成一些任务，像 express, grunt, bower, yeoman, reap, karma, requirejs 等。有时候，我们也需要自己开发这样的命令行工具。


commander.js，可以帮助我们简化命令行的开发。

## 1. commander介绍
commander是一个轻巧的nodejs模块，提供了用户命令行输入和参数解析强大功能。commander源自一个同名的Ruby项目。

commander的特性：

自记录代码
自动生成帮助
合并短参数（“ABC”==“-A-B-C”）
默认选项
强制选项​​
命令解析
提示符


## 2.commander安装

npm install commander --save



## 3. commander的API
Option(): 初始化自定义参数对象，设置“关键字”和“描述”
Command(): 初始化命令行参数对象，直接获得命令行输入
Command#command(): 定义一个命令名字
Command#action(): 注册一个callback函数
Command#option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
Command#parse(): 解析命令行参数argv
Command#description(): 设置description值
Command#usage(): 设置usage值



## 4.使用
通过一个案例来说明
```

var program = require('commander');

program
    .version('0.0.1')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);

```




