

### 页面路由
在小程序中所有页面的路由全部由框架进行管理,框架以栈的形式维护了当前的所有页面。



#### Page.prototype.route
> 基础库 1.2.0 开始支持，低版本需做兼容处理
route 字段可以获取到当前页面的路径。

#### getCurrentPages()
getCurrentPages() 函数用于获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
Tip：不要尝试修改页面栈，会导致路由以及页面状态错误。




#### 页面跳转发生的 不同页面的生命周期变化
https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html




#### 页面跳转
1. wx.navigateTo(object) 或使用组件 <navigator open-type="navigateTo"/>
	打开新页面 A=>B    A-onHide,B-onLoad, B-onShow 
2. wx.redirectTo(object) 或使用组件 <navigator open-type="redirectTo"/>
	页面重定向 A=>B		A-onUnload,	B-onLoad, B-onShow
3. wx.navigateBack(object)  或 使用组件<navigator open-type="navigateBack">或 用户按左上角返回按钮
	页面返回  B=>A		B-onUnload	, A-onShow
4. wx.switchTab(object)  或使用组件 <navigator open-type="switchTab"/> 或用户切换 Tab
	Tab 切换  A=>B		A.onHide(), B.onLoad(), B.onShow()
5.  wx.reLaunch(object)  或使用组件 <navigator open-type="reLaunch"/>
	重启动

Tips:
- navigateTo, redirectTo 只能打开非 tabBar 页面。
- switchTab 只能打开 tabBar 页面。
- reLaunch 可以打开任意页面。
- 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
- 调用页面路由带的参数可以在目标页面的onLoad中获取。

#### 相关API
1. wx.navigateTo(OBJECT)
保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
注意：目前页面路径最多只能十层。
```
wx.navigateTo({
  url: 'test?id=1',		//  路径后可以带参数 如 'path?key=value&key2=value2'
  success:Function,		// 接口调用成功的回调函数
  fail:Function,		// 接口调用失败的回调函数
  complete:Function,		// 接口调用结束的回调函数（调用成功、失败都会执行）
})

//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
  }
})
```

2. wx.redirectTo(OBJECT)
关闭当前页面，跳转到应用内的某个页面。
参数与navigateTo相同
```
wx.redirectTo({
  url: 'test?id=1',		//  路径后可以带参数 如 'path?key=value&key2=value2'
  success:Function,		// 接口调用成功的回调函数
  fail:Function,		// 接口调用失败的回调函数
  complete:Function,		// 接口调用结束的回调函数（调用成功、失败都会执行）
})

//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
  }
})
```

3. wx.navigateBack(OBJECT)
关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
```
wx.navigateBack({
  delta: 2		//返回的页面数，默认1，如果 delta 大于现有页面数，则返回到首页
})

```

4. wx.switchTab(OBJECT)
跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
参数与navigateTo相同
```
wx.switchTab({
  url: '/index',		//  需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
  success:Function,		// 接口调用成功的回调函数
  fail:Function,		// 接口调用失败的回调函数
  complete:Function,		// 接口调用结束的回调函数（调用成功、失败都会执行）
})
```

5. wx.reLaunch(OBJECT)
> 基础库 1.1.0 开始支持，低版本需做兼容处理
关闭所有页面，打开到应用内的某个页面。
参数与navigateTo相同
```
wx.switchTab({
  url: 'test?id=1',		//  需要跳转的应用内页面路径 （需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
  success:Function,		// 接口调用成功的回调函数
  fail:Function,		// 接口调用失败的回调函数
  complete:Function,		// 接口调用结束的回调函数（调用成功、失败都会执行）
})
```



















