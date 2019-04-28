
文档：https://developers.weixin.qq.com/miniprogram/dev/api/wxml-nodes-info.html


# dom操作

即使是小程序，也难免有dom操作


# 相关API

wx.createSelectorQuery()                            返回一个SelectorQuery对象实例
nodesRef.boundingClientRect([callback])
nodesRef.scrollOffset([callback])
nodesRef.fields(fields, [callback])

selectorQuery.in(component)                         将选择器的选取范围更改为自定义组件component内
selectorQuery.select(selector)                      在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于获取节点信息
selectorQuery.selectAll(selector)                   在当前页面下选择匹配选择器selector的节点，返回一个NodesRef对象实例。它选择所有匹配选择器的节点。
selectorQuery.selectViewport()                      选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息，返回一个NodesRef对象实例
selectorQuery.exec([callback])                      执行所有的请求，请求结果按请求次序构成数组，在callback的第一个参数中返回












