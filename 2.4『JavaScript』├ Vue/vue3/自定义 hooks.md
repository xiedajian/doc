
# 自定义 hooks

我们都知道在 vue 中有个东西叫 mixins，他可以将多个组件中相同的逻辑抽离出来，实现一次写代码，多组件受益的效果。
但是 mixins 的副作用就是引用的多了变量的来源就不清晰了，而且还会有变量来源不明确,不利于阅读，容易使代码变得难以维护。

Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数


案例： useWindowResize.js

```
import { onMounted, onUnmounted, ref } from "vue";

function useWindowResize() {
  const width = ref(0);
  const height = ref(0);
  function onResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }
  onMounted(() => {
    window.addEventListener("resize", onResize);
    onResize();
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
  return {
    width,
    height
  };
}

export default useWindowResize;
```

使用：
```
<template>
  <h3>屏幕尺寸</h3>
  <div>宽度：{{ width }}</div>
  <div>高度：{{ height }}</div>
</template>

<script setup lang="ts">
import useWindowResize from "../hooks/useWindowResize.js";
const { width, height } = useWindowResize();
</script>
```