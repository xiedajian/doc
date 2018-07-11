

### app.js 文件是程序的入口文件
此文件注册一个App(),
```
//app.js
App({
  onLaunch: function(options) {
    // 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	console.log(options)
  },
  onShow: function(options) {
      // 当小程序启动，或从后台进入前台显示，会触发 onShow
	  console.log(options)
  },
  onHide: function() {
      // 当小程序从前台进入后台，会触发 onHide.
  },
  // 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
  onError: function(msg) {
    console.log(msg)
  },
  // 当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见下文
  onPageNotFound: function(options404) {
    console.log(options404);
	wx.redirectTo({
      url: 'pages/...'
    }) // 如果是 tabbar 页面，请使用 wx.switchTab
  },
  globalData: 'I am global data'		// 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
})

```

##### App() 函数
App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等
App()函数的参数object参数说明：
```
onLaunch	Function	生命周期函数--监听小程序初始化	当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
onShow	Function	生命周期函数--监听小程序显示	当小程序启动，或从后台进入前台显示，会触发 onShow
onHide	Function	生命周期函数--监听小程序隐藏	当小程序从前台进入后台，会触发 onHide
onError	Function	错误监听函数	当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
onPageNotFound	Function	页面不存在监听函数	当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数，详见下文
其他	Any		开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
```

> 前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
运行机制:https://developers.weixin.qq.com/miniprogram/dev/framework/operating-mechanism.html

#### 生命周期钩子函数onLaunch(), onShow() 参数options

```
path					String	打开小程序的路径
query					Object	打开小程序的query
scene					Number	打开小程序的场景值
shareTicket				String	通常开发者希望转发出去的小程序被二次打开的时候能够获取到一些信息，例如群的标识,https://developers.weixin.qq.com/miniprogram/dev/api/share.html#%E8%8E%B7%E5%8F%96%E6%9B%B4%E5%A4%9A%E8%BD%AC%E5%8F%91%E4%BF%A1%E6%81%AF
referrerInfo			Object	当场景为由从另一个小程序或公众号或App打开时，返回此字段
referrerInfo.appId		String	来源小程序或公众号或App的 appId，详见 https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/scene.html
referrerInfo.extraData	Object	来源小程序传过来的数据，scene=1037或1038时支持
```





#### 其他页面获取App()实例 

全局的 getApp() 函数可以用来获取到小程序实例。
案例：
```
// app.js
App({
  globalData: 1
})

// a.js

var app = getApp()
app.globalData++

// b.js
console.log(getApp().globalData)

```

注意：

- App() 必须在 app.js 中注册，且不能注册多个。
- 不要在定义于 App() 内的函数中调用 getApp() ，使用 this 就可以拿到 app 实例。
- 不要在 onLaunch 的时候调用 getCurrentPages()，此时 page 还没有生成。
- 通过 getApp() 获取实例之后，不要私自调用生命周期函数。










