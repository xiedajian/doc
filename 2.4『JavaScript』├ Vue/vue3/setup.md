
# setup

本章将进入Vue3.x的魅力所在 setup composition-api的标志。
1、概述：一个新的Vue的组件选项，它是组件中使用composition API的一种标志（入口）
2、执行：在组件解析完props后，组件创建之前执行。也被认作为composition API的入口
3、参数：props（为组件的props），context（包含attrs；emit；slots三个组件的property）
4、用例：
```
// user.vue
<script>
    export default {
        setup(props, context){
            ...
            return {...};
        }
    }
</script>
```

5、调用时组件状态：实例化还未开始
6、props：需要在组件选项中定义props，并接收传递的值，才能在setup中使用其值
```
// user.vue
<script>
    export default {
        props: {name: String}
        setup(props, context){
            console.log(props.name) // 能获取到
            console.log(props.age) // 不能获取到--undefined
            return {...};
        }
    }
</script>
```

注意：props为响应式代理，如果使用es6的数据解构操作，将使得解构后的数据失去响应式（即：不能实时获取到父组件传来的值）


7、扩展：父组件通过属性传的值在子组件中的各个部分的获取：
 ①：props：通过父传子的方式直接获取到值
 ②：setup(props, context){} 方法中的props只能拿到选项props中已经定义的属性；
 ③：setup(props, { attrs, emit, slots}){} 方法中的attrs只能拿到未在选项props中定义的属性；
 ④：通过{ proxy } = getCurrentInstance(); proxy.attrs也只能拿到未在选项props中定义的属性；


8、context：非响应式的对象；包含了组件暴露的三个property：
 context.attrs：传入组件中但是未被props接收的对象。
 context.emit：用于触发当前组件实例上的传值事件。
 context.slots：用来访问被插槽分发的内容（一般用于使用渲染函数来书写一个组件时）
9、return()：若需要在当前组件视图中或其他组件中使用当前组件创建的响应式变量及方法，则需要导出相应的响应式变量及方法。

```
// user.vue
<template>
    <p>{{name}}</p>
</template>
<script>
    import { ref } from 'vue';
    export default {
        setup(props, context){
            const name = ref('zhang_san');
            return { name };
        }
    }
</script>
```

return也具有渲染功能：
```
// user.vue
<script>
    import { ref, h } from 'vue';
    export default {
        setup(props, context){
            return() => h('div', { class: 'red' }, '内容');
            // <template><div class="red">内容</div></template>
        }
    }
</script>
```