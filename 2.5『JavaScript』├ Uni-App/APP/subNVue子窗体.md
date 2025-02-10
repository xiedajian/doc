[subNVue 原生子窗体开发指南](https://ask.dcloud.net.cn/article/35948)
[subNVue 完整配置](https://uniapp.dcloud.io/collocation/pages.html#style)

# subNVue 子窗体

subNVues 是 vue 页面的原生子窗体。用于解决App中 vue 页面中的层级覆盖和原生界面灵活自定义用的。

它不是全屏页面，也不是组件，就是一个原生子窗体。它是一个 nvue 页面，使用 weex 引擎渲染，提供了比 cover-view、plus.nativeObj.view 更强大的原生排版能力，方便自定义原生导航或覆盖原生地图、视频等

在我们的开发中，经常会遇到各种层级覆盖和原生界面自定义的问题：

在地图、视频等组件上的添加复杂覆盖组件，APP使用地图几乎必遇到的问题。

在小程序中只能用 cover-view 来解决。App中，开发者希望有更强的解决方案。

顾名思义，subNVue是 vue 页面的子窗体，它不是全屏页面，就是用于解决 vue 页面中的层级覆盖和原生界面自定义用的。它也不是组件，就是一个原生子窗体


## 使用 subNVue 子窗体的页面结构

建议 subNVue 子窗体与引用该子窗体的vue页面放在同一目录下，新建 subNVue 目录包含这些 subNVue 子窗体，例如：
```
|-- pages  
    |-- index               // index 目录  
    |   |-- subNVue         // subNVue 目录  
    |       |-- nav.nvue    // 自定义导航栏  
    |       |-- popup.nvue  // 弹出层子窗体  
    |-- index.vue           // index 页面
```

## 使用 subNVue 子窗体的 pages.json 配置

```
{  
    "pages": [{  
        "path": "pages/index/index", //首页  
        "style": {  
            "app-plus": {  
                "subNVues":[{  
                    "id": "concat", // 唯一标识  
                    "path": "pages/index/subnvue/concat", // 页面路径  
                    /*"type": "popup",  这里不需要*/  
                    "style": {  
                        "position": "absolute",  
                        "dock": "right",  
                        "width": "100rpx",  
                        "height": "150rpx",  
                        "background": "transparent"  
                    }  
                }]  
            }  
        }  
    }]  
}
```

id 属性是全局唯一的，
path 路径只能是 nuve 页面路径
type 属性目前只有导航栏 (navigationBar) 和弹出层 (popup) 类型，且级别最高，一旦设置 type 为 navigationBar 或 popup， position 和 dock 的值都会被忽略。
position 为原生子窗体的定位方式。
dock 表示原生子窗体的停靠位置，只有当 position 值为 dock 时才生效，如 top, bottom,right, left 等。
在配置中可以使用 upx 单位，方便你进行响应式布局。


## 怎么在页面中使用 subNVue 子窗体

```
// 通过 id 获取 nvue 子窗体  
const subNVue = uni.getSubNVueById('map_widget')  
// 打开 nvue 子窗体  
subNVue.show('slide-in-left', 300, function(){  
    // 打开后进行一些操作...  
    //   
});  
// 关闭 nvue 子窗体  
subNVue.hide('fade-out', 300)
```

动态修改 subNVue 子窗体位置，大小
```
subNVue.setStyle({  
    top: '100px',  
    left: '20px',  
    width: '100px',  
    height = '50px',  
})
```


## subNVue 子窗体与 vue/nvue 页面通信

推荐使用页面通讯完成与子窗体通讯
```
// 在 subNVue/vue 页面注册事件监听方法  
// $on(eventName, callback)  
uni.$on('page-popup', (data) => {  
    vm.title = data.title;  
    vm.content = data.content;  
})  

// 在 subNVue/vue 页面触发事件  
// $emit(eventName, data)  
uni.$emit('page-popup', {  
    title: '我是一个title',  
    content: '我是data content'  
});
```

> 使用页面通讯时注意事项： 要在页面卸载前，使用 uni.$off 移除事件监听器。


