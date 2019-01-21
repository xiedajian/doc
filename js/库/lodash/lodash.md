
官网：https://www.lodashjs.com/

# loadsh

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。


## 为什么选择 Lodash ？

Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。

Lodash 的模块化方法 非常适用于：

- 遍历 array、object 和 string

- 对值进行操作和检测

- 创建符合功能的函数


> 首先要明白的是lodash的所有函数都不会在原有的数据上进行操作，而是复制出一个新的数据而不改变原有数据。


# lodash的引用

```
$ npm i lodash

const _ = require('loadsh')

import _ from 'lodash'
```


1. 多次循环
```
// 普通做法
for(var i = 0; i<5; i++){
	console.loh('for')
}

// lodash
_.times(5, ()=>{console.loh('for')})
```

2. 深层次