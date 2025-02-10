


# 通过ref直接拿到dom引用

```
<template>
    <div class="demo1-container">
        <div ref="sectionRef" class="ref-section"></div>
		<button @click="higherAction" class="btn">变高</button>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const sectionRef = ref()

let height = 100;
const higherAction = () => {
    height += 50;
    sectionRef.value.style = `height: ${height}px`;
}
</script>
```

通过对div元素添加了ref属性，为了获取到这个元素，我们声明了一个与ref属性名称相同的变量sectionRef，然后我们通过 sectionRef.value 的形式即可获取该div元素。

vue3.5使用语义化更好的useTemplateRef进行dom操作
```
<script setup>
import { useTemplateRef } from 'vue'

const inputRef = useTemplateRef('input')
</script>

<template>
  <input ref="input">
</template

```


# 通过父容器的ref遍历拿到dom引用

```html
<template>
    <div class="demo2-container">
        <p>通过父容器遍历拿到dom</p>
        <div ref="listRef" class="list-section">
            <div @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const listRef = ref()
const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7, 8]
})

const higherAction = (index: number) => {
    let height = listRef.value.children[index].style.height ? listRef.value.children[index].style.height : '20px';
    height = Number(height.replace('px', ''));
    listRef.value.children[index].style = `height: ${height + 20}px`;
}
</script>

<style lang="scss" scoped>
.demo2-container {
    width: 100%;
    height: 100%;

    .list-section {
        width: 200px;
        .list-item {
            width: 200px;
            height: 20px;
            background-color: pink;
            color: #333;
            transition: all .5s ease-in-out;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
```

通过对父元素添加了ref属性，并声明了一个与ref属性名称相同的变量listRef，此时通过listRef.value会获得包含子元素的dom对象
此时可以通过listRef.value.children[index]的形式获取子元素dom



# 通过:ref将dom引用放到数组中

```
<template>
    <div class="demo2-container">
        <div class="list-section">
            <div :ref="setRefAction" @click="higherAction(index)" class="list-item" v-for="(item, index) in state.list" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
    list: [1, 2, 3, 4, 5, 6, 7],
    refList: [] as Array<any>
})

const setRefAction = (el: any) => {
    state.refList.push(el);
}
</script>
```

通过:ref循环调用setRefAction方法，该方法会默认接收一个el参数，这个参数就是我们需要获取的div元素

此时可以通过state.refList[index]的形式获取子元素dom

适用场景:通过v-for循环生成的不固定数量或者多种元素的场景