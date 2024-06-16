
# vue同时传递到event和其他参数

```js
@click="test(...arguments,1)"
```


### 完整案例
```
<template>
  <button @click="test(...arguments,1)">点击</button>
</template>
<script>
export default {
  methods: {
    test(e,num){
      console.log(e);  // event对象
      console.log(num); // 1
    }
  },
}
</script>
```