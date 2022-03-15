

# vue 模板的限制，只能有一个根元素

例如下面这样会报错：
```
<template>
  <div>Node 1</div>
  <div>Node 2</div>
</template>
```
报错：只能有一个根元素
其中的原因是虚拟 DOM 的比较算法依赖于单根节点的组件

通常解决方法是在外面整体套一个div。 
但是当是 li tr 等元素，就无法在外面套个空容器



# vue-fragment

这通过操作dom的方式，实际运行时会删掉这个包裹容器。把子级提取到外层


## 安装

```
npm i vue-fragment
```

```
import { Plugin } from "vue-fragments";
Vue.use(Plugin);
```


## 使用

```
<template>  
  <fragment>
      <tr> item </tr>
      <tr> item </tr>
      <tr> item </tr>
  </fragment>
</template>
```