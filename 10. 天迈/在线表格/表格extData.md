  

内置渲染器新增属性 `extData`，用于传递自定义数据 . 示例：



  1. 页面 A 中的自定义插件使用内置渲染器，设置页面 B id，版本，自定义数据



```
<dev-table-render pageId="1648524252893655042" componentId="dev" :extData="ext" />
```



2. 页面 B 中编写代码时直接获取：



```
*const* data = this.extData
```

