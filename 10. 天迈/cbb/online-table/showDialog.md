# showDialog 参数说明

## 配置项列表

| 属性                | 说明                                        | 是否必填 | 类型/可选值                     |
| ------------------- | ------------------------------------------- | -------- | ------------------------------- |
| title               | 窗口标题                                    | 否       | string                          |
| type                | 窗口类型                                    | 否       | string: alert, confirm, message |
| className           | 窗口附加 className                          | 否       | string                          |
| cancel-button-text  | 取消按钮的文本内容                          | 否       | string                          |
| confirm-button-text | 确定按钮的文本内容                          | 否       | string                          |
| showHeader          | 是否显示头部                                | 否       | boolean                         |
| showFooter          | 是否显示底部                                | 否       | boolean                         |
| mask                | 是否显示遮罩层                              | 否       | boolean                         |
| mask-closable       | 是否允许点击遮罩层关闭窗口                  | 否       | boolean                         |
| width               | 窗口的宽度                                  | 否       | number, string                  |
| height              | 窗口的高度                                  | 否       | number, string                  |
| zIndex              | 自定义堆叠顺序                              | 否       | number                          |
| fullscreen          | 窗口打开时自动最大化显示                    | 否       | boolean                         |
| draggable           | 是否启用窗口拖动                            | 否       | boolean                         |
| before-hide-method  | 在窗口隐藏之前执行，可以返回 Error 阻止关闭 | 否       | function                        |
| ~~on-save~~ -> on-success         | 点击确定时调用 | 否   | function                          |
| props               | 弹窗内容相关属性集合，详见下表              | 否       | object                          |
| events              | 组件内的事件监听   | 否       | { [eventName]: function(){} }   |
|                     |                                             |          |                                 |

### props

| 属性                | 说明                                           | 是否必填 | 类型/可选值                       |
| ---- | ---- | ---- | ---- |
| contentType         | 内容类型: 在线表格/表单/插件/其他组件          | 否       | table, form, plugin, component    |
| customButtons       | 自定义按钮，优先级最高，覆盖其他配置           | 否       | Array<{ name, click, ... }>       |
| pageId              | **只对在线表格/表单有效**，在线表格id          | 是       |                                   |
| versionId           | **只对在线表格/表单有效**，在线表格版本，可选  | 否       |                                   |
| pluginName          | **只对插件类型有效**，插件名称                 | 是       |                                   |
| componentName       | **只对组件类型有效** ，全局组件名称            | 是       |                                   |
| visibleColumns      | **只对在线表格有效**, 展示哪些列               | 否       |                                   |
| defaultSearchParams | **只对在线表格有效**, 表格查询条件的默认值     | 否       |                                   |
| selectionMode       | **只对在线表格有效**, 选择模式：单选、多选、无 | 否       | radio, checkbox, none 或 falsy 值 |

## 示例：

### 1. 表格

```js
this.showDialog({
    // 配置项...
    title: '打开表格',
    type: 'modal',
    props: {
        contentType: 'table',
        pageId: '1661921371265761282',
        // ...
        //  自定义弹窗按钮
        customButtons: [
            {
                type: "text",
                status: "primary",
                content: "按钮1",
                loading: false,
                click: (params) => {
                    const { item, data, setButtonStatus } = params;
                    console.log(item, data, params);
                    setButtonStatus("loading", true);
                    setTimeout(() => {
                      setButtonStatus("loading", false);
                    }, 2000)
                },
            },
            {
                status: "primary",
                content: "按钮2222",
                click: ({ item, data, setButtonStatus, getContext }) => {
                    const vm = getContext();
                    console.log('get context: ', vm);
                    setButtonStatus("disabled", true);
                }
            },

        ],
    },
})

```

### 2. 表单

```js
this.showDialog({
        title: "打开表单",
        width: "80%",
        height: "80%",
        closable: true,
        showFooter: true,
        type: "modal",

        props: {
          contentType: "form",
          pageId: "1661921371265761282",
        },
		
    	// 触发提交后
        onSuccess: (...params) => {
          console.log("onSave: ", ...params);
        },

        events: {
          // 表单提交事件  
          submit: (...args) => {
            console.log("submit", args);
          },
        },

      });
```

![image-20230530180310466](https://s2.loli.net/2023/05/30/FWxr2qU6clfwE7J.png)

### 3. 插件



```js
this.showDialog({
    // 配置项...
    title: '打开插件',
    type: 'modal',
    props: {
        contentType: 'plugin',
        pluginName: 'xxx-abc', // 代码增强定义的插件名称
        // ...
    },
})

```

<mark>插件只能在【在线表格】场景下执行，如表单按钮、工具栏、操作栏等，其他场景会直接抛出异常</mark>

<font color=red size=6 face="黑体">**错误用法，不要这么做**：</font>


>  新建的无关页面中使用插件类型

![image-20230531090854789](https://s2.loli.net/2023/05/31/Y9dxISDWRjQ7nNP.png)

![image-20230531090802177](https://s2.loli.net/2023/05/31/TEwdsnuRFhNkJgB.png)



### 4. 全局组件

```js
this.showDialog({
    // 配置项...
    title: '打开组件',
    type: 'modal',
    props: {
        contentType: 'component',
        componentName: 'hello-world', // 全局组件名称
        // 其他自定义属性：
        propA: '', // 组件中声明的
    },
    events: {
        ready: (...args) => {
            console.log('on ready', ...args);
        },
    },

})

```