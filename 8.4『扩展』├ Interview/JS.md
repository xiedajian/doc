
# html节点的种类有几种，分别是什么？
(1)元素节点：nodeType ===1;
(2)文本节点：nodeType ===3;
(3)属性节点：nodeType ===2;

# 什么是事件委托，应用在哪些地方

# 常见的状态码有哪些，

# var 申明变量 和用 let什么变量有啥区别
# console.log(c) 打印了一个没有定义的变量，会输出什么。

# 判定变量是否为数组
```js
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[Object Array]';
}
```

# 怎么判断两个对象相等
# 两个对象合并

# A,B,C 3个异步，C要求在AB完成之后执行

# 前端模块化的规范你都知道哪些，有什么差别 （common.js 和 es6 ）

CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。
运行在浏览器端的 JavaScript 由于也缺少类似的规范，在 ES6 出来之前，
前端也实现了一套相同的模块规范 (例如: AMD)，用来对前端模块进行管理。
自 ES6 起，引入了一套新的 ES6 Module 规范，在语言标准的层面上实现了模块功能，
而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。
但目前浏览器对 ES6 Module 兼容还不太好，我们平时在 Webpack 中使用的 export 和 import，
会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：


CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
CommonJs 是单个值导出，ES6 Module可以导出多个
CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined






