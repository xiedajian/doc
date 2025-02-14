
## 表单控件事件动作简述

### 一、分类：

*actionType*:

| 类型       | 编码   | 说明                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| http 请求  | ajax   | 发送 http 请求                                               |
| 弹窗       | dialog | 执行弹窗打开（内容类型：在线表单、在线表格、全局组件、表格增强插件） |
| 页面跳转   | link/url | 页面跳转：页面链接跳转                                       |
| 移动端扫码 |   scan     | 配置同 ajax |
| JS 脚本    | js | 通过编写 JS 代码片段实现所需逻辑，同时支持 JS 代码内执行动作 |

### 二、 各类型配置

#### ajax

`actionType: ajax`

**1.配置项**

| 属性名称 | 说明     | 是否必填 |
| -------- | -------- | -------- |
| api      | 请求 url | 是       |
| method   | 默认 get | 否       |
|          |          |          |

**2.请求成功操作**

> 接口响应的操作编码

| 编码     | 说明                       |      |
| -------- | -------------------------- | ---- |
| redirect | 请求成功后，跳转至某个页面 |      |
| reload   | 请求成功后，刷新目标组件   |      |
| messages | 自定义 toast 文字          |      |
| fill     | 填充表单                   |      |



#### dialog

`actionType: dialog`

![image-20230815150639869](https://s2.loli.net/2023/08/15/CRmlL8TxVNHh7z6.png)

#### link

`actionType: link`

**属性表**

| 属性名     | 类型     | 默认值 | 说明                                                         |
| ---------- | -------- | ------ | ------------------------------------------------------------ |
| actionType | `string` | `link` | 单页跳转                                                     |
| link       | `string` | `link` | 用来指定跳转地址，跟 url 不同的是，这是单页跳转方式，请指定平台内的页面。 |

#### url

**属性表**

| 属性名     | 类型      | 默认值  | 说明                                             |
| ---------- | --------- | ------- | ------------------------------------------------ |
| actionType | `string`  | `url`   | 页面跳转                                         |
| url        | `string`  | -       | 按钮点击后，会打开指定页面。可用 `${xxx}` 取值。 |
| blank      | `boolean` | `false` | 如果为 `true` 将在新 tab 页面打开。              |

#### scan

TODO:



#### js

TODO:



### 功能配置

```json
{
    __config__: {
      actionType: string, // 类型，ajax、dialog、js、link、等，持续增加
      actionConfig: { // 集中管理的类型参数项，不同类型参数也不一样
        // 1. ajax
        api: string,
        method: string,
          
        // 2. dialog， 无，按原有的 showDialog 逻辑
          
        // 3. link/url
        link: string,
        url: string,
        blank: boolean,
          
        // 4. scan
        api: string,
        method: string,
       	
        // 5. js 无，按原有逻辑处理
		
      }  
	}
}
```

**附：原有弹窗配置**

> 与 `showDialog` 的工具方法参数相同

![image-20230815165120991](https://s2.loli.net/2023/08/15/DHXTq7VgCURYo6Z.png)

### 响应

对于 ajax、scan 等 http 请求，执行成功后的行为使用约定式的方式处理，要求响应结构格式

```json
{
    action: string, // redirect, reload, messages, fill,
    
    result: any, // 根据 action 的类型, result 有不同涵义
    // 【redirect】: 跳转的路径、链接
    // 【reload】: 刷新的目标
    // 【messages】: 提示的内容
    // 【fill】: object 填充表单，array 填充子表
    
    // 其他参数 eg: 
    msg: string,
    code: string,
}
```


### example: 
#### 表格（设计子表）

**设计子表控件按钮配置移动端数据结构**

```js
{
  appEnhance: {
    actionType: string,
    actionConfig: object,
  },
  // ...
  __config__: object,
}
```

**case1: 表单**

```js
appEnhance: {
    actionType: "form"
}
```



**case2: 扫码**

```js
appEnhance: {
	actionType: "scan"，
	actionConfig: {	
		api: "/drr/xdga",
		method: "GET",
	}
}
```

![image-20230817092804435](https://s2.loli.net/2023/08/17/9BGvAtCIUehufYy.png)

**case3: 在线表格**

* 选择另外一个表格页面的数据回填，填充规则：同名字段覆盖

![image-20230817092839804](https://s2.loli.net/2023/08/17/rWtR5n7vilI1XAd.png)

```js
appEnhance: {
	actionType: "onlTable"，
	actionConfig: {	
		modelId: 'xxxxxx', // 页面id
	}
}
```

