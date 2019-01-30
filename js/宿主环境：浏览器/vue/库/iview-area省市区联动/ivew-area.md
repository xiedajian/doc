

[npm](https://www.npmjs.com/package/iview-area)

```
npm install iview-area --save
```


在main.js中写入下面的代码
```
   import iviewArea from 'iview-area';
    import Vue from 'vue';
    Vue.use(iviewArea);
```


接下来，你就可以在页面中使用iview-area了
```
<template>
    <al-selector v-model="res_s"/>
    <al-cascader v-model="res_c"/>
</template>
<script>
    export default {
        data () {
            return {
                res_s: [],
                res_c: []
            }
        }
    }
</script>

```


# config 配置

[config 配置](https://www.npmjs.com/package/iview-area#config-%E9%85%8D%E7%BD%AE)