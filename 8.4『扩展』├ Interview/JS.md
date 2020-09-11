
# html节点的种类有几种，分别是什么？
(1)元素节点：nodeType ===1;
(2)文本节点：nodeType ===3;
(3)属性节点：nodeType ===2;

# 什么是事件委托，应用在哪些地方
原理是使用dom的冒泡，将事件绑定到父元素上，让父元素进行监听，提高性能
并且，后来新增的li元素还会有点击事件效果

# 基本数据类型和引用数据类型的区别
基本数据类型存储到栈内存中，引用数据类型存储到堆内存中 
基本数据类型操作值的，引用数据类型操作的是空间地址；
基本数据类型: number(数字) string(字符串) boolean(布尔) null undefined；
对象数据类型(非基础就是对象)：对象、数组 、正则 、Date的实例、Math… 函数,类
# 常见的状态码有哪些

# var 申明变量 和用 let什么变量有啥区别
# console.log(c) 打印了一个没有定义的变量，会输出什么。

# null和undefind的区别
null是表示一个空的对象，转为数值为0，undefind表示一个空的原始值，转为数值为NAN
当声明的变量还未被初始化时，变量的默认值为undefined。 null用来表示尚未存在的对象
undefined是访问一个未初始化的变量时返回的值，而null是访问一个尚未存在的对象时所返回的值
undefind指本该有一个值，但却并有定义，null表示没有对象，不应该有值

# 判定变量是否为数组
```js
instanceof
```
```js
// Array.isArray() 用于确定传递的值是否是一个数组，返回一个布尔值。但有个问题，Array.isArray() 是在ES5中提出
let a = [1,2,3]
Array.isArray(a);//true
```
```js
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[Object Array]';
}
```
# 数组去重
# 怎么判断两个对象相等
# 两个对象合并

# A,B,C 3个异步，C要求在AB完成之后执行

# 函数申明与函数表达式的区别
```
// 函数声明
    function funDeclaration(type){
        return type==="Declaration";
    }
// 函数表达式
    var funExpression = function(type){
        return type==="Expression";
    }
```
Javascript 中函数声明和函数表达式是存在区别的，函数声明在JS解析时进行函数提升，
因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。
而函数表达式的值是在JS运行时确定，并且在表达式赋值完成后，该函数才能调用。




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



# webpack
如何配置多入口文件?
你是如何提高webpack构件速度的?
利用webpack如何优化前端性能?

通过cdn的方式引入的库，怎么在webpack项目中使用