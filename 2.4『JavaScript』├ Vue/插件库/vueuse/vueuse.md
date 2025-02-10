[官网](https://vueuse.org/)

# VueUse

VueUse不是Vue.use，它是为Vue 2和3服务的一套Vue Composition API的常用工具集，是目前世界上Star最高的同类型库之一。

它的初衷就是将一切原本并不支持响应式的JS API变得支持响应式，省去程序员自己写相关代码。

通俗的来说，这就是一个工具函数包，它可以帮助你快速实现一些常见的功能，免得你自己去写，解决重复的工作内容。

这不就是曾经我也想自己写一个  vue 版的 hooks 库吗？

安装
```
npm i @vueuse/core
```

使用
```
// 导入
import { useMouse, usePreferredDark, useLocalStorage } from '@vueuse/core'

export default {
  setup() {
    // tracks mouse position
    const { x, y } = useMouse()

    // is user prefers dark theme
    const isDark = usePreferredDark()

    // persist state in localStorage
    const store = useLocalStorage(
      'my-storage',
      {
        name: 'Apple',
        color: 'red',
      },
    )

    return { x, y, isDark, store }
  }
}


```