
文档： https://doc.vux.li/zh-CN/about/before-using-vux.html

官网：https://vux.li/

# vuex

基于WeUI和Vue(2.x)开发的移动端UI组件库


## 使用

> VUX 必须配合 vux-loader 使用 ，vux-loader工具的作用是对.vue代码进行预处理，不限于 vux 组件库
> vux2 模板fork自webpack模板，基本和官网同步

```
npm install vue-cli -g
vue init airyland/vux2 projectPath
cd projectPath
npm run dev
```

## 调用示例

.vue文件中调用组件

```
<template>
  <div>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  }
}
</script>
```

main.js中调用plugin

```
import { AlertPlugin, ToastPlugin } from 'vux'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

// 详细使用请参考对应组件文档
```




### is-link

VUX部分组件支持link属性直接支持vue-router的路由参数

```
<div is-link link='/detail' ></div>
```

### ajax请求

内置了 AjaxPlugin 插件用于请求

> AjaxPlugin 插件依赖于 axios, axios基于promise，低版本浏览器需要垫片，这里使用es6-promise垫片

```
require('es6-promise').polyfill()
```

引入

```
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

```

全局使用

```
Vue.http.post('/api').then()
```

组件中使用

```
export default {
  created () {
    this.$http.post('/api').then(({data}) => {
      console.log(data)
    })
  }
}
```


### fastclick 移除移动端页面点击延迟

> 直接使用 WeUI 样式并引入 fastclick 会导致一些点击问题，VUX 组件内部已经做了相关处理


在main.js里引用fastclick

```
const FastClick = require('fastclick')
FastClick.attach(document.body)
```

### 谷歌统计代码

参考： https://doc.vux.li/zh-CN/development/vue-google-analytics.html


### 页面切换显示loading

参考： https://doc.vux.li/zh-CN/development/vue-show-loading.html




# 组件篇

### group

Group是一个特殊的表单wrapper组件，主要用于将表单分组，单个表单元素也算一组。常见的表单组件都必须作为Group的子组件

### cell, cell-box, cell-form-preview

> Cell 组件只能在Group中使用

单元格

cell-box比cell更自由和灵活，只提供is-link和link属性，内容直接使用默认slot定义
