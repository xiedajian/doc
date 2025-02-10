
[import](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

# import

```
import defaultExport from "module-name";
import * as name from "module-name";	//使用* 来引入模块下所有的内容
import { export } from "module-name";
import { export as alias } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";	//执行"module-name"模块，不输入任何值
var promise = import("module-name");//这是一个处于第三阶段的提案。
```

静态的**import** 语句用于导入由另一个模块导出的绑定。
无论是否声明了 strict mode ，导入的模块都运行在严格模式下。
在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用。

此外，还有一个类似函数的动态 import()，它不需要依赖 type="module" 的script标签。

在 script 标签中使用 nomodule 属性，可以确保向后兼容。

import * as name语法导入所有导出接口，即导入模块整体。



# 动态 import()

标准用法的import导入的模块是静态的，会使所有被导入的模块，
在加载时就被编译（无法做到按需编译，降低首页加载速度）

有些场景中，你可能希望根据条件导入模块或者按需导入模块，这时你可以使用动态导入代替静态导入。

请不要滥用动态导入（只有在必要情况下采用）。静态框架能更好的初始化依赖，而且更有利于静态分析工具和tree shaking发挥作用

关键字import可以像调用函数一样来动态的导入模块。以这种方式调用，将返回一个 promise

```
 let modulePage = "/modules/my-module.js";
 import(modulePage).then((module) => {
    module.init();
 });
```

这种使用方式也支持 await 关键字。
```
let module = await import('/modules/my-module.js');
```

```
(async () => {
    const { default: myDefault, foo, bar } = await import('/modules/my-module.js');
})();
```


## 动态 import() 函数适用场合

1）按需加载：
import模块在事件监听函数中，只有用户点击了按钮，才会加载这个模块
```
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

2）条件加载：
import()可以放在if...else语句中，实现条件加载。
```
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```



# 编译时加载

es6的模块设计能够完全取代之前的commonjs和AMD规范，成为浏览器和服务器通用的模块解决方案。

```
import {stat, exists, readFile} from 'fs';
```

此种方法为编译时加载，实质是从fs模块加载3个方法，而其他方法不加载，
es6能够在编译时就能够完成模块编译，因此效率要比commonJS模块的加载方式高。

注意： es6的模块加载输出的是值的引用，而CommonJS则输出的时值的拷贝，


# export

写法1: 定义时输出

```
export var name = "huangxiaoyu";
export var year = 1995;
```


写法2: 先定义，后输出
```
var name = "huangxiaoyu";
var year = 1995;
export {name, year};

```

上面两种写法其实是等价的。

此外，还可使用as关键字对变量、方法进行重命名（不重命名则默认为原本的文字）

```
let name1 = "huangcongcong";
let name2 = "huangxiaoyu";

export {
    name1 as name,
    name2 as nickName
}
```


## export default 命令

关键词 default
```
export default function () {} 		// 导出默认的匿名函数
```

```
// 也可以导出非匿名函数 foo.js
function foo(){}
export default foo;
```

```
import fun1 from './default.js'; // 引入时可以为该匿名函数重新命名，注意此处没有使用大括号
```



## export命令和import命令 复合模式

export命令和import命令结合在一起写成一行，变量实质没有被导入当前模块，相当于对外转发接口，导致当前模块无法直接使用其导入变量，

- 默认导入导出： `export { default } from './Index'
- 整体导入导出： `export * from './Index'
- 按需导入导出： `export { name, value, id } from './Index'
- 默认改具名导入导出： `export { default as name } from './Index'






