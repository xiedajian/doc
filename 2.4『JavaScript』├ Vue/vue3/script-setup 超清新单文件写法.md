[官方文档](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md)

# script-setup 超清新单文件写法

```
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
```

遵循 setup 函数的规则，仅在组件加载时调用一次

```
<script setup>
  // Top level await can be used inside <script setup>. 
  // The resulting setup() function will be made async.
  const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```


```
<script setup>
  // imported components are also directly usable in template
  import Foo from './Foo.vue'
  import { ref } from 'vue'

  // write Composition API code just like in a normal setup()
  // but no need to manually return everything
  const count = ref(0)
  const inc = () => {
    count.value++
  }
</script>

<template>
  <Foo :count="count" @click="inc" />
</template>
```


## 如何定义组件名 => name
script-setup 无法指定当前组件的名字，所以使用的时候以文件名为主


## 如何导入组件 => components
在 script-setup 中导入任意的组件就可以直接在 template 中使用

```
<script setup>
  // imported components are also directly usable in template
  import Foo from './Foo.vue'
</script>

<template>
  <Foo />
</template>
```

## 如何导入指令 => directive

导入指令的用法同 导入组件
```
<script setup>
  import { directive as clickOutside } from 'v-click-outside'
</script>

<template>
  <div v-click-outside />
</template>
```



## 如何获取 slots 和 attrs

```
<script setup>
  import { useContext } from 'vue'

  const { slots, attrs } = useContext()
</script>
```