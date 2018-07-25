
官网： http://element-cn.eleme.io/#/zh-CN
github: https://github.com/ElemeFE/element



# element-ui

Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

## 浏览器支持

IE10+

## 安装

// npm
npm install element-ui -S


// CDN
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>


# 使用


### 传统引入方式案例：

```
	<!DOCTYPE html>
	<html>
	<head>
	    <meta charset="UTF-8">
	    <!-- import CSS -->
	    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
	</head>
	<body>
	<div id="app">
	    <el-button @click="visible = true">Button</el-button>
	    <el-dialog :visible.sync="visible" title="Hello world">
	        <p>Try Element</p>
	    </el-dialog>
	</div>
	</body>
	<!-- import Vue before Element -->
	<script src="https://unpkg.com/vue/dist/vue.js"></script>
	<!-- import JavaScript -->
	<script src="https://unpkg.com/element-ui/lib/index.js"></script>
	<script>
	    new Vue({
	        el: '#app',
	        data: function() {
	            return { visible: false }
	        }
	    })
	</script>
	</html>
```
### vue模块化引入

两种方式：1.完整引入 2.按需引入

##### 完整引入

简单案例：
 
在 main.js 中写入以下内容：
```
	import Vue from 'vue';
	import ElementUI from 'element-ui';
	import 'element-ui/lib/theme-chalk/index.css';
	import App from './App.vue';

	Vue.use(ElementUI);

	new Vue({
	  el: '#app',
	  render: h => h(App)
	});
```
以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入


##### 按需引入

借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

npm install babel-plugin-component -D

然后，将 .babelrc 修改为：

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

```
import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});

```

# 全局配置

在引入 Element 时，可以传入一个全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）

完整引入 Element：

import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });

按需引入 Element：

import Vue from 'vue';
import { Button } from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);

按照以上设置，项目中所有拥有 size 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000。
