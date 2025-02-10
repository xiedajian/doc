
require.context
webpack 中的 require.context 可以完全由import.meta.glob替换

```
const viewContext = require.context("../views", true, /.vue$/);
等价于
const modules = import.meta.glob('../views/*.vue');

```
