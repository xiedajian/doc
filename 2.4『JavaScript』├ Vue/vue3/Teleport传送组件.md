
# Teleport 传送组件

Teleport 是一种能够将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响，但data、prop数据依旧能够共用的技术
主要解决的问题：因为Teleport节点挂载在其他指定的DOM节点下，完全不受父级style样式影响
使用：
通过to 属性插入到指定元素位置，如 body，html，自定义className等等。

```
<template>
  <!-- 插入至 body -->
  <Teleport to="body">
    <Children></Children>
  </Teleport>
  <!-- 默认 #app 下 -->
  <Children></Children>
</template>
<script lang="ts" setup>
import Children from './Children.vue'
</script>
```