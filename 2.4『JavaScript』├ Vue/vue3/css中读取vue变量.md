



# 动态class的设置方法

```
<script setup>
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<template>
  <h1 :class="'red' ${msg === 'Hello World!' && 'green'}">{{ msg }}</h1>
  <input v-model="msg">
</template>
<style scoped>
  .red{
    color:red;
  }
  .green{
    color:green
  }
</style>

```

# style v-bind CSS变量注入

```
<template>
  <span> style v-bind CSS变量注入</span>  
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const color = ref('red')
</script>
<style scoped>
  span {
    /* 使用v-bind绑定组件中定义的变量 */
    color: v-bind('color');
  }  
</style>
```