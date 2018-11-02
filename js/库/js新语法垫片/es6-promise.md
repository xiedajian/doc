
github: https://github.com/stefanpenner/es6-promise

# es6-promise

ES6 promise 的垫片

例如axios是基于Promise的，兼容低版本浏览器，需要引入polyfill。

Polyfill 推荐使用 es6-promise


## 安装

cdn:

<!-- Automatically provides/replaces `Promise` if missing or broken. -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script> 

<!-- Minified version of `es6-promise-auto` below. -->
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script> 


node:

npm install es6-promise

## 使用

var Promise = require('es6-promise').Promise;


## 自动填充

要通过CommonJS填充全局环境（在Node或浏览器中），请使用以下代码段

```
require('es6-promise').polyfill()
```