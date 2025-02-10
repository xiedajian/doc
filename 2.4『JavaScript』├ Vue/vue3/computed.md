
# 计算属性 - computed

本章介绍到的是Vue3.x中的计算属性computed，区别于Vue2.x来说，采用了函数的形式来实现。
1、概述：Vue2.x中的计算属性，在Vue3.x中以方法的形式使用
2、用例：由vue提供，按需引入：import { computed } from 'vue';
一般用法：

```
import { ref, computed } from 'vue';
setup(){
    const age = ref(20);
    const userAge = computed(() => `今年${age.value}岁了！`);
    return { userAge };
}
```


带有get和set功能的用法
```
import { ref, computed } from 'vue';
setup(){
    const age = ref(20);
    const userAge = computed({
        get: () => `今年${age.value}岁了！`,
        set: val => age.value = val + 1
    });
    return { userAge };
}
```


```
const person = reactive({
   fistName:"Mr",
   lastName:"long"
}) 

// 计算属性简写
let fullName = computed(()=>{
  return person.fistName + '-' + person.lastName
})

// 计算属性完整写法
let fullName = computed({
  get(){
    return person.fistName + '-' + person.lastName
  },
  set(value){
    const newArr = value.split('-')
    person.fistName = newArr[0]
    person.lastName = newArr[1]
  }
})

```