[npm](https://www.npmjs.com/package/vue-virtual-scroll-list)
[官网案例](https://tangbc.github.io/vue-virtual-scroll-list/#/)
[github](https://github.com/tangbc/vue-virtual-scroll-list)

# vue-virtual-scroll-list

虚拟滚动列表，用于大数据列表。

不必担心每个子项目的大小，它都会自动计算。

- 支持水平方向虚拟滚动
- 支持滚到到底部事件，可用于上拉加载


## 安装
```
npm install vue-virtual-scroll-list --save
```

## 使用
```
<template>
  <div>
    <virtual-list
      :size="60" // You dont know? no problem, just pass a estimate value!
      :keeps="30"
      :data-key="'uid'"
      :data-sources="items"
      :data-component="itemComponent"
      :extra-props="{ otherPropValue: otherDataAssginToItemComponet }"
    />
  </div>
</template>
 
<script>
  import Item from './Item'
  import VirtualList from 'vue-virtual-scroll-list'
 
  export default {
    name: 'root',
    data () {
      return {
        itemComponent: Item,
        items: [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'}, ...],
        otherDataAssginToItemComponet: 'The Progressive JavaScript Framework',
      }
    },
    components: { 'virtual-list': VirtualList }
  }
</script>
```

## Item 子项
```
<template>
  <div>{{ index }} - {{ source.text }} - {{ otherPropValue }}</div>
</template>
 
<script>
  export default {
    name: 'item-component',
    props: {
      index: { // index of current item
        type: Number
      },
      source: { // here is: {uid: 'unique_1', text: 'abc'}
        type: Object,
        default () {
          return {}
        }
      },
      otherPropValue: String // here is: 'The Progressive JavaScript Framework'
    }
  }
</script>
```



## Props type

### Required props

| **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Type**  | **Description**                                                                                                                              |
|------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `size`           | Number        | Each item size, you don't have to know the accurate, just simply pass an **estimate** or **average** value.                                     |
| `keeps`          | Number        | How many items you are expecting the list to keep rendering in the real dom.                                                                      |
| `data-key`       | String        | The unique key get from `data-sources` in each data object, its value **must be unique** in `data-sources`, it is used for identifying item size. |
| `data-sources`   | Array[Object] | The source array built for list, each array data must be an object and has an unique key for `data-key` property.                                 |
| `data-component` | Component     | The render item component created / declared by vue, and it will use the data object in `datas-sources` as render prop and named: `source`. 
  
	 
	 
## Public methods

Here are some usefull public methods you can call via [`ref`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements):

* `reset()`: reset all state back to initial.

* `scrollToBottom()`: manual set scroll position to bottom.

* `scrollToIndex(index)`: manual set scroll position to a designated index.

* `scrollToOffset(offset)`: manual set scroll position to a designated offset.

* `getSize(id)`: get the designated item size by id (from data-key value).

* `getSizes()`: get the total number of stored (rendered) items.

* `getOffset()`: get current scroll offset.

* `getClientSize()`: get wrapper element client viewport size (width or height).

* `getScrollSize()`: get all scroll size (scrollHeight or scrollWidth).