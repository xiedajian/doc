
# v-for中使用ref

```
// vue2.x
<p v-for="item in renderData" :key="item.name" ref="nodes">{{item.name}}</p>

console.log(this.$refs.nodes) // 返回所有循环的p元素节点
```


```
// vue3.x
// 如果还是按照Vue2.x的方式
<p v-for="item in renderData" :key="item.name" ref="nodes"></p>

console.log(this.$refs.nodes) // 此时只能得到循环后最后一个P元素节点

// Vue3.x中，使用函数处理v-for中的ref，且用变量单独存储。
<p v-for="item in renderData" :key="item.name" ref="handleNodes"></p>

setup() {
    const data = reactive({
        nodes: []
    });
    const handleNodes = nodeItem => {
        data.nodes.push(nodeItem);
    }
    return {
        ...toRefs(data)
    }
}
```