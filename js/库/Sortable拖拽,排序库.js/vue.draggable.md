

[github](https://github.com/SortableJS/Vue.Draggable)

[参考文档](https://blog.csdn.net/zjiang1994/article/details/79809687)



# Vue.Draggable

Vue.Draggable 基于Sortable.js的vue组件，用以实现拖拽功能。


# 安装

```
npm i vuedraggable
```

# 引入
```
import draggable from 'vuedraggable'
```


# 使用



```
<template>
  <div>
    <!-- 调用组件  -->
    <draggable element="ul" v-model="list">
      <li v-for="item in list">{{item.name}}</li>
    </draggable>
    <!-- 输出list数据 -->
    {{list}}
  </div>
</template>

<script>
// 引入拖拽组件
import draggable from 'vuedraggable'
export default {
  name: 'demo',
  components: {
    //调用组件
    draggable,
  },
  data () {
    return {
      list:[
        {
          id: 1,
          name: 'a'
        },
        {
          id: 2,
          name: 'b'
        },
        {
          id: 3,
          name: 'c'
        },
        {
          id: 4,
          name: 'd'
        },
        {
          id: 5,
          name: 'e'
        },
        {
          id: 6,
          name: 'f'
        },
      ]
    }
  },
}
</script>
```


## 典型用途：

```
<draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
   <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
</draggable>
```


## 使用 transition-group:

```
<draggable v-model="myArray">
    <transition-group>
        <div v-for="element in myArray" :key="element.id">
            {{element.name}}
        </div>
    </transition-group>
</draggable>
```
可拖动组件应直接包装可拖动元素，或transition-component包含可拖动元素。



## 带页脚插槽

```
<draggable v-model="myArray" :options="{draggable:'.item'}">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="footer" @click="addPeople">Add</button>
</draggable>
```


## 带标题槽：

```
<draggable v-model="myArray" :options="{draggable:'.item'}">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="header" @click="addPeople">Add</button>
</draggable>
```


## 使用Vuex：

```
<draggable v-model='myList'>
```

```
computed: {
    myList: {
        get() {
            return this.$store.state.myList
        },
        set(value) {
            this.$store.commit('updateList', value)
        }
    }
}
```




# Props 属性

• value

类型：Array
必填：false
默认：null
	
将数组输入到可拖动组件。通常与内部元素v-for指令引用的数组相同。
这是使用Vue.draggable的首选方法，因为它与Vuex兼容。
它不应该直接使用，只能通过v-model指令：
```
<draggable v-model="myArray">
```

• list

类型：Array
必填：false
默认：null

就是value的替代品
主要区别在于list使用splice方法由可拖动组件更新，而value不可变。
和v-model不能共用
从表现上没有看出不同


• options 配置项

类型：Object
必填：false

用于初始化可排序对象的选项请参阅： [sortable选项文档](https://github.com/SortableJS/Sortable#options)
请注意，所有以“on”开头的方法都将被忽略，因为可拖动组件通过事件公开相同的API。
例如，可以使用此绑定添加拖动句柄:options="{handle:'.handle'}"。
阅读链接文档，了解可用的其他选项。

• element
类型：String
默认：'div'

可拖动组件创建的元素的HTML节点类型作为包含的插槽的外部元素。就是<draggable>标签在渲染后展现出来的标签类型
也可以将vue组件的名称作为元素传递。在这种情况下，draggable属性将传递给create组件。
又见componentData，如果你需要的道具或事件设置为创建的组件。


• clone

类型：Function
必填：false
默认：(original) => { return original;}

当clone选项为true时，函数调用源组件克隆元素。唯一参数是要克隆的viewModel元素，返回值是其克隆版本。
默认情况下，vue.draggable会重用viewModel元素，因此如果要克隆或深度克隆它，则必须使用此挂钩。
这一项要配合着options的group项的pull项处理，当pull:'clone'时的拖拽的回调函数,就是克隆的意思。可以理解为正常的拖拽变成了复制,当为true时克隆


• move

类型：Function
必填：false
默认：null

如果不为null，则将以与Sortable onMove回调类似的方式调用此函数。返回false将取消拖动操作。
```
function  onMoveCallback（evt，originalEvent）{
    ... 
    //返回false; - 取消 
}
```

理解：就是拖拽项时调用的函数，用来确定拖拽是否生效，返回null时可以生效，可以通过函数判断，有一个参数:evt ，evt为object

evt为object
- draggedContext: 被拖拽元素的上下文 
	- index:拖拽元素的指针
	- element: 拖拽数据本身
	- futureIndex: 拖动后的index
- relatedContext: 拖入区域的上下文 
	- index: 目标元素的index
	- element:目标数据本身
	- list: 拖入的列表
	- component:目标组件

```
<draggable element="ul" v-model="list" :move='allow'>
...
methods: {
  allow(evt) {
    console.log(evt.draggedContext.index)
    console.log(evt.draggedContext.element)
    console.log(evt.draggedContext.futureIndex)
    console.log(evt.relatedContext.index)
    console.log(evt.relatedContext.element)
    console.log(evt.relatedContext.list)
    console.log(evt.relatedContext.component)
    return (evt.draggedContext.element.name!== 'b')
  }
}
```


• componentData

类型：Object
必填：false
默认：null

此props用于将附加信息传递给元素props声明的子组件。 用来结合UI组件的，可以理解为代理了UI组件的定制信息

包含两项:props和on 
props：要传递给子组件的属性
on：要在子组件中订阅的事件

```
<draggable element="el-collapse" :list="list" :component-data="getComponentData()">
    <el-collapse-item v-for="e in list" :title="e.title" :name="e.name" :key="e.name">
        <div>{{e.description}}</div>
     </el-collapse-item>
</draggable>

methods: {
    handleChange() {
      console.log('changed');
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
          value: this.activeNames
        }
      };
    }
  }
```


# 事件

支持可排序事件：
```
start, add, remove, update, end, choose, sort, filter, clone
```

event参数带有如下属性：

• added: 包含被添加到列表的元素 
	newIndex: 添加后的新索引
	element: 被添加的元素
• removed: 从列表中移除的元素 
	oldIndex: 移除前的索引
	element: 被移除的元素
• moved：内部移动的 
	newIndex: 改变后的索引
	oldIndex: 改变前的索引
	element: 被移动的元素

