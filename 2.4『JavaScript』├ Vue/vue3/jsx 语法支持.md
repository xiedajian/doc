

jsx语法支持，要借助插件@vitejs/plugin-vue-jsx

```js
<script setup>
const jsxNode = () => {
  return <div>text</div>;
};
</script>
<template>
  <jsxNode />
</template>

```


vite.config.ts配置
```js
// tsx语法支持
import vueJsx from '@vitejs/plugin-vue-jsx';
export default {
    plugins: [vueJsx(),],
}

```