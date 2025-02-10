


众所周之，前端逻辑层和视图层分离有很多好处，但是有一个副作用是造成了两层之间通信阻塞

wxs 作为一种优秀的 ----- 避免逻辑层和渲染层交互通信折损的脚本语言，运行在视图层，可以直接操作视图层的元素，避免通信折损，使得微信小程序运行在用户手机时大放异彩。

同类型的有：百度 filterjs， 阿里有 sjs，当然，异军突起的 uni-app 有自己的 ---- renderjs

uniapp APP端：
逻辑层：运行在  jscore
渲染层：可以选择两种方式 
------------ webview渲染 ：则整个架构与小程序相同，此时页面后缀为vue文件
-------------weex引擎渲染：则整个架构与快应用相同，此时页面后缀为nvue文件。

# renderjs

renderjs 主要服务于APP，因为uni-app为vue+js+html进行编写，整个是h5的技术栈。而app上并没有document等基础对象。

那么，涉及到这些的前端类库就无法使用，例如html2、canvas、canvas2、image。而要用这些怎么办，这是用就出现了renderjs这种视图层工具来进行渲染。


renderjs是一个运行在视图层的js。它比WXS更加强大。`它只支持app-vue和h5。`

renderjs的主要作用有2个：

- 大幅降低逻辑层和视图层的通讯损耗，提供高性能视图交互能力
- 在视图层操作dom，运行for web的js库


> renderjs支持app-vue和h5，不支持其他平台。

# 使用方式

设置 script 节点的 lang 为 renderjs, module 属性表明模块名称。

```
<script module="test" lang="renderjs">
	export default {
		data() {
			return {
				name: '张三'
			}
		},
		mounted() {
			// ...
		},
		methods: {
			// ...
			showName(){
				console.log(this.name)
			},
		}
	}
</script>
```
例如上面这个例子，定义了一个模块名为 test 的视图层js，内部包含有name数据和showName方法。




案例：
[通过renderjs，在app和h5端使用完整的 echarts](https://ext.dcloud.net.cn/plugin?id=1207)

> renderjs，不止能运行echart，其他如F2、threejs等web库都可以运行。


## 通讯 （逻辑层 <==> 视图层renderjs）


html层（其实就是视图层，可以作为逻辑层与视图层的中介）：
```
<template>
	<view></view>	
</template>
```
逻辑层：
```
<script>
	export default{
		data(){
			age:20
		},
		methods:{
			
		}
	}
</script>
```
视图层(与逻辑层数据隔离)：
```
<script module="test" lang="renderjs">
	export default {
		data() {
			return {
				name: '张三'
			}
		},
		mounted() {
			// ...
		},
		methods: {
			// ...
			showName(){
				console.log(this.name)
			},
			setName(){
				
			}
		}
	}
</script>
```

- 逻辑层怎么调用视图层renderjs的方法：
监听逻辑层数据变化，调用renderjs中的方法，对renderjs中数据赋值







注意：
1.在renderjs层不能使用uni或其他框架的API，例如uni.request、uni.getlocation等等方法，需在原生层调用后触发监听将数据传入。

2.在APP端renderjs层的data与原生层的data互不相干

3.this.$ownerInstance.callMethod方法必须通过点击事件执行

