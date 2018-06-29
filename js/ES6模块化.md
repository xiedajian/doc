

# 模块化

ES6之前已经出现了js模块加载的方案，最主要的是CommonJS和AMD规范。commonjs主要应用于服务器，实现同步加载，如nodejs。AMD规范应用于浏览器，如requirejs，为异步加载。同时还有CMD规范，为同步加载方案如seaJS。

默认情况下，JavaScript中在模块内的所有声明都是本地的，外部无法访问。如果需要公开模块中部分声明的内容，并让其它模块加以使用，这个时候就需要导出功能

ES6在语言规格的层面上，实现了模块功能，而且实现得相当简单，完全可以取代现有的CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案。

ES6模块主要有两个功能：export和import

- 每一个模块只加载一次， 每一个JS只执行一次， 如果下次再去加载同目录下同文件，直接从内存中读取。 一个模块就是一个单例，或者说就是一个对象

- 每一个模块内声明的变量都是局部变量， 不会污染全局作用域

- export用于对外输出本模块（一个文件可以理解为一个模块），导出内容可以是一个var，function、class，object等

- import用于在一个模块中加载另一个含有export接口的模块。

- import命令具有提升效果，会提升到整个模块的头部，首先执行。



## export 

注意： 是export ，不是exports

写法

```
	// 写法1
	export var name = 'xie';
	// 写法2，与1 其实是一样的
	var name = 'xie';
	export name;
	// 写法3 ，推荐
	var name = 'xie';
	export { name }
```

案例：

```
	// 常量
	export const sqrt = Math.sqrt;
	// 函数
	export function square(x){ return x*x; }

	// 对象
	export p = {
		name : 'xie',
		age  : 22,
	}

	// 类
	export class Person{
	 	constructor(name, age){
	    	this.name = name;
	    	this.age = age;
	    }
	    getName(){
	    	return this.name;
	    }
	}
```


## import

ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值

引入外部模块分两种情况

1. 引入外部模块的变量函数等
```
	import { sqrt, square, p, Person } form './a.js';
```
2. 引入外部的模块，并立刻执行

```
	import './style.css';		// 执行，但没有导入变量
```


## export default

默认导出

注意： 一个文件最多只能有一个 export default 

理解： 实际导出的是一个default命名的变量进行重命名，等价语句如下。所以import后可以是任意变量名称，且不需要{}

```
	import any from './require'
	// 等价于
	import {default as any } from './require'
```

例如：

```
	// a.js

	var name = 'xie';
    export default name; 

	// b.js
	import n form './a.js';
```


### 重命名导入与导出

导出

```
	function fun(){};
	export { fun as fun1, fun as fun2 }
```

导入

```
	import { fun as fun1 } form 'a.js';
	import { fun as fun2 } form 'b.js';

```


### 导入整个模块的内容组成一个对象

```
	import * as myModule form 'my-module.js';

	console.log( myModule.name );
```


## 与 Commonjs 的 require ，module exports 区分

commonjs

```
	// 方式1
	exports.name = 'xie';
	// 方式2
	exports = { name:'xie'}
	// 方式3 ，等效
	module.exports = { name: 'xie'}


	var md = require('./a');
	console.log( md.name );

```

ES6模块与CommonJS模块的差异:

- CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用。

- CommonJS模块是运行时加载，ES6模块是编译时输出接口
