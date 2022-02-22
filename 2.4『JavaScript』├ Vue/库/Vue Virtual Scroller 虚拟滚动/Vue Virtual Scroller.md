
[](https://github.com/Akryum/vue-virtual-scroller)
[](https://www.npmjs.com/package/vue-virtual-scroller)



# Vue Virtual Scroller

长列表, 虚拟滚动

Vue Virtual Scroller具有四个主要组件。RecycleScroller可以渲染列表中的可见项。如果咱们不知道数据具体的数量，最好使用DynamicScroller。
DynamicScrollerItem将所有内容包装在DynamicScroller中（以处理大小更改）。IdState简化了本地状态管理（在RecycleScroller内部）。


看到源码目录，主要有 RecycleScroller.vue、DynamicScroller.vue和DynamicScrollerItem.vue这三个组件，然而RecycleScroller为实现核心。
在demo上看到有两个不同的实现，他们两者之间的区别是什么呢？

在应用上 RecycleScroller 需要item的高度为静态的，也就是列表每个item的高度都是一致的。

而 DynamicScroller就可以兼容item的高度为动态的。但是理论上 RecycleScroller 也可以实现动态高度的item，只要有方案计算到item的height就可以(DynamicScrollerItem解决的就是这个问题)。




# 使用

```
import Vue from 'vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)

import { RecycleScroller } from 'vue-virtual-scroller'

Vue.component('RecycleScroller', RecycleScroller)
```

```
<link rel="stylesheet" href="vue-virtual-scroller/dist/vue-virtual-scroller.css"/>

<script src="vue.js"></script>
<script src="vue-virtual-scroller/dist/vue-virtual-scroller.min.js"></script>
```



# 使用

RecycleScroller:
```
<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }"
  >
    <div class="user">
      {{ item.name }}
    </div>
  </RecycleScroller>
</template>

<script>
export default {
  props: {
    list: Array,
  },
}
</script>

```

DynamicScroller:
```
<template>
  <DynamicScroller
    :items="items"
    :min-item-size="54"
    class="scroller"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[
          item.message,
        ]"
        :data-index="index"
      >
        <div class="avatar">
          <img
            :src="item.avatar"
            :key="item.avatar"
            alt="avatar"
            class="image"
          >
        </div>
        <div class="text">{{ item.message }}</div>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script>
export default {
  props: {
    items: Array,
  },
}
</script>
```