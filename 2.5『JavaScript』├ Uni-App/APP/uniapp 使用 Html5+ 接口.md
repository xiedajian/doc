[uni-app使用html5plus](https://uniapp.dcloud.io/tutorial/use-html5plus.html)
[html5plus](https://www.html5plus.org/doc/)


# uni-app使用html5plus


## 条件编译调用 HTML5+

小程序及 H5 等平台是没有 HTML5+ 扩展规范的，因此在 uni-app 调用 HTML5+ 的扩展规范时，需要注意使用条件编译。否则运行到h5、小程序等平台会出现 plus is not defined错误。

```
// #ifdef APP-PLUS
var appid = plus.runtime.appid;
console.log('应用的 appid 为：' + appid);
// #endif
```


## uni-app不需要 plus ready

在html中使用plus的api，需要等待plus ready。 而uni-app不需要等，可以直接使用。而且如果你调用plus ready，反而不会触发。



## uni-app 中的事件监听

在普通的 H5+ 项目中，需要使用 document.addEventListener 监听原生扩展的事件。

uni-app 中，没有 document。可以使用 plus.globalEvent.addEventListener 来实现。

```
// #ifdef APP-PLUS
// 监听设备网络状态变化事件
plus.globalEvent.addEventListener('netchange', function(){});
// #endif
```

同理，在 uni-app 中使用 Native.js 时，一些 Native.js 中对于原生事件的监听同样需要按照上面的方法去实现。

